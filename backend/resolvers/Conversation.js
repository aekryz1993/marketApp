function buyer({ id }, _, { prisma }) {
  return prisma.conversation.findUnique({ where: { id } }).buyer();
}

function seller({ id }, _, { prisma }) {
  return prisma.conversation.findUnique({ where: { id } }).seller();
}

function product({ id }, _, { prisma }) {
  return prisma.conversation.findUnique({ where: { id } }).product();
}

const Conversation = {
  buyer,
  seller,
  product,
};

export default Conversation;
