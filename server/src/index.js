const { createServer, createPubSub } = require('@graphql-yoga/node');
const { WebSocketServer } = require('ws');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const { readFileSync } = require('fs');
const { PrismaClient } = require('./generated/prisma-client-js');
const { useServer } = require('graphql-ws/lib/use/ws');

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

    const httpServer = await server.start();

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: server.getAddressInfo().endpoint,
    });

    useServer(
        {
            execute: args => args.rootValue.execute(args),
            subscribe: args => args.rootValue.subscribe(args),
            onSubscribe: async (ctx, msg) => {
                const { schema, execute, subscribe, contextFactory, parse, validate } =
                    server.getEnveloped(ctx);

                const args = {
                    schema,
                    operationName: msg.payload.operationName,
                    document: parse(msg.payload.query),
                    variableValues: msg.payload.variables,
                    contextValue: await contextFactory(),
                    rootValue: {
                        execute,
                        subscribe,
                    },
                };

                const errors = validate(args.schema, args.document);
                if (errors.length) return errors;
                return args;
            },
        },
        wsServer,
    );

}

main().catch(e=>{
    console.log(e);
    process.exit(1);
});
