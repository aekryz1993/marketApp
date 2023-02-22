function location({ id }, _, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).location();
}

function buyingConversations({ id }, _, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).buyingConversations();
}

function sellingConversations({ id }, _, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).sellingConversations();
}

function notifications({ id }, _, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).notifications();
}

const User = {
  location,
  buyingConversations,
  sellingConversations,
  notifications,
};

export default User;
