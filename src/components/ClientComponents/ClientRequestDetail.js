import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/RequestDetail.css";

import TicketProperties from "../TicketProperties";
import TrashModal from "../TrashModal";
import CNavBar from "./CNavBar";
import ChatButton from "../MyChat/ChatButton";

// import profileIcon from "../../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";
import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";
import trash from "../../Resources/Icons/iconfinder_25_2135797.svg";
// import replyArrow from "../../Resources/Icons/iconfinder_reply_226602.svg";
// import fileLogo from "../../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";

import { Link } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import { getRequestsQuery } from "../../queries/queries";

import ThreadBlock from "../RequestDetailComponents/ThreadBlock";
import MainThread from "../RequestDetailComponents/MainThread";
import CreateThread from "../RequestDetailComponents/CreateThread";

import { storage } from "../firebase/firebaseExport";
import firebase from "firebase/app";

class ClientRequestDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      allImgLinkBool: false
    };
  }

  displayCreateThread() {
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = window.location.pathname.substring(16);
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });

      dataArr = dataArr[0];
      // console.log("here");
      // console.log(dataArr);

      return (
        <CreateThread
          requestId={dataArr.id}
          userID={dataArr.user.id}
          subject={dataArr.subject}
        />
      );
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  displayMainThread() {
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = window.location.pathname.substring(16);
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });
      dataArr = dataArr[0];
      // console.log(dataArr.subject);

      return (
        <MainThread
          creatorID={dataArr.user.id}
          mainThread={dataArr.mainThread}
          subject={dataArr.subject}
          dateRequested={dataArr.dateRequested}
          creatorFirstName={dataArr.user.firstName}
          creatorLastName={dataArr.user.lastName}
        />
      );
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  //function to display list of threads
  displayThreads() {
    var data = this.props.getRequestsQuery;

    var dataArr;
    if (!data.loading) {
      let pageId = window.location.pathname.substring(16);
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });
      dataArr = dataArr[0];

      // console.log(data.threads);
      return (
        <ThreadBlock
          id={dataArr.id}
          key={dataArr.id}
          threads={dataArr.threads}
        />
      );
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  //function to display ticket properties
  displayData() {
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = window.location.pathname.substring(16);
      // console.log(data.requests); //all the different data with diff ids

      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });

      dataArr = dataArr[0];
      // console.log(dataArr); // here is data of the request.

      var fb = firebase.database().ref(`${dataArr.user.id}/${dataArr.subject}`);
      // var images = [];
      fb.once("value").then(snapshot => {
        const images = [];
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          // console.log(childData);
          images.push(childData);
        });

        // console.log(images.length);
        if (images.length !== 0 && this.state.allImgLinkBool !== true) {
          this.setState({
            allImgLinkBool: true
          });
        }
      });

      return (
        <TicketProperties
          allImgLink={this.state.allImgLinkBool} //for now
          userID={dataArr.user.id}
          subject={dataArr.subject}
          //needed top 3 for allImgLink
          id={dataArr.id}
          asset={dataArr.asset}
          type={dataArr.type}
          priority={dataArr.priority}
          assigned={dataArr.assigned}
          status={dataArr.status}
          dateRequested={dataArr.dateRequested}
          dateResolved={dataArr.dateResolved}
          dateClosed={dataArr.dateClosed}
        />
      );
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const modalTextMargin = {
      marginTop: "10px",
      marginLeft: "20px"
    };

    let pageId = window.location.pathname.substring(16);

    return (
      <div className="noScroll">
        <CNavBar />
        <ChatButton author="client" requestID={pageId} />

        <section className="ticket-enquiry-section">
          <div className="back-to-tickets-section">
            <button type="button" id="transparentButton">
              <Link to="/crequests">
                <img src={arrow} className="arrow-left-new" alt="arrow" />
              </Link>
            </button>

            <h3 className="back-to-tickets-text">Back to Tickets</h3>

            <img src="" className="settings" alt="" />

            <TrashModal show={this.state.show} handleBack={this.hideModal}>
              <h3 style={modalTextMargin}>
                Are you sure you would like to delete this request?
              </h3>
              <br />
              <br />
              <p className="error-textVerModal">
                This action cannot be reversed
              </p>
            </TrashModal>

            <button
              type="button"
              id="transparentButton"
              onClick={this.showModal}
              className="trash"
            >
              <img src={trash} className="trash" alt="trash" />
            </button>
            <img src={arrow} className="arrow-right-new" alt="arrow" />
            <img src={arrow} className="arrow-left-new-2" alt="arrow" />
            <p className="page-no">1 out of 100</p>
          </div>

          <div className="enquiry-section">
            <div className="add-col internal-scrolling">
              {this.displayMainThread()}

              {this.displayThreads()}

              {this.displayCreateThread()}
            </div>
            <div className="quarter-col text-boxes internal-scrolling">
              {this.displayData()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default compose(graphql(getRequestsQuery, { name: "getRequestsQuery" }))(
  ClientRequestDetail
);
