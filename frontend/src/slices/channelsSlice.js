import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = {
  currentChannelId: '',
  recentlyCreatedChannel: '',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.setAll,
    addChannel: channelsAdapter.addOne,
    setCurrentChannelId: (state, { payload }) => (
      { ...state, currentChannelId: payload }
    ),
    setRecentlyCreatedChannel: (state, { payload }) => (
      { ...state, recentlyCreatedChannel: payload }
    ),
  },
});

export const {
  addChannel, addChannels, setCurrentChannelId, setRecentlyCreatedChannel,
} = channelsSlice.actions;

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
