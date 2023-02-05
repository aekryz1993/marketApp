export const product = `
  type Product {
    id: ID!
    title: String!
    images: [Image!]!
    tags: [Tag]
    description: String
    condition: Condition
    category: Category
    brand: String
    location: Location
    sold: Boolean!
    stock: Int!
    ownerId: ID!
    currentPrice: [Price]
    previousPrice: [Price]
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductsResponse {
    products: [Product]
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    statusCode: Int!
  }

  type MutateProductResponse {
    product: Product!
    message: String!
    statusCode: Int!
  }

  type CreateProductResponse {
    product: Product
    message: String!
    statusCode: Int!
  }
  
  input InputOrderBy {
    price: OrderBy
    createdAt: OrderBy
  }

  input InputPagination {
    skip: Int
    take: Int
  }

  input InputFilterBy {
    ownProducts: Boolean
    priceMin: Float
    priceMax: Float
    category: Category
    condition: Condition
    locationId: String
  }

  input InputMutateProduct {
    title: String!
    images: [inputProductImage!]!
    brand: String
    description: String
    currency: Currency!
    category: Category!
    condition: Condition
    sold: Boolean
    stock: Int
    locationId: String
    price: Float!
    tags: [String]
  }
`;
