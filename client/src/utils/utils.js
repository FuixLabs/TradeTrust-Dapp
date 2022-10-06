import CryptoJS from 'crypto-js';

/**
 * Export Downloadable TT File - example: demo_wrappedDocument.tt
 * @param {Object} data
 */
export const exportTTFile = (data, fileName) => {
  let dataStr = JSON.stringify(data, undefined, 4);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  let exportFileDefaultName = `${fileName}_document.fl`;
  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

/**
 * Export Downloadable JSON File - example: demo_wrappedDocument.json
 * @param {Object} data
 */
export const exportJSONFile = (data) => {
  let dataStr = JSON.stringify(data, undefined, 4);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  let exportFileDefaultName = '';
  if (data['fileName'] !== undefined) exportFileDefaultName = `${data['fileName']}_schemma.json`;
  else exportFileDefaultName = `${data.data.fileName.split(':')[2]}_wrapped_document.json`;
  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

/**
 * The function used to read the JSON file from the user, and convert it into a Javascript Object
 * @param {FileReader} file
 * @return {Promise}
 */
export const fileToJSON = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        resolve(JSON.parse(event.target.result));
      } catch (e) {
        reject(e);
      }
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsText(file);
  });
};

/**
 * The function used for encode to image file to base64
 * @param {FileReader} file
 * @return {Promise}
 */
export const encodeBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Function used for decrypt file encoded with sha256
 * @param {String} file - file encoded with sha256
 * @return {String} - file decoded
 */
export const decryptAttachmentFile = (file) => {
  var bytes = CryptoJS.AES.decrypt(file, 'Hao123');
  // eslint-disable-next-line no-unused-vars
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

/**
 * Function used for converting normal string to camel case
 * @param {String} str - normal string
 * @return {String} - camel case string
 */
export const toCamelCase = (str) => {
  return str
    .replace(/\s(.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/\s/g, '')
    .replace(/^(.)/, function ($1) {
      return $1.toLowerCase();
    });
};
