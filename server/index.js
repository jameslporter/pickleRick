const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
mongoose.connect('mongodb://root:e398SDc2@mongo:27017/plumbus',{serverSelectionTimeoutMS:100}).catch(err => console.log(err));

const Note = mongoose.model('Notes', { characterID: Number, body: String, userID: String });

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
      async getMyNotes(parent, args, context, info){
          return await Note.find({userID:args.userID})
          //return([{characterID:1,body:"a big giant note",userID:args.userID}])
      },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});