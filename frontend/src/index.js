import ReactDOM from 'react-dom/client';
import init from './init';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(init());
};

app();
