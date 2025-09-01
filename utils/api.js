import { logNetworkError } from './networkDebug';

const BASE_URL = "https://mypobi.com";

console.log('🌐 API Mode: Real API');

export const apiCall = async (endpoint, options = {}) => {
  console.log(`🌐 API Call: Using real server for ${endpoint}`);

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
    // Use a timeout to handle cases where fetch hangs
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    );

    const response = await Promise.race([
      fetch(url, finalOptions),
      timeoutPromise
    ]);

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
    // Log the error for debugging
    logNetworkError(error, endpoint);
    
    // Check for network-specific errors
    const isNetworkError =
      (error.name === 'TypeError' && (
        error.message === 'Failed to fetch' ||
        error.message.includes('fetch') ||
        error.message.includes('Network')
      )) ||
      error.message === 'Request timeout' ||
      error.code === 'NETWORK_ERROR';

    if (isNetworkError) {
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