const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const resolvers = require('./resolvers');
const PORT = process.env.PORT || 9000;
require('./config/database');
require('dotenv').config();

// context
const context = req => ({ req: req.request });

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, "schema.graphql"),
  resolvers,
  context
});

const options = {
  port: PORT,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000'] // frontend url
  },
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

server.start(options, ({port}) => console.log(`Server is running on localhost:${port}`));

