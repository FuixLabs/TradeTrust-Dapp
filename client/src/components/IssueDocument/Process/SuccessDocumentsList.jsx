/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

// * Mui libraries
import Grid from '@mui/material/Grid';
import CustomAvatar from './Avatar';
import DownloadIcon from '@mui/icons-material/Download';

export default function SuccessDocumentsList(props) {
  const { documents, classes, handleExportWrappedDocument, revoke } = props;
  return documents.map((item, index) => (
    <Grid key={index} item xs={6} rowSpacing={3} className={classes.successItemContainer}>
      <div className={classes.successItem}>
        <div className="flexRow">
          <CustomAvatar fileName={item.data.fileName.split(':')[2]} />
          <div className={'flexColumn ' + classes.downloadableTxt}>
            <div className={classes.resultInforDiv}>
              <span className={classes.fileNameTxt}>{item.data.fileName.split(':')[2]}</span>
            </div>
          </div>
        </div>
        {handleExportWrappedDocument && (
          <DownloadIcon onClick={handleExportWrappedDocument(item)} className={classes.downloadIcon} />
        )}
      </div>
    </Grid>
  ));
}
