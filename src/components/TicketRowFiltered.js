import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";
import DropdownCardStatus from "./DropdownCardStatus";
import DropdownCardAssigned from "./DropdownCardAssigned";

import { Link } from "react-router-dom";

import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";
import { Component } from "react";
import { graphql } from "react-apollo";
import { getRequestQuery } from "../queries/queries";

class TicketRowFiltered extends Component {
  constructor() {
    super();
    this.state = {
      checkbox: false,
      id: null
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox = event => {
    if (this.state.checkbox === true) {
      // console.log("checkbox2 before");
      // console.log(this.state.checkbox);

      this.setState({ checkbox: false });
      // console.log("checkbox2 after");
      // console.log("hiiiii");

      this.props.callbackFromParentRemove(this.props.id);
    } else {
      // console.log("checkbox1 before");
      // console.log(this.state.checkbox);

      this.setState({ checkbox: true });
      // console.log("checkbox1 after");
      // console.log(this.state.checkbox);

      this.props.callbackFromParentAdd(this.props.id);
    }
  };

  uncheckAllCheckboxes() {
    // console.log("testinggggg");
    // console.log(this.state.checkbox);
    // console.log(this.props.asset);

    if (this.state.checkbox === true) {
      // console.log(this.props.asset);

      this.setState({ checkbox: false });
    }
    // console.log(this.state.checkbox);
  }

  displayBookDetails() {
    // console.log("hi");
    // console.log(this.props);
    //same as const book = ...., just es6 destructuring
    const { request } = this.props.data;
    // console.log("BOOOOOK");
    // console.log(this.props.data.request);

    if (request) {
      return (
        <div>
          <h2>{request.user.firstName}</h2>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }

    // request ? return <div>
    //   <h2>{request.user.firstName}</h2>
    // </div> :
    //   return <div>No book selected...</div>;
  }
  render() {
    const { request } = this.props.data;
    let linkStr = "requestDetail/" + this.props.id;
    var closedBool = false;

    if (request) {
      closedBool = request.status === "Closed";
      // console.log(request.status);
    }
    // console.log(this.props.data);
    // console.log(closedBool);

    /*
      we are first grabbing the book property from this.prop.data from the data that comes back from the query, if that book exists,
      then we return the output with the format above,  if we dont have a book, we are just output the no book selected
      */
    if (request) {
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
          <div className="col span-1-of-10">
            <h4 className="detail">{request.user.firstName}</h4> {/*John Tan*/}
          </div>
          <div className="col span-1-of-9">
            <h4 className="detail">{request.asset}</h4> {/*Login API*/}
          </div>
          <div className="col span-1-of-5">
            <Link to={linkStr} className="subjectLink" id="subject">
              <h4 className="detail subjectLinkHover">
                {request.type}: {request.subject}
              </h4>
            </Link>
            {/*Enquiry about API => we make this one a link*/}
          </div>

          <div className="col span-1-of-6">
            <h4 className="detail">{request.dateRequested}</h4>
            {/*12 January 2019 12:00:00*/}
          </div>
          <div className="col span-1-of-6">
            <h4 className="detail">{request.dateResolved}</h4>
          </div>

          <div className="col span-1-of-10">
            <h4 className="detail">{request.priority}</h4> {/*High*/}
          </div>
          <div className="col span-1-of-9" id="status">
            <h4 className="detail">{request.status}</h4>
          </div>

          {closedBool || this.props.hideArrow ? (
            <div className="adminStatusArrowInvisible">
              <p id="transparentButton" className="transparentButton-status">
                <img src={arrow} className="arrow-down-2" alt="arrow" />
              </p>
            </div>
          ) : (
            <div className="statusArrow">
              <DropdownCardStatus idd={request.id} isClient="false" />
            </div>
          )}

          <div className="col span-1-of-8" id="assignedTo">
            <h4 className="detail">{request.assigned}</h4>
          </div>

          {this.props.hideArrow ? (
            <div className="adminStatusArrowInvisible">
              <p id="transparentButton" className="transparentButton-status">
                <img src={arrow} className="arrow-down-2" alt="arrow" />
              </p>
            </div>
          ) : (
            <div className="assignedToArrow">
              <DropdownCardAssigned idd={request.id} />
            </div>
          )}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

/*
  attach prop as a query variable to the getBookQuery

  option is a function that takes in props as a parameter, whenever we update the prop or new prop comes in here, we will fire the function
  it will return the following object and reset the variables for this query
  */
export default graphql(getRequestQuery, {
  options: props => {
    return {
      variables: {
        id: props.id
      }
    };
  }
})(TicketRowFiltered);
