const { createServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const { readFileSync } = require('fs');

const resolvers = {
    Query,
    //Mutation,
};

const typeDefs = readFileSync(require.resolve('./schema.graphql')).toString('utf-8');

const server = new createServer({
    schema:{
        typeDefs,
        resolvers
    }
});

server.start(() => {
    console.log('http://localhost:4000/')
})
