import React from "react";
import { graphql, compose } from "react-apollo";
// import { Redirect } from "react-router-dom";

import ClientModal from "./ClientComponents/ClientModal";

import {
  getRequestsQuery,
  addRequestMutation,
  updateRequestStatusMutation,
  updateRequestAssignedMutation
} from "../queries/queries";

import CustomizedSnackbars from "./CustomizedSnackbars";

class UpdateButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showSnackbarUpdate: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSnackbarUpdate = this.toggleSnackbarUpdate.bind(this);

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  toggleSnackbarUpdate() {
    this.setState({
      showSnackbarUpdate: !this.state.showSnackbarUpdate
    });
  }

  retreiveData() {
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      // let pageId = window.location.pathname.substring(15);
      let pageId = this.props.idd;
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });
      dataArr = dataArr[0];
      // console.log(dataArr); // here is data of the request.
      return dataArr;
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  handleSubmit(e) {
    let dataArr = this.retreiveData();
    let propsText = this.props.text;
    // console.log(dataArr);
    // console.log(dataArr.user.id);
    if (this.props.logic === "assigned") {
      this.props.updateRequestAssignedMutation({
        variables: {
          id: dataArr.id,
          assigned: propsText
        }
      });
    } else {
      //"status" edit
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

      // console.log(dataArr);

      if (propsText === "Open") {
        //clear the date resolved field
        this.props.updateRequestStatusMutation({
          variables: {
            id: dataArr.id,
            status: propsText,
            dateResolved: ""
          }
        });
      } else {
        //changing to resolved now
        this.props.updateRequestStatusMutation({
          variables: {
            id: dataArr.id,
            status: propsText,
            dateResolved: date
          }
        });

        if (this.props.isClient === "true") {
          //make modal pop
          this.showModal();
        }
      }
    }
    // console.log("Data sent! Redirecting page");
  }

  render() {
    let showSnackbarUpdate = this.state.showSnackbarUpdate;

    const modalTextMargin = {
      marginTop: "10px"
    };

    return (
      <div>
        <ClientModal
          show={this.state.show}
          handleBack={this.hideModal}
          idd={this.props.idd}
        >
          <h3 style={modalTextMargin}>
            Would you like to close this request as well?
          </h3>
          <br />
          <br />
          <p className="error-textVerClientModal">
            This action cannot be reversed
          </p>
        </ClientModal>

        {showSnackbarUpdate ? (
          <CustomizedSnackbars message="Request successfully updated" />
        ) : null}
        <button
          id="transparentButtonVer2"
          style={this.props.style}
          onClick={e => {
            this.handleSubmit();
            this.toggleSnackbarUpdate();
            //this.handleRedirect(); //updates without refreshing, can take away this
          }}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(addRequestMutation, { name: "addRequestMutation" }),
  graphql(getRequestsQuery, { name: "getRequestsQuery" }),
  graphql(updateRequestStatusMutation, { name: "updateRequestStatusMutation" }),
  graphql(updateRequestAssignedMutation, {
    name: "updateRequestAssignedMutation"
  })
)(UpdateButton);
