const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const {
  APP_PORT,
  IN_PROD,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = require('./config').config;

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true }
    );

    const app = express();

    app.disable('x-powered-by');

    const server = new ApolloServer({
      // These will be defined for both new or existing servers
      typeDefs,
      resolvers,
      playground: !IN_PROD
    });

    server.applyMiddleware({ app }); // app is from an existing express app

    app.listen({ port: APP_PORT }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`
      );
    });
  } catch (e) {
    console.error(e);
  }
};

start();
