import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";

import accentureIcon from "../Resources/Images/Acc_GT_Dimensional_Purple_RGB_REV.svg";
import profileIcon from "../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";

class NavBar extends React.Component {
  render() {
    return (
      <header className="header">
        <nav>
          <div className="row nav-bar">
            <div className="accenture-head">
              <img
                src={accentureIcon}
                className="accenture-logo"
                alt="Accenture"
              />
            </div>
            <p className="accenture-text">Accenture</p>
            <img
              src={profileIcon}
              className="user-user-icon"
              alt="profile-icon"
            />
            <ul className="main-nav">
              <li className="home-page">
                <Link to="/requests">All Tickets</Link>
              </li>
              <li className="create-ticket-page">
                <Link to="/createTicket">Create Ticket</Link>
              </li>
              <li>
                <Link to="/">Log Out</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default NavBar;
