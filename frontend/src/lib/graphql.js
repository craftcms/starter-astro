export class GraphQLClient {
  constructor(craftUrl) {
    this.craftUrl = craftUrl;
    
    if (!this.craftUrl) {
      throw new Error('Invalid GraphQL URL');
    }

    console.log('GraphQL Client initialized with URL:', this.craftUrl);
  }

  async query(query, variables = {}, options = {}) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      if (options.private) {
        const token = import.meta.env.PUBLIC_GRAPHQL_TOKEN;
        if (!token) {
          throw new Error('GRAPHQL_TOKEN is required for private mutations');
        }
        headers['Authorization'] = `Bearer ${token}`;
      }

      if (options.previewToken) {
        headers['X-Craft-Token'] = options.previewToken;
      }

      const response = await fetch(this.craftUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          query: typeof query === 'string' ? query : query.toString(), 
          variables 
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('GraphQL Response Error:', {
          status: response.status,
          text,
          url: this.craftUrl
        });
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }

      const result = await response.json();

      if (!result || typeof result !== 'object') {
        throw new Error('Invalid response format');
      }

      if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
        throw new Error(result.errors[0]?.message || 'GraphQL error');
      }

      return JSON.parse(JSON.stringify(result.data));
    } catch (err) {
      console.error('GraphQL Error:', {
        message: err.message,
        craftUrl: this.craftUrl,
        query,
        variables
      });
      throw err;
    }
  }
}

const gqlHost = import.meta.env.PUBLIC_GQL_HOST;
if (!gqlHost) {
  throw new Error('PUBLIC_GQL_HOST environment variable is not set');
}
const gqlUrl = new URL(gqlHost).toString();
console.log('Initializing GraphQL client with:', { gqlUrl });
export const craftClient = new GraphQLClient(gqlUrl); 