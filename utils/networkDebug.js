export const testNetworkConnection = async () => {
  const BASE_URL = "http://164.90.238.202:8000";

  try {
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timeout')), 5000)
    );

    // Race between fetch and timeout
    const response = await Promise.race([
      fetch(BASE_URL + '/health', { method: 'GET' }),
      timeoutPromise
    ]);

    return {
      success: true,
      status: response.status,
      message: `Server reachable (${response.status})`,
    };
  } catch (error) {
    if (error.message === 'Connection timeout') {
      return {
        success: false,
        error: 'timeout',
        message: 'Connection timeout - server may be down or unreachable',
      };
    }

    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      return {
        success: false,
        error: 'network',
        message: 'Network error - check internet connection and CORS settings',
      };
    }

    return {
      success: false,
      error: 'unknown',
      message: error.message,
    };
  }
};

export const logNetworkError = (error, endpoint) => {
  console.group(`🚨 Network Error: ${endpoint}`);
  console.error('Error:', error);
  console.log('Error type:', error.name);
  console.log('Error message:', error.message);
  console.log('Is network error:', error.isNetworkError);
  console.log('Status:', error.status);
  console.groupEnd();
};
