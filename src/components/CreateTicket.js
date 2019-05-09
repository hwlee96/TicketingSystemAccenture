import React from "react";
import "../styles/createTicket.css";
import { graphql, compose } from "react-apollo";
import { Redirect } from "react-router-dom";
import {
  addRequestMutation,
  getUsersQuery,
  addThreadMutation
} from "../queries/queries";
import NavBar from "./NavBar";
import AssignedOptions from "../Resources/Data/AssignedOptions";
import PriorityOptions from "../Resources/Data/PriorityOptions";
import UploadModal from "./firebase/UploadModal";

// import profileIcon from "../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";
// import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";
import attachment from "../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";

class CreateTicket extends React.Component {
  constructor() {
    super();
    this.state = {
      asset: "",
      type: "",
      subject: "",
      priority: "",
      assigned: "",
      requesterId: "", //added
      mainThread: "",
      redirect: false,
      show: false,

      //these are for sms fnc
      message: {
        to: "",
        body: ""
      },
      submitting: false,
      error: false
    };

    this.handleRedirect = this.handleRedirect.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleRedirect() {
    this.setState({
      redirect: true
    });
  }

  displayUsers() {
    var data = this.props.getUsersQuery;
    if (data.loading) {
      return <option disabled>Loading... </option>;
    } else {
      return data.users.map(user => {
        return (
          <option key={user.id} value={user.id}>
            {user.firstName}
          </option> //need to have some kind of key-value pair
        );
      });
    }
  }

  displayAssets() {
    let datals = [
      { name: "Aesop", id: 0 },
      { name: "Ticketing", id: 1 },
      { name: "Travel Marketplace", id: 2 },
      { name: "Smart Lock", id: 3 },
      { name: "Video Analytics", id: 4 },
      { name: "AR Gamification", id: 5 }
    ];

    return datals.map(data => {
      return (
        <option key={data.id} value={data.name}>
          {data.name}
        </option>
      );
    });
  }

  displayType() {
    // let datals = [
    //   { name: "Request", id: 0 },
    //   { name: "Consult", id: 1 },
    //   { name: "Enquiry", id: 2 }
    // ];

    let datals = [
      { name: "Purchase", id: 0 },
      { name: "Complaint", id: 1 },
      { name: "Tech Support", id: 2 }
    ];

    return datals.map(data => {
      return (
        <option key={data.id} value={data.name}>
          {data.name}
        </option>
      );
    });
  }

  displayAssigned() {
    let datals = { AssignedOptions };
    datals = datals.AssignedOptions;
    return datals.map(data => {
      return (
        <option key={data.id} value={data.name}>
          {data.name}
        </option>
      );
    });
  }

  displayPriority() {
    let datals = { PriorityOptions };
    datals = datals.PriorityOptions;

    return datals.map(data => {
      return (
        <option key={data.id} value={data.name}>
          {data.name}
        </option>
      );
    });
  }

  sendEmail = () => {
    // const { email } = this.state.email;
    fetch(
      `http://127.0.0.1:4000/send-email?content=${"A new request has been created"}`
    ) //query string url
      .catch(err => console.error(err));
    console.log("success");
  };

  submitForm(e) {
    e.preventDefault();

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

    if (this.state.type === "Purchase") {
      this.props.addRequestMutation({
        variables: {
          asset: this.state.asset,
          type: this.state.type,
          subject: this.state.subject,
          dateRequested: date,
          priority: "High",
          status: "Open",
          assigned: this.state.assigned,
          dateResolved: "",
          dateClosed: "",
          mainThread: this.state.mainThread,
          requesterId: this.state.requesterId //added
        }
      });
    } else {
      this.props.addRequestMutation({
        variables: {
          asset: this.state.asset,
          type: this.state.type,
          subject: this.state.subject,
          dateRequested: date,
          priority: this.state.priority,
          status: "Open",
          assigned: this.state.assigned,
          dateResolved: "",
          dateClosed: "",
          mainThread: this.state.mainThread,
          requesterId: this.state.requesterId //added
        }
      });
    }

    //these are for sms fnc
    //`http://127.0.0.1:4000/send-email?content=${"A new request has been created"}`

    this.setState({ submitting: true });
    fetch(`/api/messages?content=${"A new request has been created"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: "",
              body: ""
            }
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
      });

    // console.log("Data sent! Redirecting page");
    //here we send an email
    this.sendEmail();

    this.handleRedirect();
  }

  isFormValid = () => {
    const {
      requesterId,
      asset,
      type,
      subject,
      priority,
      assigned,
      mainThread
    } = this.state;

    return (
      requesterId &&
      asset &&
      type &&
      subject &&
      priority &&
      assigned &&
      mainThread
    );
  };

  render() {
    if (this.state.redirect) {
      // return <Redirect to="/requests" />;
      setTimeout(function() {
        window.location.reload();
      }, 500);
      return (
        <Redirect
          to={{
            pathname: "/requests",
            state: { createdTicket: true }
          }}
        />
      );
    }

    return (
      <div>
        <UploadModal
          show={this.state.show}
          handleBack={this.hideModal}
          userID={this.state.requesterId}
          subject={this.state.subject}
        />

        <NavBar />

        <div className="create-new-tix-main-body">
          <div className="col span-1-of-7 heading-box">
            <p className="create-new-tix-heading top-heading">Requester</p>
            <p className="create-new-tix-heading">Assets*</p>
            <p className="create-new-tix-heading">Type*</p>
            {/*arrow here*/}
            <p className="create-new-tix-heading">Subject*</p>
            <p className="create-new-tix-heading">Priority</p>
            <p className="create-new-tix-heading">Assigned</p>
            {/*arrow here*/}
            <p className="create-new-tix-heading ">Your Message*</p>
          </div>

          <div className="col span-1-of-2 input-fields">
            <form onSubmit={this.submitForm.bind(this)}>
              <label>
                <select
                  onChange={e => this.setState({ requesterId: e.target.value })}
                  className="top-field small-input-field"
                >
                  <option>Select requester</option>
                  {this.displayUsers()}
                </select>
              </label>

              <br />

              <label>
                {/* <input
                  type="text"
                  onChange={e => this.setState({ asset: e.target.value })}
                  className="small-input-field"
                /> */}

                <select
                  onChange={e => this.setState({ asset: e.target.value })}
                  className="small-input-field"
                >
                  <option>Select asset</option>
                  {this.displayAssets()}
                </select>
              </label>

              <br />

              <label>
                <select
                  onChange={e => this.setState({ type: e.target.value })}
                  className="small-input-field"
                >
                  <option>Select type</option>
                  {this.displayType()}
                </select>
              </label>

              <br />

              <label>
                <input
                  type="text"
                  onChange={e => this.setState({ subject: e.target.value })}
                  className="small-input-field"
                />
              </label>

              <br />

              <select
                onChange={e => this.setState({ priority: e.target.value })}
                className="small-input-field"
              >
                <option>Select priority</option>
                {this.displayPriority()}
              </select>

              <br />

              <select
                onChange={e => this.setState({ assigned: e.target.value })}
                className="small-input-field dropdownOption"
              >
                <option>Select admin</option>
                {this.displayAssigned()}
              </select>

              <br />

              <label>
                <textarea
                  placeholder="Enter text here..."
                  onChange={e => this.setState({ mainThread: e.target.value })}
                  rows="4"
                  cols="10"
                  className="small-input-field last-field"
                />
              </label>

              <br />

              <div className="attach-send-bar">
                {/* <img src={attachment} className="file-logo" /> */}
                <button
                  type="button"
                  id="transparentButton"
                  onClick={this.showModal}
                  className="file-logo"
                >
                  <img
                    src={attachment}
                    className="file-logo"
                    alt="attachment"
                  />
                </button>

                <p className="attach-file">Attach</p>

                <button
                  className="send-button"
                  disabled={!this.isFormValid()}
                  onClick={this.buttonPress}
                >
                  <p className="send">Send</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(addRequestMutation, { name: "addRequestMutation" }),
  graphql(getUsersQuery, { name: "getUsersQuery" }),
  graphql(addThreadMutation, { name: "addThreadMutation" })
)(CreateTicket);
