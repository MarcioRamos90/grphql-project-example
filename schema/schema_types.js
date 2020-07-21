const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
} = graphql;

// Scalar Types

const Person = new GraphQLObjectType({
  name: "Person",
  description: "Represents a Person Type",
      fields: () => ({
    id: { type: GraphQLID },
    name: { type: new  GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },

    justaAType: {
      type: Person,
      resolve(parent, args) {
        return parent;
      },
    },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description ...",
  fields: {
    person: {
      type: Person,
      resolve(parent, args) {
        let personOBJ = {
          name: "Antonio",
          age: 35,
          isMarried: true,
          gpa: 4.0,
        };

        return personOBJ;
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
