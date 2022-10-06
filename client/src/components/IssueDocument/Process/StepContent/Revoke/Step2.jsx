import React, { useState } from 'react';

// * MUI libraries
import Box from '@mui/material/Box';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';

export default function RevokeStep2(props) {
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');
  const {
    loading,
    handleConfirmRevokeDocument,
    classes,
    DOCUMENT_TYPE,
    handleRevokeDocument,
    issueType,
    open,
    handleClose,
  } = props;
  return (
    <>
      <div className={classes.choosenTypeVerifyDiv}>
        <div>
          <span className={classes.bigBoldTxt}>Confirm Revoke</span>
          <div className={classes.choosenVerifyTypeDiv}>
            <Box
              className={classes.groupTypeBtns}
              sx={{
                '& > *': {
                  m: 1.5,
                },
              }}
            >
              {DOCUMENT_TYPE.map((item, index) => (
                <button
                  key={index}
                  disabled={issueType !== item}
                  className={issueType === item ? classes.choosenBtn : classes.disabledBtn}
                >
                  {item}
                </button>
              ))}
            </Box>
          </div>
        </div>
        <button onClick={handleRevokeDocument} className={classes.revokeBtn}>
          <LayersClearIcon />
          Revoke Document
        </button>
      </div>
      <Dialog
        open={open}
        onClose={!loading ? handleClose : null}
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
            <CloseIcon onClick={!loading ? handleClose : null} className={classes.closeIcon} />
          </div>
          <div className={classes.popupContent}>
            <span className={classes.popupTitle}>Revoke Document</span>
            <span className={classes.descriptionTxt}>
              You are about to revoke the following file. This step is irreversible.
            </span>
            <div className={classes.choosenType}>{issueType}</div>
          </div>
          <div className={classes.popupFooter}>
            <Button disabled={loading} onClick={handleClose} className={`${classes.functionalBtn}`} variant="outlined">
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="contained"
              onClick={handleConfirmRevokeDocument}
              className={classes.functionalBtn + ' ' + classes.confirmBtn}
            >
              {loading ? (
                <CircularProgress
                  sx={{ color: 'primary.white', height: '15px !important', width: '15px !important' }}
                />
              ) : (
                'Revoke'
              )}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
