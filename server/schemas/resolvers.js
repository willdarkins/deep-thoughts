// built-in GraphQL authentication error handling
const { AuthenticationError } = require('apollo-server-express');
// imported from Mongoose models
const { User, Thought } = require('../models');
// importing the JSONwebtoken to be used in the addUser and Login mutations
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      // We use a ternary operator to check if username exists. If it does, we set params to an object with a username key
      // set to that value. If it doesn't, we simply return an empty object.
      const params = username ? { username } : {};
      // We then pass that object, with or without any data in it, to our .find() method.
      // If there's data, it'll perform a lookup by a specific username
      // If there's not, it'll simply return every thought.
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        // Both of them will omit the Mongoose-specific __v property and the user's password information
        .select('-__v -password')
        // We also populate the fields for friends and thoughts, so we can get any associated data in return.
        .populate('friends')
        .populate('thoughts');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
  },
  Mutation: {
    // The Mongoose User model creates a new user in the database
    // with whatever is passed in as the args.
    // sign a token and return an object that combines the token with the user's data
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
    
      return { token, user };
    },
    // taking in the input value from email and password as args and passing through the resolver
    // sign a token and return an object that combines the token with the user's data
    login: async (parent, { email, password }) => {
      // assigning the user variable to the email arg...
      // if the email doesn't exist -- GraphQL throws an error
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      // assigning the correctPw variable to the password arg...
      // if the password doesn't exist -- GraphQL throws an error
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;