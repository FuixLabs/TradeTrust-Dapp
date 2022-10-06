export const ERROR_MSG = {
  EXISTED_DID_DOCUMENT: 'Did-Document is existed! Please try again!',
  SERVER_ERROR: 'There are some problems with our server! Please try again!',
  INVALID_PARAMETER: 'Missing parameters! Please check your configuration!',
  MISSING_EXTENSION: 'Missing extension! Please install extension',
  CANNOT_CONNECT_WALLET: 'There are some problems when we try to connect to your wallet, Please try again!',
  INVALID_EXTENSION: 'The document which need to be verified should be JSON!',
  CANNOT_STORE_HASH: 'Cannot store the targetHash on Cardano service!',
  CANNOT_PULL_TRANSACTIONS: 'Cannot pull transactions from Github service!',
  ACCESS_TOKEN_IS_NOT_AUTHORIZED: 'Access token is not authorized because the address is not matched!',
};

export const VERIFIER_ERROR_CODE = {
  MISSING_SIGNATURE: {
    error_code: 1001,
    msg: 'Missing signature! Please check your wrappedDocument',
  },
  INVALID_TARGET_HASH: {
    error_code: 1002,
    msg: 'The target-hash of your wrappedDocument is invalid!',
  },
  CANNOT_VERIFY_SIGNATURE: {
    error_code: 1003,
    msg: 'We cannnot verify the signature of wrappedDocument now, Please try again later!',
  },
  INVALID_PARAMETER: {
    error_code: 1004,
    msg: 'Missing parameters! Please check your configuration!',
  },
  UNAUTHORIZED_DOCUMENT: {
    error_code: 1005,
    msg: 'This document is unauthorized!',
  },
  INVALID_SIGNATURE: {
    error_code: 1006,
    msg: 'The signature of your wrappedDocument is invalid!',
  },
  EXIST_FILE_NAME: {
    error_code: 1007,
    msg: 'Filename is existed!',
  },
  NOT_EXISTS_DID_DOCUMENT: {
    error_code: 1008,
    msg: 'Cannot get did document by did of wrapped document!',
  },
  MISSING_PARAMETERS: {
    error_code: 1009,
    msg: 'Missing parameters! Please check your configuration!',
  },
  SERVER_ERROR: {
    error_code: 1010,
    msg: 'There are some problems with our server! Please try again later!',
  },
  BLOCKFROST_ERROR: {
    error_code: 1011,
    msg: 'The requested component has not been found!',
  },
  INVALID_ISSUER: {
    error_code: 1014,
    msg: 'We can not find issuer who issued this document!'
  },
  CANNOT_GET_NFTS: {
    error_code: 1012,
    msg: 'We can get list nfts now! Please try again later!',
  },
  CNFTs: {
    error_code: 1013,
    msg: 'Cannot found CNFTs from Cardano Serivce!',
  },
  MISSING_PERMISSIONS: {
    error_code: 3001,
    msg: 'You do not have permission to edit this document! Please contact the owner for more information!',
  },
};

export const CONFIG_VERIFIER_ERROR_CODE = {
  CANNOT_CONVERT_JSON: {
    error_code: 1014,
    msg: 'Cannot convert JSON to object!',
  },
  INVALID_NETWORK: {
    error_code: 1015,
    msg: 'The network property of configuration is invalid!',
  },
};

export const CREDENTIAL_ERROR = {
  INVALID_PARAMETER: {
    error_code: 1016,
    msg: 'Missing parameters! Please check your configuration!',
  },
  INVALID_ACTION: {
    error_code: 1017,
    msg: 'Action not found! Please check the purpose of your action',
  },
  CANNOT_CHANGE_HOLDER_SHIP: {
    error_code: 1018,
    msg: 'Cannot change the holder ship of this document!',
  },
  CANNOT_SIGN_OBJECT: {
    error_code: 1019,
    msg: 'Cannot sign the object! Please try again later!',
  },
  CANNOT_CREATE_CREDENTIAL: {
    error_code: 1020,
    msg: 'Cannot create credential! Please try again later!',
  },
};

export const SYNTAX_ERROR = {
  INVALID_DID: {
    error_code: 3018,
    msg: 'The DID is invalid! Please check your DID again!',
  },
};

export const GENERATOR_ERROR = {
  CANNOT_COPY_TO_CLIPBOARD: {
    error_code: 4001,
    msg: 'Cannot copy to clipboard! Please try again later!',
  },
  CANNOT_GET_CONTENT_OF_CREDENTIAL: {
    error_code: 4002,
    msg: 'Cannot get content of credential! Please try again later!',
  },
  CANNOT_PULL_TRANSACTIONS: {
    error_code: 4003,
    msg: 'Cannot pull transactions from Github service!',
  },
}
