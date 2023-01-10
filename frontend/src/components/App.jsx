import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Homepage from './Homepage';
import Notfoundpage from './Notfoundpage';

const App = () => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm">
        <Link className="App-link" to="/">Home</Link>
        <Link className="App-link" to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </div>
  </div>
);

export default App;
