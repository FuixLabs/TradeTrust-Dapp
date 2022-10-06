import React from "react";
import styles from "./styles/Footer";

export default function Footer() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <p className={classes.txt}>
        Copyright © 2022 Paperless Cross-Border Trade
      </p>
    </div>
  );
}
