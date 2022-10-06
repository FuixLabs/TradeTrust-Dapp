import React, { useState } from 'react';
import styles from './styles/RevokeProcess';

// * Custom components
import { RevokeStep1, RevokeStep2, RevokeStep3 } from 'components/IssueDocument/Process/StepContent/Revoke';
import Steppers from 'components/IssueDocument/Process/Stepper';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from 'redux/slices/alert';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';
import { updateSuccessDocument, resetDocuments, updateFetching } from 'redux/slices/document';
import { onStepChange, resetFile } from 'redux/slices/file';

// * MUI libraries
import { Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// * Utilities libraries
import { unsalt } from 'utils/data';
import { _pullTransactions } from 'utils/transaction';
import { revokeDocument as _revokeDocument } from 'fuixlabs-documentor/revokeDocument';

const DOCUMENT_TYPE = ['Bill of Landing', 'Cover Letter', 'OpenCerts Certificate of Award'];

export default function RevokeProcess() {
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const { step } = useSelector((state) => state.fileReducer);
  const { usedAddress } = useSelector((state) => state.walletReducer);
  const { successDocuments, revokeDocument } = useSelector((state) => state.documentReducer);
  const theme = useTheme();
  const dispatch = useDispatch();
  const mdBreakpoints = useMediaQuery(theme.breakpoints.down('lg'));

  const classes = styles();

  const handleRevokeDocument = () => {
    setConfirmPopup(true);
  };

  const handleCloseConfirmPopup = () => {
    setConfirmPopup(false);
    setRevoking(false);
  };

  const handleUploadNewDocument = () => {
    dispatch(resetFile());
    dispatch(resetDocuments());
  };

  const handleForwardStep = () => {
    if (step !== 3) dispatch(onStepChange(step + 1));
  };

  const handleConfirmRevokeDocument = async () => {
    setRevoking(true);
    try {
      await _revokeDocument(revokeDocument.mintingNFTConfig);
      dispatch(alertActions.revokeDocumentSuccessfully());
      dispatch(updateSuccessDocument({ data: revokeDocument?.data }));
      handleForwardStep();
      setRevoking(false);
      dispatch(updateFetching(true));
      await _pullTransactions(usedAddress, dispatch);
      dispatch(updateFetching(false));
    } catch (e) {
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.cannotRevokeDocument));
      setRevoking(false);
    }
  };

  const RevokeContents = [
    {
      step: 1,
      content: () => <RevokeStep1 classes={classes} />,
    },
    {
      step: 2,
      content: () => (
        <RevokeStep2
          loading={revoking}
          setLoading={setRevoking}
          open={confirmPopup}
          handleClose={handleCloseConfirmPopup}
          issueType={unsalt(revokeDocument?.data?.name)}
          classes={classes}
          DOCUMENT_TYPE={DOCUMENT_TYPE}
          handleRevokeDocument={handleRevokeDocument}
          handleConfirmRevokeDocument={handleConfirmRevokeDocument}
        />
      ),
    },
    {
      step: 3,
      content: () => (
        <RevokeStep3
          classes={classes}
          successDocuments={successDocuments}
          handleUploadNewDocument={handleUploadNewDocument}
        />
      ),
    },
  ];

  return (
    <div className={classes.container}>
      <Grid container className={classes.chooseInfor}>
        <Grid item xs={12} lg={6}>
          {mdBreakpoints ? (
            <div className="flexCenter">
              <Steppers classes={classes} type={'Revoke'} />
            </div>
          ) : (
            <div className={classes.contentContainer}>
              {RevokeContents.find((stepper) => stepper.step === step).content()}
            </div>
          )}
        </Grid>
        <Grid item xs={12} lg={6}>
          {mdBreakpoints ? (
            <div className={classes.contentContainer}>
              {RevokeContents.find((stepper) => stepper.step === step).content()}
            </div>
          ) : (
            <Steppers classes={classes} type={'Revoke'} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
