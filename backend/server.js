const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Request = require("./models/requests");

//allow corss-origin requests
app.use(cors());
// app.use(
//   "/graphiql",
//   graphqlHTTP({
//     schema,
//     graphiql: true
//   })
// );

//this part is for sending email

var request = require("request");

app.get("/send-email", (req, res) => {
  //Get Variables from query string in the search bar
  const { recipient, sender, topic, text, content } = req.query;

  // console.log(content);
  let subject = "Alert - " + content;

  //Sendgrid Data Requirements
  var options = {
    method: "POST",
    url: "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
    headers: {
      "Postman-Token": "cf3eca06-aa5b-4e22-a218-ab95c3234bc2",
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token":
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJQMVA0TDRyQmlWNzlPNGVzTFBhMWNFWk0yMmlWekJoSEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5NzEsImV4cCI6MTU1MjU0NDk3MSwiYXpwIjoiUDFQNEw0ckJpVjc5TzRlc0xQYTFjRVpNMjJpVnpCaEgiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.VaMxJR7U7qMYl-x8fHRG4kbEjAJmOtACGUT3bsHVuk9PNrnhQ6JkhJWy1NwxwdDjH9HZ5WjK1-jW_y4o5bUQu9ekViRQX0GmpxkXKSvHuRGQKmaG9obbm7qyedZ93RCRtPXXS-Fu2ZoXuwAxb_EYB4Xt34dpXIt-AlU-62_WgOWhhajdJ66UKmBt--sZR7v9AHDZmDWTVosgs8aiUlFw3R4XvRwItEeOfEtyZJbsmnKEyzV9BznAUyyuUlsliZkTbYMz_qqcED8_5sLQvCTZArNJaRbMpB8nfNAaVgw-UUZeF6GkcTzl1Y-0vFiYYY6YOmFcx2zuYCZrfu46kTLhuA"
    },
    body: {
      subject: subject,
      sender: "ticketing@accenture.com",
      recipient: "benjaminlpa1996@gmail.com",
      html: content
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
});

//this is for filtering requests
app.get("/filter-requests", (req, res) => {
  // var test = ["Benjamin", "Hang Wee"];
  //const { asset, type, priority, assigned } = req.query;

  const newAsset = JSON.parse(req.query.asset);
  const newType = JSON.parse(req.query.type);
  const newPriority = JSON.parse(req.query.priority);
  const newAssigned = JSON.parse(req.query.assigned);
  // console.log(newAsset.length);
  // console.log(newType.length);
  // console.log(newPriority);
  // console.log(newAssigned);

  let obj = {};
  if (newAsset.length !== 0) {
    obj.asset = { $in: newAsset };
  }

  if (newType.length !== 0) {
    obj.type = { $in: newType };
  }

  if (newPriority.length !== 0) {
    obj.priority = { $in: newPriority };
  }

  if (newAssigned.length !== 0) {
    obj.assigned = { $in: newAssigned };
  }

  // let obj = {
  //   asset: { $in: newAsset },
  //   type: { $in: newType },
  //   priority: { $in: newPriority },
  //   assigned: { $in: newAssigned }
  //   //assigned: { "$in": test },
  //   //created: {$gt: new Date(time)}
  // };

  // console.log(obj);

  Request.aggregate(
    [
      {
        $match: obj
      }
    ],
    function(err, data) {
      if (err) throw err;
      // console.log(data);
      res.send(data);
    }
  );
});

mongoose.connect(
  "mongodb+srv://benjamin:benpassword@cluster0-uykqv.mongodb.net/test?retryWrites=true"
);
mongoose.connection.once("open", () => {
  try {
    console.log("connected to database");
  } catch {
    console.log("connection failed...");
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema, //this is for the graph. not for mongoDB
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening to requests on port 4000");
});
