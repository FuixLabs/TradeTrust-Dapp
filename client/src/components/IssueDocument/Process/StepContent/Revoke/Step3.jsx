import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SuccessDocumentsList from "../../SuccessDocumentsList";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";

export default function RevokeStep3(props) {
  const {
    classes,
    successDocuments,
    handleUploadNewDocument
  } = props;
  return (
    <div className={classes.step3Container}>
      <div className={classes.uploadConfigDiv}>
        <Box className="flexRowCenter">
          <PermDataSettingIcon className={classes.configIcon} />
          <p onClick = {handleUploadNewDocument} className={classes.uploadTxt}>
            Upload a new document file
          </p>
        </Box>
      </div>
      <div className={classes.successDocsDetailDiv}>
        <span className={classes.successDocTxt}>
          Document(s) Revoked successfully
          <span className={classes.successDocQuantityTxt}>
            {successDocuments.length} document(s)
          </span>
        </span>
      </div>
      <Grid container sx={{ marginTop: 1 }}>
        <SuccessDocumentsList
          documents={successDocuments}
          classes={classes}
          revoke = {true}
        />
      </Grid>
    </div>
  );
}
