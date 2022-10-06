import { createSlice } from '@reduxjs/toolkit';
import { readCookie, eraseCookie } from '../../utils/cookies';

const access_token = window.location.search.split('?access_token=')[1] || readCookie('access_token') || null;
function initialState() {
  return {
    currWallet: null,
    usedAddress: null,
    access_token: access_token || null,
    isAuth: access_token ? true : false,
  };
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connectToWallet(state, action) {
      state.currWallet = action.payload.currWallet;
      state.usedAddress = action.payload.address;
    },
    resetState(state) {
      eraseCookie('access_token');
      state.currWallet = null;
      state.usedAddress = null;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { connectToWallet, resetState, setAuth } = walletSlice.actions;
export default walletSlice.reducer;
