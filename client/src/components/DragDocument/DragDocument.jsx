import React, { useState, createRef } from 'react';
import styles from './styles/DragDocument';

// * MUI libraries
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// * Constants libraries
import { DRAG_TYPE } from './dragType.constants';
import { LINK } from 'constants/link';
import { ALERT_CONSTANTS } from '../../redux/constants/alert.msg';

// * Custom Components
import CustomDivider from '../CustomDivider/CustomDivider';
import InvalidDocument from './InvalidDocument';
import Dropzone from 'react-dropzone';

// * Utilities libraries
import { configFileVerifier } from '../../utils/config';

// * Redux libraries
import { useDispatch } from 'react-redux';
import { alertActions } from '../../redux/slices/alert';

export default function DragDocument(props) {
  const [loading, setLoading] = useState(false);
  const [isValidConfig, setIsValidConfig] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isValidWrappedDocument, setIsValidWrappedDocument] = useState(true);
  const [errMsg, setErrorMsg] = useState('');
  const dropzoneRef = createRef();
  const dispatch = useDispatch();
  const { type, setFile, uploadIcon, isIssuer } = props;

  const openDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const handleFileChange = async (fileUploaded = null) => {
    const validateExtension = 'json';
    // Get current uploaded config file
    setLoading(true);
    if (fileUploaded[0].name.split('.')[1] === validateExtension) {
      try {
        await configFileVerifier(fileUploaded[0]);
        setFile(fileUploaded[0]);
      } catch (e) {
        setLoading(false);
        setIsValidConfig(false);
        setErrorMsg(e.msg);
      }
      setLoading(false);
      return;
    }
    dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.invalidExtension));
    setLoading(false);
  };

  const resetState = () => {
    setIsValidConfig(true);
    setErrorMsg('');
  };

  const classes = styles();
  return (
    <>
      {!isValidConfig && <InvalidDocument classes={classes} resetState={resetState} errMsg={errMsg} />}
      {!isValidWrappedDocument && <InvalidDocument classes={classes} resetState={resetState} errMsg={errMsg} />}
      {isIssuer ? (
        isValidConfig &&
        isValidWrappedDocument && (
          <Dropzone ref={dropzoneRef} noClick noKeyboard onDrop={(files) => handleFileChange(files)}>
            {({ getRootProps, getInputProps }) => (
              <div className="container">
                <div
                  {...getRootProps({
                    className: 'dropzone',
                  })}
                >
                  <input {...getInputProps()} />
                  <div className={classes.container + ' mediumFontSize'}>
                    {uploadIcon && <UploadFileIcon className={classes.uploadFileIcon} />}
                    {type && <p>{DRAG_TYPE.find((item) => item.type === type).text}</p>}
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
                            <a href={LINK.SAMPLE_CONFIG} className={classes.linkTxt} download>
                              See an example
                            </a>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
        )
      ) : (
        <div className="container">
          <div className={classes.container + ' mediumFontSize'}>
            <p className={classes.issuerWarningTxt}>
              You are not issuer! Please contact super user to become an issuer
            </p>
          </div>
        </div>
      )}
    </>
  );
}
