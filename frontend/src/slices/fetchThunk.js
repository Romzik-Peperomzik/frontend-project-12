import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'chatPage/fetchData',
  async (headers) => {
    const response = await axios.get(routes.usersPath(), { headers });
    return response.data;
  },
);

export default fetchData;
