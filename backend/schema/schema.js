const graphql = require("graphql");
const _ = require("lodash");

//All mongodb models imported from models file
const Request = require("../models/requests");
const User = require("../models/users");
const Thread = require("../models/threads");

//real time fnc - not used yet
// const { PubSub } = require("graphql-subscriptions");
// const pubsub = new PubSub();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

//Defining User Type  - works
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    contactNumber: { type: GraphQLInt },
    accountType: { type: GraphQLString },
    requests: {
      type: new GraphQLList(RequestType),
      resolve(parent, args) {
        return Request.find({ requesterId: parent.id });
      }
    }
  })
});

const RequestType = new GraphQLObjectType({
  name: "Request",
  fields: () => ({
    id: { type: GraphQLID },
    // requester: { type: GraphQLString },
    asset: { type: GraphQLString },
    type: { type: GraphQLString },
    subject: { type: GraphQLString },
    dateRequested: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
    assigned: { type: GraphQLString },
    dateResolved: { type: GraphQLString },
    dateClosed: { type: GraphQLString },
    mainThread: { type: GraphQLString },
    user: {
      //prolly need to change to requester if u delete the above
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.requesterId);
      }
    },
    threads: {
      type: new GraphQLList(ThreadType),
      resolve(parent, args) {
        return Thread.find({ requestId: parent.id });
      }
    }
  })
});

//Defining Thread Type
const ThreadType = new GraphQLObjectType({
  name: "Thread",
  fields: () => ({
    id: { type: GraphQLID },
    threadContent: { type: GraphQLString },
    threadCreatedDate: { type: GraphQLString },
    threadImage: { type: GraphQLString },
    request: {
      type: RequestType,
      resolve(parent, args) {
        return Request.findById(parent.requestId);
      }
    }
  })
});

//Defining RootQueries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //to get single user
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    //to get all users
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    //to get single request
    request: {
      type: RequestType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Request.findById(args.id);
      }
    },
    //to get all requests
    requests: {
      type: new GraphQLList(RequestType),
      resolve(parent, args) {
        return Request.find({});
      }
    },
    //to get single thread
    thread: {
      type: ThreadType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Thread.findById(args.id);
      }
    },

    //to get all threads
    threads: {
      type: new GraphQLList(ThreadType),
      resolve(parent, args) {
        //return threads;
        return Thread.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    //Create New Request
    addRequest: {
      type: RequestType,
      args: {
        asset: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        subject: { type: new GraphQLNonNull(GraphQLString) },
        dateRequested: { type: new GraphQLNonNull(GraphQLString) },
        priority: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        assigned: { type: new GraphQLNonNull(GraphQLString) },
        dateResolved: { type: new GraphQLNonNull(GraphQLString) },
        dateClosed: { type: new GraphQLNonNull(GraphQLString) },
        mainThread: { type: new GraphQLNonNull(GraphQLString) },
        requesterId: { type: new GraphQLNonNull(GraphQLID) } // added
      },
      resolve(parent, args) {
        let request = new Request({
          asset: args.asset,
          type: args.type,
          subject: args.subject,
          dateRequested: args.dateRequested,
          priority: args.priority,
          status: args.status,
          assigned: args.assigned,
          dateResolved: args.dateResolved,
          dateClosed: args.dateClosed,
          mainThread: args.mainThread,
          requesterId: args.requesterId // added
        });
        return request.save();
      }
    },

    //Delete Request
    deleteRequest: {
      type: RequestType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Request.findByIdAndDelete(args.id);
      }
    },

    //Delete Threads (of a request)
    deleteThreads: {
      type: ThreadType,
      args: {
        requestId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Thread.deleteMany({ requestId: args.requestId });
      }
    },

    //Add New User
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        contactNumber: { type: GraphQLInt },
        accountType: { type: GraphQLString }
      },
      resolve(parent, args) {
        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          contactNumber: args.contactNumber,
          accountType: args.accountType
        });
        return user.save();
      }
    },

    //Add New Thread (UNDONE - not linked to senderID)
    addThread: {
      type: ThreadType,
      args: {
        threadContent: { type: new GraphQLNonNull(GraphQLString) },
        threadCreatedDate: { type: new GraphQLNonNull(GraphQLString) },
        requestId: { type: new GraphQLNonNull(GraphQLID) },
        threadImage: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let thread = new Thread({
          threadContent: args.threadContent,
          threadCreatedDate: args.threadCreatedDate,
          requestId: args.requestId,
          threadImage: args.threadImage
        });
        return thread.save();
      }
    },

    //Update Request Status
    updateRequestStatus: {
      type: RequestType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        dateResolved: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Request.findByIdAndUpdate(
          args.id,
          { status: args.status, dateResolved: args.dateResolved },
          { new: true }
        );
      }
    },

    //Update Request Assigned
    updateRequestAssigned: {
      type: RequestType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        assigned: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Request.findByIdAndUpdate(
          args.id,
          { assigned: args.assigned },
          { new: true }
        );
      }
    },

    //Update priority
    updatePriority: {
      type: RequestType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        priority: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Request.findByIdAndUpdate(
          args.id,
          { priority: args.priority },
          { new: true }
        );
      }
    },

    updateDateClosed: {
      type: RequestType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        dateClosed: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Request.findByIdAndUpdate(
          args.id,
          { dateClosed: args.dateClosed, status: args.status },
          { new: true }
        );
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
