import React from "react";

class AdminText extends React.Component {
  render() {
    return (
      <div className="messageplusdateadmin">
        <div className="adminmessage">
          <p className="adminchattext">{this.props.text}</p>
        </div>
        <div className="timeofmessageadmin">
          <p className="timeofmessagetext">{this.props.time}</p>
        </div>
      </div>
    );
  }
}

export default AdminText;
