import React from "react";
// import axios from "axios"
import { storage } from "./firebaseExport";
import firebase from "firebase/app";

import LinearDeterminate from "../LinearDeterminate";

import "./UploadFile.css";

import cross from "./cross.svg";

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = e => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    // console.log(`${this.props.userID}/${image.name}`);

    const uploadTask = storage
      .ref(`${this.props.userID}/${this.props.subject}/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress fnc
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        //error fnc
        console.log("ERROR!!");
        console.log(error);
      },
      () => {
        //complete fnc
        storage
          .ref(`${this.props.userID}/${this.props.subject}`)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            // console.log(url);
            this.setState({ url });

            //lets add this url to database also

            firebase
              .database()
              .ref(`${this.props.userID}/${this.props.subject}/main`)
              .set(url);
          });
      }
    );
  };

  render() {
    // console.log(this.props.clickBack);

    let showDone = this.state.progress === 100;

    return (
      <div>
        <button
          type="button"
          className="buttonStyleCross"
          id="transparentButton"
          onClick={this.props.clickBack}
        >
          <img src={cross} alt="cross" />
        </button>

        <br />

        {this.state.url ? (
          <img
            src={this.state.url}
            alt="uploaded image"
            height="400"
            width="250"
            className="imageAttachment"
          />
        ) : null}
        <br />
        <div className="successfulFileAttach">
          {showDone ? <p>Image attached succesfully!</p> : null}
        </div>
        <br />
        {/* <progress id="uploader" value={this.state.progress} max="100" /> */}

        {/* <div class="btn-file-input">
          <input type="file" onChange={this.handleChange} />
        </div> */}
        <div className="uploadAttachmentHere">
          <p className="uploadAttachmentText">
            Upload an image attachment here:
          </p>
        </div>

        <div className="file-input-wrapper">
          <button className="btn-file-input">Choose Image</button>
          <input type="file" onChange={this.handleChange} />
        </div>

        <br />
        <br />
        <button className="buttonStyleUpload" onClick={this.handleUpload}>
          Attach
        </button>

        <LinearDeterminate id="uploader" progress={this.state.progress} />
      </div>
    );
  }
}
export default UploadFile;
