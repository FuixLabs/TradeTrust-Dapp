import { SYNTAX_ERROR } from "../constants/error";

export const IdentityProofType = {
  DNSDid: "DNS-DID",
  DNSTxt: "DNS-TXT",
  Did: "DID",
};

/**
 * Check syntax of user did
 * @param {String} did
 * @return {Boolean || Object}
 */
export const didSyntaxCheck = (did) => {
  const didComponents = did.split(":");
  if (didComponents.length !== 4 || didComponents[0] !== "did")
    return SYNTAX_ERROR.INVALID_DID;
  return true;
};
