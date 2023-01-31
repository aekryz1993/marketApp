function images({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).images();
}

function tags({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).tags();
}

function location({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).location();
}

const Product = {
  tags,
  images,
  location,
};

export default Product;
