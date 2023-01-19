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
    location: String
    sold: Boolean!
    stock: Int!
    ownerId: ID!
    currentPrice: Price
    previousPrice: Price
    createdAt: Date!
    updatedAt: Date!
  }

  type Price {
    id: ID!
    amount: Float!
    currency: Currency!
    productOfCurrentPriceId: String
    productOfPreviousPriceId: String
  }

  type Image {
    id: ID!
    alt: String
    src: ImageSrc!
    productId: ID!
  }

  type ImageSrc {
    id: ID!
    original: String!
    square: String
    large2x: String
    large: String
    medium: String
    small: String
    portrait: String
    landscape: String
    tiny: String
  }

  type ProductsResponse {
    products: [Product]
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    statusCode: Int!
  }

  type CreateProductResponse {
    product: Product
    message: String!
    statusCode: Int!
  }

  input InputMutateProduct {
    title: String!
    price: Float
    description: String
    category: Category
    images: [String!]!
    brand: String
    location: String
    stock: Int
    condition: Condition
    tags: [String]
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
    location: String
  }
`;
