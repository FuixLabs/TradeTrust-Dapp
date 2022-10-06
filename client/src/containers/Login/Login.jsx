import React from 'react';
import styles from './styles/Login';

// * Assets
import fuixlabsLogo from '../../assets/images/tradetrust-logo.svg';

// * Constant libraries
import { APP_KEY, AUTH_SERVER_URL } from '../../constants/app';

// * Redux libraries
import { useSelector } from 'react-redux';

// * Router libraries
import { Navigate } from 'react-router-dom';

// * MUI libraries
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

export default function Login() {
  const { isAuth } = useSelector((state) => state.walletReducer);
  const { connecting } = useSelector((state) => state.settingReducer);
  const authServiceUrl = `${AUTH_SERVER_URL}?app-key=${APP_KEY}`;

  const handleLogin = () => {
    window.open(authServiceUrl);
  };

  // * Redirect to home page if use was login
  const classes = styles();
  if (isAuth) return <Navigate to="/" />;
  return (
    <div className={classes.container}>
      <div className={classes.authForm}>
        <img src={fuixlabsLogo} alt="fuixlabs" className={classes.fuixlabsLogo} />
        <div className={classes.txtDiv}>
          <span className={classes.welcomeTxt}>Welcome to TradeTrust</span>
          <span className={classes.subTitleTxt}>The first open source implementation of DID on Cardano</span>
        </div>
        <Button
          disabled={connecting}
          variant="contained"
          onClick={handleLogin}
          className={classes.loginBtn + ' smallFontSize'}
        >
          {!connecting ? (
            <span>Login</span>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress sx={{ color: 'primary.white' }} size={21} />
            </Box>
          )}
        </Button>
      </div>
    </div>
  );
}