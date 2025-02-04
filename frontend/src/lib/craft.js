import { GraphQLClient } from './graphql';

// Use GQL_HOST instead of CRAFT_URL
const gqlHost = import.meta.env.PUBLIC_GQL_HOST;
if (!gqlHost) {
  throw new Error('PUBLIC_GQL_HOST environment variable is not set');
}

// Read environment variables and ensure proper formatting
const graphqlToken = import.meta.env.PUBLIC_GRAPHQL_TOKEN?.trim();

if (!graphqlToken) {
  console.warn('PUBLIC_GRAPHQL_TOKEN environment variable is not set');
}

// Create client instance
export const craftClient = new GraphQLClient(
  gqlHost,
  import.meta.env.PUBLIC_GRAPHQL_TOKEN
);