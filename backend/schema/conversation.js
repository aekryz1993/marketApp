export const conversation = `
  type Conversation {
    id: ID!
    buyer: User!
    seller: User!
    product: Product!
    messages: [Message]
    createdAt: Date!
  }
`;
