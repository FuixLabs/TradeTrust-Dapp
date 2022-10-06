import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  container: {
    width: '87%',
    backgroundColor: `${theme.palette.primary.white} !important`,
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtnContainer: {
    boxShadow: `${theme.palette.boxShadow.primary} 0px 5px 15px`,
    width: 'fit-content',
    padding: 12,
    borderRadius: '50%',
    cursor: 'pointer',
  },
  headerUsername: {
    fontSize: 32,
    fontWeight: 540,
    marginLeft: 20,
    width: 400,
  },
  informationContainer: {
    marginTop: 40,
    boxShadow: `${theme.palette.boxShadow.primary} 0px 5px 15px`,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
  },
  baseInforContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 50,
    [theme.breakpoints.up('lg')]: {
      padding: 20
    },
  },
  profilePictureContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: 50,
  },
  profileImageTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  imageFrame: {
    border: '1px solid #00000034',
    height: 160,
    width: 160,
    marginBottom: 20,
    borderRadius: '50%',
  },
  profileImg: {
    height: 160,
    width: 160,
    borderRadius: '50%',
  },
  informationTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 30,
    [theme.breakpoints.up('lg')]: {
      fontSize: 18,
    },
  },
  txtField: {
    width: '80ch !important',
    marginBottom: '35px !important',
    [theme.breakpoints.between('lg', 'xl')]: {
      width: '60ch !important',
    },
    [theme.breakpoints.down('lg')]: {
      width: '88ch !important',
    },
  },
  popUptxtField: {
    width: '80ch !important',
    marginBottom: '35px !important',
    [theme.breakpoints.between('lg', 'xl')]: {
      width: '100% !important',
    },
    [theme.breakpoints.down('lg')]: {
      width: '88ch !important',
    },
  },
  editProfileBtn: {
    marginTop: 20,
    padding: 10,
    borderWidth: 0,
    borderRadius: 10,
    width: '100%',
    fontSize: 17,
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#f2f2f2',
    '&:hover': {
      backgroundColor: '#e6e6e6',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    },
  },
  popupContainer: {
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      minWidth: 800,
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
  popupFooter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  functionalBtn: {
    padding: '10px 20px',
    margin: 10,
    borderWidth: 0,
    cursor: 'pointer',
    borderRadius: 3,
    fontSize: 14,
    [theme.breakpoints.up('lg')]: {
      minHeight: 40,
      minWidth: 100,
    },
  },
  confirmBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
  },
  disableBtn: {
    opacity: 0.6,
  },
}));

export default styles;
