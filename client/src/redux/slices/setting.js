import { createSlice } from "@reduxjs/toolkit";

function initialState() {
  return {
    openSidebar: false,
    connecting: true,
    confirmOpen: false,
    redirectUrl: ''
  };
}

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    openSidebar(state) {
      state.openSidebar = !state.openSidebar;
    },
    connectSuccess(state) {
      state.connecting = true;
    },
    connectFail(state) {
      state.connecting = false;
    },
    handleChangeConfirm(state) {
      state.confirmOpen = !state.confirmOpen;
    },
    handleCloseConfirm(state) {
      state.confirmOpen = false;
    },
    handleRedirect(state, action) {
      state.redirectUrl = action.payload;
    }
  },
});

export const settingActions = settingSlice.actions;
export default settingSlice.reducer;
