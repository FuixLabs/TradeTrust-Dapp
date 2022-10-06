import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    padding: '30px 30px 30px 30px',
    color: theme.palette.textColor.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  titleTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  }
}));

export default styles;
