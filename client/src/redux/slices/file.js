import { createSlice } from "@reduxjs/toolkit";
import { ISSUE_TYPE } from "../constants/type";

function initialState() {
  return {
    configFile: null,
    type: ISSUE_TYPE.CREATE_DOCUMENT.id,
    issueType: null,
    step: 1,
  };
}

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    onConfigFileChange(state, action) {
      state.configFile = action.payload;
    },
    onTypeChange(state, action) {
      state.type = action.payload;
      state.issueType = null;
      state.step = 1;
    },
    onStepChange(state, action) {
      state.step = action.payload;
    },
    onIssueTypeChange(state, action) {
      state.issueType = action.payload;
    },
    resetFile(state) {
      state.configFile = null;
      state.type = ISSUE_TYPE.CREATE_DOCUMENT.id;
      state.issueType = null;
      state.step = 1;
    },
  },
});

export const {
  resetFile,
  onConfigFileChange,
  onTypeChange,
  onStepChange,
  onIssueTypeChange,
} = fileSlice.actions;
export default fileSlice.reducer;
