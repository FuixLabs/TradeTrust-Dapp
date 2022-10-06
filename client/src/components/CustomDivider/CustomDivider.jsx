import React from "react";
import Divider from "@mui/material/Divider";
import styles from "./styles";

export default function CustomDivider() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Divider className={classes.dividerLeft} />
      <span>Or</span>
      <Divider className={classes.dividerRight} />
    </div>
  );
}
