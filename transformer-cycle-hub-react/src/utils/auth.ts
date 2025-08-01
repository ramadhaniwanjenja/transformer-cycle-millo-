// Authentication utility functions
export const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  const authStatus = localStorage.getItem('isAuthenticated') === 'true';
  return !!(token && authStatus);
};

export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};

export const isAdmin = () => {
  const userData = getUserData();
  return userData?.role === 'admin';
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('isAuthenticated');
  window.location.href = '/login';
};

export const setAuthData = (data: any) => {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('userData', JSON.stringify(data.user));
  localStorage.setItem('isAuthenticated', 'true');
}; 