/* eslint-disable react/jsx-no-constructed-context-values */

import axios from 'axios';
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

  const getToken = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) return userId.token;
    return {};
  };

  const authorizeUser = async (route, data) => {
    const res = await axios.post(route, data);
    logIn(res.data);
  };

  return (
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      getUsername,
      getToken,
      authorizeUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
