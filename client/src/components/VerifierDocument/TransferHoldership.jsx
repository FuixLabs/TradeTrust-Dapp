import React, { useState, useEffect } from 'react';
import styles from './styles/TransferHoldership';

// * MUI libraries
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';

// * Custom components
import TransferForm from './TransferForm';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from 'redux/slices/alert';
import { updateFetching, resetTransactions } from 'redux/slices/document';

// * Constants libraries
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';
import { ACTIONS_IDENTITY } from 'constants/action';
import { GENERATOR_ERROR } from 'constants/error';
import { COMPANY_NAME } from 'constants/app';

// * Utilities libraries
import { changeHoldership, updateDidDocument, makeNullDidDocument } from 'fuixlabs-documentor/utils/document';
import { unsalt } from 'fuixlabs-documentor/utils/data';
import { generateDid } from 'fuixlabs-documentor/utils/did';
import { pullCredential } from 'utils/document';
import { _pullTransactions } from 'utils/transaction';

// * Rest libraries
import { requestUpdateDidDocument, _pullNFTs } from 'rest/client.rest';
import { CLIENT_PATH } from 'rest/client.path';

export default function TransferHoldership(props) {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');

  const dispatch = useDispatch();
  const { usedAddress, currWallet } = useSelector((state) => state.walletReducer);
  const { verifyDocument, transactions } = useSelector((state) => state.documentReducer);
  const {
    getDidDocument,
    originDidDoc,
    open,
    setOpen,

    issuerKey,
    holderKey,
    ownerKey,

    handleTextChange,
    onOwnerKeyChange,
    currentAction,

    originHolderKey,
    originOwnerKey,
  } = props;

  const descriptionElementRef = React.useRef(null);
  const classes = styles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleTransferHoldership = async () => {
    try {
      setLoading(true);
      if (transactions.length <= 0) {
        setLoading(false);
        dispatch(alertActions.showInfoNotification(ALERT_CONSTANTS.INFOR.waitForFetchingData));
        return;
      }
      // * Check the permission of current user
      if (originOwnerKey !== usedAddress && originHolderKey !== usedAddress) {
        setLoading(false);
        dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.transferPermission));
        return;
      }
      if (!ACTIONS_IDENTITY.find((_action) => _action.value === currentAction).surrender && !holderKey && !ownerKey) {
        setLoading(false);
        dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.unexpectedError));
        return;
      }
      let CNFTs = await _pullNFTs(CLIENT_PATH.PULL_NFTS, {
        policyId: verifyDocument?.data?.mintingNFTConfig?.policy?.id,
      });
      if (CNFTs?.code === 1) throw GENERATOR_ERROR.CANNOT_PULL_TRANSACTIONS;
      CNFTs = CNFTs?.data.filter((_item) => _item.onchainMetadata[_item.policyId][_item.assetName].type);
      CNFTs.sort(
        (a, b) =>
          a.onchainMetadata[a.policyId][a.assetName].timestamp - b.onchainMetadata[b.policyId][b.assetName].timestamp
      );
      let credentialConfig = transactions?.find(
        (_transaction) => _transaction.fileName === unsalt(verifyDocument?.data?.data?.fileName)
      ).config;
      credentialConfig = { ...credentialConfig };
      credentialConfig.policy = {
        ...credentialConfig.policy,
        reuse: true,
      };
      if (CNFTs.length > 1 && CNFTs[0].onchainMetadata[CNFTs[0].policyId][CNFTs[0].assetName].type === 'credential') {
        credentialConfig = {};
        try {
          const credential = await pullCredential(CNFTs[CNFTs.length - 1].assetName);
          if (credential?.data?.code === 1 || credential?.data?.error_code)
            throw GENERATOR_ERROR.CANNOT_GET_CONTENT_OF_CREDENTIAL;
          credentialConfig = { ...credential?.data?.mintingNFTConfig };
          credentialConfig.policy = {
            ...credentialConfig.policy,
            reuse: true,
          };
        } catch (e) {
          dispatch(alertActions.showErrorNotification(e.msg));
        }
      }
      // eslint-disable-next-line no-unused-vars
      const createCredentialResult = await changeHoldership(usedAddress, {
        keys: {
          issuerKey: issuerKey,
          ownerKey: ownerKey, // * Input value for owner key
          holderKey: holderKey, // * Input value for holder key
        },
        config: credentialConfig,
        currentWallet: currWallet,
        didoWrappedDocument: generateDid(COMPANY_NAME, unsalt(verifyDocument?.data?.data?.fileName)),
        metadata: {},
        action: ACTIONS_IDENTITY.find((_action) => _action.value === currentAction),
        confirmNominate: false,
      });
      if (createCredentialResult?.data?.code === 1 || createCredentialResult?.data?.error_code)
        throw createCredentialResult;
      let newDidDoc = {};
      if (ACTIONS_IDENTITY.find((_action) => _action.value === currentAction).code === 20) {
      } else {
        if (createCredentialResult.surrender) {
          newDidDoc = makeNullDidDocument(originDidDoc);
        } else {
          const updateHolder =
            createCredentialResult.user === 'holderKey' ? createCredentialResult.publicKey : originHolderKey;
          const updateOwner =
            createCredentialResult.user === 'ownerKey' ? createCredentialResult.publicKey : originOwnerKey;
          newDidDoc = updateDidDocument(originDidDoc, updateOwner, updateHolder);
        }
        await requestUpdateDidDocument(CLIENT_PATH.UPDATE_DID_DOCUMENT, {
          didDoc: newDidDoc,
          did: generateDid(COMPANY_NAME, unsalt(verifyDocument?.data?.data?.fileName)),
        });
      }
      getDidDocument();
      setLoading(false);
      setOpen(false);
      dispatch(alertActions.createCredentialSuccessfully());
      dispatch(resetTransactions());
      dispatch(updateFetching(true));
      await _pullTransactions(usedAddress, dispatch);
      dispatch(updateFetching(false));
    } catch (e) {
      setLoading(false);
      dispatch(
        alertActions.showErrorNotification(
          e?.msg || e?.data?.error_message || e?.error_message || e?.errMessage || 'Error while changing ownership'
        )
      );
    }
  };

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
            <CloseIcon className="pointer" onClick={handleClose} />
          </div>
          <span className="extraLargeFontSize boldTxt">
            {ACTIONS_IDENTITY.find((_action) => _action.value === currentAction).label}
          </span>
          <span className={classes.descriptionTxt + ' smallFontSize'}>
            {ACTIONS_IDENTITY.find((_action) => _action.value === currentAction).subTitle}
          </span>
          <TransferForm
            ownerKey={ownerKey}
            onOwnerKeyChange={onOwnerKeyChange}
            currentAction={currentAction}
            setLoading={setLoading}
            classes={classes}
            loading={loading}
            holderKey={holderKey}
            handleTextChange={handleTextChange}
            originHolderKey={originHolderKey}
            originOwnerKey={originOwnerKey}
          />
          <div className={classes.btnGroups + ' mediumFontSize'}>
            <Button disabled={loading} variant="outlined" onClick={handleClose} className={classes.defaultBtn}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={handleTransferHoldership}
              variant="contained"
              className={classes.defaultBtn + ' ' + classes.performBtn}
            >
              {ACTIONS_IDENTITY.find((_action) => _action.value === currentAction).buttonLabel}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
