import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  informationContainer: {
    padding: 50,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 0,
  },
  baseInforContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  profilePictureContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginLeft: 30,
  },
  profileImageTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageFrame: {
    border: '1px solid #00000034',
    height: 245,
    width: 256,
    borderRadius: 4,
    marginBottom: 20,
    boxShadow: `0px 3px 6px ${theme.palette.boxShadow.primary}`,
    cursor: 'pointer',
  },
  profileImg: {
    height: 245,
    width: 256,
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
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.primary.white} !important`,
    width: 300,
  },
  popUpFooter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default styles;
