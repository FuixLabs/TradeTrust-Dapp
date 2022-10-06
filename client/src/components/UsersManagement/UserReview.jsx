import React from 'react';
import styles from './GeneralUsers/style/UserReview';

// * MUI libraries
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';

// * Constants libraries
import { USER_REVIEW_INFORMATION } from 'constants/property';

export default function UserReview(props) {
  const { reviewUser, handleReturnUserSummary } = props;
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div onClick={handleReturnUserSummary} className={classes.backBtnContainer}>
          <ArrowBackIosNewIcon />
        </div>
        <p className={classes.headerUsername}>{reviewUser?.content?.data['name'] || ``}</p>
      </div>
      <div className={classes.informationContainer}>
        <div className={classes.baseInforContainer}>
          {USER_REVIEW_INFORMATION.map((field, index) => (
            <TextField
              key={index}
              disabled
              id="outlined-start-adornment"
              label={field.label}
              sx={{ m: 1, width: '70ch', marginBottom: 4.3 }}
              value={reviewUser?.content?.data[field.field] || ``}
              defaultValue={reviewUser?.content?.data[field.field] || ``}
            />
          ))}
        </div>
        <div className={classes.profilePictureContainer}>
          <div className={classes.imageFrame}>
            <img className={classes.profileImg} src={reviewUser?.content?.data?.attachment} alt="avt" />
          </div>
          <p className={classes.profileImageTitle}>Profile picture</p>
        </div>
      </div>
    </div>
  );
}
