import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // position: "relative",
    // top: 100,
    // left: "50%",
    // transform: "translate(-50%, -50%)",
  },
  txt: {
    color: theme.palette.textColor.primary,
    fontSize: 14,
    fontWeight: "bold",
    opacity: "25%",
  },
}));

export default styles;
