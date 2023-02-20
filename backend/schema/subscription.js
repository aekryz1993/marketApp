export const subscription = `
  type Subscription {
    tokenRefreshed: TokenSubscription
    messageSent(clientId: String!): MessageSentSubscription
  }
`;
