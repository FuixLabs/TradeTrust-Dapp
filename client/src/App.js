import './App.css';
import React, { useEffect, Suspense, useState } from 'react';

// * Nami wallet libraries
import { connectWallet, getUsedAddresses } from './nami-wallet/utils';

// * Utilities libraries
import { pullTransactions } from './utils/transaction';
import { createCookie, eraseCookie } from './utils/cookies';

// * Components libraries
import { Mess } from './components';
import ProgressDialog from './components/ProgressDialog/ProgressDialog.jsx';
import IssuerRegistration from 'components/IssuerRegistration/IssuerRegistration';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import { generateDid } from 'fuixlabs-documentor/utils/did';

//* Router libraries
import { useSearchParams, Routes, Route, useLocation } from 'react-router-dom';
import indexRoutes from './routes';
import PrivateRoute from 'routes/privateRoute';

// * Redux libraries
import { alertActions } from 'redux/slices/alert';
import { settingActions } from 'redux/slices/setting';
import { connectToWallet, setAuth } from 'redux/slices/wallet';
import { updateFetchingSuccessful, pullTransaction, pullCredentials } from 'redux/slices/document';
import { didActions } from 'redux/slices/did';
import { useSelector, useDispatch } from 'react-redux';

// * Constants libraries
import { ALERT_CONSTANTS } from './redux/constants/alert.msg';
import { ERROR_MSG } from 'constants/error';
import { COMPANY_NAME } from 'constants/app';

// * Rest libraries
import { requestVerifyAccessToken } from 'rest/client.rest';
import { CLIENT_PATH } from 'rest/client.path';
import { requestRetrieveSpecificDid } from 'fuixlabs-documentor/rest/client.rest';
import { CLIENT_PATH as FUIXLABS_CLIENT_PATH } from 'fuixlabs-documentor/rest/client.path';

const accessTokenParam = 'access_token';

const switchRoutes = (
  <Suspense fallback={<div />}>
    <Routes>
      {indexRoutes.map((prop, key) => {
        if (prop.private)
          return <Route path={prop.path} element={<PrivateRoute>{prop.element}</PrivateRoute>} key={key} />;
        return <Route path={prop.path} element={prop.element} key={key} />;
      })}
    </Routes>
  </Suspense>
);

function App() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [issuerRegistration, setIssuerRegistration] = useState(false);
  const { connecting } = useSelector((state) => state.settingReducer);
  const { visible, msg, hideTime, severity } = useSelector((state) => state.alertReducer);
  const { currWallet, access_token } = useSelector((state) => state.walletReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  /**
   * When the user logs in through the authentication gateway, the gateway will return the DApp an access token on the path
   * In case there is an access token on the path, the system will create an access_token field in the cookie and then delete the access token present on the path.
   */

  useEffect(() => {
    if (window.location.href.split('?access_token=')[1]) {
      const _accessToken = window.location.search.split('?access_token=')[1];
      createCookie(accessTokenParam, _accessToken);
      dispatch(setAuth(true));
      searchParam.delete(accessTokenParam);
      setSearchParam(searchParam);
    } else if (access_token && access_token.length !== 0) {
      dispatch(setAuth(true));
    }
    pollWallets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function _pullTransactions(address) {
    try {
      const response = await pullTransactions(generateDid(COMPANY_NAME, address));
      const { formatTransactions, credentials } = response;
      if (formatTransactions.length !== 0) {
        dispatch(pullTransaction(formatTransactions));
      }
      if (credentials.length !== 0) dispatch(pullCredentials(credentials));
    } catch (e) {
      dispatch(alertActions.customError({ msg: e || e?.error_message || e?.message }));
    }
    dispatch(updateFetchingSuccessful());
  }

  /**
   * Poll the wallets it can read from the browser.
   * Sometimes the html document loads before the browser initialized browser plugins (like Nami or Flint).
   * So we try to poll the wallets 3 times (with 1 second in between each try).
   *
   * Note: CCVault and Eternl are the same wallet, Eternl is a rebrand of CCVault
   * So both of these wallets as the Eternl injects itself twice to maintain
   * backward compatibility
   * url: https://github.com/dynamicstrategies/cardano-wallet-connector/blob/master/src/App.js
   *
   * @param count The current try count.
   */
  const pollWallets = (count = 0) => {
    const wallets = [];
    const namiExtension = 'nami';
    if (count < 3 && !window.cardano) {
      setTimeout(() => {
        pollWallets(count + 1);
      }, 1000);
      return;
    }
    for (const key in window.cardano) {
      if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
        wallets.push(key);
      }
    }
    if (wallets.find((_item) => _item === namiExtension)) {
      handleConnectToWallet();
    } else {
      dispatch(settingActions.connectFail());
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.cannotConnectWallet));
    }
  };

  const handleHideNotification = () => {
    dispatch(alertActions.hideNotification());
  };

  const handleConnectToWallet = async () => {
    if (location.pathname !== '/login') {
      try {
        // * Connect to get the current wallet object
        const _currWallet = await connectWallet(currWallet);
        if (_currWallet) {
          // * Get the current user wallet address rely on current wallet
          getUsedAddresses(_currWallet).then(async (address) => {
            const accessTokenAddress = await requestVerifyAccessToken(CLIENT_PATH.VERIFY_ACCESS_TOKEN);
            if (
              accessTokenAddress.data &&
              accessTokenAddress.data.address &&
              accessTokenAddress.data.address !== address
            ) {
              dispatch(alertActions.showErrorNotification(ERROR_MSG.ACCESS_TOKEN_IS_NOT_AUTHORIZED));
              eraseCookie(accessTokenParam);
              dispatch(setAuth(false));
            } else {
              dispatch(connectToWallet({ currWallet: _currWallet, address }));
              const userDidRes = await requestRetrieveSpecificDid(FUIXLABS_CLIENT_PATH.RETRIEVE_SPECIFIC_DID, {
                publicKey: accessTokenAddress.data.address,
                companyName: COMPANY_NAME,
              });
              if (userDidRes?.data?.error_code === 20002 || userDidRes?.data?.error_code === 20000) {
                setIssuerRegistration(true);
              }
              if (userDidRes?.data?.error_code) throw userDidRes?.data;
              dispatch(didActions.updateCurrentUserDid(userDidRes?.data));
              _pullTransactions(address);
            }
          });
        }
      } catch (e) {
        dispatch(
          alertActions.showErrorNotification(
            e?.message || e?.error_message || ALERT_CONSTANTS.ERROR.cannotConnectWallet
          )
        );
      }
    }
    dispatch(settingActions.connectFail());
  };

  return (
    <>
      {switchRoutes}
      <Mess
        msg={msg}
        hideTime={hideTime}
        severity={severity}
        visible={visible}
        hideNotification={handleHideNotification}
      />
      {connecting && <ProgressDialog />}
      <ConfirmDialog />
      {issuerRegistration && <IssuerRegistration />}
    </>
  );
}

export default App;
