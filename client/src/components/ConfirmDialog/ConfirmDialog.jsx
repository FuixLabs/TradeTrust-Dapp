import React, { useState } from 'react';
import styles from './styles/ConfirmDialog';

// * MUI libraries
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { settingActions } from 'redux/slices/setting';
import { resetDocuments } from 'redux/slices/document';
import { resetFile } from 'redux/slices/file';

//* Router libraries
import { useNavigate } from 'react-router-dom';

const DESCRIPTION_TEXT =
  'You have an issued document, be sure to download it for future use. Once you agree, you will never be able to download this file again.';

export default function ConfirmDialog() {
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');
  const { confirmOpen, redirectUrl } = useSelector((state) => state.settingReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = styles();

  const handleClose = () => {
    dispatch(settingActions.handleCloseConfirm());
  };

  const handleConfirmNavigate = () => {
    dispatch(settingActions.handleCloseConfirm());
    navigate(redirectUrl);
    dispatch(resetDocuments());
    dispatch(resetFile());
  };

  return (
    <Dialog
      open={confirmOpen}
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
          <span className={classes.popupTitle}>Confirming notification</span>
          <span className={classes.descriptionTxt}>{DESCRIPTION_TEXT}</span>
        </div>
        <div className={classes.popupFooter}>
          <button onClick={handleClose} className={classes.functionalBtn}>
            Cancel
          </button>
          <button onClick={handleConfirmNavigate} className={classes.functionalBtn + ' ' + classes.confirmBtn}>
            Leave
          </button>
        </div>
      </div>
    </Dialog>
  );
}
