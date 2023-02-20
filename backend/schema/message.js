export const message = `
  type Message {
    id: ID!
    text: String!
    ownerId: String!
    conversationId: String!
  }

  type SendMessageResponse {
    message: Message
    statusCode: Int!
  }

  type MessageSentSubscription {
    counter: Int!
    name: NotificationName!
  }
`;
