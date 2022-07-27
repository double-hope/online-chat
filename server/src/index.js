const { createServer, createPubSub } = require('@graphql-yoga/node');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const { readFileSync } = require('fs');
const { PrismaClient } = require('./generated/prisma-client-js')

async function main(){
    const resolvers = {
        Query,
        Mutation,
        Subscription,
    };

    const typeDefs = readFileSync(require.resolve('./schema.graphql')).toString('utf-8');
    const prisma = new PrismaClient();
    const pubsub = createPubSub();

    const server = new createServer({
        schema:{
            typeDefs,
            resolvers,
        },
        context: { prisma, pubsub },
    });

    server.start().then();
}

main().catch(e=>{
    console.log(e);
    process.exit(1);
});
