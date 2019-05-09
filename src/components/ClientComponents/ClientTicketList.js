import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/ClientTicketList.css";

// import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

import ClientTicketRow from "./ClientTicketRow";
import CNavBar from "./CNavBar";
import CustomizedSnackbars from "../CustomizedSnackbars";
import CircularIndeterminate from "../CircularIndeterminate";
// import ChatButton from "../MyChat/ChatButton";

import DropdownCardSort from "../DropdownCardSort";
import DropdownCardFilter from "../DropdownCardFilter";

import { graphql, compose } from "react-apollo";
import {
  getRequestsQuery,
  updateRequestStatusMutation,
  updateDateClosedMutation,
  updatePriorityMutation
} from "../../queries/queries";

class ClientTicketList extends React.Component {
  constructor() {
    super();
    this.state = {
      checkboxAll: false,
      sortby: "Priority",
      filterby: "No filter"
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleSortButton = e => {
    const { value } = e.target;
    // console.log(value);
    this.setState({
      sortby: value
    });
  };

  handleFilterButton = e => {
    const { value } = e.target;
    // console.log(value);
    this.setState({
      filterby: value
    });
  };

  checkIfMore7Days = a => {
    let todayDate = new Date();

    let temp = a.split("-"); // 0 returns year, 1 returns month
    let temp2 = temp[2].split(" "); //0 returns date

    // console.log(today.getFullYear() >= temp[0]);
    // console.log(today.getMonth() + 1 >= temp[1]);
    // console.log(today.getDate() - 7 >= temp2[0]);
    let dateStr = (temp[1] + "/" + temp2[0] + "/" + temp[0]).toString();
    let oldDate = new Date(dateStr);
    // console.log(oldDate);

    let timeDiff = todayDate.getTime() - oldDate.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays >= 7;
  };

  checkIfMore4Days = a => {
    let todayDate = new Date();

    let temp = a.split("-"); // 0 returns year, 1 returns month
    let temp2 = temp[2].split(" "); //0 returns date

    // console.log(today.getFullYear() >= temp[0]);
    // console.log(today.getMonth() + 1 >= temp[1]);
    // console.log(today.getDate() - 7 >= temp2[0]);
    let dateStr = (temp[1] + "/" + temp2[0] + "/" + temp[0]).toString();
    let oldDate = new Date(dateStr);
    // console.log(oldDate);

    let timeDiff = todayDate.getTime() - oldDate.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays >= 4;
  };

  displayRequests() {
    var data = this.props.getRequestsQuery;
    if (!data.loading) {
      let dataArr = Object.values(data.requests);

      // console.log(dataArr);
      //only show for joseph, may change this
      dataArr = dataArr.filter(request => {
        return request.user.firstName.toLowerCase() === "joseph";
      });

      //here we sort.
      if (this.state.sortby === "Status") {
        dataArr.sort((a, b) => {
          if (a.status === "Open") {
            return -1;
          } else if (a.status === "Resolved") {
            return 1;
          } else if (a.status === "Closed") {
            return 0;
          }
          return 0;
        });
      } else if (this.state.sortby === "Priority") {
        dataArr.sort((a, b) => {
          if (a.priority === "High") {
            return -1;
          }
          if (a.priority === "Low") {
            return 1;
          }
          return 0;
        });
      } else if (this.state.sortby === "Subject") {
        dataArr.sort((a, b) =>
          a.subject.toLowerCase() > b.subject.toLowerCase()
            ? 1
            : b.subject.toLowerCase() > a.subject.toLowerCase()
            ? -1
            : 0
        );
      } else if (this.state.sortby === "Asset") {
        dataArr.sort((a, b) =>
          a.asset.toLowerCase() > b.asset.toLowerCase()
            ? 1
            : b.asset.toLowerCase() > a.asset.toLowerCase()
            ? -1
            : 0
        );
      }

      //here we filter
      if (this.state.filterby === "Status: Open") {
        dataArr = dataArr.filter(val => {
          return val.status === "Open";
        });
      } else if (this.state.filterby === "Status: Resolved") {
        dataArr = dataArr.filter(val => {
          return val.status === "Resolved";
        });
      } else if (this.state.filterby === "Status: Closed") {
        dataArr = dataArr.filter(val => {
          return val.status === "Closed";
        });
      }

      //here we check if any requests has been resolved but unclosed for a week
      let checkArr = dataArr.filter(a => {
        if (a.dateResolved !== "") {
          return (
            this.checkIfMore7Days(a.dateResolved) && a.status === "Resolved"
          );
        }

        return 0;
      });

      // console.log("old unresolved requests are");
      // console.log(checkArr);
      // console.log(checkArr.length);

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

      if (checkArr.length !== 0) {
        checkArr.map(a => {
          this.props.updateDateClosedMutation({
            variables: {
              id: a.id,
              dateClosed: date,
              status: "Closed"
            }
          });

          //these are for sms fnc
          fetch(
            `/api/messages?content=${"Resolved requests older than 7 days have been closed"}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.state.message)
            }
          ).then(res => res.json());

          return 0;
        });
      }

      //here we check if any requests has been opened for more than 7 days, then we change their priority
      let checkArr2 = dataArr.filter(a => {
        return (
          this.checkIfMore7Days(a.dateRequested) &&
          a.status === "Open" &&
          a.priority !== "High"
        );
      });

      // console.log(
      //   "old unresolved requests that should become high priority are"
      // );
      // console.log(checkArr2);
      // console.log(checkArr2.length);

      if (checkArr2.length !== 0) {
        checkArr2.map(a => {
          this.props.updatePriorityMutation({
            variables: {
              id: a.id,
              priority: "High"
            }
          });

          //these are for sms fnc
          fetch(
            `/api/messages?content=${"Open requests older than 7 days have been changed to high priority"}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.state.message)
            }
          ).then(res => res.json());

          return 0;
        });
      }

      //here we check if any requests has been opened for more than 4 days, then we change their priority to MEDIUM
      let checkArr3 = dataArr.filter(a => {
        return (
          this.checkIfMore4Days(a.dateRequested) &&
          a.status === "Open" &&
          a.priority === "Low"
        );
      });

      // console.log(
      //   "old unresolved requests that should become high priority are"
      // );
      // console.log(checkArr2);
      // console.log(checkArr2.length);

      if (checkArr3.length !== 0) {
        checkArr3.map(a => {
          this.props.updatePriorityMutation({
            variables: {
              id: a.id,
              priority: "Medium"
            }
          });

          //these are for sms fnc
          fetch(
            `/api/messages?content=${"Requests with low priority older than 4 days have been changed to medium priority"}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.state.message)
            }
          ).then(res => res.json());

          return 0;
        });
      }

      //end of update priority

      return dataArr.map(request => {
        return (
          <ClientTicketRow
            id={request.id}
            userFirstName={request.user.firstName}
            asset={request.asset}
            type={request.type}
            subject={request.subject}
            dateRequested={request.dateRequested}
            dateResolved={request.dateResolved}
            dateClosed={request.dateClosed}
            priority={request.priority}
            status={request.status}
            assigned={request.assigned}
            key={request.id}
          />
        );
      });
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  handleClick = () => {
    console.log("clicked some button, go to next webpage");
  };

  handleCheckbox = event => {
    console.log("clicked checkbox");
    // const { name, value, type, checked } = event.target;
    const { name, checked } = event.target;

    if (name === "checkboxAll") {
      this.setState({
        [name]: checked
      });
    }
  };

  render() {
    var showSnackbarCreate = false;
    if (typeof this.props.location.state !== "undefined") {
      if (this.props.location.state.createdTicket) {
        showSnackbarCreate = true;
      }
    }

    var showSnackbarDelete = false;
    if (typeof this.props.location.state !== "undefined") {
      if (this.props.location.state.deletedTicket) {
        showSnackbarDelete = true;
      }
    }

    let loading = true;
    if (!this.props.getRequestsQuery.loading) {
      loading = false;
    }

    return (
      <div>
        <CNavBar />
        {/* <ChatButton author="client" /> */}
        
        {showSnackbarDelete ? (
          <CustomizedSnackbars message="Request successfully deleted" />
        ) : null}

        {showSnackbarCreate ? (
          <CustomizedSnackbars message="Request successfully created" />
        ) : null}

        <section className="current-tickets">
          <div className="filter-text">
            <span>
              Filter by: {this.state.filterby}
              {/* <img src={arrow} className="arrow-right" alt="arrow" /> */}
              <DropdownCardFilter
                handleFilterButton={this.handleFilterButton}
              />
            </span>
          </div>
          <div className="sort-by-text">
            <span>
              Sort by: {this.state.sortby}
              {/* <img src={arrow} className="arrow-down-datereq" alt="arrow" /> */}
              <DropdownCardSort handleSortButton={this.handleSortButton} />
            </span>
          </div>
          <div className="filter-box request-list-header">
            <div className="col span-1-of-12">
              <input
                className="checkboxAll"
                type="checkbox"
                name="checkboxAll"
                checked={this.state.checkboxAll}
                onChange={this.handleCheckbox}
              />
            </div>
            <div className="col span-1-of-9">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Asset(s)</b>
              </h4>
            </div>
            <div className="col span-1-of-5">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Subject</b>
              </h4>
            </div>
            <div className="col span-1-of-7">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Date/Time Requested</b>
              </h4>
            </div>
            <div className="col span-1-of-7">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Date/Time Resolved</b>
              </h4>
            </div>
            <div className="col span-1-of-7">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Date/Time Closed</b>
              </h4>
            </div>
            <div className="col span-1-of-8">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Status</b>
              </h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Close Request?</b>
              </h4>
            </div>
          </div>
          {/*end of bar, here we start displaying the data*/}
          {loading ? (
            <div className="CircularIndeterminate">
              <CircularIndeterminate />
            </div>
          ) : null}

          {this.displayRequests()}
        </section>
      </div>
    );
  }
}

export default compose(
  graphql(getRequestsQuery, { name: "getRequestsQuery" }),
  graphql(updateRequestStatusMutation, { name: "updateRequestStatusMutation" }),
  graphql(updateDateClosedMutation, { name: "updateDateClosedMutation" }),
  graphql(updatePriorityMutation, { name: "updatePriorityMutation" })
)(ClientTicketList);
