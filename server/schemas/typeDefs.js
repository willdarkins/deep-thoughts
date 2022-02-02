// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }
    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }
    # With this, we've now defined our thoughts query that it could receive a parameter if we wanted.
    # In this case, the parameter would be identified as username and would have a String data type.
    type Query {
        thoughts(username: String): [Thought]
    }
`;

// export the typeDefs
module.exports = typeDefs;