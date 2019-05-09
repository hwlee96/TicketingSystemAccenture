import React, { Component } from "react";
import "../styles/App.css";

import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class DropdownCardFilter extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  render() {
    let pageId = window.location.pathname[1];
    // console.log(pageId);
    let isClient = pageId === "c";
    // console.log(isClient);

    return (
      <div className="filterComponent">
        <button
          onClick={this.showMenu}
          id="transparentButton"
          className="transparentButton-status"
        >
          <img src={arrow} className="arrow-down-2" alt="arrow" />
        </button>

        {this.state.showMenu ? (
          <div
            className="menu"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <ul className="dropdownListFilter">
              <li className="buttonList">
                {isClient ? (
                  <button
                    value="Status: Open"
                    onClick={this.props.handleFilterButton}
                    id="transparentButtonVer2"
                  >
                    Status: Open
                  </button>
                ) : (
                  <button
                    value="Name: Derrick"
                    onClick={this.props.handleFilterButton}
                    id="transparentButtonVer2"
                  >
                    Name: Derrick
                  </button>
                )}
              </li>
              <li className="buttonList">
                {isClient ? (
                  <button
                    value="Status: Resolved"
                    onClick={this.props.handleFilterButton}
                    id="transparentButtonVer2"
                  >
                    Status: Resolved
                  </button>
                ) : (
                  <button
                    value="Name: Joseph"
                    onClick={this.props.handleFilterButton}
                    id="transparentButtonVer2"
                  >
                    Name: Joseph
                  </button>
                )}
              </li>
              <li className="buttonList">
                {isClient ? (
                  <button
                    value="Status: Closed"
                    onClick={this.props.handleFilterButton}
                    id="transparentButtonVer2"
                  >
                    Status: Closed
                  </button>
                ) : (
                  <button
                    value="Priority: High"
                    onClick={this.props.handleFilterButton}
                    id="transparentButtonVer2"
                  >
                    Priority: High
                  </button>
                )}
              </li>
              <li className="buttonList">
                <button
                  value="No filter"
                  onClick={this.props.handleFilterButton}
                  id="transparentButtonVer2"
                >
                  No filter
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropdownCardFilter;
