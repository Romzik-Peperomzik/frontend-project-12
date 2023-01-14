import { createRoot } from 'react-dom/client';
import React from 'react';

import Component from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Component />);
