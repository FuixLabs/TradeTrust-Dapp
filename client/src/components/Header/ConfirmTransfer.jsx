import React, { useState, useEffect } from 'react';
import styles from './styles/ConfirmTransfer';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from 'redux/slices/alert';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';
import { updateFetching, resetTransactions } from 'redux/slices/document';

// * MUI libraries
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CircularProgress } from '@mui/material';

// * Utilities libraries
import { changeHoldership, updateDidDocument } from 'fuixlabs-documentor/utils/document';
import { _pullTransactions } from 'utils/transaction';
import { sha256 } from 'js-sha256';
import { Buffer } from 'buffer';

// * Constants libraries
import { ACTIONS_IDENTITY } from 'constants/action';
import { CREDENTIAL_ERROR } from 'constants/error';

// * Rest libraries
import { getDidDocumentByDid, requestUpdateDidDocument, requestUpdateCredential } from 'rest/client.rest.js';
import { CLIENT_PATH } from 'rest/client.path';

export default function ConfirmTransfer(props) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');
  const [originDidDoc, setOriginDidDoc] = useState(null);
  const { currentCredential, handleClose, open } = props;
  let tmpOb = { ...currentCredential };
  delete tmpOb.mintingNFTConfig;
  const { usedAddress, currWallet } = useSelector((state) => state.walletReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getDidDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getDidDocument() {
    try {
      const getValue = 'did';
      const response = await getDidDocumentByDid(CLIENT_PATH.GET_DID_DOCUMENT_BY_DID, {
        did: currentCredential?.credentialSubject?.object,
        exclude: getValue,
      });
      if (response.data.errorCode) dispatch(alertActions.showErrorNotification(response.data.message));
      // * Save DID Document on state
      setOriginDidDoc(response.data.didDoc);
    } catch (e) {
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.getDidDocument));
    }
  }

  const handleTransferOwnerShip = async () => {
    setLoading(true);
    try {
      let credentialConfig = { ...currentCredential?.mintingNFTConfig };
      credentialConfig.policy = {
        ...credentialConfig.policy,
        reuse: true,
      };
      const createCredentialResult = await changeHoldership(usedAddress, {
        keys: {
          issuerKey: currentCredential?.issuer.split(':')[3],
          ownerKey: currentCredential?.metadata?.currentOwner, // * Input value for owner key
          holderKey: usedAddress, // * Input value for holder key
        },
        config: credentialConfig,
        currentWallet: currWallet,
        didoWrappedDocument: currentCredential?.credentialSubject?.object,
        metadata: {},
        action: ACTIONS_IDENTITY.find((_action) => _action.code === 10),
        confirmNominate: true,
      });
      if (createCredentialResult?.data?.code === 1 || createCredentialResult?.data?.error_code)
        throw createCredentialResult;
      let newDidDoc = {};
      newDidDoc = updateDidDocument(
        originDidDoc,
        currentCredential?.credentialSubject?.newOwner.split(':')[3],
        usedAddress
      );
      await requestUpdateDidDocument(CLIENT_PATH.UPDATE_DID_DOCUMENT, {
        didDoc: newDidDoc,
        did: currentCredential?.credentialSubject?.object,
      });
      let updateCredential = { ...currentCredential };
      updateCredential.status = 'confirmed';
      const updatedCredential = await requestUpdateCredential(CLIENT_PATH.UPDATE_CREDENTIAL, {
        originCredentialHash: sha256(Buffer.from(JSON.stringify(tmpOb), 'utf8').toString('hex')),
        credentialContent: updateCredential,
      });
      if (updatedCredential.error_code || updatedCredential.data.error_code)
        throw CREDENTIAL_ERROR.CANNOT_CREATE_CREDENTIAL; // * In this case, return the error code object
      setLoading(false);
      dispatch(alertActions.createCredentialSuccessfully());
      handleClose();
      dispatch(resetTransactions());
      dispatch(updateFetching(true));
      await _pullTransactions(usedAddress, dispatch);
      dispatch(updateFetching(false));
    } catch (e) {
      setLoading(false);
      dispatch(alertActions.showErrorNotification(e?.msg || e?.error_message || 'Error while changing ownership'));
    }
  };

  const classes = styles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={'md'}
        sx={{
          '& .MuiDialogContent-root': {
            width: '100% !important',
          },
        }}
      >
        <div className={classes.container}>
          <div className={classes.headerContainer}>
            <CloseIcon onClick={handleClose} className="pointer" />
          </div>
          <span className="extraLargeFontSize boldTxt">Confirm transfer owership</span>
          <div className={classes.inputForm}>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: 700 },
              }}
            >
              <TextField
                label="Current Owner Public Key"
                disabled
                multiline
                defaultValue={currentCredential?.metadata?.currentOwner || '0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C'}
              />
            </Box>
            <div className={classes.transferBtnContainer}>
              {loading ? (
                <CircularProgress className={classes.arrowIcon} />
              ) : (
                <div className={classes.transferBtn}>
                  <ArrowDownwardIcon className={classes.arrowIcon} />
                </div>
              )}
            </div>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: 700 },
              }}
            >
              <TextField defaultValue={usedAddress || ''} multiline label="New owner Public Key" maxRows={4} disabled />
            </Box>
          </div>
          <div className={classes.btnGroups + ' mediumFontSize'}>
            <Button disabled={loading} onClick={handleClose} variant="outlined" className={classes.defaultBtn}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={handleTransferOwnerShip}
              variant="contained"
              className={classes.defaultBtn + ' ' + classes.performBtn}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
