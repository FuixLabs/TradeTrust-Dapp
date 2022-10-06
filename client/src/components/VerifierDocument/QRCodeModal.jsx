import React, { useState, useEffect } from 'react';
import styles from './styles/QRCodeModal';
import QRCode from 'react-qr-code';

// * MUI libraries
import Dialog from '@mui/material/Dialog';

// * Redux libraries
import { useSelector } from 'react-redux';
import { unsalt } from 'utils/data';

export default function QRCodeModal(props) {
  const { open, handleClose } = props;
  const descriptionElementRef = React.useRef(null);

  const { verifyDocument } = useSelector((state) => state.documentReducer);

  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');

  // let url = window.location.origin + '/create';
  // ! Change the url to origin on production
  let url = `http://192.168.2.4:4000/view/${unsalt(verifyDocument.data.data.did)}/`;
  // let { id } = this.props.match.params;

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const classes = styles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth={'md'}
      sx={{
        '& .MuiDialogContent-root': {
          width: '100% !important',
        },
      }}
    >
      <div className={classes.container}>
        <span className={classes.titleTxt}>Scan QRCode to view document content</span>
        <QRCode level="L" size={360} value={url} />
      </div>
    </Dialog>
  );
}
