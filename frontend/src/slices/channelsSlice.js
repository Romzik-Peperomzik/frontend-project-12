/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import fetchData from './fetchThunk';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: '',
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.setAll,
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      if (state.currentChannelId === id) state.currentChannelId = 1;
      delete state.entities[id];
      state.ids = state.ids.filter((channelId) => channelId !== id);
    },
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => (
      { ...state, currentChannelId: payload }
    ),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        channelsAdapter.setAll(state, channels);
        state.currentChannelId = currentChannelId;
      });
  },
});

export const {
  addChannel, addChannels, setCurrentChannelId, renameChannel, removeChannel,
} = channelsSlice.actions;

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
