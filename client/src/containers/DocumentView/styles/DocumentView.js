import { makeStyles } from "@mui/styles";
import backgroundImage from "../../../assets/images/wave-lines.svg";

const styles = makeStyles((theme) => ({
  backgroundContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingRight: 45,
    paddingLeft: 50,
    zIndex: 1000,
    backgroundColor: theme.palette.primary.white,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    marginLeft: -100,
    [theme.breakpoints.down("lg")]: {
      marginLeft: 0,
    },
  },
  transactionInforContainer: {
    boxShadow: `0px 3px 6px #0000001A`,
    width: "70%",
    borderTop: `solid 5px ${theme.palette.primary.main}`,
    borderRadius: 8,
    boxSizing: "border-box",
    padding: 40,
    backgroundColor: theme.palette.primary.white,
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  },
  utilsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
  },
  utilDiv: {
    color: theme.palette.primary.main,
    borderRadius: 8,
    backgroundColor: theme.palette.buttonColor.secondary,
    padding: "15px 20px",
    fontWeight: "bold",
    border: `solid 1px ${theme.palette.buttonColor.secondary}`,
  },
  formContainer: {
    marginLeft: 18
  },
  companyTxt: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 15,
  },
  inforContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingRight: 100,
  },
  previewImageContainer: {
    boxShadow: `0px 3px 6px #0000001A`,
    marginTop: 20,
    width: "70%",
    backgroundColor: theme.palette.primary.white,
    padding: 34,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  },
  previewHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginBottom: 20,
  },
  funtionalBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "12%",
  },
  funtionalBtn: {
    height: "25px !important",
    width: "25px !important",
    cursor: "pointer",
  },
}));

export default styles;
