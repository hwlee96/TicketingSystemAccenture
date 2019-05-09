import React, { Component } from "react";
import "../styles/App.css";

import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class DropdownCardSort extends Component {
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
    if (event.target !== null) {
      if (!this.dropdownMenu.contains(event.target)) {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener("click", this.closeMenu);
        });
      }
    }
  }

  render() {
    let pageId = window.location.pathname[1];
    // console.log(pageId);
    let isClient = pageId === "c";
    // console.log(isClient);
    return (
      <div className="sortComponent">
        <button
          onClick={this.showMenu}
          id="transparentButton"
          className="transparentButton-sortby"
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
            <ul className="dropdownListSort">
              <li className="buttonList">
                <button
                  value="Subject"
                  onClick={this.props.handleSortButton}
                  id="transparentButtonVer2"
                >
                  Subject
                </button>
              </li>
              <li className="buttonList">
                {isClient ? (
                  <button
                    value="Status"
                    onClick={this.props.handleSortButton}
                    id="transparentButtonVer2"
                  >
                    Status
                  </button>
                ) : (
                  <button
                    value="Name"
                    onClick={this.props.handleSortButton}
                    id="transparentButtonVer2"
                  >
                    Name
                  </button>
                )}
              </li>
              <li className="buttonList">
                <button
                  value="Priority"
                  onClick={this.props.handleSortButton}
                  id="transparentButtonVer2"
                >
                  Priority
                </button>
              </li>
              <li className="buttonList">
                <button
                  value="Asset"
                  onClick={this.props.handleSortButton}
                  id="transparentButtonVer2"
                >
                  Asset
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropdownCardSort;
