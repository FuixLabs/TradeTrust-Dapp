import React, { useState, createRef } from 'react';
import styles from './styles/DragVerifyDocument';

// * React Router
import { useNavigate } from 'react-router-dom';

// * Documentor libraries
import { verifyWrappedDocument } from 'fuixlabs-documentor/verifyDocument';

// * Custom components
import CustomDivider from '../CustomDivider/CustomDivider';
import Dropzone from 'react-dropzone';

// * Constants libraries
import { SERVICE } from '../../constants/type';
import { COMPANY_NAME } from 'constants/app';

// * Assets
import invalidIcon from '../../assets/images/invalid.svg';
import certificateLogo from '../../assets/images/certificate.svg';

// * MUI libraries
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// * Utilities libraries
import { unsalt } from '../../utils/data';
import { fileToJSON } from '../../utils/utils';
import { undefinedFileCheck } from '../../utils/fileCheck';
import { generateDid } from 'fuixlabs-documentor/utils/did';

// * Rest libraries
import { getDidDocumentByDid } from 'rest/client.rest.js';
import { CLIENT_PATH } from 'rest/client.path';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from '../../redux/slices/alert';
import { onChangeUpdatedDocument } from '../../redux/slices/document';
import { onIssueTypeChange } from '../../redux/slices/file';
import { ALERT_CONSTANTS } from '../../redux/constants/alert.msg';
import { invalidDocument, resetVerifyDocument, setValidDocument } from '../../redux/slices/document';

export default function DragVerifyDocument(props) {
  const [verifying, setVerifying] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [uploadedFile, setUploadedFile] = useState(null);
  const { loading, setLoading, setFile, update, overview } = props;
  const hiddenFileInput = React.useRef(null);
  const dropzoneRef = createRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUserDid } = useSelector((state) => state.didReducer);
  const { verifyDocument } = useSelector((state) => state.documentReducer);
  const { usedAddress } = useSelector((state) => state.walletReducer);

  const openDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  async function getDidDocument(document) {
    const wrappedDocumentDid = generateDid(COMPANY_NAME, unsalt(document.data.fileName));
    try {
      const getValue = 'did';
      const response = await getDidDocumentByDid(CLIENT_PATH.GET_DID_DOCUMENT_BY_DID, {
        did: wrappedDocumentDid,
        exclude: getValue,
      });
      if (response.data && response.data.errorCode) dispatch(alertActions.showErrorNotification(response.data.message));
      if (!response?.data?.didDoc?.controller.includes(usedAddress)) {
        dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.permissionsToUpdateDocument));
        return {
          result: false,
        };
      }
      return {
        result: true,
      };
    } catch (e) {
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.getDidDocument));
    }
  }

  const handleUpdateDocument = async (fileUploaded) => {
    try {
      const prevDocument = await fileToJSON(fileUploaded);
      const { result } = await getDidDocument(prevDocument);
      if (result) {
        dispatch(onIssueTypeChange(unsalt(prevDocument.data.name)));
        dispatch(
          onChangeUpdatedDocument({
            data: prevDocument?.data,
            policyId: prevDocument?.mintingNFTConfig?.policy?.id,
            targetHash: prevDocument?.signature?.targetHash,
            mintingNFTConfig: prevDocument?.mintingNFTConfig,
          })
        );
      }
    } catch (e) {
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.exportFillSchema));
    }
  };

  const handleFileChange = (fileUploaded) => {
    setLoading(true);
    // Check the system requirements with file
    const validConfigFile = undefinedFileCheck(fileUploaded[0]);
    if (validConfigFile.err_code) dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.invalidExtension));
    else {
      fileToJSON(fileUploaded[0])
        .then(async (doc) => {
          setUploadedFile(fileUploaded[0]);
          setLoading(false);
          setVerifying(true);
          setFile(doc);
          if (!currentUserDid) {
            dispatch(alertActions.showInfoNotification(ALERT_CONSTANTS.INFOR.waitForFetchingData));
            setVerifying(false);
            return;
          }
          await verifyProgress(doc, fileUploaded[0]);
          const navigatePath = '/verify?overview=true';
          if (overview) navigate(navigatePath);
        })
        .catch((err) =>
          dispatch(
            alertActions.showErrorNotification(
              err?.error_massage || err?.message || ALERT_CONSTANTS.ERROR.convertToJson
            )
          )
        );
    }
    setLoading(false);
  };

  const resetState = () => {
    dispatch(resetVerifyDocument());
  };

  const verifyProgress = async (doc, fileUploaded) => {
    try {
      await verifyWrappedDocument(doc, usedAddress, SERVICE.CARDANO, currentUserDid?.content?.data?.signedData);
      dispatch(setValidDocument());
      setVerifying(false);
      handleUpdateDocument(fileUploaded);
    } catch (e) {
      setVerifying(false);
      dispatch(invalidDocument(e.msg || 'Unexpected error'));
    }
  };

  const classes = styles();
  return (
    <>
      {verifyDocument.verified ? (
        <div className={classes.container}>
          <div className={'flexRow ' + classes.validateResultContainer}>
            <CheckCircleIcon className={classes.checkCircleIcon} />
            <span className={classes.invalidDocTitle}>This document is valid</span>
          </div>
          <span onClick={resetState} className={classes.retryTxt}>
            Try another document
          </span>
        </div>
      ) : verifyDocument.errorMgs ? (
        <div className={classes.invalidDocumentContainer}>
          <div className={'flexRow ' + classes.validateResultContainer}>
            <img src={invalidIcon} alt="invalid-icon" className={classes.invalidIcon} />
            <span className={classes.invalidDocTitle}>This document is not valid</span>
          </div>
          <span className={classes.warningTxt}>{verifyDocument.errorMgs}</span>
          <button className={classes.guidelineBtn}>What should i do ?</button>
          <span onClick={resetState} className={classes.retryTxt + ' ' + classes.errorTxt}>
            Try another document
          </span>
        </div>
      ) : (
        <div className={classes.container}>
          {verifying ? (
            <>
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
              <span className={classes.verifyTxt}>Verify Document...</span>
            </>
          ) : (
            <>
              <Dropzone ref={dropzoneRef} noClick noKeyboard onDrop={(files) => handleFileChange(files)}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({
                      className: 'dropzone flexCenter',
                    })}
                  >
                    <div className={classes.dragLogoContainer}>
                      <img className={classes.certificateLogo} src={certificateLogo} alt="certificate-logo" />
                    </div>
                    {update && <span className={classes.guideTxt}>Verify Document before updating</span>}
                    <span className={classes.guideTxt}>
                      {overview
                        ? 'Drop your (.fl) file to view its contents'
                        : 'Drop your (.fl) file to verify its contents'}
                    </span>
                    <CustomDivider />
                    {loading ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <button onClick={openDialog} className={classes.selectBtn}>
                        Select Document
                      </button>
                    )}
                    <input type="file" ref={hiddenFileInput} onChange={handleFileChange} style={{ display: 'none' }} />
                  </div>
                )}
              </Dropzone>
            </>
          )}
        </div>
      )}
    </>
  );
}
