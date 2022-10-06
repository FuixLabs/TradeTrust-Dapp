import { createSlice } from '@reduxjs/toolkit';

function initialState() {
  return {
    fetching: true,
    currDocuments: [],
    successDocuments: [],
    verifyDocument: {
      verified: false,
      data: {},
      errorMgs: null,
    },
    updateDocument: null,
    revokeDocument: null,
    transactions: [],
    credentials: []
  };
}

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    uploadVerifyDocument(state, action) {
      state.verifyDocument.data = action.payload;
    },
    invalidDocument(state, action) {
      state.verifyDocument.verified = false;
      state.verifyDocument.errorMgs = action.payload;
    },
    resetVerifyDocument(state) {
      state.verifyDocument.verified = false;
      state.verifyDocument.data = {};
      state.verifyDocument.errorMgs = null;
    },
    setValidDocument(state) {
      state.verifyDocument.verified = true;
    },
    updateSuccessDocument(state, action) {
      state.successDocuments = [...state.successDocuments, action.payload];
    },
    updateCurrentDocument(state, action) {
      state.currDocuments = [...state.currDocuments, action.payload];
    },
    onCurrentDocumentChange(state, action) {
      const { index, prop, formIndex } = action.payload;
      if (formIndex) state.currDocuments[index][prop][formIndex] = action.payload.data;
      else state.currDocuments[index][prop] = action.payload.data;
    },
    onUpdatePrivateFields(state, action) {
      
    },
    onCurrentUpdatedDocumentChange(state, action) {
      const { prop, formIndex } = action.payload;
      if (formIndex) state.updateDocument.data[prop][formIndex] = action.payload.data;
      else state.updateDocument.data[prop] = action.payload.data;
    },
    resetDocuments(state) {
      state.currDocuments = [];
      state.successDocuments = [];
      state.verifyDocument = {
        verified: false,
        data: {},
        errorMgs: null,
      };
      state.updateDocument = null;
      state.revokeDocument = null;
    },
    fillDocument(state, action) {
      const index = action.payload.index;
      state.currDocuments[index] = action.payload.data;
    },
    updateIssuedDocument(state, action) {
      const { index } = action.payload;
      state.successDocuments[index] = [...state.successDocuments, action.payload.data];
    },
    onChangeUpdatedDocument(state, action) {
      state.updateDocument = action.payload;
    },
    onChangeRevokedDocument(state, action) {
      state.revokeDocument = action.payload;
    },
    pullTransaction(state, action) {
      state.transactions = action.payload;
    },
    pullCredentials(state, action) {
      state.credentials = action.payload;;
    },
    addAttachment(state, action) {
      const { index, data } = action.payload;
      state.currDocuments[index] = { ...state.currDocuments[index], attachment: data };
    },
    updateFetchingSuccessful(state) {
      state.fetching = false;
    },
    updateFetching(state, action) {
      state.fetching = action.payload;
    },
    resetTransactions(state) {
      state.transactions = [];
      state.credentials = []
    }
  },
});

export const {
  setValidDocument,
  uploadVerifyDocument,
  invalidDocument,
  resetVerifyDocument,
  updateSuccessDocument,
  updateCurrentDocument,
  onCurrentDocumentChange,
  resetDocuments,
  fillDocument,
  updateIssuedDocument,
  onChangeUpdatedDocument,
  onCurrentUpdatedDocumentChange,
  pullTransaction,
  addAttachment,
  updateFetchingSuccessful,
  onChangeRevokedDocument,
  pullCredentials,
  onUpdatePrivateFields,
  updateFetching,
  resetTransactions
} = documentSlice.actions;
export default documentSlice.reducer;
