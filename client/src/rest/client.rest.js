import axiosClient from './client.base';
import axios from 'axios';
const BASE_URL = '';

/**
 * 
 * @param {String} path 
 * @param {Object} data 
 * @return {Promise}
 */
export const sendWrappedDocument = async (path, data) => {
  return await axios.post(`${BASE_URL}${path}`, data);
};

/**
 * Call cardano service for verifying CNFT
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestVerifyCNFT = async (path, data) => {
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: data,
  });
};

export const requestGetCNFTs = async (path, data) => {
  const { policyId } = data;
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: {
      policyId,
    },
  });
};

/**
 * Call cardano service for verifying signature rely on targetHash and public-key
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestVerifySignature = async (path, data) => {
  const { address, payload, signature } = data;
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: {
      address,
      payload,
      signature,
    },
  });
};

/**
 * Check the exists of did's wrapped document through url resolver
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const checkExistsDidoWrappedDoc = async (path, data) => {
  return await axiosClient.get(`${BASE_URL}${path}`, { headers: data });
};

/**
 * Get did-document by did of wrapped-document
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */

export const getDidDocumentByDid = async (path, data) => {
  const { did, exclude } = data;
  // * only parameter to represent when you need to get a specific object from the DIDController side
  const queryParams = `?only=${exclude}`;
  return await axiosClient.get(`${BASE_URL}${path}${queryParams}`, {
    headers: {
      did: did,
    },
  });
};

/**
 * Get list of nfts from cardano service by policy-id
 * @param {String} path
 * @param {Object} data - example: {policyId: 'xxxx'}
 * @return {Promise}
 */
export const _pullNFTs = async (path, data) => {
  const { policyId } = data;
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: {
      policyId: policyId,
    },
  });
};

/**
 * Get list of transactions from cardano service throw did resolver
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestPullTransactions = async (path, data) => {
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: data,
  });
};

/**
 * Request did resolver for creating new credential
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestCreateCredential = async (path, data) => {
  return await axiosClient.post(`${BASE_URL}${path}`, data);
};

/**
 * Get encoded public key from did resolver by address got from nami wallet
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestPublicKey = async (path, data) => {
  const { address, user } = data;
  return await axiosClient.get(`${BASE_URL}${path}?address=${address}&&user=${user}`);
};

/**
 * Change did of user
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestUpdateDidDocument = async (path, data) => {
  return await axiosClient.put(`${BASE_URL}${path}`, data);
};

/**
 * Request verify the access token from did resolver
 * @param {String} path
 * @return {Promise}
 */
export const requestVerifyAccessToken = async (path) => {
  return await axiosClient.get(`${BASE_URL}${path}`);
};

/**
 * Request pull credential from cardano service
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestPullCredential = async (path, data) => {
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: data,
  });
};

/**
 * Request update existed credential
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestUpdateCredential = async (path, data) => {
  return await axiosClient.put(`${BASE_URL}${path}`, data);
};
