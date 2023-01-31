export const location = `
  type Location {
    id: ID!
    name: String!
    latitude: Float!
    longitude: Float!
    countryCode: String!
  }

  type LocationsResponse {
    locations: [Location]
    statusCode: Int!
  }
`;
