import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F8F9FA',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingRight: 45,
    paddingLeft: 50,
    paddingTop: 20,
    height: '100vh',
    [theme.breakpoints.down("lg")]: {
      padding: '0px 40px',
    }
  },
  gridContainer: {
    [theme.breakpoints.down("lg")]: {
      marginTop: 20
    }
  },
  titleTxt: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    [theme.breakpoints.down("lg")]: {
      fontSize: 25
    }
  },
  standardContainer: {
    paddingRight: 40,
    [theme.breakpoints.down("lg")]: {
      padding: 'unset',
      margin: '20px 0px'
    }
  },
  dragContainer: {
    [theme.breakpoints.down("lg")]: {
      marginTop: 100,
    }
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: '20%'
  },
  tableContainer: {
    padding: 25,
    backgroundColor: theme.palette.backgroundColor.white,
    boxShadow: `0px 3px 12px ${theme.palette.boxShadow.secondary}`,
    marginTop: 20,
    boxSizing: "border-box",
    minHeight: 380,
    [theme.breakpoints.down("lg")]: {
      marginTop: 20
    }
  },
  summaryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
}));

export default styles;
