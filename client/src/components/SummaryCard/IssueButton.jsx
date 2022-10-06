import React from "react";
import { Link } from "react-router-dom";

export default function IssueButton(props) {
  const { text, backgroundColor, icon, classes, href } = props;
  return (
    <Link
      to={href}
      className={classes.issueBtn}
      style={{ backgroundColor: backgroundColor }}
    >
      <span className={classes.issueBtnTxt}>{text}</span>
      {icon}
    </Link>
  );
}
