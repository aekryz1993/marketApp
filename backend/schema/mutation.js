export const mutation = `
  type Mutation {
    login(username: String!, password: String!): AuthResponse
    
    refreshToken: AuthResponse
    
    checkToken: AuthResponse
    
    signup(username: String!, password: String!): AuthResponse
    
    logout: LogoutResponse
    
    createProduct(body: InputMutateProduct): MutateProductResponse
    
    updateUser(body: InputUpdateUser): MutationUserResponse

    sendMessageFromBuyer(sellerId: String!, productId: String!, messageText: String!): SendMessageResponse
  }
`;
