import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  processContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  issuerContainer: {
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
    minHeight: 600,
    height: '100%',
  },
  dragDocumentDiv: {
    marginTop: 25,
  },
  imgDiv: {
    paddingTop: 300,
    paddingLeft: 240,
    [theme.breakpoints.down("lg")]: {
      display: 'none'
    }
  },
  container: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingLeft: 100,
    zIndex: 1000,
    [theme.breakpoints.down("lg")]: {
      padding: '0px 10%',
      marginTop: 20
    }
  },
  titleTxt: {
    fontSize: 10,
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
  cardanoIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  tooltipText: {
    fontSize: 14,
  },
  helpIcon: {
    height: 35,
    width: 35,
    marginLeft: 12,
    "&:hover": {
      color: theme.palette.primary.main,
    }
  },
  issuerWarningTxt: {
    color: theme.palette.primary.main,
    fontSize: 22,
    fontWeight: 'bold',
    [theme.breakpoints.up('lg')]: {
      fontSize: 18
    },
  }
}));

export default styles;
