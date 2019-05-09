//inside tests/test_helper.js
const mongoose = require('mongoose');
//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

/*
mongoose.connect('mongodb://localhost/pokemons'); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
*/

const dbUrl = "mongodb+srv://lee_hangwee:escTicketingC3T10@cluster0-nuw21.mongodb.net/test?retryWrites=true";
mongoose.connect(dbUrl, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
    try {
    console.log("Connected to database for testing");
    } catch {
    console.log("connection failed...");
    }
});

//Called hooks which runs before something. 
//Comment out to see the CRUD in mongodb

/*
The hook beforeEach() helps to empty our database before we run our tests. 
This will become more clear ahead when we write an actual test for create operation.

Deleting users take time, so we need to hold mocha before the operation completes. 
The done() function call notifies that the operation is complete now you can resume the execution.
*/


beforeEach((done) => {
    mongoose.connection.collections.requests.drop(() => {
        //console.log("Database cleared")
        //console.log("Start tests now...\n")
         //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    }); 
});


