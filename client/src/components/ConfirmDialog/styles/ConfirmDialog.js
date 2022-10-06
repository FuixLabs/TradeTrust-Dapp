import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
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
    width: 450,
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
    backgroundColor: '#D94300',
    color: theme.palette.primary.white,
  },
}));

export default styles;
