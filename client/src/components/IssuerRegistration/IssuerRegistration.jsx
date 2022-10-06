import React, { useState } from 'react';
import styles from './styles/IssuerRegistration';

// * MUI libraries
import Dialog from '@mui/material/Dialog';

// * Custom components
import RegistrationForm from './RegistrationForm';

// * Utilities libraries
import { addNewIssuer } from 'fuixlabs-documentor/utils/did';

// * Utilities libraries
import { COMPANY_NAME } from 'constants/app';

// * Redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';
import { alertActions } from 'redux/slices/alert';

export default function IssuerRegistration() {
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');
  const [loading, setLoading] = useState(false);
  const [registrationForm, setRegistrationForm] = useState(false);
  const dispatch = useDispatch();
  const { usedAddress } = useSelector((state) => state.walletReducer);
  const classes = styles();

  const handleConfirmRegistration = async () => {
    setLoading(true);
    const dids = {};
    try {
      await addNewIssuer(dids, COMPANY_NAME, usedAddress, {
        name: 'Huynh Quan Nhat Hao',
        organizationName: 'organizationName1',
        organizationMail: 'organizationMail1',
        organizationPhoneNumber: 'organizationPhoneNumber1',
        organizationAddress: 'organizationAddress1',
        website: 'https://www.sc.com/en/',
        issuer: '',
      });
      dispatch(alertActions.showSuccessNotification(ALERT_CONSTANTS.SUCCESS.addNewIssuer));
    } catch (e) {
      dispatch(alertActions.showErrorNotification(e.error_message));
    }
    setRegistrationForm(true);
  };

  return (
    <Dialog
      open={true}
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
      {!registrationForm ? (
        <div className={classes.popupContainer}>
          <div className={classes.popupContent}>
            <span className={classes.popupTitle}>Issuer Registration</span>
            <span className={classes.descriptionTxt}>
              This is the first time you log in to our system, please enter the information to continue using the DApp's
              features.
            </span>
          </div>
          <div className={classes.popupFooter}>
            <button
              disabled={loading}
              onClick={() => handleConfirmRegistration()}
              className={classes.functionalBtn + ' ' + classes.confirmBtn}
            >
              Registration
            </button>
          </div>
        </div>
      ) : (
        <div className={classes.popupContainer}>
          <RegistrationForm />
        </div>
      )}
    </Dialog>
  );
}
