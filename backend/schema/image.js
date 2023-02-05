export const image = `
  type Image {
    id: ID!
    alt: String
    src: ImageSrc!
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

  input inputProductImage {
    alt: String!
    original: String!
    square: String!
  }
`;
