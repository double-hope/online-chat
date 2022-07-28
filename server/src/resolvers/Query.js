const messages = async (_parent, args, context, _info) => {
    const {filter, skip, take, orderBy} = args;

    const where = filter ? {
        text: filter,
    } : {};

    const messageList = await context.prisma.message.findMany({
        where,
        include: {
            answers: true,
        },
        skip,
        take,
        orderBy,
    });

    const count = await context.prisma.message.count();

    return {
        messageList,
        count,
    };
}

module.exports = {
    messages,
};