import React from 'react';
import styles from './styles/NotificationMenu';

// * Constants libraries
import { NOTIFICATION_TYPE } from 'constants/type';

// * MUI libraries
import Menu from '@mui/material/Menu';

export default function NotificationMenu(props) {
  const { setCurrentCredential, anchorEl, handleClose, open, notifications, setOpenConfirmation } = props;

  const classes = styles();
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <div className={classes.container}>
        <span className={classes.titleTxt}>Notification</span>
        {notifications.length > 0 && (
          <div className={classes.notificationsContainer}>
            {notifications.map((notification, index) => {
              const currentNotification = NOTIFICATION_TYPE.find(
                (_noti) => _noti.name === notification?.credentialSubject?.action?.value
              );
              return (
                <div
                  onClick={() => {
                    setOpenConfirmation(true);
                    setCurrentCredential(notification);
                  }}
                  key={index}
                  className={classes.notiItemContainer + ' flexRow'}
                >
                  <div className={classes.iconContainer}>{currentNotification.icon}</div>
                  {currentNotification.name !== 'nominateChangeOwnership' ? (
                    <>
                      <span className={classes.addressTxt}>{notification.publickKey}</span>
                      <span>&ensp;{currentNotification.text}</span>
                    </>
                  ) : (
                    <>
                      <span className={classes.addressTxt}>{notification?.metadata?.currentOwner}</span>
                      <span>{currentNotification.text}</span>
                      <span>&ensp;{notification?.credentialSubject?.object.split(':')[3]}</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Menu>
  );
}
