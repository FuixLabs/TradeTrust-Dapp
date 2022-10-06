import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  container: {
    padding: '30px 30px 0 20px',
    backgroundColor: theme.palette.primary.white,
    fontSize: 14,
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    borderRadius: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 550,
  },
  tableContainer: {
    marginTop: 30,
    paddingBottom: 30,
  },
  issuerRole: {
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    maxWidth: '90px !important',
    padding: 5,
    color: 'white !important',
    fontWeight: 550,
    fontSize: 12,
  },
  settingDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIssuerBtn: {
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
    height: 56,
    padding: 10,
    opacity: '100% !important',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  closeIcon: {
    height: '15px !important',
    width: '15px !important',
    cursor: 'pointer',
  },
  popupContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionTxt: {
    color: theme.palette.textColor.description,
    fontSize: 14,
    width: 303,
    marginTop: 12,
    marginBottom: 15,
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
  confirmBtn: {
    backgroundColor: '#D94300 !important',
    color: `${theme.palette.primary.white} !important`,
  },
  tableTxt: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 520,
    maxWidth: 320,
    fontSize: '15px !important',
  },
  circleProgress: {
    height: '15px !important',
    width: '15px !important',
  },
  removeBtn: {
    color: `${theme.palette.primary.error} !important`,
    borderColor: `${theme.palette.primary.error} !important`,
    minWidth: 100,
    zIndex: 1,
    cursor: 'unset !important',
    '&:hover': {
      borderColor: `${theme.palette.primary.error} !important`,
      backgroundColor: 'transparent',
    },
  },
  generalTable: {
    minWidth: 700,
    borderCollapse: 'separate',
    borderSpacing: '0px 4px',
  },
  copyClipBoardIcon: {
    height: '15px !important',
    width: '15px !important',
    marginLeft: 5,
    cursor: 'pointer',
  },
}));

export default styles;
