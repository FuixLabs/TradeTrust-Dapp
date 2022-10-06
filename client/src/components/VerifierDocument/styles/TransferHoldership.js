import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    padding: '30px 30px 70px 30px',
    color: theme.palette.textColor.primary,
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  descriptionTxt: {
    opacity: '65%',
    lineHeight: 2
  },
  inputForm: {
    marginTop: 40,
    minWidth: 700
  },
  transferBtn: {
    borderRadius: '50%',
    borderWidth: 0,
    backgroundColor: theme.palette.primary.main,
    height: 24,
    width: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transferBtnContainer: {
    margin: '30px 0px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGroups: {
    marginTop: 40,
    alignSelf: 'flex-end',
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
  arrowIcon: {
    height: '16px !important',
    width: '16px !important',
    color: theme.palette.primary.white
  }
}));

export default styles;
