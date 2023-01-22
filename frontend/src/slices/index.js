import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
