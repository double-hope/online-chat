const messages = async (_parent, args, context, _info) => {

    const messageList = await context.prisma.message.findMany();
    const count = await context.prisma.message.count();

    return {
        messageList,
        count,
    };
}

module.exports = {
    messages,
};