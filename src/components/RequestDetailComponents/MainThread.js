import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
// import { getRequestQuery } from "../../queries/queries";
// import replyArrow from "../../Resources/Icons/iconfinder_reply_226602.svg";

import firebase from "firebase/app";

class MainThread extends React.Component {
  constructor() {
    super();
    this.state = {
      url: ""
    };
  }
  componentDidMount() {
    let creatorID = this.props.creatorID;
    let subject = this.props.subject;
    let pathname = creatorID + "/" + subject + "/" + "main";
    console.log(pathname);
    firebase
      .database()
      .ref(pathname)
      .on("value", snapshot => {
        snapshot.val() !== null
          ? this.setState({ url: snapshot.val() })
          : this.setState({ url: "" });
      });

    console.log(this.state);
  }

  render() {
    // let linkStr = "requestDetail/" + this.props.id;

    // console.log(this.state.url);

    return (
      <div className="text-boxes">
        <div className="enquiry-head">
          <h4 className="small-heading enquiry-title">{this.props.subject}</h4>
          <p className="timing"> {this.props.dateRequested}</p>
          <p className="author">
            Created by: {this.props.creatorFirstName}
            {"  "}
            {this.props.creatorLastName}
          </p>
        </div>
        <div className="enquiry-body">{this.props.mainThread}</div>

        {/* this is for the url */}
        <div className="attachedImageAccess">
          {this.state.url === "" ? null : (
            <a className="url-bottom-left" href={this.state.url}>
              View attached image
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default MainThread;
