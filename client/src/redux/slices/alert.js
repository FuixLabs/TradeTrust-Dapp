import { createSlice } from "@reduxjs/toolkit";
import { ALERT_CONSTANTS } from "../constants/alert.msg";

const AUTO_ALERT_HIDDEN_TIME = 8000;

const initialState = {
  msg: "",
  err: false,
  loading: false,
  visible: false,
  hideTime: AUTO_ALERT_HIDDEN_TIME,
  severity: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showErrorNotification(state, action) {
      const errorMessage = action.payload;
      if (!errorMessage) return;
      state.visible = true;
      state.msg = errorMessage || "Unexpected error.";
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    showInfoNotification(state, action) {
      const errorMessage = action.payload;
      if (!errorMessage) return;
      state.visible = true;
      state.msg = errorMessage || "Unexpected error.";
      state.severity = ALERT_CONSTANTS.INFOR.severity;
    },
    showSuccessNotification(state, action) {
      const successMessage = action.payload;
      if (!successMessage) return;
      state.visible = true;
      state.msg = successMessage || "Unexpected error.";
      state.severity = ALERT_CONSTANTS.SUCCESS.severity;
    },
    hideNotification(state) {
      state.visible = false;
      state.msg = "";
    },
    customError(state, action) {
      state.visible = true;
      state.msg = action.payload.msg;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    createDocumentSuccessfully(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.SUCCESS.createDocument;
      state.severity = ALERT_CONSTANTS.SUCCESS.severity;
    },
    createCredentialSuccessfully(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.SUCCESS.createCredential;
      state.severity = ALERT_CONSTANTS.SUCCESS.severity;
    },
    copyToClipboardSuccessfully(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.SUCCESS.copyToClipboardSuccess;
      state.severity = ALERT_CONSTANTS.SUCCESS.severity;
    },
    revokeDocumentSuccessfully(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.SUCCESS.revokeDocument;
      state.severity = ALERT_CONSTANTS.SUCCESS.severity;
    },

  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
