/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.messages.unshift(message);
    },
    addMessages: (state, { payload: { messages } }) => {
      state.messages = messages;
    },
  },
});

export const { addMessage, addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
