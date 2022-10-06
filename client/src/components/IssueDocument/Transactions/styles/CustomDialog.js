import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    // width: "auto",
  },
  fileNameTxt: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    padding: 35,
    paddingBottom: 0,
  },
  statusDiv: {
    color: theme.palette.primary.success,
    padding: 10,
    border: `1px solid ${theme.palette.primary.success}`,
    borderRadius: 8,
    marginLeft: 22,
  },
  errorStatusDiv: {
    color: theme.palette.primary.error,
    padding: 10,
    border: `1px solid ${theme.palette.primary.error}`,
    borderRadius: 8,
    marginLeft: 22,
  },
  inforContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateBtn: {
    borderRadius: 8,
    borderWidth: 0,
    backgroundColor: theme.palette.buttonColor.primary,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    marginTop: 20,
    cursor: "pointer",
  },
  docImg: {
    height: "auto",
    width: "100%",
    marginBottom: 10,
  },
  imgContainer: {
    backgroundColor: theme.palette.backgroundColor.secondary,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  historyContainer: {
    backgroundColor: theme.palette.backgroundColor.secondary,
    display: "flex",
    marginBottom: -40,
  },
  dialogBtn: {
    fontWeight: "bold",
  },
  tabTxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dialogActionContainer: {
    padding: 3,
    paddingTop: 0,
    backgroundColor: theme.palette.backgroundColor.secondary,
  },
}));

export default styles;
