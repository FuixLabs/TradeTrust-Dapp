import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F8F9FA',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingRight: 45,
    paddingLeft: 50,
    paddingTop: 20,
    height: '100vh',
    [theme.breakpoints.down('lg')]: {
      padding: '0px 40px',
    },
  },
  titleTxt: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    [theme.breakpoints.down("lg")]: {
      fontSize: 25
    }
  },
}));

export default styles;
