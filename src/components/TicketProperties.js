import React from "react";
import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class TicketProperties extends React.Component {
  render() {
    // console.log(this.props);

    let allImgLinkUrl =
      "/allImages/" + this.props.userID + "/" + this.props.subject;
    // console.log(allImgLinkUrl);

    let pageId = window.location.pathname[1];
    // console.log(pageId);
    let isClient = pageId === "c";

    return (
      <div className="properties">
        <h2 className="small-heading contact-property">Ticket Properties</h2>
        {/* <img src={arrow} className="arrow-up-new" alt="arrow" /> */}
        <div className="grid-row">
          {this.props.allImgLink ? (
            <a className="url-bottom-left" href={allImgLinkUrl}>
              View All Attached Image
            </a>
          ) : null}

          <p className="property">
            <b>Ticket ID</b>
          </p>
          <p className="propertyNormalWords">{this.props.id}</p>
          <p className="property">
            <b>Asset(s)</b>
          </p>
          <p className="propertyNormalWords">{this.props.asset}</p>
          <p className="property">
            <b>Type</b>
          </p>
          <p className="propertyNormalWords">{this.props.type}</p>

          {isClient ? null : (
            <div>
              <p className="property">
                <b>Priority</b>
              </p>
              <p className="propertyNormalWords">{this.props.priority}</p>

              <div className="special-property">
                <p>
                  <b>Assigned</b>
                </p>
                <p className="propertyArrowWords">
                  <img src={arrow} className="arrow-down" alt="arrow" />
                  {this.props.assigned}
                </p>
              </div>
            </div>
          )}

          <div className="special-property">
            <p>
              <b>Status</b>
            </p>
            <p className="propertyArrowWords">
              <img src={arrow} className="arrow-down" alt="arrow" />
              {this.props.status}
            </p>
          </div>
          <p className="property">
            <b>Date/Time Requested</b>
          </p>
          <p className="propertyNormalWords">{this.props.dateRequested}</p>
          <p className="property">
            <b>Date/Time Resolved</b>
          </p>
          <p className="propertyNormalWords">{this.props.dateResolved}</p>
          <p className="property">
            <b>Date/Time Closed</b>
          </p>
          <p className="propertyNormalWords">{this.props.dateClosed}</p>
        </div>
      </div>
    );
  }
}

export default TicketProperties;
