import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: `solid 1px ${theme.palette.borderColor.primary}`,
    borderRadius: 8,
    width: "100%",
    paddingTop: 130,
    paddingBottom: 130,
    backgroundColor: theme.palette.backgroundColor.primary,
    boxSizing: "border-box",
    textAlign: 'center',
    fontWeight: 'bold',
    textColor: theme.palette.textColor.primary,
    [theme.breakpoints.down("md")]: {
      paddingTop: 50,
      fontSize: '12px !important',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
      minHeight: 400,
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
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    marginTop: 20,
    cursor: "pointer",
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
    },
  },
  guideTxt: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.palette.textColor.primary,
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
    minHeight: 500,
  },
  invalidIcon: {
    height: 80,
    width: 80,
    marginRight: 20,
    [theme.breakpoints.up('lg')]: {
      height: 60,
      width: 60,
    },
  },
  invalidDocTitle: {
    fontSize: 32,
    color: theme.palette.textColor.primary,
    [theme.breakpoints.up('lg')]: {
      fontSize: 26,
    },
  },
  warningTxt: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.palette.textColor.error,
  },
  normalTxt: {
    fontSize: 18,
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
  issuerWarningTxt: {
    color: theme.palette.primary.main,
    fontSize: 22,
    [theme.breakpoints.up('lg')]: {
      fontSize: 18
    },
  }
}));

export default styles;