import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  main: {
    transition: "margin-left .5s",
    zIndex: 1000,
    height: "100%",
    minHeight: "100vh",
    marginLeft: 100,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginBottom: -20,
    paddingBottom: 60,
    [theme.breakpoints.down("lg")]: {
      marginLeft: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  openSidebar: {
    transition: "margin-left .5s",
    zIndex: 1000,
    height: "100%",
    minHeight: "100vh",
    marginLeft: 100,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginBottom: -20,
    paddingBottom: 60,
  },
}));

export default styles;
