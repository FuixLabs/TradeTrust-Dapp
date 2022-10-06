import React from 'react';
import styles from './styles/SideBar';
import './style.css';

// * Assets libraries
import blackCreateBtn from 'assets/images/note_add_black_24dp.svg';
// import fuixlabsLogo from 'assets/images/company-logo.svg';
import tradetrustLogo from 'assets/images/tradetrust-logo.svg';

// * Constants libraries
import { SIDEBAR_LINK } from './sidebar.constants.js';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { settingActions } from 'redux/slices/setting';
import { resetVerifyDocument, resetDocuments } from 'redux/slices/document';
import { resetFile } from 'redux/slices/file';

//* Router libraries
import { useNavigate } from 'react-router-dom';

// * MUI libraries
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

export default function SideBar() {
  const { openSidebar } = useSelector((state) => state.settingReducer);
  const { successDocuments } = useSelector((state) => state.documentReducer);
  const { usedAddress } = useSelector((state) => state.walletReducer);
  const currentPathname = window.location.pathname;
  const classes = styles();
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleNavigate = (link) => {
    if (successDocuments.length > 0) {
      dispatch(settingActions.handleRedirect(link));
      dispatch(settingActions.handleChangeConfirm());
    } else {
      dispatch(resetVerifyDocument());
      history(link);
      dispatch(resetDocuments());
      dispatch(resetFile());
    }
  };

  return (
    <div className={openSidebar ? classes.openSideBar : classes.sideBar + ' ' + classes.container}>
      <div className="flexCenter">
        <div className={classes.sideBarItem} onClick={() => handleNavigate('/')}>
          <img className={classes.logoImg} src={tradetrustLogo} alt="fuixlabs" />
        </div>
        <div className={classes.sideBarItem} onClick={() => handleNavigate('/create')}>
          <Tooltip
            TransitionComponent={Zoom}
            title={<span className="largeFontSize">Create document</span>}
            placement="right"
          >
            <div className={classes.issueDocBtn}>
              <img src={blackCreateBtn} alt="create-btn" className={classes.creationImg} />
            </div>
          </Tooltip>
        </div>
        <div className={classes.sidebarContainer}>
          {SIDEBAR_LINK.filter((_link) =>
            usedAddress && process.env.REACT_APP_SUPER_USER !== usedAddress ? _link.name !== 'Users' : _link
          ).map((link, index) => (
            <div
              className={classes.sideBarItem}
              onClick={() => handleNavigate(link.to)}
              style={{ textDecoration: 'none' }}
              key={index}
            >
              <div className={currentPathname === link.to ? classes.activeLinkContainer : classes.linkItem}>
                {link.icon}
                <span className={classes.sidebarLink}> {link.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
