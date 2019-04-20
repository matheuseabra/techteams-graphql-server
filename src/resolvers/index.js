const mergeResolvers = require('merge-graphql-schemas');
const Query = require('./Query');
const Mutation = require('./Mutation');

const resolvers = [Query, Mutation];

export default mergeResolvers(resolvers);