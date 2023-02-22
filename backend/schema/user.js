export const user = `
  type User {
    id: ID!
    username: String!
    currency: Currency
    profilePicture: Image
    location: Location
    buyingConversations: [Conversation]
    sellingConversations: [Conversation]
    notifications: [Notification]
    createdAt: Date!
    updatedAt: Date!
  }

  input InputUpdateUser {
    username: String
    locationId: String
    password: String
    currency: Currency
  }

  type MutationUserResponse {
    user: User
    message: String!
    statusCode: Int!
  }
`;
