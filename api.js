async function apiFetcher(url, method = 'GET', body = null, customHeaders = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const options = {
    method: method,
    headers: { ...defaultHeaders, ...customHeaders },
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorData = { message: response.statusText };
      try {
        errorData = await response.json();
      } catch (e) {
        // Ignore
      }
      
      const error = new Error(
        `HTTP error! Status: ${response.status} - ${errorData.message || response.statusText}`
      );
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('API Fetcher failed:', error);
    throw error;
  }
}


async function fetchUsers() {
  try {
    const users = await apiFetcher('https://jsonplaceholder.typicode.com/users');
    console.log('Fetched users:', users.length); 
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
  }
}

fetchUsers();

async function createUser(userData) {
  try {
    const newUser = await apiFetcher(
      'https://jsonplaceholder.typicode.com/users', 
      'POST', 
      userData
    );
    console.log('Created user:', newUser); 
  } catch (error) {
    console.error('Failed to create user:', error.message);
  }
}

const newUser = { name: 'Taanush Abraham', email: 'taanush@example.com' };
createUser(newUser);

async function getMyProfile() {

  try {
    const profile = await apiFetcher(
      'https://jsonplaceholder.typicode.com/users/1',
      'GET',
      null
    );
    console.log('My profile:', profile.name); 
  } catch (error) {
    console.error('Failed to get profile:', error.message);
  }
}

getMyProfile();