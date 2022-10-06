import React from 'react';
import SuccessDocumentsList from '../../SuccessDocumentsList';

// * MUI libraries
import Box from '@mui/material/Box';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import Grid from '@mui/material/Grid';

export default function CreateStep3(props) {
  const { classes, handleUploadNewConfig, successDocuments, handleExportWrappedDocument } = props;
  return (
    <div className={classes.step1Container}>
      <div className={classes.uploadConfigDiv}>
        <Box className="flexRowCenter">
          <PermDataSettingIcon className={classes.configIcon} />
          <p onClick={handleUploadNewConfig} className={classes.uploadTxt}>
            Upload a new config file
          </p>
        </Box>
      </div>
      <div className={classes.successDocsDetailDiv}>
        <span className={classes.successDocTxt}>
          Document(s) Issued successfully
          <span className={classes.successDocQuantityTxt}>{successDocuments.length} document(s)</span>
        </span>
      </div>
      <Grid container className={classes.successDocumentsContainer}>
        <SuccessDocumentsList
          documents={successDocuments}
          classes={classes}
          handleExportWrappedDocument={handleExportWrappedDocument}
        />
      </Grid>
    </div>
  );
}
