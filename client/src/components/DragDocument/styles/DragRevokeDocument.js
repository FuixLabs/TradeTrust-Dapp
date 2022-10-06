import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `solid 1px ${theme.palette.borderColor.primary}`,
    borderRadius: 8,
    width: '100%',
    paddingTop: 70,
    paddingBottom: 100,
    backgroundColor: theme.palette.backgroundColor.primary,
    boxSizing: 'border-box',
    minHeight: 550,
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingBottom: 0,
      padding: 0,
      height: '100%',
    },
  },
  norTxt: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 55,
  },
  dividerDiv: {
    display: "flex",
    flexDirection: "row",
  },
  selectBtn: {
    borderRadius: 8,
    borderWidth: 0,
    backgroundColor: theme.palette.primary.main,
    padding: '20px 25px',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    marginTop: 20,
    cursor: 'pointer',
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
      padding: '18px 22px',
      marginBottom: 0
    },
  },
  linkTxt: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  invalidDocumentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    border: `dotted 1px red`,
    borderRadius: 8,
    width: "100%",
    padding: "70px 20px",
    backgroundColor: theme.palette.backgroundColor.error,
    boxSizing: "border-box",
    minHeight: 600,
  },
  invalidIcon: {
    height: 80,
    width: 80,
    marginRight: 20,
  },
  invalidDocTitle: {
    fontSize: 32,
    color: theme.palette.textColor.primary,
  },
  warningTxt: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.palette.textColor.error,
  },
  normalTxt: {
    fontSize: 23,
    color: theme.palette.textColor.primary,
    lineHeight: 4,
  },
  guidelineBtn: {
    backgroundColor: "red",
    marginTop: 30,
    padding: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    borderWidth: 0,
    borderRadius: 8,
    "&:hover": {
      backgroundColor: theme.palette.backgroundColor.error,
      color: theme.palette.textColor.primary,
    },
  },
  retryTxt: {
    color: "red",
    fontSize: 23,
    textDecoration: "underline",
    marginTop: 30,
    cursor: "pointer",
  },
  uploadFileIcon: {
    height: '55px !important',
    width: '70px !important',
    color: theme.palette.primary.main,
    marginBottom: 45
  },
  dragLogoContainer: {
    height: 204,
    width: 204,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    [theme.breakpoints.up('lg')]: {
      height: 180,
      width: 180,
    },
  },
  guideTxt: {
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 2,
    [theme.breakpoints.up('lg')]: {
      fontSize: 16,
    },
  },
}));

export default styles;
