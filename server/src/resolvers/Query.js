const products = async (_parent, _args, context, _info) => {
    const foundProducts = await context.prisma.product.findMany();
    return foundProducts;
}

module.exports = {
    products,
}