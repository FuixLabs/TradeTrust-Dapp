import React, { useState } from 'react';
import styles from './styles/RegistrationForm';

// * Constants libraries
import { USER_REVIEW_INFORMATION } from 'constants/property';
import { COMPANY_NAME } from 'constants/app';

// * MUI libraries
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// * Utilities libraries
import { addNewIssuer } from 'fuixlabs-documentor/utils/did';
import { encodeBase64 } from 'utils/utils';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';
import { alertActions } from 'redux/slices/alert';

export default function RegistrationForm() {
  const classes = styles();
  const [loading, setLoading] = useState(false);
  const hiddenAttachmentInput = React.useRef(null);
  const [reviewUser, setReviewUser] = useState({
    name: '',
    address: '',
    organizationName: '',
    organizationMail: '',
    organizationPhoneNumber: '',
    organizationAddress: '',
    website: '',
  });
  const [attachment, setAttachment] = useState('');
  const { usedAddress } = useSelector((state) => state.walletReducer);
  const dispatch = useDispatch();

  const handleOnTextChange = (e, key) => {
    let tmpObject = {};
    for (const i in reviewUser) {
      if (i === key?.field) {
        Object.assign(tmpObject, { [i]: e.target.value });
      } else {
        Object.assign(tmpObject, { [i]: reviewUser[i] });
      }
    }
    setReviewUser(tmpObject);
  };

  const handleUploadAttachments = (e) => {
    hiddenAttachmentInput.current.click();
  };

  const handleFileChange = async (e) => {
    // * Get current uploaded config file
    const fileUploaded = e.target.files[0];

    try {
      // * Encode the image file with base64 - The reason that need to encode the file with sha256 is because of the length of wrapped file is too long for sending to resolver
      const encodedFile = await encodeBase64(fileUploaded);
      setAttachment(encodedFile);
    } catch (e) {
      dispatch(alertActions.showErrorNotification(e.msg));
    }
    setLoading(false);
  };

  const handleConfirmRegistration = async () => {
    setLoading(true);
    const dids = [];
    try {
      await addNewIssuer(
        dids,
        COMPANY_NAME,
        usedAddress,
        {...reviewUser, attachment},
        true,
        null,
        false
      );
      dispatch(alertActions.showSuccessNotification(ALERT_CONSTANTS.SUCCESS.addNewIssuer));
      window.location.reload();
    } catch (e) {
      dispatch(alertActions.showErrorNotification(e.error_message));
    }
    setLoading(false);
  };

  return (
    <>
      <div className={classes.informationContainer}>
        <div className={classes.baseInforContainer}>
          {USER_REVIEW_INFORMATION.map((field, index) => (
            <TextField
              onChange={(e) => handleOnTextChange(e, field)}
              key={index}
              id="outlined-start-adornment"
              label={field.label}
              sx={{ m: 1, width: '70ch', marginBottom: 4.3 }}
              value={reviewUser[field.field] || ``}
            />
          ))}
        </div>
        <div onClick={handleUploadAttachments} className={classes.profilePictureContainer}>
          <div className={classes.imageFrame + ' flexCenter'}>
            {attachment.length !== 0 ? (
              <img className={classes.profileImg} src={attachment} alt="avt" />
            ) : (
              <AttachmentIcon sx={{ height: 200 }} />
            )}
          </div>
          <p className={classes.profileImageTitle}>Profile picture</p>
        </div>
      </div>
      <div className={classes.popUpFooter}>
        <Button
          disabled={loading}
          onClick={handleConfirmRegistration}
          className={classes.functionalBtn + ' ' + classes.confirmBtn}
        >
          {loading ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress sx={{ color: 'primary.white', height: '15px !important', width: '15px !important' }} />
            </Box>
          ) : (
            'Registration'
          )}
        </Button>
      </div>
      <input type="file" ref={hiddenAttachmentInput} onChange={handleFileChange} style={{ display: 'none' }} />
    </>
  );
}
