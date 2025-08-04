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
  },
  '/api/v1/stations': {
    method: 'GET',
    response: [
      {
        id: "STATION001",
        name: "Central Station",
        location: "Downtown Mall, Level 1",
        status: "ACTIVE",
        availablePowerbanks: 8,
        totalPowerbanks: 12,
        coordinates: { lat: 40.7589, lng: -73.9851 }
      },
      {
        id: "STATION002",
        name: "Airport Terminal",
        location: "International Airport, Gate A",
        status: "ACTIVE",
        availablePowerbanks: 5,
        totalPowerbanks: 10,
        coordinates: { lat: 40.6892, lng: -74.1745 }
      },
      {
        id: "STATION003",
        name: "University Campus",
        location: "Student Center, Main Floor",
        status: "MAINTENANCE",
        availablePowerbanks: 0,
        totalPowerbanks: 8,
        coordinates: { lat: 40.7505, lng: -73.9934 }
      },
      {
        id: "STATION004",
        name: "Coffee Shop",
        location: "Main Street Café",
        status: "OFFLINE",
        availablePowerbanks: 0,
        totalPowerbanks: 6,
        coordinates: { lat: 40.7282, lng: -73.7949 }
      },
      {
        id: "STATION005",
        name: "Shopping Center",
        location: "West Side Mall, Food Court",
        status: "ACTIVE",
        availablePowerbanks: 12,
        totalPowerbanks: 15,
        coordinates: { lat: 40.7614, lng: -73.9776 }
      }
    ]
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
