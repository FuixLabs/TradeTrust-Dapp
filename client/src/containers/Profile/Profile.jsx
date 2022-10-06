import React from 'react';
import styles from './styles/Profile';

// * Redux libraries
import { useSelector } from 'react-redux';

// * Custom components
import ProfileReview from 'components/Profile/ProfileReview';

export default function Profile() {
  const classes = styles();
  const { currentUserDid } = useSelector((state) => state.didReducer);

  return (
    <div className={classes.container}>
      <p className={classes.titleTxt}>Profile</p>
      <ProfileReview reviewUser={currentUserDid} profile={true} />
    </div>
  );
}
