/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/DocumentPreview';

// * MUI libraries
import QrCodeIcon from '@mui/icons-material/QrCode';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from '../../redux/slices/alert';
import { ALERT_CONSTANTS } from '../../redux/constants/alert.msg';

// * Utilities libraries
import { unsalt, deepUnsalt } from '../../utils/data';
import { exportTTFile } from 'utils/utils';
import { generateDid } from 'fuixlabs-documentor/utils/did';
import { useReactToPrint } from 'react-to-print';
import CryptoJS from 'crypto-js';

// * Custom components
import TransferHoldership from './TransferHoldership';
import QRCodeModal from './QRCodeModal';
import { ComponentToPrint } from './ComponentToPrint';

// * Rest libraries
import { getDidDocumentByDid } from 'rest/client.rest.js';
import { CLIENT_PATH } from 'rest/client.path';

// * Constants libraries
import { DOCUMENT_TYPE } from '../../constants/type';
import { ACTIONS_IDENTITY } from '../../constants/action';
import { COMPANY_NAME, SECRET_KEY } from 'constants/app';

// * Document template libraries
import { BillOfLanding } from 'common/template';

export default function DocumentPreview() {
  let { verifyDocument } = useSelector((state) => state.documentReducer);
  const { usedAddress } = useSelector((state) => state.walletReducer);
  const [QRmodal, setQRmodal] = useState(false);
  const [privateFields, setPrivateFields] = useState([]);

  // * Did document got from DIDController
  const [didDoc, setDidDoc] = useState(null);

  // * Input value used for creating new credential
  const [holderKey, setHolderKey] = useState('');
  const [ownerKey, setOwnerKey] = useState('');

  // * Owner, and holder key got from DID Document
  const [originalHolderKey, setOriginalHolderKey] = useState('');
  const [originOwnerKey, setOriginOwnerKey] = useState('');

  // * Publickey of issuer got from wrappedDocument
  // eslint-disable-next-line no-unused-vars
  const [issuerKey, setIssuerKey] = useState(unsalt(verifyDocument?.data?.data?.issuers[0]?.address) || '');
  const [action, setAction] = useState('');
  const [transferble, setTranferble] = useState(false);
  const dispatch = useDispatch();
  const printerComponent = useRef();

  const informationColumn = [
    {
      name: 'OWNER',
      field: originOwnerKey || '',
      getRight: function (usedAddress) {
        if (usedAddress === originOwnerKey) return 'You are owner of this document';
      },
    },
    {
      name: 'HOLDER',
      field: originalHolderKey || '',
      getRight: function (usedAddress) {
        if (usedAddress === originalHolderKey) return 'You are holder of this document';
      },
    },
  ];

  async function getDidDocument() {
    try {
      const getValue = 'did';
      const response = await getDidDocumentByDid(CLIENT_PATH.GET_DID_DOCUMENT_BY_DID, {
        did: wrappedDocumentDid,
        exclude: getValue,
      });
      if (response?.data?.errorCode) dispatch(alertActions.showErrorNotification(response?.data?.message));
      setOriginalHolderKey(response?.data?.didDoc?.holder);
      setOriginOwnerKey(response?.data?.didDoc?.owner);
      // * Save DID Document on state
      setDidDoc(response?.data?.didDoc);
    } catch (e) {
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.getDidDocument));
    }
  }

  const wrappedDocumentDid = generateDid(COMPANY_NAME, unsalt(verifyDocument.data.data.fileName));
  useEffect(() => {
    getDidDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrappedDocumentDid]);

  const handleCopyEncodedAddress = (value) => {
    try {
      navigator.clipboard.writeText(value);
      dispatch(alertActions.copyToClipboardSuccessfully());
    } catch (e) {
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.cannotCopyToClipboard));
    }
  };

  const handleClosePopUp = () => {
    setTranferble(false);
    setAction(null);
  };

  // * Change the text state rely on transfer action
  const handleTextChange = (event, action) => {
    if (action === 2) {
      setHolderKey(event.target.value);
    } else {
      setOwnerKey(event.target.value);
    }
  };

  const handleOpenQRCodeModal = () => {
    setQRmodal(!QRmodal);
  };

  const handleChangeAction = (event) => {
    setHolderKey('');
    setOwnerKey('');
    setAction(event.target.value);
    handleTransferHoldership();
  };

  // eslint-disable-next-line no-unused-vars
  const handlePrint = useReactToPrint({
    content: () => printerComponent.current,
  });

  const handleTransferHoldership = () => {
    setTranferble(true);
  };

  const handleDownload = (document) => {
    let downloadableDocument = { ...document };
    let tmpData = { ...document.data };
    let privacy = {};
    let obfuscatedData = [];
    for (let i = 0; i < privateFields.length; i++) {
      let hashField = CryptoJS.AES.encrypt(
        JSON.stringify(downloadableDocument.data[privateFields[i]]) + `:${privateFields[i]}`,
        SECRET_KEY
      ).toString();
      obfuscatedData.push(hashField);
      delete tmpData[privateFields[i]];
    }
    privacy = { ...privacy, obfuscatedData };
    downloadableDocument.data = tmpData;
    const downloadableFileName = unsalt(downloadableDocument.data.fileName);
    return () =>
      exportTTFile(
        privateFields.length > 0 ? { ...downloadableDocument, privacy } : downloadableDocument,
        downloadableFileName
      );
  };

  const classes = styles();
  return (
    <>
      <div className={classes.container}>
        <div style={{ display: 'none' }}>
          <ComponentToPrint
            ref={printerComponent}
            component={
              <BillOfLanding
                attachment={unsalt(verifyDocument?.data?.data?.attachment || null)}
                printer={true}
                billInformation={deepUnsalt(verifyDocument.data).data}
              />
            }
          />
        </div>

        {didDoc ? (
          <div className={classes.transactionInforContainer}>
            <div className={classes.utilsContainer}>
              <div className="flexRow">
                <div className={classes.utilDiv}>ISSUED BY</div>
                <Tooltip TransitionComponent={Zoom} title={<p className={classes.issuerTooltipTxt}>{issuerKey}</p>}>
                  <p className={classes.issuerTxt}>{issuerKey}</p>
                </Tooltip>
              </div>
              <div className="flexRow">
                {unsalt(verifyDocument?.data?.data?.intention) === DOCUMENT_TYPE.trade &&
                  didDoc?.controller &&
                  originOwnerKey === usedAddress && (
                    <div className={classes.formContainer}>
                      <FormControl>
                        <InputLabel style={{ marginTop: -7 }} id="select-label">
                          Manage action
                        </InputLabel>
                        <Select
                          labelId="select-label"
                          id="demo-simple-select"
                          value={action}
                          label="change Holder"
                          className={classes.formController}
                          onChange={handleChangeAction}
                        >
                          {ACTIONS_IDENTITY.map((item, index) => {
                            if (item.endorsement(usedAddress, originalHolderKey, originOwnerKey)) {
                              return (
                                <MenuItem sx = {{fontSize: 12}} key={index} value={item.value}>
                                  {item.value}
                                </MenuItem>
                              );
                            }
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  )}
                {unsalt(verifyDocument.data.data.intention) === DOCUMENT_TYPE.trade &&
                usedAddress === originOwnerKey &&
                didDoc?.controller ? (
                  <button className={classes.utilBtn}>Transferable</button>
                ) : (
                  <Button
                    className={classes.utilBtn}
                    disabled={true}
                    sx={{
                      border: 'solid 1px #00000034',
                      height: 45,
                    }}
                  >
                    Transferable
                  </Button>
                )}
                <Button
                  disabled={true}
                  sx={{
                    border: 'solid 1px #00000034',
                    height: 38,
                  }}
                  className={classes.utilBtn}
                >
                  Negotiable
                </Button>
              </div>
            </div>
            <div className={classes.inforContainer}>
              <div className="flexColumn">
                <div className={classes.inforTitle}>NFT INFORMATION</div>
                <span className={classes.inforTxt}>{unsalt(verifyDocument.data.data.fileName) || ''}</span>
              </div>
              {didDoc?.controller ? (
                informationColumn.map((item, index) => (
                  <div key={index} className="flexColumn">
                    <div className={classes.inforTitle}>{item.name}</div>
                    <div className="flexRow">
                      {item.getRight(usedAddress) ? (
                        <Tooltip
                          TransitionComponent={Zoom}
                          title={<span className={classes.inforTxt}>{item.getRight(usedAddress)}</span>}
                        >
                          <span className={classes.inforTxt}>{item.field}</span>
                        </Tooltip>
                      ) : (
                        <span className={classes.inforTxt}>{item.field}</span>
                      )}
                      <ContentCopyOutlinedIcon
                        onClick={() => handleCopyEncodedAddress(item.field)}
                        className={classes.contentCopyIcon}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <span className={classes.surrenderTxt}>This document has been surrendered by its owner</span>
              )}
            </div>
          </div>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
        <div className={classes.previewImageContainer}>
          <div className={classes.previewHeader}>
            <span className="largeFontSize">{unsalt(verifyDocument.data.data.fileName)}</span>
            <div className={classes.funtionalBtnContainer}>
              <QrCodeIcon sx={{ color: 'gray', cursor: 'unset' }} disabled={true} className={classes.funtionalBtn} />
              <LocalPrintshopIcon onClick={handlePrint} className={classes.funtionalBtn} />
              <DownloadIcon onClick={handleDownload(verifyDocument.data)} className={classes.funtionalBtn} />
            </div>
          </div>
          <BillOfLanding
            attachment={unsalt(verifyDocument.data.data.attachment)}
            didDoc={didDoc}
            verifierPreview={true}
            privateFields={privateFields}
            setPrivateFields={setPrivateFields}
            billInformation={deepUnsalt(verifyDocument.data).data}
          />
        </div>
      </div>
      <QRCodeModal open={QRmodal} handleClose={handleOpenQRCodeModal} />
      {action && (
        <TransferHoldership
          originDidDoc={didDoc}
          currentAction={action}
          open={transferble}
          setOpen={handleClosePopUp}
          handleTextChange={handleTextChange}
          getDidDocument={getDidDocument}
          originHolderKey={originalHolderKey}
          originOwnerKey={originOwnerKey}
          holderKey={holderKey}
          ownerKey={ownerKey}
          issuerKey={issuerKey}
        />
      )}
    </>
  );
}
