import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init';

const runApp = async () => {
  const socket = io();
  const container = document.getElementById('root');
  const root = createRoot(container);
  const vdom = await init(socket);
  root.render(vdom);
};

runApp();
