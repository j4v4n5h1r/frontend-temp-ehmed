// Mock API responses for development when backend is unavailable
export const mockApiResponses = {
  '/api/v1/auth/login': {
    method: 'POST',
    response: {
      accessToken: 'mock-jwt-token-12345',
      user: {
        id: 1,
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    }
  },
  '/api/v1/auth/register': {
    method: 'POST', 
    response: {
      accessToken: 'mock-jwt-token-12345',
      user: {
        id: 1,
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    }
  },
  '/api/v1/users/me': {
    method: 'GET',
    response: {
      id: 1,
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date().toISOString()
    }
  }
};

export const mockApiCall = async (endpoint, options = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mock = mockApiResponses[endpoint];
  
  if (!mock) {
    throw new Error(`Mock API: Endpoint ${endpoint} not found`);
  }
  
  if (options.method && options.method !== mock.method) {
    throw new Error(`Mock API: Method ${options.method} not allowed for ${endpoint}`);
  }
  
  // Simulate authentication check for protected endpoints
  if (endpoint === '/api/v1/users/me') {
    const authHeader = options.headers?.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }
  }
  
  return mock.response;
};

export const isMockMode = () => {
  return process.env.NODE_ENV === 'development' && 
         (typeof window !== 'undefined' && window.location.search.includes('mock=true'));
};
