import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  tabContainer: {
    fontSize: '24px !important',
    fontWeight: 'bold !important',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('lg')]: {
      fontSize: '18px !important',
    },
  },
  chooseInfor: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 35,
    width: '100%',
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

  //STEPPER STYLE
  stepperContainer: {
    marginLeft: 30,
    borderRadius: 8,
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    backgroundColor: 'white',
    padding: '40px 0px 40px 15px',
    fontSize: '10px !important',
    color: theme.palette.textColor.primary,
    fontWeight: 'bold',
    width: '100%',
    position: 'sticky',
    top: 10,
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
  stepIcon: {
    height: 28,
    width: 28,
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
  checkStepLabel: {
    '& .MuiStepLabel-label': {
      color: theme.palette.primary.main,
      fontSize: 10,
      fontWeight: 'bold',
    },
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

  checkConnectorRoot: {
    maxWidth: '70%',
    marginTop: 20,
    '& .MuiStepConnector-root': {
      color: theme.palette.primary.main,
      marginLeft: '12 px !important',
      width: '100%',
    },
  },

  // STEP 1 STYLE
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
    [theme.breakpoints.up('lg')]: {
      minWidth: 700,
    },
  },
  uploadConfigDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectBtn: {
    borderRadius: 8,
    backgroundColor: theme.palette.backgroundColor.secondary,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '15px 30px',
    color: theme.palette.textColor.primary,
    border: `1px solid ${theme.palette.borderColor.secondary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      border: `1px solid ${theme.palette.borderColor.primary}`,
      backgroundColor: theme.palette.backgroundColor.primary,
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
      margin: 'unset !important',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
      padding: '8px 18px',
    },
  },
  disabledBtn: {
    borderRadius: 8,
    backgroundColor: theme.palette.backgroundColor.secondary,
    fontSize: 14,
    fontWeight: 'bold',
    padding: '15px 30px',
    color: theme.palette.textColor.primary,
    border: `1px solid ${theme.palette.borderColor.secondary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.5,
    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
      margin: 'unset !important',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
      padding: '10px 25px',
    },
  },
  choosenBtn: {
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 'bold',
    padding: '15px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.borderColor.primary} !important`,
    backgroundColor: `${theme.palette.backgroundColor.primary} !important`,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('lg')]: {
      margin: 'unset !important',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
      padding: '10px 25px',
    },
  },
  uploadTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    },
  },
  choosenTypeDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
    [theme.breakpoints.up('lg')]: {
      marginTop: 15,
    },
  },
  choosenVerifyTypeDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
  },
  groupTypeBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    '& > *': {
      m: 1,
    },
  },
  bigBoldTxt: {
    fontSize: 21,
    fontWeight: 'bold',
    color: theme.palette.textColor.primary,
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    },
  },

  // STEP 2 STYLE
  issueBtn: {
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
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
    },
  },
  backBtn: {
    borderRadius: 8,
    backgroundColor: theme.palette.backgroundColor.secondary,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '15px 20px',
    color: theme.palette.textColor.primary,
    border: `1px solid ${theme.palette.borderColor.secondary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      border: `1px solid ${theme.palette.borderColor.primary}`,
      backgroundColor: theme.palette.backgroundColor.primary,
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
    },
  },

  // STEP 2 STYLE
  grayTxt: {
    color: '#77808B',
    fontSize: 14,
  },
  quantityTxt: {
    color: '#000000A5',
    opacity: '80%',
    fontSize: 14,
    marginLeft: 10,
  },
  selectDocDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyDocsDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  modifyBtn: {
    height: 55,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    borderRadius: 4,
    padding: 14,
  },
  addBtn: {
    marginRight: 15,
    marginLeft: 15,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.borderColor.primary}`,
    backgroundColor: theme.palette.backgroundColor.primary,
  },
  deleteBtn: {
    color: theme.palette.textColor.error,
    border: `1px solid ${theme.palette.borderColor.error}`,
    backgroundColor: theme.palette.buttonColor.error,
    cursor: 'pointer',
  },
  modifyDocInforContainer: {
    padding: 43,
    marginBottom: 18,
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    backgroundColor: theme.palette.primary.white,
    width: '100%',
    minWidth: 848.5,
    boxSizing: 'border-box',
    [theme.breakpoints.up('lg')]: {
      minWidth: 740,
    },
  },
  documentInforItem: {},
  detailHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.textColor.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  autoFileForm: {
    width: '100%',
  },
  getSchemaTxt: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    color: theme.palette.textColor.primary,
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 12,
    marginBottom: 20,
  },
  dragSchemaForm: {
    marginTop: 32,
    background: theme.palette.backgroundColor.primary,
    padding: 14,
    borderRadius: 8,
    border: `1px solid ${theme.palette.borderColor.primary}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: 'bold',
    paddingBottom: 30,
    minHeight: 180,
  },
  uploadFileBtn: {
    marginTop: 17,
    height: 32,
    width: 134,
    fontWeight: 'bold',
    border: `1.2px solid ${theme.palette.borderColor.primary}`,
    borderRadius: 4,
    backgroundColor: theme.palette.backgroundColor.primary,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 35,
  },
  attachmentDragForm: {
    background: theme.palette.backgroundColor.primary,
    padding: 14,
    borderRadius: 8,
    border: `1px solid ${theme.palette.borderColor.primary}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: 'bold',
  },
  smallTxt: {
    fontSize: 12,
    color: theme.palette.textColor.primary,
    opacity: '70%',
  },

  // STEP 3 STYLE
  successDocsDetailDiv: {
    marginTop: 40,
  },
  successDocTxt: {
    fontSize: 21,
    fontWeight: 'bold',
    color: theme.palette.textColor.primary,
    [theme.breakpoints.up('lg')]: {
      fontSize: 16,
    },
  },
  successDocQuantityTxt: {
    fontSize: 14,
    marginLeft: 15,
    opacity: '70%',
  },
  successItem: {
    height: 74,
    borderRadius: 3,
    border: `1.5px solid ${theme.palette.borderColor.secondary}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 25px',
    boxSizing: 'border-box',
    width: '100%',
  },
  successItemContainer: {
    padding: 16,
  },
  downloadableTxt: {
    marginLeft: 10,
    maxWidth: '10%',
  },
  resultInforDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  fileNameTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.palette.textColor.primary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
    },
  },
  fileSizeTxt: {
    fontSize: 12,
    color: theme.palette.primary.main,
  },
  dragVerifyDocumentDiv: {
    marginTop: 30,
  },
  verifyDocumentContainer: {
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    padding: 43,
    backgroundColor: 'white',
    minWidth: 700,
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
  },
  choosenTypeVerifyDiv: {
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    padding: 43,
    backgroundColor: 'white',
    minWidth: 700,
    minHeight: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // CONFIRMING POP-UP
  popupContainer: {
    width: 480,
    height: 222,
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100vw',
    height: '100%',
    zIndex: 1001,
    padding: 32,
  },
  popupTitleTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupDescription: {
    marginRight: 120,
    color: theme.palette.textColor.popupDescription,
    margin: '16px 0px',
    opacity: '60%',
  },
  selectedType: {
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 'bold',
    padding: '15px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.borderColor.primary}`,
    backgroundColor: theme.palette.backgroundColor.primary,
    color: theme.palette.primary.main,
    width: 'fit-content',
  },
  confirmDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  confirmBtn: {
    marginRight: 20,
    fontSize: 14,
    padding: '12px 20px',
  },
  downloadIcon: {
    width: 30,
    height: 30,
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  formControle: {
    width: '50%',
    marginRight: 5,
  },
  configIcon: {
    width: 21,
    height: 27,
    color: theme.palette.primary.main,
    marginRight: 10,
  },
  changeStepIcon: {
    width: 11,
    height: 9,
    marginLeft: 10,
    [theme.breakpoints.up('lg')]: {
      width: 9,
      height: 7,
    },
  },
  noteAddIcon: {
    width: 20,
    color: theme.palette.primary.main,
  },
  deleteIcon: {
    width: '20px !important',
    color: theme.palette.primary.error,
  },
  successDocumentsContainer: {
    marginTop: 4,
  },
  issueTitleTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingStateContainer: {
    display: 'flex',
    marginTop: 5,
  },
  uploadFileIcon: {
    height: 55,
    width: 70,
    color: theme.palette.primary.main,
    marginBottom: 12,
  },
  detailBtn: {
    height: 40,
  },
  formLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    [theme.breakpoints.up('lg')]: {
      fontSize: 16,
    },
  },
  attachmentIcon: {
    height: 100,
    width: 100,
    color: theme.palette.primary.main,
    marginRight: 10,
  },
  previewContainer: {
    marginTop: 32,
  },
  scrollBtn: {
    borderRadius: '50% !important',
    height: 50,
    width: 50,
    position: 'absolute',
    borderWidth: 0,
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    color: theme.palette.primary.white,
    marginTop: -70,
    marginLeft: 1000,
  },
}));

export default styles;