// imported from Mongoose models
const { User, Thought } = require('../models');

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
  }
};
  
  module.exports = resolvers;