import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/index';

const ChatPage = () => {
  const auth = useAuth();

  return (
    <div>
      {!auth.loggedIn && (
        <Navigate to="/login" />
      )}
      <div>Chat page</div>
    </div>
  );
};

export default ChatPage;
