const createProduct = async (_parent, args, context) => {
    const createdProduct = await context.prisma.product.create( {data: args.product} );
    context.pubsub.publish('NEW_PRODUCT', createdProduct);
    return createdProduct;
}

module.exports = {
    createProduct,
}