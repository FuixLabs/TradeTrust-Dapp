import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `solid 1px ${theme.palette.borderColor.primary}`,
    borderRadius: 8,
    width: '100%',
    paddingTop: 70,
    paddingBottom: 100,
    backgroundColor: theme.palette.backgroundColor.primary,
    boxSizing: 'border-box',
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingBottom: 0,
      padding: 0,
    },
  },
  selectBtn: {
    borderRadius: 8,
    borderWidth: 0,
    backgroundColor: theme.palette.primary.main,
    padding: '20px 25px',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    marginTop: 20,
    cursor: 'pointer',
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
      padding: '18px 22px',
    },
  },
  dragLogoContainer: {
    height: 204,
    width: 204,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    [theme.breakpoints.up('lg')]: {
      height: 180,
      width: 180,
    },
  },
  guideTxt: {
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 2,
    [theme.breakpoints.up('lg')]: {
      fontSize: 16,
    },
  },
  verifyTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    color: theme.palette.primary.main,
  },
  invalidDocumentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `dotted 1px red`,
    borderRadius: 8,
    width: '90%',
    paddingTop: 70,
    paddingBottom: 70,
    backgroundColor: theme.palette.backgroundColor.error,
    boxSizing: 'border-box',
    padding: 40,
    height: '80%'
  },
  invalidIcon: {
    height: 80,
    width: 80,
    marginRight: 20,
    [theme.breakpoints.up('lg')]: {
      height: 60,
      width: 60,
    },
  },
  invalidDocTitle: {
    fontSize: 32,
    color: theme.palette.textColor.primary,
    [theme.breakpoints.up('lg')]: {
      fontSize: 26,
    },
  },
  warningTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.palette.textColor.error,
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
  },
  normalTxt: {
    fontSize: 23,
    color: theme.palette.textColor.primary,
    lineHeight: 4,
  },
  guidelineBtn: {
    backgroundColor: 'red',
    marginTop: 10,
    padding: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    borderWidth: 0,
    borderRadius: 8,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.backgroundColor.error,
      color: theme.palette.textColor.primary,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 18
    },
  },
  retryTxt: {
    color: theme.palette.primary.success,
    fontSize: 23,
    textDecoration: 'underline',
    marginTop: 10,
    cursor: 'pointer',
    [theme.breakpoints.up('lg')]: {
      fontSize: 20
    },
  },
  errorTxt: {
    color: theme.palette.primary.error,
  },
  checkCircleIcon: {
    width: '50px !important',
    height: '50px !important',
    color: theme.palette.primary.success,
    marginRight: 10,
  },
  certificateLogo: {
    [theme.breakpoints.up('lg')]: {
      height: 180,
      width: 180,
    },
  },
}));

export default styles;
