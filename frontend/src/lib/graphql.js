export class GraphQLClient {
  constructor(craftUrl, token = null) {
    this.craftUrl = craftUrl;
    this.token = token;
    
    console.log('GraphQL Client initialized with:', {
      url: this.craftUrl,
      hasToken: !!this.token
    });
  }

  async query(query, variables = {}, options = {}) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      if (options.preview && this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await fetch(`${this.craftUrl}/api`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables })
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'GraphQL error');
      }

      return result.data;
    } catch (err) {
      console.error('GraphQL Error:', err);
      throw err;
    }
  }
} 