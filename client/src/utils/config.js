/* eslint-disable no-throw-literal */
// * Utilities libraties
import { configFileCheck } from './fileCheck';
import { fileToJSON, toCamelCase } from './utils';
import Ajv from 'ajv';

// * Constants libraries
import { CONFIG_VERIFIER_ERROR_CODE } from '../constants/error';
import { CONFIG_MANDATORY_PROPERTIES } from '../constants/property';
import { VALID_NETWORK } from '../constants/type';
import { CONFIG_SCHEMA, CustomSchema } from '../schema';

/**
 * Check the validity of the config file
 * @param {FileReader} configFile
 * @return {Promise}
 */
export const configFileVerifier = async (configFile) => {
  // * Check the validity of the extension of the config file - the file must be a JSON file
  const configFileValid = configFileCheck(configFile);
  if (configFileValid.error_code) throw configFileValid;
  // * If the extension of the config file is valid, then convert the file to JSON
  try {
    const configFileJSON = await fileToJSON(configFile);
    for (const property in configFileJSON) {
      let prop = CONFIG_MANDATORY_PROPERTIES.find((_property) => _property === property);
      if (!prop)
        // eslint-disable-next-line no-throw-literal
        throw {
          error_code: 10,
          msg: `The property ${property} is obligatory!`,
        };
    }
    let currentNetwork = VALID_NETWORK.find((_network) => _network === configFileJSON['network']);
    if (!currentNetwork) throw CONFIG_VERIFIER_ERROR_CODE.INVALID_NETWORK;
    const ajv = new Ajv();
    const validate = ajv.compile(CONFIG_SCHEMA);
    const valid = validate(configFileJSON['forms'][0]);
    if (!valid) {
      if (validate.errors[0].keyword === 'required') {
        // eslint-disable-next-line no-throw-literal
        throw {
          error_code: 11,
          msg: `The config file ${validate.errors[0].message}`,
        };
      } else if (validate.errors[0].keyword === 'type') {
        const error = validate.errors[0].instancePath.split('/');
        // eslint-disable-next-line no-throw-literal
        throw {
          error_code: 12,
          msg: `The type of ${error[error.length - 1]} ${validate.errors[0].message}`,
        };
      } 
      throw {
        error_code: 20,
        msg: `Unexpected error!`,
      };
    }
    const typeValidate = ajv.compile(CustomSchema[toCamelCase(configFileJSON?.forms[0]?.data?.name)].schema);
    const typeValid = typeValidate(configFileJSON.forms[0].data);
    if(!typeValid) {
      throw {
        error_code: 21,
        msg: typeValidate.errors[0].message,
      }
    }
    return true;
  } catch (e) {
    throw e;
  }
};
