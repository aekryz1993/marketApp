export const mutation = `
  type Mutation {
    login(username: String!, password: String!): AuthResponse
    
    refreshToken: AuthResponse
    
    checkToken: AuthResponse
    
    signup(username: String!, password: String!): AuthResponse
    
    logout: LogoutResponse
    
    createProduct(args: InputMutateProduct): MutateProductResponse
    
    updateUser(args: InputUpdateUser): MutationUserResponse
    
  }
`;
