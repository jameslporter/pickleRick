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
  input NoteInput {
    characterID: ID!
    body: String!
    userID: String!
  }
  type Query {
    getMyNotes(userID: ID!,characterID: String!): [Note]
  }
  type Mutation{
    createNote(input: NoteInput!): Note
    updateNote(input: NoteInput!): Note
  }
`;

const resolvers = {
    Query: {
      async getMyNotes(parent, args, context, info){
          return await Note.find({userID:args.userID,characterID:args.characterID})
      },
    },
    Mutation: {
        createNote(parent, args, context, info){
            return Note.create({characterID:args.input.characterID,body:args.input.body,userID:args.input.userID})
        },
        updateNote(parent, args, context, info){
            Note.findOneAndUpdate(
                {userID:args.input.userID,characterID:args.input.characterID},
                {characterID:args.input.characterID,body:args.input.body,userID:args.input.userID},
                {new:true},
                (err,doc,res)=>{
                    return doc
                }
            );
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});