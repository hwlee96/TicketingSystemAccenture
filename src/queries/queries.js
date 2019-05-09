import { gql } from "apollo-boost";

//Single Author Query
const getUserQuery = gql`
  query($id: ID) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      contactNumber
      accountType

      requests {
        id
        asset
        type
        subject
        dateRequested
        priority
        status
        assigned
        dateResolved
        dateClosed
        mainThread

        threads {
          id
          threadContent
          threadCreatedDate
        }
      }
    }
  }
`;

//Single Request Query
const getRequestQuery = gql`
  query($id: ID) {
    request(id: $id) {
      id
      asset
      type
      subject
      dateRequested
      priority
      status
      assigned
      dateResolved
      dateClosed
      mainThread

      user {
        id
        firstName
        lastName
        email
        contactNumber
        accountType
      }

      threads {
        id
        threadContent
        threadCreatedDate
        threadImage
      }
    }
  }
`;

//Single Thread Query
const getThreadQuery = gql`
  query($id: ID) {
    thread(id: $id) {
      id
      threadContent
      threadCreatedDate

      request {
        id
        asset
        type
        subject
        dateRequested
        priority
        status
        assigned
        dateResolved
        dateClosed
        mainThread

        user {
          id
          firstName
          lastName
          email
          contactNumber
          accountType
        }
      }
    }
  }
`;

//All Users Query
const getUsersQuery = gql`
  {
    users {
      id
      firstName
      lastName
      email
      contactNumber
      accountType
    }
  }
`;

//All Request Query
const getRequestsQuery = gql`
  {
    requests {
      id
      asset
      type
      subject
      dateRequested
      priority
      status
      assigned
      dateResolved
      dateClosed
      mainThread
      user {
        id
        firstName
        lastName
        email
        contactNumber
        accountType
      }
      threads {
        id
        threadContent
        threadCreatedDate
        threadImage
      }
    }
  }
`;

//All Threads Query
const getThreadsQuery = gql`
  {
    threads {
      id
      threadImage
      threadContent
      threadCreatedDate
    }
  }
`;

const addRequestMutation = gql`
  mutation(
    $asset: String!
    $type: String!
    $subject: String!
    $dateRequested: String!
    $priority: String!
    $status: String!
    $assigned: String!
    $dateResolved: String!
    $dateClosed: String!
    $mainThread: String!
    $requesterId: ID!
  ) {
    addRequest(
      asset: $asset
      type: $type
      subject: $subject
      dateRequested: $dateRequested
      priority: $priority
      status: $status
      assigned: $assigned
      dateResolved: $dateResolved
      dateClosed: $dateClosed
      mainThread: $mainThread
      requesterId: $requesterId
    ) {
      id
      asset
      type
      subject
      dateRequested
      priority
      status
      assigned
    }
  }
`;

const addThreadMutation = gql`
  mutation(
    $threadContent: String!
    $threadCreatedDate: String!
    $threadImage: String!
    $requestId: ID!
  ) {
    addThread(
      threadContent: $threadContent
      threadCreatedDate: $threadCreatedDate
      threadImage: $threadImage
      requestId: $requestId
    ) {
      id
      threadImage
      threadContent
      threadCreatedDate
    }
  }
`;

//  mutation deleteRequestMutation($id: ID!) { - the deleteRequestMutation is optional

const deleteRequestMutation = gql`
  mutation deleteRequestMutation($id: ID!) {
    deleteRequest(id: $id) {
      id
    }
  }
`;

const updateRequestStatusMutation = gql`
  mutation($id: ID!, $status: String!, $dateResolved: String!) {
    updateRequestStatus(id: $id, status: $status, dateResolved: $dateResolved) {
      id
      status
      dateResolved
    }
  }
`;

const updateRequestAssignedMutation = gql`
  mutation($id: ID!, $assigned: String!) {
    updateRequestAssigned(id: $id, assigned: $assigned) {
      id
      assigned
    }
  }
`;

const updateDateClosedMutation = gql`
  mutation($id: ID!, $dateClosed: String!, $status: String!) {
    updateDateClosed(id: $id, dateClosed: $dateClosed, status: $status) {
      id
      dateClosed
      status
    }
  }
`;

const updatePriorityMutation = gql`
  mutation($id: ID!, $priority: String!) {
    updatePriority(id: $id, priority: $priority) {
      id
      priority
    }
  }
`;

export {
  getThreadQuery,
  getThreadsQuery,
  addThreadMutation,
  getRequestQuery,
  getRequestsQuery,
  addRequestMutation,
  deleteRequestMutation,
  getUserQuery,
  getUsersQuery, //not used yet
  updateRequestStatusMutation,
  updateRequestAssignedMutation,
  updateDateClosedMutation,
  updatePriorityMutation
};
