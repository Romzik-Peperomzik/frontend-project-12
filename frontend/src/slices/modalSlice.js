import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: 'none',
    item: null,
  },
  reducers: {
    showModal: (state, { payload }) => ({
      ...state, isOpen: true, type: payload.type, item: payload.item || null,
    }),
    hideModal: (state) => ({
      ...state, isOpen: false, type: 'none', item: null,
    }),
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
