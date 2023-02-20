function images({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).images();
}

function tags({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).tags();
}

function location({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).location();
}

function currentPrice({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).currentPrice();
}

function owner({ id }, _, { prisma }) {
  return prisma.product.findUnique({ where: { id } }).owner();
}

const Product = {
  tags,
  images,
  location,
  currentPrice,
  owner,
};

export default Product;
