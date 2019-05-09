import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";

// import editIcon from "../Resources/Icons/iconfinder_compose_3671747.svg";
// import profileIcon from "../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";
import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

import TicketRow from "./TicketRow";
import NavBar from "./NavBar";
import CustomizedSnackbars from "./CustomizedSnackbars";
import CircularIndeterminate from "./CircularIndeterminate";
// import ChatButton from "./MyChat/ChatButton";
import DropdownCardSort from "./DropdownCardSort";
// import DropdownCardFilter from "./DropdownCardFilter";
import TicketRowFiltered from "./TicketRowFiltered";

import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import Select from "react-select";

import { graphql, compose } from "react-apollo";
import {
  getRequestQuery,
  getRequestsQuery,
  updateRequestStatusMutation,
  updateRequestAssignedMutation,
  updateDateClosedMutation,
  updatePriorityMutation
} from "../queries/queries";
import { Redirect } from "react-router-dom";

const assetOptions = [
  { value: "Aesop", label: "Aesop" },
  { value: "Ticketing", label: "Ticketing" },
  { value: "Travel Marketplace", label: "Travel Marketplace" },
  { value: "Smart Lock", label: "Smart Lock" },
  { value: "Video Analytics", label: "Video Analytics" },
  { value: "AR Gamification", label: "AR Gamification" }
];

const typeOptions = [
  { value: "Purchase", label: "Purchase" },
  { value: "Complaint", label: "Complaint" },
  { value: "Tech Support", label: "Tech Support" }
];

const priorityOptions = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" }
];

const assignedOptions = [
  { value: "Ben", label: "Ben" },
  { value: "Bertha", label: "Bertha" },
  { value: "Hangwee", label: "Hangwee" }
];

class TicketList extends React.Component {
  constructor() {
    super();
    this.state = {
      sortby: "Priority",
      redirect: false,
      // filterby: "No filter"

      //this is for sidebar
      isMenuOpened: false,
      selectedOption1: null,
      selectedOption2: null,
      selectedOption3: null,
      selectedOption4: null,
      // selectedOptionArr1: null,
      // selectedOptionArr2: null,
      // selectedOptionArr3: null,
      // selectedOptionArr4: null,

      //for checkboxes
      checkboxtoAdd: [],
      newAssigned: "",
      newStatus: "",

      filter: {
        asset: [],
        type: [],
        priority: [],
        assigned: []
      },

      filterReqId: [],

      filtered: false
    };

    this.myCallbackAddCheckbox = this.myCallbackAddCheckbox.bind(this); // checkbox
    this.updateMultiple = this.updateMultiple.bind(this); // checkbox
    this.myCallbackRemoveCheckbox = this.myCallbackRemoveCheckbox.bind(this); //checkbox
    this.filterRequests = this.filterRequests.bind(this); // filter
  }

  componentWillMount() {
    this.setState({
      isMenuOpened: false
    });
  }

  //start of sidebar

  handleClick = () => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  };

  handleDropdown1 = selectedOption1 => {
    let selectedOptionArr1 = [];
    this.setState({ selectedOption1 });
    // console.log(selectedOption);

    for (var i = 0; i < selectedOption1.length; i++) {
      let item = selectedOption1[i].value;
      selectedOptionArr1.push(item);
    }

    // console.log(selectedOptionArr);
    // this.setState({
    //   filter[asset]: selectedOptionArr1
    // });

    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        asset: selectedOptionArr1
      }
    }));
  };

  handleDropdown2 = selectedOption2 => {
    let selectedOptionArr2 = [];
    this.setState({ selectedOption2 });
    // console.log(selectedOption);

    for (var i = 0; i < selectedOption2.length; i++) {
      let item = selectedOption2[i].value;
      selectedOptionArr2.push(item);
    }

    // console.log(selectedOptionArr);
    // this.setState({ selectedOptionArr2 });
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        type: selectedOptionArr2
      }
    }));
  };

  handleDropdown3 = selectedOption3 => {
    let selectedOptionArr3 = [];
    this.setState({ selectedOption3 });
    // console.log(selectedOption);

    for (var i = 0; i < selectedOption3.length; i++) {
      let item = selectedOption3[i].value;
      selectedOptionArr3.push(item);
    }

    // console.log(selectedOptionArr);
    // this.setState({ selectedOptionArr3 });
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        priority: selectedOptionArr3
      }
    }));
  };

  handleDropdown4 = selectedOption4 => {
    let selectedOptionArr4 = [];
    this.setState({ selectedOption4 });
    // console.log(selectedOption);

    for (var i = 0; i < selectedOption4.length; i++) {
      let item = selectedOption4[i].value;
      selectedOptionArr4.push(item);
    }

    // console.log(selectedOptionArr);
    // this.setState({ selectedOptionArr4 });
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        assigned: selectedOptionArr4
      }
    }));
  };
  //end of sidebar

  handleSortButton = e => {
    const { value } = e.target;
    // console.log(value);
    this.setState({
      sortby: value
    });
  };

  // handleFilterButton = e => {
  //   const { value } = e.target;
  //
  //   //we remove this to change to sidebar
  //   // this.setState({
  //   //   filterby: value
  //   // });
  // };

  //add to test
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
  // console.log("testing");
  // console.log(checkIfMore7Days("2019-4-10 12:49:26"));

  displayRequests() {
    var data = this.props.getRequestsQuery;
    // console.log(data);
    if (!data.loading) {
      // console.log(data.requests);
      let dataArr = Object.values(data.requests);

      //here we sort.
      if (this.state.sortby === "Name") {
        dataArr.sort((a, b) =>
          a.user.firstName.toLowerCase() > b.user.firstName.toLowerCase()
            ? 1
            : b.user.firstName.toLowerCase() > a.user.firstName.toLowerCase()
            ? -1
            : 0
        );
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

      /*
      //here we filter - removed
      if (this.state.filterby === "Name: Derrick") {
        dataArr = dataArr.filter(val => {
          return val.user.firstName === "Derrick";
        });
      } else if (this.state.filterby === "Name: Joseph") {
        dataArr = dataArr.filter(val => {
          return val.user.firstName === "Joseph";
        });
      } else if (this.state.filterby === "Priority: High") {
        dataArr = dataArr.filter(val => {
          return val.priority === "High";
        });
      }

*/

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
          <TicketRow
            id={request.id}
            userFirstName={request.user.firstName}
            asset={request.asset}
            type={request.type}
            subject={request.subject}
            dateRequested={request.dateRequested}
            dateResolved={request.dateResolved}
            priority={request.priority}
            status={request.status}
            assigned={request.assigned}
            //mainThread={request.mainThread} //dont need this on ticketList page
            key={request.id}
            //here onwards for multicheckbox
            callbackFromParentAdd={this.myCallbackAddCheckbox}
            callbackFromParentRemove={this.myCallbackRemoveCheckbox}
            hideArrow={this.state.checkboxtoAdd.length !== 0}
          />
        );
      });
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  myCallbackAddCheckbox = checkboxtoAddFromChild => {
    // console.log(this.state.checkboxtoAdd);
    var newArray = [...this.state.checkboxtoAdd, checkboxtoAddFromChild]; // make a separate copy of the array
    this.setState({ checkboxtoAdd: newArray });
    // console.log(this.state.checkboxtoAdd);
  };

  myCallbackRemoveCheckbox = item => {
    var newArray = [...this.state.checkboxtoAdd]; // make a separate copy of the array
    // console.log(newArray);
    const index = newArray.indexOf(item); // Method to get item in list through comparison (IE: find some item with item.id), it has to return ITEM and INDEX in array
    // console.log(index);
    if (index !== -1) {
      newArray.splice(index, 1);
      this.setState({ checkboxtoAdd: newArray });
    }
    // console.log(this.state.checkboxtoAdd);
  };

  updateNewAssigned(i) {
    this.props.updateRequestAssignedMutation({
      variables: {
        id: this.state.checkboxtoAdd[i],
        assigned: this.state.newAssigned
      }
    });
  }

  updateStatusOtoR(i, date) {
    this.props.updateRequestStatusMutation({
      variables: {
        id: this.state.checkboxtoAdd[i],
        status: this.state.newStatus,
        dateResolved: date
      }
    });
  }

  updateMultiple = e => {
    // console.log("entering");
    // console.log(this.state.checkboxtoAdd);
    e.preventDefault();

    let today = new Date();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      time;

    var emptyDate = "";

    if (this.state.newStatus === "" && this.state.newAssigned === "") {
      //doNothing
    } else if (this.state.newStatus === "" && this.state.newAssigned !== "") {
      for (let i = 0; i < this.state.checkboxtoAdd.length; i++) {
        this.updateNewAssigned(i);
      }
    } else if (this.state.newStatus !== "" && this.state.newAssigned === "") {
      for (let i = 0; i < this.state.checkboxtoAdd.length; i++) {
        if (this.state.newStatus === "Resolved") {
          this.updateStatusOtoR(i, newDate);
        } else {
          this.updateStatusOtoR(i, emptyDate);
        }
      }
    } else {
      for (let i = 0; i < this.state.checkboxtoAdd.length; i++) {
        this.updateNewAssigned(i);
        if (this.state.newStatus === "Resolved") {
          this.updateStatusOtoR(i, newDate);
        } else {
          this.updateStatusOtoR(i, emptyDate);
        }
      }
    }

    this.setState({
      redirect: true
    });
  };

  filterRequests() {
    const { filter } = this.state;

    let arrls = [];
    for (var key in filter) {
      if (filter.hasOwnProperty(key)) {
        // console.log(filter[key]);
        arrls.push(...filter[key]);
      }
    }

    // console.log(arrls.length);

    if (arrls.length !== 0) {
      fetch(`http://127.0.0.1:4000/filter-requests?asset=${JSON.stringify(
        filter.asset
      )}
          &type=${JSON.stringify(filter.type)}&priority=${JSON.stringify(
        filter.priority
      )}
          &assigned=${JSON.stringify(filter.assigned)}`)
        .then(response => response.json())
        .then(data => {
          var filterReqIdArr = [];
          for (var i = 0; i < data.length; i++) {
            filterReqIdArr.push(data[i]._id);
          }
          this.setState({ filterReqId: filterReqIdArr });
        });

      this.setState({ filtered: true });
    } else {
      this.setState({ filtered: false });
    }
  }

  displayFilteredRequests() {
    var dataArr = this.state.filterReqId;
    if (dataArr.toString() === "") {
      return <div />;
    } else {
      return dataArr.map(request => {
        return (
          <TicketRowFiltered
            id={request}
            key={request}
            hideArrow={this.state.checkboxtoAdd.length !== 0}
          />
        );
      });
    }
  }

  render() {
    // console.log(this.state.filter);
    let showFilterSortButtons = this.state.checkboxtoAdd.length === 0;
    // console.log(showFilterSortButtons);
    const { selectedOption1 } = this.state;
    const { selectedOption2 } = this.state;
    const { selectedOption3 } = this.state;
    const { selectedOption4 } = this.state;

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

    var showSnackbarMult = false;
    if (typeof this.props.location.state !== "undefined") {
      if (this.props.location.state.multUpdate) {
        showSnackbarMult = true;
      }
    }

    let loading = true;
    if (!this.props.getRequestsQuery.loading) {
      loading = false;
    }

    if (this.state.redirect) {
      setTimeout(function() {
        window.location.reload();
      }, 500);
      return (
        <Redirect
          to={{
            pathname: "/requests",
            state: { multUpdate: true }
          }}
        />
      );
    }

    return (
      <div>
        <NavBar />
        {/* <ChatButton author="admin" /> */}

        {showSnackbarDelete ? (
          <CustomizedSnackbars message="Request successfully deleted" />
        ) : null}

        {showSnackbarCreate ? (
          <CustomizedSnackbars message="Request successfully created" />
        ) : null}

        {showSnackbarMult ? (
          <CustomizedSnackbars message="Multiple requests updated" />
        ) : null}
        <OffCanvas
          width={350}
          transitionDuration={300}
          effect={"push"}
          isMenuOpened={this.state.isMenuOpened}
          position={"left"}
        >
          <OffCanvasMenu className="canvasMenu">
            <button
              onClick={this.handleClick.bind(this)}
              id="transparentButton"
            >
              {/* <img src={arrow} className="arrow-right" alt="arrow" /> */}X
            </button>
            <br />
            <br />
            <br />
            Asset:
            <Select
              value={selectedOption1}
              onChange={this.handleDropdown1}
              options={assetOptions}
              isMulti={true}
            />
            <br />
            <br />
            Type:
            <Select
              value={selectedOption2}
              onChange={this.handleDropdown2}
              options={typeOptions}
              isMulti={true}
            />
            <br />
            <br />
            Priority:
            <Select
              value={selectedOption3}
              onChange={this.handleDropdown3}
              options={priorityOptions}
              isMulti={true}
            />
            <br />
            <br />
            Assigned:
            <Select
              value={selectedOption4}
              onChange={this.handleDropdown4}
              options={assignedOptions}
              isMulti={true}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button
              className="sidebarFilterButton"
              onClick={this.filterRequests}
            >
              Filter
            </button>
          </OffCanvasMenu>
        </OffCanvas>

        <section className="current-tickets">
          {showFilterSortButtons ? (
            <div className="filter-text">
              <span>
                Filter by: {this.state.filterby}
                {/* <img src={arrow} className="arrow-right" alt="arrow" /> */}
                {/* <DropdownCardFilter
                    handleFilterButton={this.handleFilterButton}
                /> */}
                <button
                  onClick={this.handleClick.bind(this)}
                  id="transparentButton"
                  className="transparentButton-status"
                  //hide button
                >
                  <img src={arrow} className="arrow-right" alt="arrow" />
                </button>
              </span>
            </div>
          ) : null}
          {showFilterSortButtons ? (
            <div className="sort-by-text">
              <span>
                Sort by: {this.state.sortby}
                {/* <img src={arrow} className="arrow-down-datereq" alt="arrow" /> */}
                <DropdownCardSort handleSortButton={this.handleSortButton} />
              </span>
            </div>
          ) : null}

          {/* CHECKBOX COMPONENT STARTS FROM HERE */}
          {this.state.checkboxtoAdd.length !== 0 ? (
            <div className="popup">
              <form>
                <div className="status-filter">
                  <div className="status-filter-text">
                    <label>Status</label>
                  </div>
                </div>
                <select
                  className="selectOptionCheckbox"
                  onChange={e => this.setState({ newStatus: e.target.value })}
                >
                  <option>-No Change-</option>
                  <option>Open</option>
                  <option>Resolved</option>
                </select>

                <div className="assigned-filter">
                  <div className="assigned-filter-text">
                    <label>Assigned</label>
                  </div>
                </div>

                <select
                  className="selectOptionCheckbox"
                  onChange={e => this.setState({ newAssigned: e.target.value })}
                >
                  <option>-No Change-</option>
                  <option>Benjamin</option>
                  <option>Kenneth</option>
                  <option>Hang Wee</option>
                  <option>Bertha</option>
                </select>

                <button
                  className="updateButtonForm"
                  onClick={this.updateMultiple}
                >
                  UPDATE
                </button>
              </form>
            </div>
          ) : null}
          {/* HTML ENDS  HERE */}

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
            <div className="col span-1-of-10">
              <h4 className="detail" id="detailHeading">
                <b>Requester</b>
              </h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="detail" id="detailHeading">
                <b>Asset(s)</b>
              </h4>
            </div>
            <div className="col span-1-of-5" id="subject">
              <h4 className="detail" id="detailHeading">
                <b>Subject</b>
              </h4>
            </div>
            <div className="col span-1-of-6">
              <h4 className="detail" id="detailHeading">
                <b>Date/Time Requested</b>
              </h4>
            </div>
            <div className="col span-1-of-6">
              <h4 className="detail" id="detailHeading">
                <b>Date/Time Resolved</b>
              </h4>
            </div>
            <div className="col span-1-of-10">
              <h4 className="detail" id="detailHeading">
                <b>Priority</b>
              </h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="detail" id="detailHeading">
                <b>Status</b>
              </h4>
            </div>
            <div className="col span-1-of-8">
              <h4 className="detail" id="detailHeading">
                <b>Assigned To</b>
              </h4>
            </div>
          </div>
          {/*end of bar, here we start displaying the data*/}
          {loading ? (
            <div className="CircularIndeterminate">
              <CircularIndeterminate />
            </div>
          ) : null}

          {this.state.filtered
            ? this.displayFilteredRequests()
            : this.displayRequests()}
        </section>
      </div>
    );
  }
}

export default compose(
  graphql(getRequestsQuery, { name: "getRequestsQuery" }),
  graphql(updateRequestStatusMutation, { name: "updateRequestStatusMutation" }),
  graphql(updateRequestAssignedMutation, {
    name: "updateRequestAssignedMutation"
  }),
  graphql(getRequestQuery, { name: "getRequestQuery" }),
  graphql(updateDateClosedMutation, { name: "updateDateClosedMutation" }),
  graphql(updatePriorityMutation, { name: "updatePriorityMutation" })
)(TicketList);
