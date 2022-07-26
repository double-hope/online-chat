const { createServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const { readFileSync } = require('fs');
const { PrismaClient } = require('./generated/prisma-client-js')

const resolvers = {
    Query,
    Mutation,
};

const typeDefs = readFileSync(require.resolve('./schema.graphql')).toString('utf-8');
const prisma = new PrismaClient();

const server = new createServer({
    schema:{
        typeDefs,
        resolvers
    },
    context: { prisma }
});

server.start(() => {
    console.log('http://localhost:4000/')
})
