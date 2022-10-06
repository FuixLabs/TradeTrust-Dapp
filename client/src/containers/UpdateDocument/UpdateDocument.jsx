import React, { useEffect } from 'react';
import styles from './styles/UpdateDocument';
import { useSearchParams } from 'react-router-dom';
import createrGraphic from 'assets/images/creator-graphic.png';
import cardanoIcon from 'assets/images/cardano-blue-logo.svg';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { resetDocuments } from '../../redux/slices/document';
import { resetFile } from 'redux/slices/file';

// * Custom components
import { Process } from '../../components/IssueDocument/Process';
import VerifyDocument from '../VerifyDocument/VerifyDocument';

// * MUI libraries
import { Grid } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';

const ToolTipText =
  'A document can only be successfully verified on the same network where the document was created in. If unsure, do check with the document issuer.';

export default function UpdateDocument() {
  // eslint-disable-next-line no-unused-vars
  let [searchParams, setSearchParams] = useSearchParams();
  const { updateDocument } = useSelector((state) => state.documentReducer);
  const { currentUserDid } = useSelector((state) => state.didReducer);
  const dispatch = useDispatch();

  const resetData = async () => {
    await dispatch(resetDocuments());
    await dispatch(resetFile());
  };

  useEffect(() => {
    if (!searchParams.get('updateFromHistory')) {
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = styles();
  return (
    <>
      {currentUserDid?.content?.data?.issuer ? (
        updateDocument ? (
          <div className={classes.processContainer}>
            <Process update={true} />
          </div>
        ) : (
          <VerifyDocument update={true} />
        )
      ) : (
        <div className={classes.container}>
          <div className="flexRow">
            <span className={classes.titleTxt}>Verify Document on</span>
            <div className={classes.selectService}>
              <img className={classes.cardanoIcon} src={cardanoIcon} alt="cardano" />
              <span className='mediumFontSize'>Cardano</span>
            </div>
            <Tooltip TransitionComponent={Zoom} title={<span className={classes.tooltipText}>{ToolTipText}</span>}>
              <HelpIcon className={classes.helpIcon} />
            </Tooltip>
          </div>
          <Grid container className={classes.dragDocumentDiv}>
            <Grid item xs={12} lg={6}>
              <div className={classes.issuerContainer}>
                <p className={classes.issuerWarningTxt}>
                  You are not issuer! Please contact super user to become an issuer
                </p>
              </div>
            </Grid>
            <Grid item xs={12} lg={6} className={classes.imgDiv}>
              <img src={createrGraphic} alt="creator-graphic" />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
