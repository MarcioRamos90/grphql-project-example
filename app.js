const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

mongoose.connect(
  `mongodb://${config.mongoUser}:${config.mongoPassword}@ds151007.mlab.com:51007/gq-course?authSource=gq-course&w=1`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.log("mongoose.connect >>> error >>>", error);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Mongo in live!");
});

app.use(
  "/graphql",
  graphqlHTTP.graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(4000, () => {
  console.log("Listening for requests on port: ", 4000);
});
