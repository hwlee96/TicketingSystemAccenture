import React from "react";

import { graphql, compose } from "react-apollo";
// import { Redirect } from "react-router-dom";
import {
  addRequestMutation,
  getRequestsQuery,
  updateDateClosedMutation,
  updateRequestStatusMutation
} from "../../queries/queries";

import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/ClientTicketList.css";

import { Link } from "react-router-dom";
import DropdownCardStatus from "../DropdownCardStatus";

import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class TicketRow extends React.Component {
  constructor() {
    super();
    this.state = {
      checkbox: false,
      id: null
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.yesPress = this.yesPress.bind(this);
    this.noPress = this.noPress.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.id
    });
  }

  handleCheckbox = event => {
    console.log("clicked checkbox");
    const { name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  };

  noPress() {
    // console.log("no button pressed");
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = this.props.id;
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });

      dataArr = dataArr[0];
    } else {
      console.log("still retreiving data from mongoDB");
    }

    this.props.updateRequestStatusMutation({
      variables: {
        id: dataArr.id,
        dateResolved: "",
        status: "Open"
      }
    });
  }

  yesPress() {
    // console.log("yes button pressed");
    let today = new Date();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      time;

    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = this.props.id;
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });

      dataArr = dataArr[0];
      // console.log(dataArr);
    } else {
      console.log("still retreiving data from mongoDB");
    }

    // this.props.addRequestMutation({
    //   variables: {
    //     asset: dataArr.asset,
    //     type: dataArr.type,
    //     subject: dataArr.subject,
    //     dateRequested: dataArr.dateRequested,
    //     priority: dataArr.priority,
    //     status: dataArr.status,
    //     assigned: dataArr.assigned,
    //     dateResolved: dataArr.dateResolved,
    //     dateClosed: ,
    //     mainThread: dataArr.mainThread,
    //     requesterId: dataArr.requesterId
    //   }
    // });

    // console.log("updatemutation here, add date closed.");
    this.props.updateDateClosedMutation({
      variables: {
        id: dataArr.id,
        dateClosed: date,
        status: "Closed"
      }
    });

    //now we send a email to admin
    fetch(
      `http://127.0.0.1:4000/send-email?content=${"A client has closed a request"}`
    ) //query string url
      .catch(err => console.error(err));
    console.log("success");
  }

  render() {
    // let linkStr = "requestDetail/" + this.props.id;
    let linkStr = "crequestDetail/" + this.props.id;
    let closedBool = this.props.status === "Closed";
    let resolvedBool = this.props.status === "Resolved";
    let name = closedBool
      ? "clientDetail grey clientNotSubject"
      : "clientDetail clientNotSubject";

    // console.log(name);

    let name2 = closedBool
      ? "clientDetail clientSubjectLinkHover grey"
      : "clientDetail clientSubjectLinkHover";

    return (
      <div className="filter-box-2">
        <div className="col span-1-of-12">
          <input
            className="indiv-checkbox rows-checkboxNeed"
            type="checkbox"
            name="checkbox"
            checked={this.state.checkbox}
            onChange={this.handleCheckbox}
          />
        </div>
        <div className="col span-1-of-9">
          <h4 className={name}>{this.props.asset}</h4> {/*John Tan*/}
        </div>
        <div className="col span-1-of-5">
          <Link to={linkStr} className="clientSubjectLink">
            <h4 className={name2}>
              {this.props.type}: {this.props.subject}
            </h4>
          </Link>
        </div>
        <div className="col span-1-of-7">
          <h4 className={name}>{this.props.dateRequested}</h4>
        </div>
        <div className="col span-1-of-7">
          <h4 className={name}>{this.props.dateResolved}</h4>
        </div>
        <div className="col span-1-of-7">
          <h4 className={name}>{this.props.dateClosed}</h4>
        </div>
        <div className="col span-1-of-8" id="client-status">
          <h4 className={name}>{this.props.status}</h4>
        </div>

        {closedBool ? (
          <div className="clientStatusArrowInvisible">
            <p id="transparentButton" className="transparentButton-status">
              <img src={arrow} className="arrow-down-2" alt="arrow" />
            </p>
          </div>
        ) : (
          <div className="clientStatusArrow">
            <DropdownCardStatus idd={this.props.id} isClient="true" />
          </div>
        )}

        {resolvedBool && !closedBool ? (
          <div className="col span-1-of-9">
            <button
              className="user-ticket-list-yes-button"
              onClick={this.yesPress}
            >
              <p className="yes-button-text">Yes</p>
            </button>
            <button
              className="user-ticket-list-no-button"
              onClick={this.noPress}
            >
              <p className="no-button-text">No</p>
            </button>
          </div>
        ) : (
          <p className="unable-close">-</p>
        )}
      </div>
    );
  }
}

export default compose(
  graphql(addRequestMutation, { name: "addRequestMutation" }),
  graphql(getRequestsQuery, { name: "getRequestsQuery" }),
  graphql(updateDateClosedMutation, { name: "updateDateClosedMutation" }),
  graphql(updateRequestStatusMutation, { name: "updateRequestStatusMutation" })
)(TicketRow);
