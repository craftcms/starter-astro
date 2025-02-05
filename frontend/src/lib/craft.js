import { GraphQLClient } from './graphql';

// Use GQL_HOST instead of CRAFT_URL
const gqlHost = import.meta.env.PUBLIC_GQL_HOST;
if (!gqlHost) {
  throw new Error('PUBLIC_GQL_HOST environment variable is not set');
}

// Ensure we have a valid URL
const gqlUrl = new URL(gqlHost).toString();
console.log('Initializing GraphQL client with:', { gqlUrl });

// Create client instance - no need to pass token for public schema
export const craftClient = new GraphQLClient(gqlUrl);