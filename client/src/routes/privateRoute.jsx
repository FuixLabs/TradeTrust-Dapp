import React from 'react';
import styles from 'containers/styles/App';

// * Redux libraries
import { useSelector } from 'react-redux';

//* Router libraries
import { Navigate } from 'react-router-dom';

// * Custom components
// eslint-disable-next-line no-unused-vars
import { Header, Footer, SideBar } from 'components';

export default function PrivateRoute({ children }) {
  const { isAuth } = useSelector((state) => state.walletReducer);
  const { openSidebar } = useSelector((state) => state.settingReducer);

  const classes = styles();
  return isAuth ? (
    <>
      <SideBar />
      <div className={openSidebar ? classes.openSidebar : classes.main}>
        <Header />
        {children}
        {/* <Footer /> */}
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
