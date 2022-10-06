import React from "react";
import invalidIcon from "../../assets/images/invalid.svg";

export default function InvalidDocument(props) {
  const { classes, resetState, errMsg } = props;
  return (
    <div className={classes.invalidDocumentContainer}>
      <div className="flexRow" style={{ marginBottom: 10 }}>
        <img
          src={invalidIcon}
          alt="invalid-icon"
          className={classes.invalidIcon}
        />
        <span className={classes.invalidDocTitle}>
          This configuration file is not valid
        </span>
      </div>
      <span className={classes.warningTxt}>{errMsg}</span>
      <button className={classes.guidelineBtn}>What should i do ?</button>
      <span onClick={resetState} className={classes.retryTxt}>
        Try another configuration file
      </span>
    </div>
  );
}
