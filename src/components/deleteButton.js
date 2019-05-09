import React from "react";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";

import { getRequestsQuery, deleteRequestMutation } from "../queries/queries";

class deleteButton extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    this.setState({
      redirect: true
    });
  }

  render() {
    if (this.state.redirect) {
      // return <Redirect to="/requests" />;
      return (
        <Redirect
          to={{
            pathname: "/requests",
            state: { deletedTicket: true }
          }}
        />
      );
    }

    let id = this.props.id;
    return (
      <Mutation
        mutation={deleteRequestMutation}
        update={(cache, { data: { deleteRequest } }) => {
          const { requests } = cache.readQuery({ query: getRequestsQuery });
          cache.writeQuery({
            query: getRequestsQuery,
            data: { requests: requests.filter(e => e.id !== id) }
          });
        }}
      >
        {(deleteRequest, { data }) => (
          <button
            style={this.props.style}
            onClick={e => {
              deleteRequest({
                variables: {
                  id
                }
              });
              this.handleRedirect();
            }}
          >
            Delete
          </button>
        )}
      </Mutation>
    );
  }
}

export default deleteButton;
