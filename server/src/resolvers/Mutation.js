const createMessage = async (_parent, args, context) => {

    const createdMessage = await context.prisma.message.create({ data: {
            text: args.message.text,
            likes: 0,
            dislikes: 0,
        },
    });

    context.pubsub.publish('NEW_MESSAGE', createdMessage);
    return createdMessage;
};

module.exports = {
    createMessage,
};