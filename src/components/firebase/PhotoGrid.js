import React from "react";
import Gallery from "react-grid-gallery";
import { storage } from "./firebaseExport";
import firebase from "firebase/app";

class PhotoGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    //do string formating here
    let pathname = window.location.pathname.substring(11);
    pathname = pathname.replace(/%20/gi, " ");
    let arr = pathname.split("/");
    // console.log(arr[0]);
    // console.log(arr[1]);

    var fb = firebase.database().ref(`${arr[0]}/${arr[1]}`);
    // console.log(fb);
    fb.once("value").then(snapshot => {
      const images = [];
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        // console.log(childData);
        images.push(childData);
      });

      this.setState({ images });
    });

    // console.log(this.state.images);
  }

  render() {
    let IMAGES = [];

    if (this.state.images.length !== 0) {
      // console.log("true");
      IMAGES = this.state.images.map(url => {
        return {
          src: url,
          thumbnail: url,
          thumbnailWidth: 500,
          thumbnailHeight: 500,
          isSelected: false,
          caption: ""
        };
      });
    }

    return <Gallery images={IMAGES} />;
  }
}

export default PhotoGrid;
