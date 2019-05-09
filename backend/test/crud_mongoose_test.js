//inside create_test.js
const assert = require('assert');

const Request = require('../models/requests'); //imports the requests model.

describe('Creating documents', () => {
    it('creates a request', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const requestExample = new Request({ 
            asset: "asset1", 
            type: "type1",
            subject: "subject1",
            dateRequested: "dateRequested1",
            priority: "priority1",
            status: "status1",
            assigned: "assigned1",
            dateResolved: "dateResolved1",
            dateClosed: "dateClosed1",
            mainThread: "mainThread1",
            requesterId: "requesterId1", 
        });
        requestExample.save() //saving to DB - creating a document
            .then(() => {
                assert(!requestExample.isNew); //asserting if document just created is actually new
                console.log("Create Request: SUCCESS");
                done();
                console.log("Database cleared\n")
                console.log("Start next test now...")
            });
    });
});


describe('Reading request details', () => {

    let requestExample;
    beforeEach((done)=> {
        requestExample = new Request({ 
            asset: "asset2", 
            type: "type2",
            subject: "subject2",
            dateRequested: "dateRequested2",
            priority: "priority2",
            status: "status2",
            assigned: "assigned2",
            dateResolved: "dateResolved2",
            dateClosed: "dateClosed2",
            mainThread: "mainThread3",
            requesterId: "requesterId2", 
        });
        requestExample.save()
            .then(() => done());
    });

    it('finds request with the asset of asset2', (done) => {
        Request.findOne({ asset: "asset2" })
            .then((request) => {
                assert(request.asset === "asset2"); 
                console.log("Read Request: SUCCESS");
                done();
                console.log("Database cleared\n")
                console.log("Start next test now...")
            });
    })
})

describe('Updating a status and dateResolved', () => {
    let requestExample;
    beforeEach((done)=> {
      requestExample = new Request({ 
          asset: "asset3", 
          type: "type3",
          subject: "subject3",
          dateRequested: "dateRequested3",
          priority: "priority3",
          status: "status3",
          assigned: "assigned3",
          dateResolved: "dateResolved3",
          dateClosed: "dateClosed3",
          mainThread: "mainThread3",
          requesterId: "requesterId3", 
      });
      requestExample.save()
          .then(() => done());
  });
    
    function assertHelper(statement, done) {
      statement
       .then(() => Request.find({}))
       .then((requests) => {
        assert(requests.length === 1);
        assert(requests[0].status === 'status4');
        assert(requests[0].dateResolved === 'dateResolved4');
        console.log("Update Request: SUCCESS");
        done();
        console.log("Database cleared\n")
        console.log("Start next test now...")
      });
    }
    
    it('update one request with id using model', (done) => {
      assertHelper(Request.findOneAndUpdate({ _id : requestExample._id }, { status: 'status4', dateResolved: 'dateResolved4' }), done);
    });
  });
  
describe('Updating dateClosed', () => {
    let requestExample;
    beforeEach((done)=> {
      requestExample = new Request({ 
          asset: "asset3", 
          type: "type3",
          subject: "subject3",
          dateRequested: "dateRequested3",
          priority: "priority3",
          status: "status3",
          assigned: "assigned3",
          dateResolved: "dateResolved3",
          dateClosed: "dateClosed5",
          mainThread: "mainThread3",
          requesterId: "requesterId3", 
      });
      requestExample.save()
          .then(() => done());
  });
    
    function assertHelper(statement, done) {
      statement
       .then(() => Request.find({}))
       .then((requests) => {
        assert(requests.length === 1);
        assert(requests[0].dateClosed === 'dateClosed4');
        console.log("Update Request: SUCCESS");
        done();
        console.log("Database cleared\n")
        console.log("Start next test now...")
      });
    }
    
    it('update one request with id using model', (done) => {
      assertHelper(Request.findOneAndUpdate({ _id : requestExample._id }, { dateClosed: 'dateClosed4' }), done);
    });
  });


  
describe('Deleting a request', () => {
    let requestExample;
    beforeEach((done)=> {
      requestExample = new Request({ 
          asset: "asset3", 
          type: "type3",
          subject: "subject3",
          dateRequested: "dateRequested3",
          priority: "priority3",
          status: "status3",
          assigned: "assigned3",
          dateResolved: "dateResolved3",
          dateClosed: "dateClosed3",
          mainThread: "mainThread3",
          requesterId: "requesterId3", 
      });
      requestExample.save()
          .then(() => done());
  });
    it('removes a pokemon using id', (done) => {
      Request.findByIdAndDelete(requestExample._id)
        .then(() => Request.findOne({ requesterId: 'requesterId3' }))
        .then((request) => {
          assert(request === null);
          console.log("Delete Request: SUCCESS");
          done();
          console.log("Database cleared\n")
          console.log("Start next test now...")
        });
    })
  });

  
