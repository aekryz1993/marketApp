import { ForbiddenError, UserInputError } from "apollo-server-core";

async function sendMessageFromBuyer(
  _,
  { sellerId, productId, messageText },
  { prisma, userId, token, pubsub },
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
    to: sellerId,
    messageSent: {
      conversation: {
        ...conversation,
        messages: [...conversation.messages, message],
      },
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

async function sendMessageFromSeller(
  _,
  { buyerId, productId, messageText },
  { prisma, userId, token, pubsub },
) {
  if (!userId || !token) throw new ForbiddenError("Forbidden access");
  if (userId === buyerId)
    throw new UserInputError("Cannot send message to yourself");

  let conversation = await prisma.conversation.findMany({
    where: {
      AND: [{ buyerId }, { sellerId: userId }, { productId }],
    },
  });

  conversation = conversation[0];

  if (!conversation) throw new UserInputError("Conversation is not exist");

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
    include: {
      conversation: {
        include: {
          product: {
            include: {
              owner: {
                select: {
                  id: true
                }
              },
              images: {
                take: 1,
                include: {
                  src: {
                    select: {
                      id: true,
                      square: true,
                      tiny: true,
                    },
                  },
                },
              },
              currentPrice: true,
            },
          },
          seller: {
            select: {
              id: true,
              username: true,
            },
          },
          buyer: {
            select: {
              id: true,
              username: true,
            },
          },
          messages: {
            take: 20,
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  let existSellerNotification = await prisma.notification.findMany({
    where: {
      ownerId: buyerId,
      name: "Buying",
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
        owner: { connect: { id: buyerId } },
        name: "Buying",
      },
    });
  }

  const messageProduct = message.conversation.product;
  const firstImage = messageProduct.images[0];

  const product = {
    id: messageProduct.id,
    title: messageProduct.title,
    owner: { id: messageProduct.owner.id },
    images: [
      {
        id: firstImage.id,
        alt: firstImage.alt,
        src: {
          id: firstImage.id,
          square: firstImage.square,
          tiny: firstImage.tiny,
        },
      },
    ],
    currentPrice: messageProduct.currentPrice,
  };

  await pubsub.publish("MESSAGE_SENT", {
    to: buyerId,
    messageSent: {
      conversation: {
        id: message.conversation.id,
        buyer: message.conversation.buyer,
        seller: message.conversation.seller,
        product,
        messages: message.conversation.messages,
        createdAt: message.conversation.createdAt,
      },
      counter: !!existSellerNotification
        ? existSellerNotification.counter + 1
        : 1,
      name: "Buying",
    },
  });

  return {
    message,
    statusCode: 200,
  };
}

export { sendMessageFromBuyer, sendMessageFromSeller };
