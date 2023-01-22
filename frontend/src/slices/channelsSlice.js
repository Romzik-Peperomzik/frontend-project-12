import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = {
  currentChannelId: '',
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
  },
});

export const { addChannel, addChannels, setCurrentChannelId } = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
