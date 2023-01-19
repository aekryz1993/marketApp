export const tag = `
  type Tag {
    id: ID!
    text: String!
    productId: ID!
  }

  type TagsResponse {
    tags: [Tag]
    statusCode: Int!
  }
`;
