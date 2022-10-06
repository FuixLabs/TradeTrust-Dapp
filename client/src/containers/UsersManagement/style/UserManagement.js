import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F8F9FA',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingRight: 45,
    paddingLeft: 50,
    paddingTop: 20,
    height: '100vh',
    [theme.breakpoints.down("lg")]: {
      padding: '0px 40px',
    }
  },
  titleTxt: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    [theme.breakpoints.down("lg")]: {
      fontSize: 25
    }
  },
  managementDiv: {
    
  },
  userTableContainer: {
    marginTop: 50,
    width: '70%',
    [theme.breakpoints.down("lg")]: {
      width: '100%',
    }
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
  popupContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 21
  },
  closeIcon: {
    height: '15px !important',
    width: '15px !important',
    cursor: 'pointer',
  },
  defaultBtn: {
    padding: '14px 45px !important',
    fontWeight: 'bold !important',
    marginLeft: '15px !important',
    fontSize: '14px !important',
  },
  performBtn: {
    color: `${theme.palette.primary.white} !important`
  },
  btnGroups: {
    marginTop: 40,
    alignSelf: 'center',
  },
  searchItemContainer: {
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    width: 664,
    padding: '13px 18px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  searchName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  searchAddress: {
    fontSize: 12,
    opacity: 0.8,
    fontWeight: 530,
    width: 450,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word'
  },
  addIcon: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    height: '32px !important',
    width: '32px !important'
  },
  deleteIcon: {
    cursor: 'pointer'
  }
}));

export default styles;
