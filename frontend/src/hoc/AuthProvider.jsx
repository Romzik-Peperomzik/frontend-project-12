/* eslint-disable react/jsx-no-constructed-context-values */

import React, { useState } from 'react';
import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getUsername = () => {
    const user = JSON.parse(localStorage.getItem('userId'));
    return user.username;
  };

  return (
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      getUsername,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
