import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

const init = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

export default init;
