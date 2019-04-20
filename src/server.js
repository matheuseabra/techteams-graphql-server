const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 9000
require('dotenv').config();

mongoose.connect("mongodb://localhost:27017/techteams-graphql-db", {
  useNewUrlParser: true
});

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, "schema.graphql"),
  resolvers
});

const options = {
  port: PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

server.start(options, ({port}) => console.log(`Server is running on localhost:${port}`));

