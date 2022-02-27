const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Note {
    characterID: ID!
    body: String
    userID: String
  }
  type Query {
    getMyNotes(userID: ID!): [Note]
  }
`;

const resolvers = {
    Query: {
      getMyNotes(parent, args, context, info){
          return([{characterID:1,body:"a big giant note",userID:"adsb3123"}])
      },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});