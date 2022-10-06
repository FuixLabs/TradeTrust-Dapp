import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({

  container: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    alignItems: "center",
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      width: "90%",
      height: "auto",
    },
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: "100%",
    zIndex: 1001,
  },
}));

export default styles;
