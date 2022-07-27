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

const updateLikes = async (_parent, args, context) => {
    const { message: { likes, id } } = args;

    const isMessageExists = await context.prisma.message.findFirst({
        where: {
            id: id,
        },
        select: { id: true },
    }).then(Boolean);

    if (!isMessageExists) {
        throw new Error(`Product with id ${id} does not exist`);
    }

    return context.prisma.message.update({
        where: {
            id: id,
        },
        data:{
            likes: likes,
        }
    });

}

const updateDislikes = async (_parent, args, context) => {
    const { message: { dislikes, id } } = args;

    const isMessageExists = await context.prisma.message.findFirst({
        where: {
            id: id,
        },
        select: { id: true },
    }).then(Boolean);

    if (!isMessageExists) {
        throw new Error(`Product with id ${id} does not exist`);
    }

    return context.prisma.message.update({
        where: {
            id: id,
        },
        data:{
            dislikes: dislikes,
        }
    });

}

module.exports = {
    createMessage,
    updateLikes,
    updateDislikes,
};