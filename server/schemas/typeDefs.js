const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    createdAt: String!
  }

  type Token {
    token: String!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addToken(token: String!): Token
  }
`;

module.exports = typeDefs;
