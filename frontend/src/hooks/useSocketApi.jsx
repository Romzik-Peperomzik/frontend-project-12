import { useContext } from 'react';

import socketApiContext from '../contexts/socketApiContext';

const useSocketApi = () => useContext(socketApiContext);

export default useSocketApi;
