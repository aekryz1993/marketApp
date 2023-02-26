function buyer({ id }, _, { prisma }) {
  return prisma.conversation.findUnique({ where: { id } }).buyer();
}

function seller({ id }, _, { prisma }) {
  return prisma.conversation.findUnique({ where: { id } }).seller();
}

function product({ id }, _, { prisma }) {
  return prisma.conversation.findUnique({ where: { id } }).product();
}

function messages({ id }, _, { prisma }) {
  return prisma.conversation.findUnique({ where: { id } }).messages({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
  });
}

const Conversation = {
  buyer,
  seller,
  product,
  messages,
};

export default Conversation;
