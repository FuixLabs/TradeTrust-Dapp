import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    borderRadius: 8,
    width: "48%",
    border: `solid 1px ${theme.palette.borderColor.primary}`,
    display: "flex",
    flexDirection: "row",
    boxSizing: "border-box",
    padding: "5px 20px",
  },
  cardInforDiv: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantityTxt: {
    fontSize: 57,
  },
  creationImage: {
    width: "60%",
    height: "100%",
  },
  issueBtnTxt: {
    fontSize: 12,
    marginRight: 15,
  },
  issueBtn: {
    marginBottom: 50,
    marginTop: 30,
    fontSize: 12,
    borderRadius: 8,
    padding: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    cursor: "pointer",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  cardTypeTxt: {
    fontSize: 14
  }
}));

export default styles;
