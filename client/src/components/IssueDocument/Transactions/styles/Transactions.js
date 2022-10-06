import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    borderRadius: 8,
    backgroundColor: theme.palette.backgroundColor.white,
    padding: 30,
    height: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
    opacity: 1,
    marginLeft: 50,
    boxShadow: `0px 3px 12px ${theme.palette.boxShadow.secondary}`,
    [theme.breakpoints.down("lg")]: {
      marginLeft: 0,
      marginTop: 20,
      height: 'auto'
    }
  },
  titleTxt: {
    fontWeight: "bold",
    fontSize: 21,
    [theme.breakpoints.up("lg")]: {
      fontSize: 18
    }
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableContainer: {
    marginTop: 20,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  selectDocumentForm: {
    width: "30%",
    marginRight: 5,
    background: theme.palette.backgroundColor.selectForm,
  },
  selectDocumentFormTxt: {
    fontSize: '12px !important',
    fontWeight: "bold !important",
  },
  transactionFormControl: {
    width: "30%",
    height: 50,
    background: theme.palette.backgroundColor.selectForm,
  },
}));

export default styles;
