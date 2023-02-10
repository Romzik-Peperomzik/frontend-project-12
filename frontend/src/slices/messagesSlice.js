/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';
import fetchData from './fetchThunk';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.setAll(state, payload.messages);
      })
      .addCase(removeChannel, (state, { payload }) => {
        const restEntities = Object.values(state.entities)
          .filter((message) => message.channelId !== payload);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
