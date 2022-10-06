import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  container: {
    paddingLeft: 100,
    backgroundColor: '#F8F9FA',
    height: '100vh',
    [theme.breakpoints.down('lg')]: {
      paddingRight: 45,
      paddingLeft: 50,
    },
  },
  serviceContainer: {
    marginTop: 25,
  },
  titleTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.palette.textColor.primary,
    marginRight: 15,
    [theme.breakpoints.down('lg')]: {
      fontSize: 28,
    },
  },
  selectService: {
    height: 55,
    width: 'fit-content',
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    boxSizing: 'border-box',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardanoIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  tooltipText: {
    fontSize: 14,
  },
  helpIcon: {
    height: 35,
    width: 35,
    marginLeft: 12,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export default styles;
