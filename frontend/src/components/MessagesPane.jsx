import React from 'react';

const MessagesPane = () => {
  const foo = 'Введите сообщение';
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small"># general</div>
      <div className="chat-messages overflow-auto px-5">fef: htgh</div>
      <div className="mt-auto px-5 py-3">{foo}</div>
    </>
  );
};

export default MessagesPane;
