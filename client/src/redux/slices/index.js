import fileReducer from './file';
import alertReducer from './alert';
import walletSlice from './wallet';
import documentSlice from './document';
import settingSlice from './setting';
import didSlice from './did';

let rootReducer = {
  fileReducer: fileReducer,
  alertReducer: alertReducer,
  walletReducer: walletSlice,
  documentReducer: documentSlice,
  settingReducer: settingSlice,
  didReducer: didSlice,
};

export default rootReducer;
