import React from 'react';

// * Assets libraries
import cardanoIcon from '../../assets/images/cardano-icon.webp';

// * MUI libraries
import { Tooltip } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';

export default function HeaderTooltip(props) {
  const { classes, handleLogout } = props;
  return (
    <Tooltip
      placement="bottom-start"
      title={
        <div className={classes.tooltipContainer}>
          <div className={classes.descriptionContainer}>
            <ReportIcon className={classes.warningIcon} />
            <p className={classes.descriptionTxt}>
              You are currently on Cardano network. To change it, please upload a new config file.
            </p>
          </div>
          <span>Or</span>
          <button onClick={handleLogout} className={classes.logoutBtn}>
            Logout
          </button>
        </div>
      }
    >
      <div className={classes.statusContainer}>
        <div className={classes.iconContainer}>
          <img src={cardanoIcon} alt="cardano" className={classes.cardanoIcon} />
        </div>
        <div className={classes.columnDiv}>
          <span className={classes.smallTxt}>Your network</span>
          <span className={classes.normalTxt}>Cardano network</span>
        </div>
      </div>
    </Tooltip>
  );
}
