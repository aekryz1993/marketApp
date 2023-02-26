export const message = `
  type Message {
    id: ID!
    text: String!
    ownerId: String!
    conversationId: String!
    createdAt: Date!
  }

  type SendMessageResponse {
    message: Message
    statusCode: Int!
  }

  type ImageSrcSubscription {
    id: ID!
    square: String
    tiny: String
  }

  type ImageSubscription {
    id: ID!
    alt: String!
    src: ImageSrcSubscription!
  }

  type ProductSubscription {
    id: ID!
    title: String!
    images: [ImageSubscription!]!
    owner: User
    currentPrice: [Price]
  }

  type ConversationSubscription {
    id: ID!
    buyer: User!
    seller: User!
    product: ProductSubscription!
    messages: [Message]
    createdAt: Date!
  }

  type MessageSentSubscription {
    conversation: ConversationSubscription!
    counter: Int!
    name: NotificationName!
  }
`;
