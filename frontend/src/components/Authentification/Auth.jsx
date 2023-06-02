import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('session') !== null) {
      const data = { session: localStorage.getItem('session'), id: user.id };
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}users/token`, data)
        .then((response) => {
          if (response.data.answer) {
            setIsAuthenticated(true);
            setUser(response.data);
          } else {
            setIsAuthenticated(false);
            console.log('dommage');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log('test');
      setRedirect(true);
      const data = { id: 1 };
      //axios
      //  .post(`${import.meta.env.VITE_BACKEND_URL}users/token/new`, data)
      //  .then((response) => {
      //    setIsAuthenticated(true);
      //    localStorage.setItem('session', response.data.cookieSession);
      //  })
      //  .catch((error) => {
      //    console.error(error);
      //  });
    }
  }, []);

  const login = () => {};

  const logout = () => {
    setIsAuthenticated(false);
    setUser({});
    localStorage.removeItem('session');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
