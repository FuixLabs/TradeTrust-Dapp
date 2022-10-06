import React from "react";
import styles from "./styles/SummaryCard";
import creationImage from "../../assets/images/icon_count.svg";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import IssueButton from "./IssueButton";

const SUMMARY_TYPE = [
  {
    type: "issued",
    backgroundColor: "#E69F3E",
    text: "Documents Issued",
    quantity: 11,
    button: (classes) => (
      <IssueButton
        text="Create"
        backgroundColor="#FFFFFF"
        icon={<UploadFileIcon />}
        classes={classes}
        href="/create"
      />
    ),
  },
  {
    type: "revoke",
    backgroundColor: "#283646",
    text: "Documents Revoked",
    quantity: 2,
    button: (classes) => (
      <IssueButton
        text="Revoke"
        backgroundColor="#FFFFFF"
        icon={<LayersClearIcon />}
        classes={classes}
        href="/revoke"
      />
    ),
  },
];

export default function SummaryCard(props) {
  const { overview } = props;
  const classes = styles();
  return (
    <div className={classes.cardsContainer}>
      {SUMMARY_TYPE.map((item, index) => (
        <div
          key={index}
          className={classes.container}
          style={{ backgroundColor: item.backgroundColor }}
        >
          <div className={classes.cardInforDiv}>
            <span className={classes.quantityTxt}>{item.quantity}</span>
            <p className={classes.cardTypeTxt}>{item.text}</p>
            {overview && item.button(classes)}
          </div>
          <img
            src={creationImage}
            alt="creation"
            className={classes.creationImage}
          />
        </div>
      ))}
    </div>
  );
}
