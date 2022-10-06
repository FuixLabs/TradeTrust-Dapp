import React from "react";
import styles from "./styles/Process";

// * Custom components
import Steppers from "./Stepper";
import ProccessContent from "./ProcessContent";

// * MUI libraries
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


export default function Process({ update }) {
  const theme = useTheme();
  const mdBreakpoints = useMediaQuery(theme.breakpoints.down("lg"));
  const classes = styles();
  return (
    <div className={classes.container}>
      {update || (
        <span className={classes.tabContainer}>Create Document</span>
      )}
      {update && <span className={classes.issueTitleTxt}>Update Document</span>}
      <Grid container className={classes.chooseInfor}>
        <Grid item xs={12} lg={9}>
          {mdBreakpoints ? (
            <Steppers classes={classes} type = {'Create'}/>
          ) : (
            <ProccessContent classes={classes} update={update} />
          )}
        </Grid>
        <Grid item xs={12} lg={3}>
          {mdBreakpoints ? (
            <ProccessContent classes={classes} update={update} />
          ) : (
            <Steppers classes={classes} type = {'Create'}/>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
