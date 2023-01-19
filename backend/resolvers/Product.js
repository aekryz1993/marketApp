function images({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).images();
}

function tags({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).tags();
}

const Product = {
  tags,
  images,
};

export default Product;
