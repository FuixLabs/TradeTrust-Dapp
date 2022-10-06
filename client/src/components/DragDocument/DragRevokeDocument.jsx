import React, { useState, createRef } from 'react';
import styles from './styles/DragRevokeDocument';

// * MUI libraries
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// * Constants libraries
import { DRAG_TYPE } from './dragType.constants';
import { LINK } from '../../constants/link';

// * Constants libraries
import { SERVICE } from 'constants/type';
import { GENERATOR_ERROR } from 'constants/error';

// * Custom Components
import CustomDivider from '../CustomDivider/CustomDivider';
import InvalidDocument from './InvalidDocument';
import Dropzone from 'react-dropzone';

// * Utilities libraries
import { undefinedFileCheck } from 'utils/fileCheck';
import { fileToJSON } from 'utils/utils';

// * Redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../redux/slices/alert';
import { onStepChange } from '../../redux/slices/file';

// * Documentor libraries
import { verifyWrappedDocument } from 'fuixlabs-documentor/verifyDocument';

// * Assets
import certificateLogo from 'assets/images/certificate.svg';

export default function DragRevokeDocument(props) {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isValidWrappedDocument, setIsValidWrappedDocument] = useState(true);
  const [errMsg, setErrorMsg] = useState('');
  const { usedAddress } = useSelector((state) => state.walletReducer);
  const { currentUserDid } = useSelector((state) => state.didReducer);
  const dropzoneRef = createRef();
  const dispatch = useDispatch();
  const { type, setFile, uploadIcon } = props;

  const openDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const handleFileChange = async (fileUploaded = null) => {
    // * Get current uploaded config file
    setLoading(true);
    try {
      const isValid = undefinedFileCheck(fileUploaded[0]);
      if (isValid?.err_code) throw isValid;
      const fileUploadedContent = await fileToJSON(fileUploaded[0]);
      if (usedAddress !== fileUploadedContent?.data?.issuers[0].address.split(':')[2]) {
        throw GENERATOR_ERROR.INVALID_PERMISSION_TO_REVOKE;
      }
      await verifyProgress(fileUploadedContent);
      setFile(fileUploadedContent);
      dispatch(onStepChange(2));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      dispatch(alertActions.showErrorNotification(e?.msg || e?.error_message || e?.message));
    }
  };

  const verifyProgress = async (doc) => {
    try {
      await verifyWrappedDocument(doc, usedAddress, SERVICE.CARDANO, currentUserDid?.content?.data?.signedData);
    } catch (e) {
      throw e;
    }
  };

  const resetState = () => {
    setErrorMsg('');
  };

  const classes = styles();
  return (
    <>
      {!isValidWrappedDocument && <InvalidDocument classes={classes} resetState={resetState} errMsg={errMsg} />}
      {isValidWrappedDocument && (
        <Dropzone ref={dropzoneRef} noClick noKeyboard onDrop={(files) => handleFileChange(files)}>
          {({ getRootProps, getInputProps }) => (
            <div className="container">
              <div
                {...getRootProps({
                  className: 'dropzone',
                })}
              >
                <div className={classes.container + ' mediumFontSize'}>
                  {uploadIcon && <UploadFileIcon className={classes.uploadFileIcon} />}
                  <div className={classes.dragLogoContainer}>
                    <img className={classes.certificateLogo} src={certificateLogo} alt="certificate-logo" />
                  </div>
                  {type && (
                    <span className={classes.guideTxt}>{DRAG_TYPE.find((item) => item.type === type).text}</span>
                  )}
                  <CustomDivider />
                  {loading ? (
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <>
                      <button onClick={openDialog} className={classes.selectBtn}>
                        Select Document
                      </button>
                      {type === 'Create' && (
                        <span>
                          Don’t have a config file?{' '}
                          <a
                            rel="noreferrer"
                            href={LINK.CREATE_CONFIG_FILE}
                            target="_blank"
                            className={classes.linkTxt}
                          >
                            Learn how to create one
                          </a>
                        </span>
                      )}
                    </>
                  )}
                  <input {...getInputProps()} />
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      )}
    </>
  );
}
