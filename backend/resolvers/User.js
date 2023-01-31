function location({ id }, _, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).location();
}

const User = {
  location,
};

export default User;
