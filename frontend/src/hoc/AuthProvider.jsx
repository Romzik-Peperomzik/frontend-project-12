/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null);

  const logIn = ({ data }) => {
    localStorage.setItem('userData', JSON.stringify(data));
    setUserData(JSON.parse(localStorage.getItem('userData')));
    return data;
  };

  const logOut = () => {
    localStorage.removeItem('userData');
    setUserData(null);
  };

  const getToken = () => {
    const { token } = JSON.parse(localStorage.getItem('userData'));
    if (token) return token;
    return '';
  };

  return (
    <AuthContext.Provider value={{
      userData,
      logIn,
      logOut,
      getToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
