import React, { Component } from "react";
import MyChat from "./MyChat";
import Fab from "@material-ui/core/Fab";

import chatIcon from "./chat.svg";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
  backgroundColor: "#416FBD",
  color: "#FFFFFF"
};

class ChatButton extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };

    this.toggleDiv = this.toggleDiv.bind(this);
  }

  toggleDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };
  render() {
    return (
      <div>
        <div>
          {this.state.show && (
            <MyChat
              author={this.props.author}
              requestID={this.props.requestID}
            />
          )}
        </div>
        <Fab style={style} onClick={this.toggleDiv}>
          <img src={chatIcon} alt="chatIcon" />
          <i className="fas fa-comment" />
        </Fab>
      </div>
    );
  }
}
export default ChatButton;
