import React from "react";
import firebase from "firebase/app";
import "./MyChat.css";
import MeText from "./MeText";
import AdminText from "./AdminText";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 80,
  left: "auto",
  position: "fixed"
};

class MyChat extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: "",
      messages: []
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref(`messages/${this.props.requestID}/`)
      .on("value", snapshot => {
        const currentMessages = snapshot.val();
        if (currentMessages != null) {
          this.setState({
            messages: currentMessages
          });
        }
      });
  }

  updateMessage(e) {
    this.setState({ message: e.target.value });
  }
  submitMessage(e) {
    e.preventDefault();

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    this.setState({ message: "" }); //clear the input
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message,
      author: this.props.author,
      time: dateTime
    };
    // let list = Object.assign([], this.state.messages);
    // list.push(nextMessage);
    //
    // this.setState({ messages: list });

    firebase
      .database()
      .ref(`messages/${this.props.requestID}/` + nextMessage.id)
      .set(nextMessage);
  }

  render() {
    const currentMessage = this.state.messages.map((message, i) => {
      if (this.props.author === "client") {
        if (message.author !== "admin") {
          // sent by me
          return (
            <MeText text={message.text} time={message.time} key={message.id} />
          );
        } else {
          return (
            <AdminText
              text={message.text}
              time={message.time}
              key={message.id}
            />
          );
        }
      } else {
        if (message.author !== "admin") {
          // sent by me
          return (
            <AdminText
              text={message.text}
              time={message.time}
              key={message.id}
            />
          );
        } else {
          return (
            <MeText text={message.text} time={message.time} key={message.id} />
          );
        }
      }
    });
    return (
      <div style={style}>
        {/* {this.props.author === "joseph" ? (
          <h3>Ben (Admin)</h3>
          ) : (
          <h3>Joseph</h3>
        )} */}

        {/* chat history starts here */}
        <div className="chatbox">
          <div className="chatboxheading">
            <h1 className="chatboxtextheading">Chat Support</h1>
          </div>

          <div className="chatboxbody internal-scrolling-chat">
            {currentMessage}

            <div className="clearchat" />
          </div>

          <form onSubmit={this.submitMessage}>
            <div className="reply-box">
              <button type="submit" className="sendbutton">
                Send
              </button>
              <div className="typemessageherebox">
                <textarea
                  rows="4"
                  cols="35"
                  className="textarea"
                  placeholder="Type your message here..."
                  onChange={this.updateMessage}
                  value={this.state.message}
                />
              </div>
            </div>
          </form>
        </div>
        {/* chat history ends here */}
      </div>
    );
  }
}

export default MyChat;
