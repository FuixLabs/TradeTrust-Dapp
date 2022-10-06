import React from 'react';
import styles from './ProgressDialog';

// * MUI libraries
import CircularProgress from '@mui/material/CircularProgress';

export default function ProgressDialog() {
  const classes = styles();
  return (
    <div className={classes.blurBackground}>
      <div className={classes.container}>
        <CircularProgress />
      </div>
    </div>
  );
}
