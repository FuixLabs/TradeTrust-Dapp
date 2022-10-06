const FILE_EXTENSION = [
  {
    name: 'PNG',
    extension: 'image/png',
  },
  {
    name: 'JPEG',
    extension: 'image/jpeg',
  },
  {
    name: 'PDF',
    extension: 'application/pdf',
  },
];

const VERIFIER_DOCUMENT_TYPE = 'fl';

const CONFIG_DOCUMENT_TYPE = 'json';

const MAXIMUM_SIZE = 2048000000; //2MB

const ERROR_MSG = {
  TYPE: {
    err_code: 1,
    msg: 'The extension is invalid!',
  },
  SIZE: {
    err_code: 2,
    msg: 'The size of current is larger than 2MB! Please try again!',
  },
  ENCODE: {
    err_code: 3,
    msg: 'We can not encode the file right now! Please try again later!',
  },
};

export const attachmentCheck = async (selectedFile) => {
  // Get the type of current file - example: png, jpeg, pdf, docx, ...
  const { type, size } = selectedFile;

  // Check the type of current rely on valid extension
  const isValidType = FILE_EXTENSION.find((_file) => _file.extension === type);
  if (isValidType) {
    // Compare size of current file with the maximum size
    const isValidSize = size <= MAXIMUM_SIZE;
    if (isValidSize) return true;
    throw ERROR_MSG.SIZE;
  }
  throw ERROR_MSG.TYPE;
};

/** */
export const verifiedDocumetnCheck = (selectedFile) => {
  if (selectedFile.type !== VERIFIER_DOCUMENT_TYPE) return ERROR_MSG.TYPE;
  return true;
};

/**
 * used to check the extension of files that do not have a predefined type extension
 * @param {FileReader} selectedFile
 * @return {Boolean} - is the extension of the file is valid or not
 */
export const undefinedFileCheck = (selectedFile) => {
  const { name } = selectedFile;

  // Slice name of file with '.'
  const fileNameComponent = name.split('.');
  // Return if the name of name file or extension is invalid
  if (fileNameComponent.length !== 2 || fileNameComponent[1] !== VERIFIER_DOCUMENT_TYPE) return ERROR_MSG.TYPE;
  return true;
};

/**
 * used to check the extension of config files
 * @param {FileReader} selectedFile
 * @return {Boolean} - is the extension of the file is valid or not
 */
export const configFileCheck = (selectedFile) => {
  const { name } = selectedFile;

  // Slice name of file with '.'
  const fileNameComponent = name.split('.');
  // Return if the name of name file or extension is invalid
  if (fileNameComponent.length !== 2 || fileNameComponent[1] !== CONFIG_DOCUMENT_TYPE) return ERROR_MSG.TYPE;
  return true;
};
