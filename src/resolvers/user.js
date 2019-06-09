const mongoose = require('mongoose');
const { UserInputError } = require('apollo-server-express');
const { User } = require('../models');

module.exports = {
  Query: {
    users: (root, args, context, info) => {
      // TODO: authenticated, projection, pagination
      return User.find({});
    },
    user: (root, { id }, context, info) => {
      // TODO: Auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }

      return User.findById(id);
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      // TODO: Not authenticated
      // validation

      return User.create(args);
    }
  }
};
