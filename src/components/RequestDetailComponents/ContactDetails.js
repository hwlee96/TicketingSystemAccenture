import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/RequestDetail.css";
// import { getRequestQuery, getUserQuery } from "../../queries/queries";
// import { graphql } from "react-apollo";
// import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

// import { Link } from "react-router-dom";

class ContactDetails extends React.Component {
  displayContactDetails() {
    // console.log("CONTACT DETAILS");
    // console.log(this.props);

    return (
      <div className="contact-details">
        <h2 className="small-heading contact-property">Contact Details</h2>
        {/* <img src={arrow} className="arrow-up-new" alt="arrow" /> */}

        <h5 className="type-of-details">
          <b>Requester</b>
        </h5>
        <p className="detail-req">
          {this.props.firstName} {this.props.lastName}
        </p>

        <h5 className="type-of-details">
          <b>Email</b>
        </h5>
        <p className="detail-req">{this.props.email}</p>

        <h5 className="type-of-details">
          <b>Mobile Number</b>
        </h5>
        <p className="detail-req">{this.props.contactNumber}</p>

        <h5 className="type-of-details">
          <b>Company</b>
        </h5>
        <p className="detail-req">JP Morgan</p>
        {/* edit this */}

        <h5 className="type-of-details">
          <b>Account Type</b>
        </h5>
        <p className="detail-req">{this.props.accountType}</p>
      </div>
    );
    /*
      } else {
        return (
          <div>No book selected...</div>
        )
      }*/
  }

  componentDidMount() {
    this.setState({
      id: this.props.id
    });
  }

  render() {
    return (
      <div className="combined-contact-past-ticket-details">
        {this.displayContactDetails()}
      </div>
    );
  }
}

export default ContactDetails;
