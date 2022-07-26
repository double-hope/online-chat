async function products(parent, args, context){
    return await context.prisma.products();
}

module.exports = {
    products
}