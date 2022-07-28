const message = (parent, _args, context, _info) =>
    context.prisma.answer.
    findUnique({ where: { id: parent.id } })
        .message();

module.exports = {
    message,
};