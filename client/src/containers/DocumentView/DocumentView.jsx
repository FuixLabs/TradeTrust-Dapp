import React, { useState, useEffect } from 'react';
import styles from './styles/DocumentView';
import sampleDocument from '../../assets/images/sample-doc-img.png';

// * Redux libraries
import { useDispatch } from 'react-redux';
import { alertActions } from 'redux/slices/alert';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';

// * Router libraries
import { useParams } from 'react-router-dom';

// * Rest libraries
import { getDidDocumentByDid } from 'rest/client.rest';
import { CLIENT_PATH } from 'rest/client.path';

// * MUI libraries
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function DocumentView() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [didDocument, setDidDocument] = useState({});
  // * Get the did of wrapped document from route params
  const { did } = useParams();

  // * Get did of current document
  async function getDidDocument() {
    try {
      const getValue = 'did';
      const response = await getDidDocumentByDid(CLIENT_PATH.GET_DID_DOCUMENT_BY_DID, {
        did: did,
        exclude: getValue,
      });
      if (response.data.errorCode) dispatch(alertActions.showErrorNotification(response.data.message));
    } catch (e) {
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.getDidDocument));
    }
  }

  useEffect(() => {
    getDidDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = styles();
  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.container}>
        <div className={classes.transactionInforContainer}>
          <div className={classes.utilsContainer}>
            <div className={classes.utilDiv}>ISSUED BY</div>
            <div className="flexRow">
              <div className={classes.formContainer}>
                <FormControl>
                  <InputLabel style={{ marginTop: -5 }} id="select-label">
                    Manage action
                  </InputLabel>
                </FormControl>
              </div>
            </div>
          </div>
          <p className={classes.companyTxt}>Fuixlabs.com</p>
          <p className={classes.companyTxt}></p>
          <div className={classes.inforContainer}></div>
        </div>
        <div className={classes.previewImageContainer}>
          <div className={classes.previewHeader}>
            <div className={classes.funtionalBtnContainer}>
              <LocalPrintshopIcon className={classes.funtionalBtn} />
            </div>
          </div>
          <img src={sampleDocument} alt="sample-document" />
        </div>
      </div>
    </div>
  );
}
