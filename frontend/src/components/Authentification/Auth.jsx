import { createContext, useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('session') === 'true'
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {}
  );

  const login = () => {
    fetchAPI(setUser, 'users/connection');
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(null);
    localStorage.removeItem('session');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
