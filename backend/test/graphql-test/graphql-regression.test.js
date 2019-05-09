
const graphql = require('graphql');
const chai = require('chai');

const schema = require('../../schema/schema');
const expect = chai.expect;

const requestType = schema._typeMap.Request;
const userType = schema._typeMap.User;
const threadType = schema._typeMap.Thread;


describe('Testing RequestType properties', () => {
  //console.log(requestType.getFields())

  it("Should have an 'asset' field of String type", () => {
    expect(requestType.getFields()).to.have.property('asset');
    expect(requestType.getFields().asset.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - asset: Checked")
  });

  it("Should have an 'type' field of String type", () => {
    expect(requestType.getFields()).to.have.property('type');
    expect(requestType.getFields().type.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - type: Checked")
  });

  it("Should have an 'subject' field of String type", () => {
    expect(requestType.getFields()).to.have.property('subject');
    expect(requestType.getFields().subject.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - subject: Checked")
  });

  it("Should have an 'dateRequested' field of String type", () => {
    expect(requestType.getFields()).to.have.property('dateRequested');
    expect(requestType.getFields().dateRequested.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - dateRequested: Checked")
  });

  it("Should have an 'priority' field of String type", () => {
    expect(requestType.getFields()).to.have.property('priority');
    expect(requestType.getFields().priority.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - priority: Checked")
  });

  it("Should have an 'status' field of String type", () => {
    expect(requestType.getFields()).to.have.property('status');
    expect(requestType.getFields().status.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - status: Checked")
  });

  it("Should have an 'dateResolved' field of String type", () => {
    expect(requestType.getFields()).to.have.property('dateResolved');
    expect(requestType.getFields().dateResolved.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - dateResolved: Checked")
  });

  it("Should have an 'assigned' field of String type", () => {
    expect(requestType.getFields()).to.have.property('assigned');
    expect(requestType.getFields().assigned.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - assigned: Checked")
  });

  it("Should have an 'dateClosed' field of String type", () => {
    expect(requestType.getFields()).to.have.property('dateClosed');
    expect(requestType.getFields().dateClosed.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - dateClosed: Checked")
  });

  it("Should have an 'mainThread' field of String type", () => {
    expect(requestType.getFields()).to.have.property('mainThread');
    expect(requestType.getFields().mainThread.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - mainThread: Checked")
  });

  it("Should have an 'user' field of User type", () => {
    expect(requestType.getFields()).to.have.property('user');
    expect(requestType.getFields().user.type).to.deep.equals(userType);
    //console.log("DataType - user: Checked")
  });
  
  it("Should have an 'threads' field of  List[Thread] type", () => {
    expect(requestType.getFields()).to.have.property('threads');
    expect(requestType.getFields().threads.type).to.deep.equals(graphql.GraphQLList(threadType));
    //console.log("DataType - threads: Checked")
  });


});


describe('Testing ThreadType properties', () => {
  //console.log(threadType.getFields())

  it("Should have an 'threadContent' field of String type", () => {
    expect(threadType.getFields()).to.have.property('threadContent');
    expect(threadType.getFields().threadContent.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - threadContent: Checked")
  });

  it("Should have an 'threadCreatedDate' field of String type", () => {
    expect(threadType.getFields()).to.have.property('threadCreatedDate');
    expect(threadType.getFields().threadCreatedDate.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - threadCreatedDate: Checked")
  });

  it("Should have an 'request' field of String type", () => {
    expect(threadType.getFields()).to.have.property('request');
    expect(threadType.getFields().request.type).to.deep.equals(requestType);
    //console.log("DataType - threadContent: Checked")
  });

  it("Should have an 'threadImage' field of String type", () => {
    expect(threadType.getFields()).to.have.property('threadImage');
    expect(threadType.getFields().threadImage.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - threadImage: Checked")
  });
});


describe('Testing UserType properties', () => {
  //console.log(userType.getFields())

  it("Should have an 'firstName' field of String type", () => {
    expect(userType.getFields()).to.have.property('firstName');
    expect(userType.getFields().firstName.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - firstName: Checked")
  });

  it("Should have an 'lastName' field of String type", () => {
    expect(userType.getFields()).to.have.property('lastName');
    expect(userType.getFields().lastName.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - lastName: Checked")
  });

  it("Should have an 'email' field of String type", () => {
    expect(userType.getFields()).to.have.property('email');
    expect(userType.getFields().email.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - email: Checked")
  });

  it("Should have an 'contactNumber' field of Integer type", () => {
    expect(userType.getFields()).to.have.property('contactNumber');
    expect(userType.getFields().contactNumber.type).to.deep.equals(graphql.GraphQLInt);
    //console.log("DataType - contactNumber: Checked")
  });

  it("Should have an 'accountType' field of String accountType", () => {
    expect(userType.getFields()).to.have.property('firstName');
    expect(userType.getFields().accountType.type).to.deep.equals(graphql.GraphQLString);
    //console.log("DataType - accountType: Checked")
  });

  it("Should have an 'requests' field of List[Request] type", () => {
    expect(userType.getFields()).to.have.property('requests');
    expect(userType.getFields().requests.type).to.deep.equals(graphql.GraphQLList(requestType));
    //console.log("DataType - requests: Checked")
  });

  

});
