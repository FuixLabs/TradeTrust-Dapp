import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  sumCard: {
    borderRadius: 8,
    width: "48%",
    border: `solid 1px ${theme.palette.borderColor.summaryCard}`,
    display: "flex",
    flexDirection: "row",
    boxSizing: "border-box",
    padding: "2% 3%",
  },
  cardInforDiv: {
    color: theme.palette.backgroundColor.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  quantityTxt: {
    fontSize: 57,
    [theme.breakpoints.up('lg')]: {
      fontSize: 50
    }
  },
  imgContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: '15%',
    paddingBottom: 20,
    boxSizing: "border-box",
    paddingRight: 0,
  },
  creationImage: {
    color: theme.palette.primary.white,
    height: "90px !important",
    width: "70px !important",
    [theme.breakpoints.down("lg")]: {
      height: "80px !important",
    },
    [theme.breakpoints.up("xl")]: {
      height: "100px !important",
    },
    [theme.breakpoints.up("xl")]: {
      width: "120px !important",
    },
  },
}));

export default styles;
