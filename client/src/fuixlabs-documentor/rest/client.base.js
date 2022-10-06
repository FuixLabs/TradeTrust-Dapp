import axios from 'axios';
import { eraseCookie } from 'utils/cookies';
import { setAuth } from 'redux/slices/wallet';
import store from 'redux/store';
import { alertActions } from 'redux/slices/alert';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';
import * as AxiosLogger from 'axios-logger';

// * Need for connection cross domain
axios.defaults.withCredentials = true;

// * `headers` are custom headers to be sent
const REQUEST_CONFIG = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

//Create the base client from the rest of our app
const axiosClient = axios.create({
  headers: REQUEST_CONFIG,
});

axiosClient.interceptors.request.use((request) => {
  // write down your request intercept.
  return AxiosLogger.requestLogger(request);
});
/**
 * Define conditions when our call is unauthorized and make our application react appropriately
 * @return {Promise}
 */
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if(error?.response?.status === 401 || error?.response?.status === 500) {
      store.dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.invalidAccessToken));
      setTimeout(() => {
        eraseCookie('access_token');
        store.dispatch(setAuth(false));
        window.location.reload();
      }, [3000]);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
