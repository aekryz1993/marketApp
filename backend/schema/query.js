export const query = `
  type Query {
    products(
      pagination: InputPagination
      search: String
      currency: Currency
      orderBy: InputOrderBy
      filterBy: InputFilterBy
    ): ProductsResponse

    tags(
      pagination: InputPagination
      search: String!
    ): TagsResponse

    locations(
      pagination: InputPagination
      search: String!
    ): LocationsResponse

    product(productId: String!): ProductResponse
  }
`;
