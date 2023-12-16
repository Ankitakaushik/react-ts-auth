const apiUrl = 'https://reqres.in/api';

export const authService = {
  signIn: async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return await response.json();
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  },
  signUp: async (user: { email: string; password: string }) => {
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return await response.json();
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  },
};