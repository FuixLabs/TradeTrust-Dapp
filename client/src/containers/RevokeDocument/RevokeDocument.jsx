import React, { useEffect } from 'react';
import RevokeProcess from 'components/RevokeDocument/RevokeProcess';
import styles from './styles/RevokeDocument';
import cardanoIcon from 'assets/images/cardano-blue-logo.svg';

// * Redux libraries
import { resetDocuments } from 'redux/slices/document';
import { resetFile } from 'redux/slices/file';
import { useDispatch } from 'react-redux';

// * MUI libraries
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

const ToolTipText =
  'A document can only be successfully verified on the same network where the document was created in. If unsure, do check with the document issuer.';

export default function RevokeDocument() {
  const dispatch = useDispatch();
  const classes = styles();

  const resetData = async () => {
    dispatch(resetDocuments());
    dispatch(resetFile());
  };

  useEffect(() => {
    resetData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <div className={'flexRow '}>
        <span className={classes.titleTxt}>Revoke Document on</span>
        <div className={classes.selectService}>
          <img className={classes.cardanoIcon} src={cardanoIcon} alt="cardano" />
          <span className='mediumFontSize'>Cardano</span>
        </div>
        <Tooltip TransitionComponent={Zoom} title={<span className={classes.tooltipText}>{ToolTipText}</span>}>
          <HelpIcon className={classes.helpIcon} />
        </Tooltip>
      </div>
      <div className={classes.serviceContainer}>
        <RevokeProcess />
      </div>
    </div>
  );
}
