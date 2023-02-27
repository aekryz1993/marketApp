import { ForbiddenError, UserInputError } from "apollo-server-core";

function checkAuth({ userId, token, receiverIdValue }) {
  if (!userId || !token) throw new ForbiddenError("Forbidden access");
  if (userId === receiverIdValue)
    throw new UserInputError("Cannot send message to yourself");
}

const getSenderName = (receiverIdName) => {
  const senderId = receiverIdName === "sellerId" ? "buyerId" : "sellerId";
  const sender = receiverIdName === "sellerId" ? "buyer" : "seller";

  return { sender, senderId };
};

async function getConversation(
  { senderId, receiverIdName, receiverIdValue, productId },
  { prisma, userId },
) {
  let conversation = await prisma.conversation.findMany({
    where: {
      AND: [
        { [senderId]: userId },
        { [receiverIdName]: receiverIdValue },
        { productId },
      ],
    },
  });
  return conversation[0];
}

async function createConversation(
  { receiverIdName, receiverIdValue, productId, sender },
  { prisma, userId },
) {
  conversation = await prisma.conversation.create({
    data: {
      [sender]: {
        connect: { id: userId },
      },
      [receiverIdName]: {
        connect: { id: receiverIdValue },
      },
      product: {
        connect: { id: productId },
      },
    },
  });
}

async function createMessage(
  { messageText, conversationId },
  { prisma, userId },
) {
  return prisma.message.create({
    data: {
      text: messageText,
      owner: {
        connect: { id: userId },
      },
      conversation: {
        connect: { id: conversationId },
      },
    },
    include: {
      conversation: {
        include: {
          product: {
            include: {
              owner: {
                select: {
                  id: true,
                },
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
}

async function checkExistSellerNotification(
  { receiverIdName, receiverIdValue },
  { prisma },
) {
  const existSellerNotification = await prisma.notification.findMany({
    where: {
      ownerId: receiverIdValue,
      name: receiverIdName === "sellerId" ? "Selling" : "Buying",
    },
  });
  return existSellerNotification[0];
}

async function updateNotification(
  { notificationId, notificationCounter },
  { prisma },
) {
  await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      counter: notificationCounter + 1,
    },
  });
}

async function createNotification(
  { receiverIdName, receiverIdValue },
  { prisma },
) {
  await prisma.notification.create({
    data: {
      owner: { connect: { id: receiverIdValue } },
      name: receiverIdName === "sellerId" ? "Selling" : "Buying",
    },
  });
}

async function messageSubscription(
  { receiverIdName, receiverIdValue, notification, conversation, product },
  { pubsub },
) {
  await pubsub.publish("MESSAGE_SENT", {
    to: receiverIdValue,
    messageSent: {
      conversation: {
        id: conversation.id,
        buyer: conversation.buyer,
        seller: conversation.seller,
        product,
        messages: conversation.messages,
        createdAt: conversation.createdAt,
      },
      counter: !!notification ? notification.counter + 1 : 1,
      name: receiverIdName === "sellerId" ? "Selling" : "Buying",
    },
  });
}

const response = ({ message }) => ({
  message,
  statusCode: 200,
});

const getProduct = ({ messageProduct, firstImage }) => ({
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
});

async function sendMessageFromBuyer(
  _,
  { sellerId, productId, messageText },
  { prisma, userId, token, pubsub },
) {
  const receiverIdName = "sellerId";
  const receiverIdValue = sellerId;

  checkAuth({ userId, token, receiverIdValue });

  const { sender, senderId } = getSenderName(receiverIdName);

  let conversation = await getConversation(
    { senderId, receiverIdName, receiverIdValue, productId },
    { prisma, userId },
  );

  if (!conversation)
    conversation = await createConversation(
      { receiverIdName, receiverIdValue, productId, sender },
      { prisma, userId },
    );

  const message = await createMessage(
    { messageText, conversationId: conversation.id },
    { prisma, userId },
  );

  let existSellerNotification = await checkExistSellerNotification(
    { receiverIdName, receiverIdValue },
    { prisma },
  );

  if (!!existSellerNotification) {
    await updateNotification(
      {
        notificationId: existSellerNotification.id,
        notificationCounter: existSellerNotification.counter,
      },
      { prisma },
    );
  } else {
    await createNotification({ receiverIdName, receiverIdValue }, { prisma });
  }

  const messageProduct = message.conversation.product;
  const firstImage = messageProduct.images[0];

  const product = getProduct({ messageProduct, firstImage });

  await messageSubscription(
    {
      receiverIdName,
      receiverIdValue,
      notification: existSellerNotification,
      conversation: message.conversation,
      product,
    },
    { pubsub },
  );

  return response({ message });
}

async function sendMessageFromSeller(
  _,
  { buyerId, productId, messageText },
  { prisma, userId, token, pubsub },
) {
  const receiverIdName = "buyerId";
  const receiverIdValue = buyerId;

  checkAuth({ userId, token, receiverIdValue });

  const { senderId } = getSenderName(receiverIdName);

  let conversation = await getConversation(
    { senderId, receiverIdName, receiverIdValue, productId },
    { prisma, userId },
  );

  if (!conversation) throw new UserInputError("Conversation is not exist");

  const message = await createMessage(
    { messageText, conversationId: conversation.id },
    { prisma, userId },
  );

  let existSellerNotification = await checkExistSellerNotification(
    { receiverIdName, receiverIdValue },
    { prisma },
  );

  if (!!existSellerNotification) {
    await updateNotification(
      {
        notificationId: existSellerNotification.id,
        notificationCounter: existSellerNotification.counter,
      },
      { prisma },
    );
  } else {
    await createNotification({ receiverIdName, receiverIdValue }, { prisma });
  }

  const messageProduct = message.conversation.product;
  const firstImage = messageProduct.images[0];

  const product = getProduct({ messageProduct, firstImage });

  await messageSubscription(
    {
      receiverIdName,
      receiverIdValue,
      notification: existSellerNotification,
      conversation: message.conversation,
      product,
    },
    { pubsub },
  );

  return response({ message });
}

export { sendMessageFromBuyer, sendMessageFromSeller };
