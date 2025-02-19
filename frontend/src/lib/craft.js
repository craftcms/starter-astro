import { GraphQLClient } from './graphql';

const gqlHost = import.meta.env.PUBLIC_GQL_HOST;
if (!gqlHost) {
  throw new Error('PUBLIC_GQL_HOST environment variable is not set');
}

const gqlUrl = new URL(gqlHost).toString();
console.log('Initializing GraphQL client with:', { gqlUrl });

export const craftClient = new GraphQLClient(gqlUrl);