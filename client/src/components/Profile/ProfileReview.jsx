import React, { useState, useEffect } from 'react';
import styles from './styles/ProfileReview';

// * MUI libraries
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

// * Constants libraries
import { USER_REVIEW_INFORMATION } from 'constants/property';
import useMediaQuery from '@mui/material/useMediaQuery';
import { COMPANY_NAME } from 'constants/app';

// * Rest libraries
import { requestUpdateDid, requestRetrieveSpecificDid } from 'fuixlabs-documentor/rest/client.rest';
import { CLIENT_PATH } from 'fuixlabs-documentor/rest/client.path';

// * Utilities libraries
import { generateDidOfWrappedDocument } from 'utils/data';

// * Redux libraries
import { useDispatch } from 'react-redux';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';
import { alertActions } from 'redux/slices/alert';
import { didActions } from 'redux/slices/did';

export default function ProfileReview(props) {
  const { reviewUser } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = styles();
  const lgBreakpoints = useMediaQuery(theme.breakpoints.up('lg'));
  const [currentUser, setCurrentUser] = useState(reviewUser ? { ...reviewUser } : null);
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');
  const [open, setOpen] = useState(false);
  const [editReviewUser, setEditReviewUser] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setCurrentUser({ ...reviewUser });
  }, [reviewUser]);

  useEffect(() => {
    setEditReviewUser({
      name: currentUser?.content?.data?.name,
      address: currentUser?.content?.data?.address,
      organizationName: currentUser?.content?.data?.organizationName,
      organizationMail: currentUser?.content?.data?.organizationMail,
      organizationPhoneNumber: currentUser?.content?.data?.organizationPhoneNumber,
      organizationAddress: currentUser?.content?.data?.organizationAddress,
      website: currentUser?.content?.data?.website,
    });
  }, [currentUser]);

  const handleOnTextChange = (e, key) => {
    let tmpObject = {};
    for (const i in editReviewUser) {
      if (i === key?.field) {
        Object.assign(tmpObject, { [i]: e.target.value });
      } else {
        Object.assign(tmpObject, { [i]: editReviewUser[i] });
      }
    }
    setEditReviewUser(tmpObject);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditReviewUser({
      name: currentUser?.content?.data?.name,
      address: currentUser?.content?.data?.address,
      organizationName: currentUser?.content?.data?.organizationName,
      organizationMail: currentUser?.content?.data?.organizationMail,
      organizationPhoneNumber: currentUser?.content?.data?.organizationPhoneNumber,
      organizationAddress: currentUser?.content?.data?.organizationAddress,
      website: currentUser?.content?.data?.website,
    });
    setOpen(false);
  };

  const handleConfirmEditProfile = async () => {
    setEditing(true);
    try {
      const updateUserDidRes = await requestUpdateDid(CLIENT_PATH.RETRIEVE_SPECIFIC_DID, {
        companyName: COMPANY_NAME,
        publicKey: currentUser?.name,
        data: { ...editReviewUser, attachment: currentUser?.content?.data?.attachment, issuer: currentUser?.content?.data?.issuer, signedData:  currentUser?.content?.data?.signedData || null},
        did: generateDidOfWrappedDocument(COMPANY_NAME, currentUser?.name),
      });
      if (updateUserDidRes?.data?.error_code) throw updateUserDidRes?.data;
      dispatch(alertActions.showSuccessNotification(ALERT_CONSTANTS.SUCCESS.updateIssuer));
      const userDidRes = await requestRetrieveSpecificDid(CLIENT_PATH.RETRIEVE_SPECIFIC_DID, {
        publicKey: currentUser?.name,
        companyName: COMPANY_NAME,
      });
      if (userDidRes?.data?.error_code) throw userDidRes?.data;
      dispatch(didActions.updateCurrentUserDid(userDidRes?.data));
    } catch (e) {
      dispatch(
        alertActions.showErrorNotification(e?.message || e?.error_message || ALERT_CONSTANTS.ERROR.cannotConnectWallet)
      );
    }
    setEditing(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.informationContainer}>
        {lgBreakpoints && (
          <div className={classes.profilePictureContainer}>
            {currentUser?.content ? (
              <>
                {' '}
                <div className={classes.imageFrame}>
                  <img className={classes.profileImg} src={currentUser?.content?.data?.attachment} alt="avt" />
                </div>
                <p className={classes.profileImageTitle}>{currentUser?.content?.data?.name || ''}</p>
                <button onClick={handleOpenDialog} className={classes.editProfileBtn}>
                  Edit profile
                </button>
              </>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
              </Box>
            )}
          </div>
        )}
        <Divider orientation="vertical" flexItem />
        <div className={classes.baseInforContainer}>
          <p className={classes.informationTitle}>Profile settings</p>
          {currentUser?.content ? (
            USER_REVIEW_INFORMATION.map((field, index) => (
              <TextField
                key={index}
                id="outlined-start-adornment"
                label={field.label}
                sx={{ m: 1 }}
                disabled={true}
                value={currentUser?.content?.data[field.field] || ``}
                className={classes.txtField}
                inputProps={{
                  style: {
                    fontSize: 14
                  },
                }}
              />
            ))
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '80ch', marginBottom: 5 }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
      <Dialog
        open={open || editing}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={'lg'}
        sx={{
          '& .MuiDialogContent-root': {
            width: '100% !important',
          },
        }}
      >
        <div className={classes.popupContainer}>
          <div className={classes.headerContainer}>
            <CloseIcon onClick={handleClose} className={classes.closeIcon} />
          </div>
          <div className={classes.popupContent}>
            <span className={classes.popupTitle}>Edit profile</span>
            <div className={classes.baseInforContainer}>
              {currentUser ? (
                USER_REVIEW_INFORMATION.map((field, index) => (
                  <TextField
                    onChange={(e) => handleOnTextChange(e, field)}
                    key={index}
                    id="outlined-start-adornment"
                    label={field.label}
                    sx={{ m: 1 }}
                    disabled={field.field === 'address' || editing}
                    value={editReviewUser[field.field]}
                    className={classes.popUptxtField}
                  />
                ))
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '80ch', marginBottom: 5 }}>
                  <CircularProgress />
                </Box>
              )}
            </div>
          </div>
          <div className={classes.popupFooter}>
            <button onClick={handleClose} className={classes.functionalBtn}>
              Cancel
            </button>
            <button
              onClick={!editing && handleConfirmEditProfile}
              className={classes.functionalBtn + ' ' + classes.confirmBtn + ' ' + (editing && classes.disableBtn)}
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
