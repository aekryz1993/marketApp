function src({ id }, _, { prisma }) {
  return prisma.image.findUnique({ where: { id } }).src();
}

const Image = {
  src,
};

export default Image;
