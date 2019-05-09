import React, { Component } from "react";
import TicketList from "./components/TicketList";
import LoginPage from "./components/LoginPage";
import RequestDetail from "./components/RequestDetail";
// import NavBar from "./components/NavBar";
import CreateTicket from "./components/CreateTicket";
import ClientTicketList from "./components/ClientComponents/ClientTicketList";
import ClientCreateTicket from "./components/ClientComponents/ClientCreateTicket";
import ClientRequestDetail from "./components/ClientComponents/ClientRequestDetail";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PhotoGrid from "./components/firebase/PhotoGrid";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuth: false,
      updatedTicket: false,
      createdTicket: false,
      deletedTicket: false
    };
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth() {
    if (this.state.isAuth) {
      this.setState({
        isAuth: false
      });
    } else {
      this.setState({
        isAuth: true
      });
    }
  }

  render() {
    // let navHeader = this.state.isAuth ? <NavBar /> : "";
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/requests" component={TicketList} />
            <Route
              exact
              path="/"
              render={props => (
                <LoginPage {...props} handleAuth={this.handleAuth} />
              )}
            />
            <Route exact path="/createTicket" component={CreateTicket} />
            <Route exact path="/requestDetail/:id" component={RequestDetail} />

            <Route exact path="/crequests" component={ClientTicketList} />
            <Route exact path="/ccreateTicket" component={ClientCreateTicket} />
            <Route
              exact
              path="/crequestDetail/:id"
              component={ClientRequestDetail}
            />

            <Route exact path="/allImages/:id/:id" component={PhotoGrid} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
