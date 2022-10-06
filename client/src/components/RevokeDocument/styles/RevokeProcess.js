import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  verifyDocumentContainer: {
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    padding: 43,
    backgroundColor: 'white',
    minWidth: 400,
    [theme.breakpoints.up('lg')]: {
      minWidth: 600,
    }
  },
  bigBoldTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.textColor.primary,
  },
  dragVerifyDocumentDiv: {
    marginTop: 30,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      marginTop: 20,
    },
  },
  chooseInfor: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 35,
    width: '100%',
  },
  stepperContainer: {
    marginLeft: 60,
    borderRadius: 8,
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    backgroundColor: 'white',
    padding: '40px 0px 40px 15px',
    fontSize: '10px !important',
    color: theme.palette.textColor.primary,
    fontWeight: 'bold',
    width: '40%',
    '& .MuiStepLabel-root': {
      padding: '0px !important',
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
      boxShadow: 'unset',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
  },
  contentContainer: {
  },
  grayTxt: {
    color: '#77808B',
    fontSize: 13,
  },
  customStepConnector: {
    '& .MuiStepConnector-active': {
      '& .MuiStepConnector-line': {
        backgroundColor: theme.palette.textColor.secondary,
      },
    },
    '& .MuiStepConnector-line': {
      height: 54,
      left: '50px !important',
      borderLeftColor: theme.palette.textColor.primary,
      [theme.breakpoints.down('lg')]: {
        marginTop: 8,
      },
    },
  },
  customConnectorRoot: {
    maxWidth: '100%',
    marginTop: 20,
    '& .MuiStepConnector-root': {
      marginLeft: '12 px !important',
      width: '100%',
    },
  },
  stepLabel: {
    '& .MuiStepLabel-label': {
      color: theme.palette.textColor.primary,
      fontSize: 12,
      fontWeight: 'bold',
    },
    '& .MuiStepLabel-label.Mui-active': {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
  },
  choosenTypeVerifyDiv: {
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    padding: '43px 10px 43px 10px',
    backgroundColor: 'white',
    minWidth: 400,
    minHeight: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: 500,
    }
  },
  choosenVerifyTypeDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
  },
  groupTypeBtns: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  choosenBtn: {
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
    padding: '10px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.borderColor.primary} !important`,
    backgroundColor: `${theme.palette.backgroundColor.primary} !important`,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('lg')]: {
      margin: 'unset !important',
    },
  },
  disabledBtn: {
    borderRadius: 8,
    backgroundColor: theme.palette.backgroundColor.secondary,
    fontSize: 12,
    fontWeight: 'bold',
    padding: '10px 30px',
    color: theme.palette.textColor.primary,
    border: `1px solid ${theme.palette.borderColor.secondary}`,
    display: 'flex',
    alignItems: 'center',
    opacity: 0.5,
    justifyContent: 'space-between',
    margin: '20px !important',
    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
      margin: 'unset !important',
    },
  },
  revokeBtn: {
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '15px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.borderColor.primary}`,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    width: 220,
    [theme.breakpoints.up('lg')]: {
      fontSize: '12px !important',
    },
  },
  popupContainer: {
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      minWidth: 500,
    },
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  choosenType: {
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
    padding: '15px 30px',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.borderColor.primary} !important`,
    backgroundColor: `${theme.palette.backgroundColor.primary} !important`,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('lg')]: {
      margin: 'unset !important',
    },
  },
  popupFooter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  functionalBtn: {
    padding: '10px 20px',
    margin: '10px !important',
    borderWidth: 0,
    cursor: 'pointer',
    borderRadius: 3,
    fontSize: '14px !important',
    [theme.breakpoints.up('lg')]: {
      minHeight: '40px !important',
      minWidth: '100px !important',
    },
  },
  cancelBtn: {
    backgroundColor: theme.palette.backgroundColor.secondary,
  },
  confirmBtn: {
    backgroundColor: '#D94300 !important',
    color: `${theme.palette.primary.white} !important`,
  },
  descriptionTxt: {
    color: theme.palette.textColor.description,
    fontSize: 14,
    width: 303,
    marginTop: 12,
    marginBottom: 15,
  },
  closeIcon: {
    height: '15px !important',
    width: '15px !important',
    cursor: 'pointer',
  },
  successItemContainer: {
    padding: 16,
    [theme.breakpoints.up('lg')]: {
      padding: 12
    }
  },
  successItem: {
    height: 74,
    borderRadius: 3,
    border: `1.5px solid ${theme.palette.borderColor.secondary}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 10px',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      height: 'unset'
    }
  },
  downloadableTxt: {
    marginLeft: 10,
    [theme.breakpoints.up('lg')]: {
      fontSize: 12
    }
  },
  fileNameTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.palette.textColor.primary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: 140,
    [theme.breakpoints.up('lg')]: {
      width: 140,
      fontSize: 12
    },
  },
  step1Container: {
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    padding: 43,
    backgroundColor: theme.palette.primary.white,
    minHeight: 680,
    minWidth: 832,
    width: '90%',
    [theme.breakpoints.down('md')]: {
      minWidth: 'unset',
    },
  },
  step3Container: {
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    padding: 30,
    backgroundColor: theme.palette.primary.white,
    minHeight: 600,
    [theme.breakpoints.down('md')]: {
      minWidth: 'unset',
    },
  },
  uploadConfigDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  configIcon: {
    width: 21,
    height: 27,
    color: theme.palette.primary.main,
    marginRight: 10,
  },
  successDocsDetailDiv: {
    marginTop: 40,
    [theme.breakpoints.up('lg')]: {
      marginTop: 10
    }
  },
  successDocTxt: {
    fontSize: 21,
    fontWeight: 'bold',
    color: theme.palette.textColor.primary,
    [theme.breakpoints.up('lg')]: {
      fontSize: 14
    }
  },
  successDocQuantityTxt: {
    fontSize: 14,
    marginLeft: 15,
    opacity: '70%',
  },
  uploadTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    [theme.breakpoints.up('lg')]: {
      fontSize: 12
    }
  },
  revokeDiv: {
    border: `solid 1px ${theme.palette.primary.error}`,
    color: theme.palette.primary.error,
    justifyContent: 'center',
    padding: 8,
    borderRadius: 5,
    // position: 'relative',
    [theme.breakpoints.up('lg')]: {
      fontSize: 12
    }
  },
  resultInforDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}));

export default styles;
