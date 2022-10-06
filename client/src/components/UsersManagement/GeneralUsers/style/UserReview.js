import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  container: {
    width: '100%',
    paddingTop: 20,
    [theme.breakpoints.up('lg')]: {
      width: '85%',
      padding: 50,
    }
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
    [theme.breakpoints.up('lg')]: {
      fontSize: 26
    }
  },
  informationContainer: {
    marginTop: 40,
    boxShadow: `${theme.palette.boxShadow.primary} 0px 5px 15px`,
    padding: 50,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 120,
  },
  baseInforContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  profilePictureContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
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
  },
  profileImg: {
    height: 245,
    width: 256,
  }
}));

export default styles;
