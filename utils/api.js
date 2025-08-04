import { logNetworkError } from './networkDebug';

const BASE_URL = "http://164.90.238.202:8000";

export const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);
    
    // Check if response is ok
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.detail || errorMessage;
      } catch {
        // If JSON parsing fails, use the default error message
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    // Try to parse JSON response
    try {
      return await response.json();
    } catch {
      // If not JSON, return null
      return null;
    }
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      const networkError = new Error('Network error: Unable to connect to server. Please check your internet connection and try again.');
      networkError.isNetworkError = true;
      throw networkError;
    }
    
    // Re-throw other errors
    throw error;
  }
};

export const apiCallWithAuth = async (endpoint, token, options = {}) => {
  return apiCall(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};
