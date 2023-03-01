/* eslint-disable react/jsx-no-constructed-context-values */

import axios from 'axios';
import React, { useState } from 'react';

import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null);

  const logOut = () => {
    localStorage.removeItem('userData');
    setUserData(null);
  };

  const getToken = () => {
    const { token } = JSON.parse(localStorage.getItem('userData'));
    if (token) return token;
    return '';
  };

  const authorizeUser = async (route, data) => {
    const res = await axios.post(route, data);
    localStorage.setItem('userData', JSON.stringify(res.data));
    setUserData(JSON.parse(localStorage.getItem('userData')));
    return res.data;
  };

  return (
    <AuthContext.Provider value={{
      userData,
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
