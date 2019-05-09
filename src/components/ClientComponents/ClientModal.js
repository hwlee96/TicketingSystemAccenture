import React from "react";
import { graphql, compose } from "react-apollo";

import "../../styles/ClientModal.css";

import {
  updateDateClosedMutation,
  getRequestsQuery
} from "../../queries/queries";

class ClientModal extends React.Component {
  constructor() {
    super();

    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus() {
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

    let data = this.props.getRequestsQuery;
    let dataArr;
    if (!data.loading) {
      let pageId = this.props.idd;
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });

      dataArr = dataArr[0];
      console.log(dataArr);
    } else {
      console.log("still retreiving data from mongoDB");
    }

    // console.log(dataArr);
    this.props.updateDateClosedMutation({
      variables: {
        id: dataArr.id,
        dateClosed: date,
        status: "Closed"
      }
    });

    //now we send an email to admin:

    fetch(
      `http://127.0.0.1:4000/send-email?content=${"A client has closed a request"}`
    ) //query string url
      .catch(err => console.error(err));
    console.log("success");

    this.props.handleBack();
  }
  render() {
    var { handleBack, show, children } = this.props;

    let showHideClassName = show
      ? "client-modal client-display-block"
      : "client-modal client-display-none";

    const noStyle = {
      background: "#3d94f6",
      borderRadius: "6px",
      color: "#ffffff",
      fontFamily: "Lato",
      fontSize: "20px",
      fontWeight: "400",
      padding: "10px",
      display: "inline-block",
      cursor: "pointer",
      borderStyle: "solid",
      border: "none",
      marginLeft: "20px",
      marginBottom: "20px"
    };

    const yesStyle = {
      background: "#D00000",
      borderRadius: "6px",
      color: "#ffffff",
      fontFamily: "Lato",
      fontSize: "20px",
      fontWeight: "400",
      padding: "10px",
      display: "inline-block",
      cursor: "pointer",
      borderStyle: "solid",
      border: "none"
    };

    return (
      <div className={showHideClassName}>
        <section className="client-modal-main">
          {children}
          <button style={yesStyle} onClick={this.changeStatus}>
            Yes
          </button>
          <button style={noStyle} onClick={handleBack}>
            No
          </button>
        </section>
      </div>
    );
  }
}

export default compose(
  graphql(getRequestsQuery, { name: "getRequestsQuery" }),
  graphql(updateDateClosedMutation, { name: "updateDateClosedMutation" })
)(ClientModal);
