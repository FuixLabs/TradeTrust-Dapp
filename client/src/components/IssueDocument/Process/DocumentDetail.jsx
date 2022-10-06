import React, { useState } from 'react';

// * MUI libraries
import TextField from '@mui/material/TextField';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';

// * Redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../../redux/slices/alert';
import { addAttachment, onUpdatePrivateFields } from '../../../redux/slices/document';

// * Custom components
import AutoFillDragForm from './AutoFillDragForm';
import SpecificForm from './SpecificForm';
import { BillOfLanding } from 'common/template';

// * Utilities libraries
import Ajv from 'ajv';
import { exportJSONFile, encodeBase64, fileToJSON, toCamelCase } from 'utils/utils';
import { unsalt, deepUnsalt } from '../../../utils/data';
import { attachmentCheck, configFileCheck } from '../../../utils/fileCheck';

//* Constants libraries
import { ALERT_CONSTANTS } from '../../../redux/constants/alert.msg';
import { EXCEPTION_EDITED_PROPERTIES } from '../../../constants/property';
import { FORMS_LABEL, READ_ONLY_FIELD } from '../../../constants/form';
import { CustomSchema } from 'schema';

function InputsForm(props) {
  const { handleOnTextChange, index, document, classes, issueLoading, uiSchema } = props;
  let formFields = [];
  const stringFields = {
    name: ['general'],
    data: [],
  };
  for (const field in document) {
    if (typeof document[field] === 'string') {
      if (!EXCEPTION_EDITED_PROPERTIES.find((item) => item === field)) {
        stringFields.data.push(
          <TextField
            sx={{ height: 48, marginBottom: 4, fontSize: '12px !important' }}
            id="outlined-basic"
            label={FORMS_LABEL[field]}
            variant="outlined"
            value={unsalt(document[field])}
            inputProps={{
              style: {
                fontWeight: 600,
                fontSize: 13
              },
            }}
            disabled={READ_ONLY_FIELD.find((prop) => prop === field) || issueLoading ? true : false}
            onChange={(e) => handleOnTextChange(e, index, field)}
          />
        );
      }
    } else if (typeof document[field] === 'object') {
      let tmpObjectFields = {
        name: [field],
        data: [],
      };
      if (!EXCEPTION_EDITED_PROPERTIES.find((item) => item === field)) {
        for (const i in document[field]) {
          tmpObjectFields.data.push(
            <TextField
              sx={{ height: 48, marginBottom: 4 }}
              id="outlined-basic"
              label={FORMS_LABEL[i]}
              variant="outlined"
              value={unsalt(document[field][i])}
              inputProps={{
                style: {
                  fontWeight: 600,
                  fontSize: 13
                },
              }}
              disabled={READ_ONLY_FIELD.find((prop) => prop === i) || issueLoading ? true : false}
              onChange={(e) => handleOnTextChange(e, index, field, i)}
            />
          );
        }
        formFields.push(tmpObjectFields);
      }
    }
  }
  formFields.push(stringFields);
  formFields = formFields.reverse();
  return formFields.map((form, index) => (
    <SpecificForm
      key={index}
      handleOnTextChange={handleOnTextChange}
      index={index}
      document={form}
      label={form.name}
      classes={classes}
    />
  ));
}

export default function DocumentDetail({
  classes,
  document,
  index,
  handleOnTextChange,
  handleFillForm,
  update,
  attachments,
  privateFields,
  setPrivateFields,
  issueLoading,
}) {
  const [loading, setLoading] = useState(false);
  const [attachmentName, setAttachmentName] = useState(null);
  const [check, setCheck] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const hiddenAttachmentInput = React.useRef(null);
  const hiddenFillSchema = React.useRef(null);
  const dispatch = useDispatch();
  const { issueType, configFile } = useSelector((state) => state.fileReducer);

  // eslint-disable-next-line no-unused-vars
  const handleUploadFile = (e) => {
    setLoading(true);
    hiddenFileInput.current.click();
  };

  const handleUploadFillShema = (e) => {
    setLoading(true);
    hiddenFillSchema.current.click();
  };

  const handleUploadFillSchema = async (e) => {
    // * Get current uploaded config file
    const fileUploaded = e.target.files[0];
    // * Check the system requirements with file
    const res = configFileCheck(fileUploaded);
    if (res.error_code) {
      setLoading(false);
      dispatch(alertActions.customError(res.msg));
    }
    try {
      const jsObjectFile = await fileToJSON(fileUploaded);
      const ajv = new Ajv();
      const typeValidate = ajv.compile(CustomSchema[toCamelCase(issueType)].schema);
      const typeValid = typeValidate(jsObjectFile);
      if (!typeValid) {
        // eslint-disable-next-line no-throw-literal
        throw {
          error_code: 21,
          msg: typeValidate.errors[0].message,
        };
      }
      handleFillForm(index, jsObjectFile);
    } catch (e) {
      dispatch(alertActions.showErrorNotification(e?.msg || ALERT_CONSTANTS.ERROR.readFillSchema));
    }
    setLoading(false);
  };

  const handleUploadAttachments = (e) => {
    hiddenAttachmentInput.current.click();
  };

  const handleChange = (event) => {
    setCheck(event.target.checked);
  };

  const handleFileChange = async (e) => {
    // * Get current uploaded config file
    const fileUploaded = e.target.files[0];

    try {
      // * Check the viability of the file
      await attachmentCheck(fileUploaded);
      setAttachmentName(fileUploaded.name);
      // * Encode the image file with base64 - The reason that need to encode the file with sha256 is because of the length of wrapped file is too long for sending to resolver
      const encodedFile = await encodeBase64(fileUploaded);
      dispatch(addAttachment({ data: encodedFile, index }));
    } catch (e) {
      dispatch(alertActions.showErrorNotification(e.msg || e.error_message));
    }
    setLoading(false);
  };

  const handleFillSchemma = async () => {
    try {
      await exportJSONFile(deepUnsalt(document));
    } catch (e) {
      dispatch(alertActions.showErrorNotification(e.msg || e.error_message || ALERT_CONSTANTS.ERROR.exportFillSchema));
    }
  };

  const handleUpdatePrivateFields = (privateFields) => {
    dispatch(onUpdatePrivateFields({ privateFields, index }));
  };

  return (
    <>
      <div className={classes.modifyDocInforContainer}>
        <div className={classes.detailHeader}>
          <div className="flexRow" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <span>{update ? unsalt(document.name) : document.name}</span>
            <Divider orientation="vertical" flexItem sx={{ marginLeft: 2 }} />
            <Switch
              sx={{ marginLeft: 2 }}
              checked={check}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <span>Preview mode</span>
          </div>
        </div>
        {check ? (
          <div className={classes.previewContainer}>
            <BillOfLanding
              attachment={unsalt(document?.attachment) || null}
              handleUpdatePrivateFields={handleUpdatePrivateFields}
              privateFields={privateFields}
              setPrivateFields={setPrivateFields}
              preview={true}
              billInformation={deepUnsalt(document)}
            />
          </div>
        ) : (
          <>
            <AutoFillDragForm
              classes={classes}
              loading={loading}
              handleUploadFile={handleUploadFillShema}
              handleFillSchemma={handleFillSchemma}
            />
            <div className={classes.inputsContainer}>
              <InputsForm
                issueLoading={issueLoading}
                classes={classes}
                handleOnTextChange={handleOnTextChange}
                index={index}
                document={document}
                uiSchema = {configFile?.forms[0]?.uiSchema}
              />
            </div>
            {attachments && (
              <div className={classes.attachmentDragForm}>
                <div className="flexRow">
                  <UploadFileIcon className={classes.attachmentIcon} />
                  <div className="flexColumn">
                    <span>Attachments - Signature</span>
                    <span className={classes.smallTxt}>
                      {attachmentName || 'form or enter the fields manually (less than 2MB)'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={!issueLoading ? handleUploadAttachments : null}
                  className={issueLoading ? classes.disabledBtn : classes.uploadFileBtn}
                  style={{ marginTop: 0 }}
                >
                  Browse File
                </button>
              </div>
            )}
            <input type="file" ref={hiddenAttachmentInput} onChange={handleFileChange} style={{ display: 'none' }} />
            <input type="file" ref={hiddenFillSchema} onChange={handleUploadFillSchema} style={{ display: 'none' }} />
          </>
        )}
      </div>
    </>
  );
}
