import {
  ForbiddenError,
  UserInputError,
} from "apollo-server-core";

async function sendMessageFromBuyer(
  _,
  { sellerId, productId, messageText },
  { prisma, userId, token, pubsub }
) {
  if (!userId || !token) throw new ForbiddenError("Forbidden access");
  if (userId === sellerId)
    throw new UserInputError("Cannot send message to yourself");

  let conversation = await prisma.conversation.findMany({
    where: {
      AND: [{ buyerId: userId }, { sellerId }, { productId }],
    },
  });

  conversation = conversation[0];

  if (!conversation)
    conversation = await prisma.conversation.create({
      data: {
        buyer: {
          connect: { id: userId },
        },
        seller: {
          connect: { id: sellerId },
        },
        product: {
          connect: { id: productId },
        },
      },
    });

  const message = await prisma.message.create({
    data: {
      text: messageText,
      owner: {
        connect: { id: userId },
      },
      conversation: {
        connect: { id: conversation.id },
      },
    },
  });

  let existSellerNotification = await prisma.notification.findMany({
    where: {
      ownerId: sellerId,
      name: "Selling",
    },
  });

  existSellerNotification = existSellerNotification[0];

  if (!!existSellerNotification) {
    await prisma.notification.update({
      where: {
        id: existSellerNotification.id,
      },
      data: {
        counter: existSellerNotification.counter + 1,
      },
    });
  } else {
    await prisma.notification.create({
      data: {
        owner: { connect: { id: sellerId } },
        name: "Selling",
      },
    });
  }

  await pubsub.publish("MESSAGE_SENT", {
    sellerId,
    messageSent: {
      counter: !!existSellerNotification
        ? existSellerNotification.counter + 1
        : 1,
      name: "Selling",
    },
  });

  return {
    message,
    statusCode: 200,
  };
}

export { sendMessageFromBuyer };
