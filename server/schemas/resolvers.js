// imported from Mongoose models
const { User, Thought } = require('../models');

const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      // We use a ternary operator to check if username exists. If it does, we set params to an object with a username key
      // set to that value. If it doesn't, we simply return an empty object.
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
  }
};
  
  module.exports = resolvers;