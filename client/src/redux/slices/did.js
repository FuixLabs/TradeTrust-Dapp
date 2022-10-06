import { createSlice } from '@reduxjs/toolkit';

function initialState() {
  return {
    dids: [],
    currentUserDid: null,
  };
}

const didSlice = createSlice({
  name: 'did',
  initialState,
  reducers: {
    updateDids(state, action) {
      state.dids = action.payload;
    },
    updateCurrentUserDid(state, action) {
      state.currentUserDid = action.payload;
    },
  },
});

export const didActions = didSlice.actions;
export default didSlice.reducer;
