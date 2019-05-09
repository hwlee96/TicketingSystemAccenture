import React from "react";
import "../styles/LoginPage.css";
import aLogo from "../Resources/Icons/aLogo.svg";

import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: false,
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = e => {
    // {name,value} = e.target;
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    // {name,value} = e.target;
    if (
      (this.state.username === "benjamin" ||
        this.state.username === "joseph") &&
      this.state.password === "password"
    ) {
      //here i will change the isAuth state
      this.props.handleAuth();

      //redirect page
      this.setState({
        redirect: true
      });
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    if (this.state.redirect) {
      if (this.state.username === "joseph") {
        return <Redirect to="/crequests" />;
      }
      return <Redirect to="/requests" />;
    }

    let errorText;
    this.state.error
      ? (errorText = "Username or password is wrong, please try again")
      : (errorText = "");
    return (
      <div className="loginbody">
        <div className="login-page">
          <div className="form">
            <img
              src={aLogo}
              alt="accenture icon"
              className="accenture-logo-login"
            />
            <p className="accenture-text-login">Accenture Requests Assistant</p>

            <form className="register-form">
              <input type="text" placeholder="name" />
              <input type="password" placeholder="password" />
              <input type="text" placeholder="email address" />
              <button>create</button>
              <p className="message">
                Already registered? <a href="#">Sign In</a>
              </p>
            </form>
            <form className="login-form" onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Username"
                id="username-jest" //added for jest
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <input
                type="password"
                id="password-jest" //added for jest
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <p className="error-text">{errorText}</p>
              <button>login</button>
              <p className="message">
                Not registered? <a href="#">Create an account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
