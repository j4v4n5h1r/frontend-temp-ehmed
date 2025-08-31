async function authFetch(url, options = {}) {
  const token = localStorage.getItem('token');

  options.headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };

  const response = await fetch(url, options);

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (response.ok) {
    return response.json();
  }

  throw new Error('Network response was not ok.');
}

export default authFetch;
