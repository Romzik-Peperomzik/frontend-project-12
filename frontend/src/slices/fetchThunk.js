import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'chatPage/fetchData',
  async (headers, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.usersPath(), { headers });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export default fetchData;
