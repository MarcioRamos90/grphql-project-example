const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = graphql;

// dummy data
const usersData = [
  { id: "1", name: "Bond", age: 36 },
  { id: "13", name: "Anna", age: 46 },
  { id: "211", name: "Bella", age: 16 },
  { id: "150", name: "Gina", age: 26 },
  { id: "19", name: "Georgina", age: 36 },
  { id: "11", name: "Georgina", age: 36, profession: "Dev Backed" },
  { id: "12", name: "Georgina", age: 36, profession: "Policy officer" },
];

const hobbiesData = [
  {
    id: "1",
    title: "Programming",
    description: "Using computer languages",
    userId: "11",
  },
  {
    id: "2",
    title: "Rowing",
    description: "Sweat and feel better after a dunots",
    userId: "11",
  },
  {
    id: "3",
    title: "Fencing",
    description: "A hobby from fancy people",
    userId: "12",
  },
  {
    id: "4",
    title: "Golf",
    description: "Play golf",
    userId: "1",
  },
  {
    id: "5",
    title: "Sleep",
    description: "Sleep after a tiring day",
    userId: "1",
  },
];

const postsData = [
  { id: "1", comment: "I like your hear", userId: "1" },
  { id: "2", comment: "Did you have some many", userId: "1" },
  { id: "32", comment: "I love cookie on the morning", userId: "1" },
  { id: "3", comment: "I want learn to programming better", userId: "13" },
  { id: "4", comment: "My dog is soo cute", userId: "11" },
];

// Create Types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user ...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });
      },
    },

    hobbies: {
      type: new GraphQLList(hobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const hobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "The store of hobbies of users",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "All Posts of the users",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

// Create RootQuery
const rootQuery = new GraphQLObjectType({
  name: "RoootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // we Resolve with data
        // get and return from a data source
        return _.find(usersData, { id: args.id });
      },
    },

    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return usersData;
      },
    },

    hobby: {
      type: hobbyType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
      },
    },

    hobbies: {
      type: GraphQLList(hobbyType),
      resolve(parent, args) {
        return hobbiesData;
      },
    },

    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(postsData, { id: args.id });
      },
    },

    posts: {
      type: GraphQLList(PostType),
      resolve(parent, args) {
        return postsData;
      },
    },
  },
});

// Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // CREATE NEW USER
    createUser: {
      type: UserType,
      args: {
        // id: {type: GraphQLID }
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },
      resolve(parent, args) {
        let User = {
          name: args.name,
          age: args.age,
          profession: args.profession,
        };

        return User;
      },
    },

    // CREATE NEW POST
    createPost: {
      type: PostType,
      args: {
        // id: {type: GraphQLID }
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let post = {
          comment: args.comment,
          userId: args.userId,
        };

        postsData.push(post);
        return post;
      },
    },

    // CREATE NEW HOBBY
    createHobby: {
      type: hobbyType,
      args: {
        // id: {type: GraphQLID }
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let hobby = {
          title: args.title,
          description: args.description,
          userId: args.userId,
        };

        hobbiesData.push(hobby);
        return hobby;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation,
});
