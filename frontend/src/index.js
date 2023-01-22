import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init';

const runApp = () => {
  const socket = io();
  const container = document.getElementById('root');
  const root = createRoot(container);
  const vdom = init(socket);
  root.render(vdom);
};

runApp();
