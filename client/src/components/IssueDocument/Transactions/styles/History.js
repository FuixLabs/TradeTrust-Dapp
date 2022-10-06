import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    padding: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  historyContainer: {
    display: "flex",
    flexDirection: "column",
  },
  titleTxt: {
    fontSize: 12,
    color: theme.palette.textColor.history,
    marginLeft: -20,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
  },
  customStepConnector: {
    "& .MuiStepConnector-active": {
      "& .MuiStepConnector-line": {
        backgroundColor: theme.palette.textColor.secondary,
      },
    },
    "& .MuiStepConnector-line": {
      borderLeftStyle: "dotted",
      borderLeftWidth: "1.5px",
      height: 70,
      margin: "-25px 0px -25px -5px",
      left: "50px !important",
      borderLeftColor: theme.palette.primary.main,
    },

    customConnectorRoot: {
      maxWidth: "70%",
      marginTop: 20,
      "& .MuiStepConnector-root": {
        marginLeft: "12px !important",
        width: "100%",
      },
    },
    stepLabel: {
      "& .MuiStepLabel-label": {
        color: theme.palette.textColor.primary,
        fontSize: 14,
        fontWeight: "bold",
      },
      "& .MuiStepLabel-label.Mui-active": {
        color: theme.palette.primary.main,
        fontWeight: "bold",
      },
    },
  },
  transactionInforContainer: {
    height: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: theme.palette.backgroundColor.secondary,
    padding: 20,
    paddingLeft: 0,
    borderRadius: 8,
    marginLeft: 15,
    fontSize: 14,
    fontWeight: "bold",
    flexDirection: "column",
    color: "#000000",
  },
  timestampTxt: {
    color: theme.palette.textColor.primary,
    fontWeight: "normal",
  },
  steppersContainer: {
    display: "flex",
    flexDirection: "row",
  },
  initTxt: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 50,
    marginRight: 20,
  },
}));

export default styles;
