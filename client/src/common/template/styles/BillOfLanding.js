import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid #000',
    borderTop: '1px solid #000',
    fontSize: 14,
    lineHeight: 2.7,
    backgroundColor: theme.palette.primary.white,
  },
  previewModeContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #000',
    fontSize: 18,
    lineHeight: 2.7,
    backgroundColor: theme.palette.primary.white,
    maxWidth: 766,
    [theme.breakpoints.up('lg')]: {
      fontSize: 16
    }
  },
  titleTxt: {
    fontWeight: 'bold'
  },
  rowItem: {
    padding: 10,
    height: '100%'
  },
  signatureImage: {
    width: 100,
    height: 100
  },
  sampleStampImage: {
    width: 150,
    height: 150
  },
  titleDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%'
  },
  removeIcon: {
    cursor: 'pointer',
    marginTop: 10
  }
}));

export default styles;
