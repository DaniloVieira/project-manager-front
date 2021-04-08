import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = `@PMANAGER_TOKEN`;
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getUserLogado = () => {
  // const token = localStorage.getItem(TOKEN_KEY);
  const token = getToken();
  if (token) {
    return jwtDecode(token);
    // return token;
  }
  return null;
};
