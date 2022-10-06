import React, { useState, useEffect } from 'react';
import styles from './style/UserManagement';

// * Mui libraries
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputAdornment from '@mui/material/InputAdornment';

// * Custom components
import GeneralUsers from 'components/UsersManagement/GeneralUsers/GeneralUsers';
import UserReview from 'components/UsersManagement/UserReview';

// * Rest libraries
import { CLIENT_PATH } from 'fuixlabs-documentor/rest/client.path';
import { requestRetrieveDid, requestRetrieveSpecificDid } from 'fuixlabs-documentor/rest/client.rest';
import { CLIENT_PATH as FUIXLABS_CLIENT_PATH } from 'fuixlabs-documentor/rest/client.path';

// * Constants libraries
import { COMPANY_NAME } from 'constants/app';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { didActions } from 'redux/slices/did';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';
import { alertActions } from 'redux/slices/alert';

// * Utilities libraries
import { addNewIssuer } from 'fuixlabs-documentor/utils/did';
import { signObject } from 'fuixlabs-documentor/utils/document';

export default function UserManagement() {
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');
  const [loading, setLoading] = useState(true);
  const [addUsersOpen, setAddUserOpen] = useState(false);
  const [searchIssuer, setSearchNewIssuer] = useState('');
  const [newIssuer, setNewIssuer] = useState(null);
  const [reviewUser, setReviewUser] = useState(null);
  const [textEditable, setTextEditable] = useState(false);
  const [tab, setTab] = useState(0);
  const [searchUsers, setSearchUsers] = useState([]);
  const [request, setRequest] = useState(false);
  const dispatch = useDispatch();
  const classes = styles();
  const { currWallet, usedAddress } = useSelector((state) => state.walletReducer);
  const { dids } = useSelector((state) => state.didReducer);

  // * Get all did of current company
  async function retrieveAllDids(companyName) {
    try {
      const dids = await requestRetrieveDid(CLIENT_PATH.RETRIEVE_ALL_DIDS, {
        companyName,
      });
      if (dids?.data?.error_code || dids?.data?.error_message) {
        dispatch(alertActions.showErrorNotification(dids?.data?.error_message));
      } else {
        dispatch(didActions.updateDids(dids?.data));
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      dispatch(
        alertActions.showErrorNotification(e?.message || e?.error_message || ALERT_CONSTANTS.ERROR.cannotRetrieveAllDis)
      );
    }
  }

  useEffect(() => {
    retrieveAllDids(COMPANY_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseAddUserPopup = () => {
    setSearchUsers([]);
    setSearchNewIssuer('');
    setAddUserOpen(false);
  };

  const handleReturnUserSummary = () => {
    setReviewUser(false);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleAddressChange = (e) => {
    setSearchNewIssuer(e.target.value);
    setSearchUsers(dids.filter((_user) => (e.target.value ? JSON.stringify(_user).includes(e.target.value) : _user)));
    if (e.target.value === '') setSearchUsers([]);
  };

  const handleAddNewIssuer = (user) => {
    return () => {
      setTextEditable(true);
      setNewIssuer(user);
      setSearchNewIssuer(user?.name || '');
      setSearchUsers([]);
    };
  };

  const handleClearNewIssuer = () => {
    setNewIssuer(null);
    setSearchNewIssuer('');
    setTextEditable(false);
  };

  const handleConfirmAddNewIssuer = async () => {
    setRequest(true);
    try {
      if (!searchIssuer) {
        // eslint-disable-next-line no-throw-literal
        throw {
          error_message: 'Please enter the user you want to be the issuer!',
        };
      }
      const fuixlabsWalletors = undefined;
      const signedData = await signObject(
        currWallet,
        usedAddress,
        {
          issuerAddress: searchIssuer,
        },
        fuixlabsWalletors
      );
      await addNewIssuer(dids, COMPANY_NAME, searchIssuer, {}, true, signedData, true);
      dispatch(alertActions.showSuccessNotification(ALERT_CONSTANTS.SUCCESS.addNewIssuer));
      retrieveAllDids(COMPANY_NAME);
      const userDidRes = await requestRetrieveSpecificDid(FUIXLABS_CLIENT_PATH.RETRIEVE_SPECIFIC_DID, {
        publicKey: usedAddress,
        companyName: COMPANY_NAME,
      });
      if (userDidRes?.data?.error_code) throw userDidRes?.data;
      dispatch(didActions.updateCurrentUserDid(userDidRes?.data));
      setAddUserOpen(false);
    } catch (e) {
      dispatch(alertActions.showErrorNotification(e.error_message));
    }
    setRequest(false);
  };

  return (
    <>
      {reviewUser ? (
        <UserReview reviewUser={reviewUser} handleReturnUserSummary={handleReturnUserSummary} />
      ) : (
        <>
          <div className={classes.container}>
            <p className={classes.titleTxt}>Manage Users</p>
            <div className={classes.managementDiv}>
              <Tabs value={tab} onChange={handleTabChange} aria-label="disabled tabs example">
                <Tab label="All Users" sx={{ fontSize: 'bold' }} />
                <Tab label="Issuers" />
              </Tabs>
              <div className={classes.userTableContainer}>
                <GeneralUsers
                  retrieveAllDids={retrieveAllDids}
                  loading={loading}
                  setReviewUser={setReviewUser}
                  issuer={tab === 1}
                  setAddUserOpen={setAddUserOpen}
                />
              </div>
            </div>
          </div>
          <Dialog
            open={addUsersOpen}
            onClose={handleCloseAddUserPopup}
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
            <div className={classes.popupContainer}>
              <div className={classes.headerContainer}>
                <CloseIcon onClick={handleCloseAddUserPopup} className={classes.closeIcon} />
              </div>
              <div className={classes.popupContent}>
                <span className={classes.popupTitle}>Add issuer</span>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: 700, marginTop: 5 },
                  }}
                >
                  <TextField
                    disabled={request || textEditable}
                    value={searchIssuer}
                    onChange={handleAddressChange}
                    label="Public Key"
                    multiline
                    placeholder="Enter a public address of issuer to add"
                    InputProps={
                      newIssuer && {
                        endAdornment: (
                          <InputAdornment position="start">
                            <CloseIcon onClick={handleClearNewIssuer} className={classes.deleteIcon} />
                          </InputAdornment>
                        ),
                      }
                    }
                  />
                </Box>
                {searchUsers.map((user, index) => (
                  <div className={classes.searchItemContainer} key={index}>
                    <div>
                      <p className={classes.searchName}>{user?.content?.data?.name || ''}</p>
                      <p className={classes.searchAddress}>{user?.content?.data?.address || ''}</p>
                    </div>
                    <AddCircleIcon onClick={handleAddNewIssuer(user)} className={classes.addIcon} />
                  </div>
                ))}
              </div>
              <div className={classes.btnGroups + ' mediumFontSize'}>
                <Button
                  disabled={request}
                  onClick={handleCloseAddUserPopup}
                  variant="outlined"
                  className={classes.defaultBtn}
                >
                  Cancel
                </Button>
                <Button
                  disabled={request}
                  onClick={handleConfirmAddNewIssuer}
                  variant="contained"
                  className={classes.defaultBtn + ' ' + classes.performBtn}
                >
                  Add
                </Button>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}
