const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const resolvers = require('./resolvers');
const PORT = process.env.PORT || 9000;
require('./config/database');
require('dotenv').config();

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

