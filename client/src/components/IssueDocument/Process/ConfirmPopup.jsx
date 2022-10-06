import React from 'react';
import Button from '@mui/material/Button';

export default function ConfirmPopup(props) {
  const { classes } = props;
  return (
    <div className={classes.popupContainer}>
      <span className={classes.popupTitleTxt}>Revoke Document</span>
      <span className={classes.popupDescription}>
        You are about to revoke the following file. This step is irreversible.
      </span>
      <div className={classes.selectedType}>Bill of Landing</div>
      <div className={classes.confirmDiv}>
        <Button
          variant="outlined"
          sx={{
            borderWidth: 0,
            backgroundColor: 'borderColor.secondary',
            color: 'primary.dark',
            '&:hover': {
              border: 'solid 1px gray',
            },
          }}
          className={classes.confirmBtn}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className={classes.confirmBtn}
          sx={{
            backgroundColor: '#D94300',
            color: 'primary.white',
            '&:hover': 'unset',
          }}
        >
          Revoke
        </Button>
      </div>
    </div>
  );
}
