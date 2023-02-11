/* eslint-disable react/jsx-no-constructed-context-values */

import axios from 'axios';
import React, { useState } from 'react';

import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userId')) || null);

  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const getToken = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) return userId.token;
    return {};
  };

  const authorizeUser = async (route, data) => {
    const res = await axios.post(route, data);
    localStorage.setItem('userId', JSON.stringify(res.data));
    setUser(JSON.parse(localStorage.getItem('userId')));
    return res.data;
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      logOut,
      getToken,
      authorizeUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
