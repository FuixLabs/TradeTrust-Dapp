import React, { useState, useEffect } from 'react';
import styles from './styles/VerifyDocument';
import { useSearchParams } from 'react-router-dom';

// * Custom components
import { DragVerifyDocument } from '../../components/DragDocument';
import { DocumentPreview } from '../../components';

// * Assets
import createrGraphic from '../../assets/images/creator-graphic.png';
import cardanoIcon from '../../assets/images/cardano-blue-logo.svg';

// * Redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { uploadVerifyDocument, resetDocuments } from '../../redux/slices/document';
import { resetFile } from 'redux/slices/file';

// * MUI libraries
import Zoom from '@mui/material/Zoom';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { Grid } from '@mui/material';

const ToolTipText =
  'A document can only be successfully verified on the same network where the document was created in. If unsure, do check with the document issuer.';

export default function VerifyDocument(props) {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { verifyDocument } = useSelector((state) => state.documentReducer);
  const { update } = props;

  useEffect(() => {
    if (!searchParams.get('overview')) {
      dispatch(resetDocuments());
      dispatch(resetFile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadVerifyDocument = (document) => {
    dispatch(uploadVerifyDocument(document));
  };

  const classes = styles();
  return (
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
      {verifyDocument.verified && !update ? (
        <DocumentPreview />
      ) : (
        <Grid container className={classes.dragDocumentDiv}>
          <Grid item xs={12} lg={6}>
            <DragVerifyDocument
              loading={loading}
              setLoading={setLoading}
              setFile={handleUploadVerifyDocument}
              update={update}
            />
          </Grid>
          <Grid item xs={12} lg={6} className={classes.imgDiv}>
            <img src={createrGraphic} alt="creator-graphic" className = {classes.graphicImg} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
