import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F8F9FA',
    // backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingRight: 50,
    paddingLeft: 50,
    zIndex: 1000,
    height: '100vh'
  },

  summaryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  titleTxt: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    [theme.breakpoints.down("lg")]: {
      fontSize: 25
    }
  },
  processContainer: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default styles;
