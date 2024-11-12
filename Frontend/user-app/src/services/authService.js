const API_URL = '/api';

export const authenticateUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};