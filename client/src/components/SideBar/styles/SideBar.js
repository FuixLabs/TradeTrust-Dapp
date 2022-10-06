import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  sideBar: {
    height: '100%',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: theme.palette.primary.white,
    overflowX: 'hidden',
    paddingTop: 60,
    transition: '0.5s',
    width: 100,
    [theme.breakpoints.down('lg')]: {
      width: 0,
    },
  },
  openSideBar: {
    height: '100%',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: theme.palette.primary.white,
    overflowX: 'hidden',
    paddingTop: 60,
    transition: '0.5s',
    width: 100,
  },
  logoImg: {
    width: 40,
    height: 40,
    marginBottom: 35,
    [theme.breakpoints.up('lg')]: {
      width: 60,
      height: 60,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    paddingBottom: 40,
    backgroundSize: 'cover',
  },
  issueDocBtn: {
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.white,
    borderRadius: '50%',
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    marginTop: 10,
    cursor: 'pointer',
    marginBottom: 35,
    textDecoration: 'none',
    [theme.breakpoints.up('lg')]: {
      width: 65,
      height: 65,
      marginBottom: 20,
    },
  },
  nameTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginTop: 10,
    marginBottom: 50,
  },
  sidebarContainer: {
    marginTop: 25,
    fontSize: 5,
  },
  sidebarLink: {
    fontSize: 10,
    marginTop: 7,
    [theme.breakpoints.up('lg')]: {
      fontSize: 10,
    },
  },
  linkItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: '18px 10px',
    textDecoration: 'none',
    [theme.breakpoints.up('lg')]: {
      padding: '15px 8px',
    },
  },
  activeLinkContainer: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#2D5FAA',
    padding: '18px 10px',
    borderRadius: 8,
    marginBottom: 20,
    minWidth: 40,
    color: theme.palette.primary.white,
    [theme.breakpoints.up('lg')]: {
      padding: '15px 12px',
    },
  },
  creationImg: {
    width: 26,
    height: 35,
    [theme.breakpoints.up('lg')]: {
      width: 24,
      height: 31,
    },
  },
  supportIcon: {
    height: '18px !important',
    width: '18px !important',
    color: theme.palette.primary.white,
    marginBottom: 10,
  },
  sideBarItem: {
    cursor: 'pointer',
  },
}));

export default styles;
