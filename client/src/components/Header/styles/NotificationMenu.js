import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  container: {
    padding: 25,
    fontSize: 16,
  },
  titleTxt: {
    fontWeight: 'bold',
  },
  notificationsContainer: {
    marginTop: 25
  },
  iconContainer: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    padding: 8,
    margin: '18px 10px 18px 0px'
  },
  addressTxt: {
    fontWeight: 'bold',
    width: 130,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word'
  },
  notiItemContainer: {
    cursor: 'pointer'
  }
}));

export default styles;
