import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.backgroundColor.secondary
  },
  authForm: {
    left: "50%",
    top: "50%",
    height: 'fit-content',
    position: "fixed",
    transform: "translate(-50%, -50%)",
    boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
    borderRadius: 8,
    width: 600,
    padding: '85px 40px 160px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.white,
    boxSizing: 'border-box',
  },
  fuixlabsLogo: {
    height: 80,
    color: 'black' 
  },
  txtDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '25px 0px'
  },
  welcomeTxt: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 2
  },
  subTitleTxt: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 1.5,
    fontWeight: 550
  },
  loginBtn: {
    width: '100%',
    color: `${theme.palette.primary.white} !important`,
    borderRadius: 8,
    backgroundColor: theme.palette.buttonColor.primary,
    padding: "15px 20px",
    fontWeight: "bold !important",
    cursor: "pointer",
    border: `solid 1px ${theme.palette.primary.main}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.buttonColor.secondary,
      color: theme.palette.primary.main
    },
    boxSizing: 'border-box',
    minHeight: 53,
    marginTop: 15
  },
}));

export default styles;