import { GraphQLClient } from './graphql';

// Read environment variables and ensure proper formatting
const craftUrl = import.meta.env.GQL_HOST?.trim();
const graphqlToken = import.meta.env.GRAPHQL_TOKEN?.trim();

if (!craftUrl) {
  console.error('GQL_HOST environment variable is not set');
}

if (!graphqlToken) {
  console.warn('GRAPHQL_TOKEN environment variable is not set');
}

// Create client instance
export const craftClient = new GraphQLClient(craftUrl, graphqlToken);