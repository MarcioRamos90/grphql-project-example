const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

const schema = require("./schema/schema");

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
