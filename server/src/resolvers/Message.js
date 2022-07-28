const answers = (parent, _args, context, _info) =>
    context.prisma.message.
    findUnique({ where: { id: parent.id } })
        .answers();

module.exports = {
    answers,
};