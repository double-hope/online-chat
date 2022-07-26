const { createServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const { readFileSync } = require('fs');

const resolvers = {
    Query
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
