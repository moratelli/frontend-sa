export const TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const setUserData = (data) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
};
export const getUserData = () => JSON.parse(localStorage.getItem(USER_DATA_KEY));
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
