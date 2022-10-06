/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styles from './styles/CustomDialog';

// * React Router
import { useNavigate } from 'react-router-dom';

// * Rest libraries
import { getDidDocumentByDid } from 'rest/client.rest';
import { CLIENT_PATH } from 'rest/client.path';

// * Custom components
import History from './History';

// * MUI libraries
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';

// * Document template libraries
import { BillOfLanding } from 'common/template';

// * Utilities libraries
import { deepUnsalt } from 'utils/data';
import { generateDid } from 'fuixlabs-documentor/utils/did';
import { unsalt } from 'fuixlabs-documentor/utils/data';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { onChangeUpdatedDocument } from 'redux/slices/document';
import { onIssueTypeChange } from 'redux/slices/file';
import { alertActions } from 'redux/slices/alert';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';

// * Constants libraries
import { COMPANY_NAME } from 'constants/app';

export default function ScrollDialog(props) {
  const [type, setType] = useState(0);
  const { open, setOpen, transaction } = props;
  const [updateLoading, setUpdateLoading] = useState(false);
  const { transactions } = useSelector((state) => state.documentReducer);
  const [updateCNFT, setUpdateCNFT] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');
  const [wrappedDocument, setWrappedDocument] = useState(null);
  const classes = styles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setWrappedDocument(null);
    async function getWrappedDocumentContent() {
      try {
        const getValue = 'doc';
        const wrappedDocumentResult = await getDidDocumentByDid(CLIENT_PATH.GET_DID_DOCUMENT_BY_DID, {
          did: generateDid(COMPANY_NAME, transaction?.fileName),
          exclude: getValue,
        });
        const wrappedDocumentContent = wrappedDocumentResult?.data?.wrappedDoc;
        setWrappedDocument(wrappedDocumentContent.data);
      } catch (e) {
        dispatch(alertActions.showErrorNotification(e?.msg || e?.error_message || ALERT_CONSTANTS.ERROR.getContentDocument));
      }
    }
    getWrappedDocumentContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]);

  const TYPES = [
    {
      id: 0,
      type: 'preview',
      text: 'Preview',
      component: () => (
        <div className={classes.container}>
          <div className={classes.imgContainer}>
            {wrappedDocument ? (
              <BillOfLanding attachment = {unsalt(wrappedDocument?.attachment || null)} billInformation={deepUnsalt(wrappedDocument)} historyReview = {true}/>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 1,
      type: 'history',
      text: 'History',
      component: () => (
        <div className={classes.container}>
          <div className={classes.historyContainer}>
            <History setUpdateCNFT={setUpdateCNFT} transaction={transaction} />
          </div>
        </div>
      ),
    },
  ];

  const handleRedirectUpdate = async () => {
    // * Get document which user want to update
    setUpdateLoading(true);
    const tmpNFT = updateCNFT.find((_nft) => _nft?.onchainMetadata[_nft.policyId][_nft.assetName]?.type === 'document' && _nft?.assetName === transaction?.documentHash);
    const updatedDocument = transactions.find((_transaction) => _transaction.documentHash === tmpNFT.assetName);
    if (updatedDocument) {
      try {
        const getValue = 'doc';
        const wrappedDocumentResult = await getDidDocumentByDid(CLIENT_PATH.GET_DID_DOCUMENT_BY_DID, {
          did: generateDid(COMPANY_NAME, updatedDocument?.fileName),
          exclude: getValue,
        });
        const wrappedDocumentContent = wrappedDocumentResult?.data?.wrappedDoc;
        dispatch(onIssueTypeChange(unsalt(wrappedDocumentContent.data.name)));
        dispatch(
          onChangeUpdatedDocument({
            data: wrappedDocumentContent?.data,
            policyId: wrappedDocumentContent?.mintingNFTConfig?.policy?.id,
            targetHash: wrappedDocumentContent?.signature?.targetHash,
            mintingNFTConfig: wrappedDocumentContent?.mintingNFTConfig,
          })
        );
        navigate('/update?updateFromHistory=true');
      } catch (e) {
        dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.getContentDocument));
      }
    }
    setUpdateLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnTabsChange = (e, newType) => {
    setType(newType);
  };

  const descriptionElementRef = React.useRef(null);

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
        maxWidth={'lg'}
        sx={{
          '& .MuiDialogContent-root': {
            width: '100% !important',
          },
        }}
      >
        <div className={classes.headerContainer}>
          <span id="scroll-dialog-title" className={classes.fileNameTxt}>
            {transaction.fileName}
          </span>
          <div className={classes.inforContainer}>
            <div className="flexRow">
              <span>{transaction.documentHash}</span>
              {transaction.status === 'Issued' ? (
                <div className={classes.statusDiv}>{transaction.status}</div>
              ) : (
                <div className={classes.errorStatusDiv}>{transaction.status}</div>
              )}
            </div>
          </div>
          <Tabs value={type} onChange={handleOnTabsChange}>
            {TYPES.map((item) => (
              <Tab key={item.id} label={item.text} className={classes.tabTxt} />
            ))}
          </Tabs>
        </div>
        {TYPES.find((tab) => tab.id === type).component()}
        <DialogActions className={classes.dialogActionContainer}>
          <Button
            sx={{
              fontWeight: 'bold',
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <LoadingButton
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
            }}
            onClick={handleRedirectUpdate}
            disabled={!updateCNFT}
            loading={updateLoading}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
