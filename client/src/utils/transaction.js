import { requestPullTransactions } from '../rest/client.rest';
import { CLIENT_PATH } from '../rest/client.path';
import { ERROR_MSG } from '../constants/error';
import { unsalt } from './data';
import { requestVerifyCNFT, _pullNFTs } from '../rest/client.rest';
import { pullCredential } from 'utils/document';
import { generateDid } from 'fuixlabs-documentor/utils/did';
import { COMPANY_NAME } from 'constants/app';
import { pullTransaction, pullCredentials } from 'redux/slices/document';
import { alertActions } from 'redux/slices/alert';

/**
 * Get transaction with given did
 * @param {String} did
 * @return {Promise}
 */
export const pullTransactions = async (did) => {
  try {
    const transactions = await requestPullTransactions(CLIENT_PATH.PULL_TRANSACTIONS, { did });
    let formatTransactions = [];
    let credentials = [];
    for (let i = 0; i < transactions?.data.length; i++) {
      let credentialResult = await getCNFTs(transactions?.data[i].mintingNFTConfig?.policy?.id);
      credentials = [...credentials, ...credentialResult];
      let filteredTransaction = await filterTransaction(transactions.data[i]);
      filteredTransaction = { ...filteredTransaction, config: transactions.data[i].mintingNFTConfig };
      formatTransactions = [...formatTransactions, filteredTransaction];
    }
    return { formatTransactions, credentials };
  } catch (e) {
    throw ERROR_MSG.CANNOT_PULL_TRANSACTIONS;
  }
};

/**
 * Pull transaction with given address
 * @param {String} address
 * @param {String} function
 */
export async function _pullTransactions(address, dispatch) {
  try {
    const { formatTransactions, credentials } = await pullTransactions(generateDid(COMPANY_NAME, address));
    if (formatTransactions.length !== 0) {
      await dispatch(pullTransaction(formatTransactions));
    }
    if (credentials.length !== 0) await dispatch(pullCredentials(credentials));
  } catch (e) {
    dispatch(alertActions.customError({ msg: e }));
  }
}

/**
 * @param {Object} data
 * @return {Promise}
 */
const filterTransaction = async (data) => {
  let status = 'Revoked';
  try {
    const verifyRes = await requestVerifyCNFT(CLIENT_PATH.VERIFY_CNFT, {
      hashOfDocument: data?.signature?.targetHash,
      policyId: data?.mintingNFTConfig?.policy?.id,
    });
    // * I am so sorry about this
    if (verifyRes?.data?.asset) status = 'Issued';
    return {
      fileName: unsalt(data?.data?.fileName),
      documentHash: data?.signature?.targetHash,
      policyId: data?.mintingNFTConfig?.policy?.id,
      status: status,
      type: verifyRes.data.asset
        ? verifyRes.data.onchainMetadata[verifyRes?.data?.policyId][verifyRes?.data?.assetName].type
        : 'Empty',
    };
  } catch (e) {
    throw e;
  }
};

async function getCNFTs(policyId) {
  try {
    let CNFTs = await _pullNFTs(CLIENT_PATH.PULL_NFTS, {
      policyId: policyId,
    });
    CNFTs = CNFTs?.data?.filter((_item) => _item.onchainMetadata[_item.policyId][_item.assetName].type);
    CNFTs?.sort(
      (a, b) =>
        a.onchainMetadata[a.policyId][a.assetName].timestamp - b.onchainMetadata[b.policyId][b.assetName].timestamp
    );
    let credentials = [];
    for (let i = 0; i < CNFTs.length; i++) {
      if (CNFTs[i].onchainMetadata[CNFTs[i].policyId][CNFTs[i].assetName].type === 'credential') {
        let credential = await pullCredential(CNFTs[i].assetName);
        credentials = [...credentials, credential?.data];
      }
    }
    return credentials;
  } catch (e) {
    throw e;
  }
}
