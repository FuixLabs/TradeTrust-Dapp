export const connectWallet = async (currNamiWallet) => {
  if (!currNamiWallet) {
    return await window?.cardano?.nami?.enable();
  }
};

export const getUsedAddresses = async (currNamiWallet) => {
  return await currNamiWallet.getUsedAddresses().then((addresses) => {
    if (addresses.length > 0) {
      return addresses[0];
    }
  });
};

export const getBalance = async (currNamiWallet) => {
  return await currNamiWallet.getUsedAddresses().then((balance) => {
    return balance;
  });
};
