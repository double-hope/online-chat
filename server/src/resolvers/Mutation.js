function postProduct(parent, args, context, info){
    return context.prisma.createProduct({
        title: args.title,
        price: args.price
    });
}

module.exports = {
    postProduct
}