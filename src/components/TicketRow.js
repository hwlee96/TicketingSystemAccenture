import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";
import DropdownCardStatus from "./DropdownCardStatus";
import DropdownCardAssigned from "./DropdownCardAssigned";

import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

import { Link } from "react-router-dom";

class TicketRow extends React.Component {
  constructor() {
    super();
    this.state = {
      checkbox: false,
      id: null
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.id
    });
  }

  //4. CHECKBOX START
  handleCheckbox = event => {
    // console.log("clicked checkbox");
    if (this.state.checkbox === true) {
      // console.log("checkbox2 before");
      // console.log(this.state.checkbox);

      this.setState({ checkbox: false });
      // console.log("checkbox2 after");

      this.props.callbackFromParentRemove(this.props.id);
    } else {
      // console.log("checkbox1 before");
      // console.log(this.state.checkbox);

      this.setState({ checkbox: true });
      // console.log("checkbox1 after");
      // console.log(this.state.checkbox);

      this.props.callbackFromParentAdd(this.props.id);
    }
  };

  uncheckAllCheckboxes() {
    // console.log("testinggggg");
    // console.log(this.state.checkbox);
    // console.log(this.props.asset);

    if (this.state.checkbox === true) {
      // console.log(this.props.asset);

      this.setState({ checkbox: false });
    }
    // console.log(this.state.checkbox);
  }

  //4. END

  // handleCheckbox = event => {
  //   const { name, checked } = event.target;
  //   console.log("clicked checkbox");
  //   this.setState({
  //     [name]: checked
  //   });
  // };

  render() {
    let linkStr = "requestDetail/" + this.props.id;
    let closedBool = this.props.status === "Closed";

    let name = closedBool ? "detail grey" : "detail";

    return (
      <div className="filter-box-2">
        <div className="col span-1-of-12">
          <input
            className="indiv-checkbox rows-checkboxNeed"
            type="checkbox"
            name="checkbox"
            checked={this.state.checkbox}
            onChange={this.handleCheckbox}
          />
        </div>
        <div className="col span-1-of-10">
          <h4 className={name}>{this.props.userFirstName}</h4> {/*John Tan*/}
        </div>
        <div className="col span-1-of-9">
          <h4 className={name}>{this.props.asset}</h4> {/*Login API*/}
        </div>
        <div className="col span-1-of-5">
          <Link to={linkStr} className="subjectLink" id="subject">
            <h4 id="subjectLinkHover" className={name}>
              {this.props.type}: {this.props.subject}
            </h4>
          </Link>
          {/*Enquiry about API => we make this one a link*/}
        </div>
        <div className="col span-1-of-6">
          <h4 className={name}>{this.props.dateRequested}</h4>
          {/*12 January 2019 12:00:00*/}
        </div>
        <div className="col span-1-of-6">
          <h4 className={name}>{this.props.dateResolved}</h4>
        </div>

        <div className="col span-1-of-10">
          <h4 className={name}>{this.props.priority}</h4> {/*High*/}
        </div>
        <div className="col span-1-of-9" id="status">
          <h4 className={name}>{this.props.status}</h4>
        </div>

        {/* <div className="statusArrow">
          <DropdownCardStatus idd={this.props.id} isCLient="false" />
        </div> */}

        {closedBool || this.props.hideArrow ? (
          <div className="adminStatusArrowInvisible">
            <p id="transparentButton" className="transparentButton-status">
              <img src={arrow} className="arrow-down-2" alt="arrow" />
            </p>
          </div>
        ) : (
          <div className="statusArrow">
            <DropdownCardStatus idd={this.props.id} isClient="false" />
          </div>
        )}

        <div className="col span-1-of-8" id="assignedTo">
          <h4 className={name}>{this.props.assigned}</h4>
        </div>

        {this.props.hideArrow ? (
          <div className="adminStatusArrowInvisible">
            <p id="transparentButton" className="transparentButton-status">
              <img src={arrow} className="arrow-down-2" alt="arrow" />
            </p>
          </div>
        ) : (
          <div className="assignedToArrow">
            <DropdownCardAssigned idd={this.props.id} />
          </div>
        )}

        {/* <div className="assignedToArrow">
          <DropdownCardAssigned idd={this.props.id} />
        </div> */}
      </div>
    );
  }
}

export default TicketRow;
