import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 23,
    marginBottom: 20,
    fontSize: 14,
    color: theme.palette.textColor.primary,
  },
  dividerLeft: {
    width: 200,
    height: 5,
    marginRight: "20px !important",
  },
  dividerRight: {
    width: 200,
    height: 5,
    marginLeft: "20px !important",
  },
}));

export default styles;
