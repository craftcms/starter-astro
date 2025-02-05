export class GraphQLClient {
  constructor(craftUrl) {
    // Store the original URL string without trying to parse it
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

      // For Craft preview, we need to use the token as a query parameter
      let url = this.craftUrl;
      if (options.preview && options.token) {
        // Append token to URL for preview requests
        const previewUrl = new URL(this.craftUrl);
        previewUrl.searchParams.set('token', options.token);
        url = previewUrl.toString();
      }

      console.log('GraphQL Request:', {
        url,
        headers,
        query,
        variables,
        preview: options.preview,
        hasToken: !!options.token
      });

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          query: typeof query === 'string' ? query : query.toString(), 
          variables 
        })
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('GraphQL Response Error:', {
          status: response.status,
          text,
          url
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
        throw new Error(result.errors[0]?.message || 'GraphQL error');
      }

      return result.data;
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