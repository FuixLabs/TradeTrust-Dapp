// * Utilities libraties
import { deepMap } from './utils/salt.ts';
import {
  unsalt,
  checkForSpecialChar,
  checkForStringEndWithSpecialCharacters,
  checkLengthOfInput,
  nonIsoValidator,
  checkRequirementOfInput,
} from './utils/data';
import { signObject, wrapDocument, createWrappedDocument } from './utils/document';
import { generateDid } from './utils/did';
import { startCase } from 'lodash';

// * Rest client libraries
import { sendWrappedDocument } from './rest/client.rest';
import { CLIENT_PATH } from './rest/client.path';

// * Constants libraries
import { VALID_DOCUMENT_NAME_TYPE, SAMPLE_SERVICE, _DOCUMENT_TYPE } from './constants/type';
import { VERIFIER_ERROR_CODE } from 'fuixlabs-documentor/constants/error';
import { COMPANY_NAME } from 'constants/app';

/**
 * Function used for create new wrapped document with document object, current user's public key
 * @param {documents} document - document object
 * @param {String} usedAddress - current user's public key
 * @param {Boolean} update - update document or not
 * @param {Object} updateDocument - update document object
 * @param {Function} fuixlabsWalletors - sign document function
 * @return {Promise} - Promise object includes wrapped document
 */
export const createDocument = async (
  currentWallet,
  documents,
  usedAddress,
  update,
  updateDocument,
  fuixlabsWalletors = undefined,
  uiSchema
) => {
  for (let index = 0; index < documents.length; index++) {
    let document = documents[index];

    // * Unsalt all elements in document object in case the user want to update the document
    document = deepMap(document, unsalt);
    try {
      let createdDocument = {};
      for (const key in document) {
        let currentField = document[key];
        if (key === 'fileName') {
          let specialVar = checkForSpecialChar({ currentField });
          let lengthVar = checkLengthOfInput(currentField);
          if (!lengthVar?.valid) {
            throw VERIFIER_ERROR_CODE.FILENAME_IS_TOO_SHORT;
          }
          if (!specialVar?.valid) {
            throw VERIFIER_ERROR_CODE.STRING_INCLUDE_SPECIAL_CHARATERS;
          }
          let endWithSpecialCharacters = checkForStringEndWithSpecialCharacters(currentField);
          if (!endWithSpecialCharacters?.valid) {
            throw VERIFIER_ERROR_CODE.END_WITH_SPECIAL_CHARACTER;
          }
          if (!nonIsoValidator(currentField)) {
            throw VERIFIER_ERROR_CODE.STRING_INCLUDE_SPECIAL_CHARATERS;
          }
        } else {
          let lengthVar = checkRequirementOfInput(currentField);
          if (!lengthVar?.valid) {
            // eslint-disable-next-line no-throw-literal
            throw {
              error_code: 4005,
              msg: `${startCase(lengthVar?._key || key)} is required! Please check your input again!`,
            };
          }
        }
        if (key !== 'did')
          createdDocument = Object.assign(createdDocument, {
            [key]: document[key],
          });
      }
      createdDocument = Object.assign(createdDocument, {
        companyName: COMPANY_NAME,
        // * Get type rely on name of document in config file
        intention: VALID_DOCUMENT_NAME_TYPE.find((prop) => prop.name === createdDocument.name).type,
      });
      const did = generateDid(COMPANY_NAME, usedAddress); // * Did of issuers
      // * Create new document, generate did of wrapped-document rely on file name and company name, and create target-hash based on data of the document
      let res = await createWrappedDocument(createdDocument, SAMPLE_SERVICE, usedAddress, did);
      const { _document, targetHash, ddidDocument } = res;
      // * Sign Object with signing function of cardano
      const signedData = await signObject(
        currentWallet,
        usedAddress,
        {
          address: usedAddress,
          targetHash: targetHash,
        },
        fuixlabsWalletors
      );
      const response = wrapDocument({
        document: _document,
        walletAddress: usedAddress,
        signedData: signedData,
        targetHash: targetHash,
      });
      // * Get the wrapped document
      const wrappedDocument = response;
      let requestBody = {
        wrappedDocument: wrappedDocument,
        issuerAddress: usedAddress,
        did: ddidDocument,
      };
      // * If the type of document is non-trade, then make a new document with new policy id, otherwise, make a copy of current document with the same policy id
      if (update && unsalt(wrappedDocument.data.intention) === _DOCUMENT_TYPE.trade) {
        const updatedConfig = { ...updateDocument?.mintingNFTConfig };
        updatedConfig.policy = {
          ...updatedConfig.policy,
          reuse: true,
        };
        requestBody = {
          ...requestBody,
          mintingNFTConfig: updatedConfig,
        };
      }
      const wrappedResult = await sendWrappedDocument(CLIENT_PATH.SEND_WRAPPED_DOCUMENT, requestBody);
      if (wrappedResult?.data?.code === 1 || wrappedResult?.data?.error_message) throw wrapDocument;
      const doc = wrappedResult.data;
      return {
        wrappedDocument: doc,
      };
    } catch (e) {
      throw (
        e?.msg ||
        e?.errorMessage ||
        e?.errorMsg ||
        e?.message ||
        e?.info ||
        'Something went wrong! Please try again later.'
      );
    }
  }
};
