export const ALERT_CONSTANTS = {
  SUCCESS: {
    severity: 'success',
    walletConnection: 'Connect wallet successfully!',
    login: 'Login successfully!',
    createDocument: 'Create document successfully!',
    createCredential: 'Create credential successfully!',
    copyToClipboardSuccess: 'Copy to clipboard successfully!',
    revokeDocument: 'Revoke document successfully!',
    addNewIssuer: 'Add new issuer successfully!',
    removeIssuer: 'Remove issuer successfully!',
    updateIssuer: 'Update information of user successfully!'
  },
  ERROR: {
    severity: 'error',
    invalidExtension: 'The extension is invalid!',
    emptyFile: 'Please select which document that you want to upload!',
    client: 'There are some some errors while uploading file! Please try again later!',
    cannotConnectWallet: 'Cannot connect to your wallet! Please try again later!',
    missingIssueType: 'Please select which document that you want to upload!',
    storeHash: 'Cannot store hash! Please try again later!',
    createDocument: 'Cannot create document because there are some problems with our server! Please try again later!',
    server: 'There are some problem with our server! Please try again later!',
    exportFillSchema: 'Cannot export fill schema! Please try again later!',
    readFillSchema: 'Cannot read fill schema! Please try again later!',
    permissions: 'You do not have permission to edit this document! Please contact the owner for more information!',
    transferPermission:
      'You do not have permission to transfer this document! Please contact the owner for more information!',
    getDidDocument: 'Cannot get did document! Please try again later!',
    getContentDocument: 'Cannot get content document! Please try again later!',
    convertToJson: 'Cannot convert to json! Please try again later!',
    unexpectedError: 'Unexpected error!',
    pullNfts: 'Cannot pull nfts! Please try again later!',
    cannotCopyToClipboard: 'Cannot copy to clipboard! Please try again later!',
    cannotRevokeDocument: 'Cannot revoke document! Please try again later!',
    permissionsToUpdateDocument: 'You do not have permission to update this document! Please contact the owner for more information!',
    invalidAccessToken: 'Your access token is out of date or unauthorized! Please login again!',
    cannotRetrieveAllDis: 'Cannot retrieve all dids of company! Please try again later',
    cannotRetrieveSpecific: 'Cannot retrieve did of current! Please try again later!'
  },
  INFOR: {
    severity: 'info',
    waitForFetchingData: 'Please wait for fetching data! Please try again later!',
  }
};
