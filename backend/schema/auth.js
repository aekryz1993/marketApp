export const auth = `
  type AuthResponse {
    user: User!
    token: String!
    expiresIn: Date!
    statusCode: Int!
  }
  
  type LogoutResponse {
    statusCode: Int!
  }

  type TokenSubscription {
    token: String!
    expiresIn: Date!
  }
`