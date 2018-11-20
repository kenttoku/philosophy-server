/* eslint-disable no-console */
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const typeDefs='./src/schema.graphql';
const Query = require('./resolvers/query');

const resolvers= {
  Query
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

mongoose.connect(DATABASE_URL, { useNewUrlParser:true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.error(err));

if (require.main === module) {
  server.start(() => console.log('Server is running'));
}