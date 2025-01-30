export class GraphQLClient {
  constructor(craftUrl, token = null) {
    this.craftUrl = craftUrl;
    this.token = token;
    
    // Debug info
    console.log('GraphQL Client initialized with:', {
      url: this.craftUrl,
      hasToken: !!this.token
    });
  }

  async query(query, variables = {}, options = {}) {
    try {
      if (!this.craftUrl) {
        throw new Error('CRAFT_URL is not configured');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      // Add auth header if private flag is true
      if (options.private && this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      // Add preview token if provided
      if (options.previewToken) {
        headers['X-Craft-Token'] = options.previewToken;
      }

      // Log the full request details
      console.log('Full GraphQL Request:', {
        url: this.craftUrl,
        headers,
        query,
        variables
      });

      const response = await fetch(this.craftUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables
        }),
        credentials: 'include'
      });

      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Failed to parse response: ${responseText}`);
      }

      // Debug response
      console.log('GraphQL Response:', {
        hasData: !!result.data,
        hasErrors: !!result.errors,
        data: result.data ? 'Present' : 'None'
      });

      if (result.errors) {
        console.error('GraphQL Response Errors:', result.errors);
        throw new Error(result.errors[0]?.message || 'GraphQL error');
      }

      return result.data;
    } catch (err) {
      console.error('GraphQL Error:', {
        message: err.message,
        craftUrl: this.craftUrl,
        token: this.token ? '[REDACTED]' : 'none',
        stack: err.stack
      });
      throw err;
    }
  }
} 