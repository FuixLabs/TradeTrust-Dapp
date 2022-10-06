import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F8F9FA',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingLeft: 100,
    zIndex: 1000,
    height: '100%',
    [theme.breakpoints.down("lg")]: {
      padding: '0px 10%',
      marginTop: 20
    }
  },
  titleTxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.palette.textColor.primary,
    marginRight: 15,
    [theme.breakpoints.down("lg")]: {
      fontSize: 28
    }
  },
  selectService: {
    height: 55,
    width: "fit-content",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    boxSizing: "border-box",
    fontSize: 16,
    fontWeight: "bold",
  },
  dragDocumentDiv: {
    marginTop: 25,
  },
  imgDiv: {
    paddingTop: '15%',
    paddingLeft: 240,
    [theme.breakpoints.down("lg")]: {
      display: 'none'
    }
  },
  helpIcon: {
    height: 35,
    width: 35,
    marginLeft: 12,
    "&:hover": {
      color: theme.palette.primary.main,
    }
  },
  tooltipText: {
    fontSize: 14,
  },
  cardanoIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  graphicImg: {
    height: '85%',
  },
  // dragDocumentContainer: {
  //   height: '100%'
  // }
}));

export default styles;
