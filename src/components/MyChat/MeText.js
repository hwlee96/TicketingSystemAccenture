import React from "react";

class MeText extends React.Component {
  render() {
    return (
      <div className="messageplusdateclient">
        <div className="clientmessage firstclientmessage">
          <p className="clientchattext">{this.props.text}</p>
        </div>
        <div className="timeofmessageclient">
          <p className="timeofmessagetext">{this.props.time}</p>
        </div>
      </div>
    );
  }
}

export default MeText;
