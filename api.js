const apiFetcher = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Fetcher failed:', error);
  }
};


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
    const response = await apiFetcher(
      'https://jsonplaceholder.typicode.com/users'
    );
    console.log('Called /users endpoint:', response.length); 
  } catch (error) {
    console.error('Failed to create user:', error.message);
  }
}

const newUser = { name: 'Taanush Abraham', email: 'taanush@example.com' };
createUser(newUser);

async function getMyProfile() {
  try {
    const profile = await apiFetcher(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    console.log('My profile:', profile.name); 
  } catch (error) {
    console.error('Failed to get profile:', error.message);
  }
}

getMyProfile();
