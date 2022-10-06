import React, { useState } from 'react';
import styles from './styles/Header';

// * Custom components
import HeaderTooltip from './HeaderTooltip';
import NotificationMenu from './NotificationMenu';
import ConfirmTransfer from './ConfirmTransfer';

// * Redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { settingActions } from '../../redux/slices/setting';
import { resetState } from '../../redux/slices/wallet';

// * MUI libraries
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

export default function Header() {
  const classes = styles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { openSidebar } = useSelector((state) => state.settingReducer);
  const { credentials } = useSelector((state) => state.documentReducer);
  const { usedAddress } = useSelector((state) => state.walletReducer);
  const [currentCredential, setCurrentCredential] = useState(credentials[0]);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const mdBreakpoints = useMediaQuery(theme.breakpoints.down('lg'));
  const [anchorEl, setAnchorEl] = useState(null);
  const pendingNominations = credentials.length > 0 ? credentials.filter(
    (_item) =>
      _item.credentialSubject && _item.credentialSubject.action.code === 20 &&
      _item.status === 'pending' &&
      _item.metadata?.currentOwner !== usedAddress
  ) : [];

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenConfirmation(false);
    setAnchorEl(null);
  };

  const handleOpenSidebar = () => {
    dispatch(settingActions.openSidebar());
  };

  // * Erase access_token in cookie and reload
  const handleLogout = () => {
    dispatch(resetState());
    window.location.reload();
  };

  return (
    <div className={classes.container}>
      {mdBreakpoints &&
        (openSidebar ? (
          <CloseIcon
            onClick={handleOpenSidebar}
            sx={{ height: 40, width: 40, transition: '1s' }}
            className={classes.openSidebarIcon}
          />
        ) : (
          <MenuOpenIcon
            onClick={handleOpenSidebar}
            sx={{ height: 40, width: 40, transition: '1s' }}
            className={classes.openSidebarIcon}
          />
        ))}
      <div className="flexRow">
        <Badge
          onClick={handleClick}
          badgeContent={pendingNominations.length || 0}
          components={{ fontWeight: 'bold' }}
          color="primary"
          sx={{
            marginRight: 4,
            color: '#283646',
            fontWeight: 800,
            padding: '0px !important',
            ' .MuiBadge-badge': {
              padding: '5px !important',
              paddingTop: 0,
              fontWeight: 800,
              color: 'primary.white',
              border: '2px solid #FAF8F8',
              height: 'fit-content',
              borderRadius: '50%',
              minWidth: '27px',
              minHeight: '27px',
              marginTop: 0.6,
              marginRight: 0.3,
            },
          }}
        >
          <NotificationsIcon fontSize="large" />
        </Badge>
        <NotificationMenu
          setCurrentCredential={setCurrentCredential}
          setOpenConfirmation={setOpenConfirmation}
          openConfirmation={openConfirmation}
          notifications={pendingNominations}
          anchorEl={anchorEl}
          handleClose={handleClose}
          open={open}
        />
        <div className="flexRow">
          <HeaderTooltip handleLogout={handleLogout} classes={classes} />
        </div>
      </div>
      {openConfirmation && (
        <ConfirmTransfer handleClose={handleClose} currentCredential={currentCredential} open={openConfirmation} />
      )}
    </div>
  );
}
