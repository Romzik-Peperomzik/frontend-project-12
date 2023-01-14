/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: '',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.channels.unshift(channel);
    },
    addChannels: (state, { payload: { channels } }) => {
      state.channels = channels;
    },
    setCurrentChannelId: (state, { payload: { currentChannelId } }) => {
      state.currentChannelId = currentChannelId;
    },
  },
});

export const { addChannel, addChannels, setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
