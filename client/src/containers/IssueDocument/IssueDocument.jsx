import React, { useEffect } from 'react';
import styles from './styles/IssueDocument';

// * Utilities libraries
import { fileToJSON } from 'utils/utils';

// * Redux libraries
import { onConfigFileChange, onIssueTypeChange, resetFile } from 'redux/slices/file';
import { updateCurrentDocument, resetDocuments } from 'redux/slices/document';
import { alertActions } from 'redux/slices/alert';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';
import { useSelector, useDispatch } from 'react-redux';

// * Custom components
import SummaryCard from 'components/IssueDocument/SummaryCard/SummaryCard';
import { Process } from 'components/IssueDocument/Process';
import { Transactions } from 'components/IssueDocument/Transactions';
import { DragDocument } from 'components/DragDocument';

// * MUI libraries
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import TaskIcon from '@mui/icons-material/Task';
import Grid from '@mui/material/Grid';

const DRAG_TYPE = 'Create';

export default function IssueDocument() {
  const dispatch = useDispatch();
  const { configFile } = useSelector((state) => state.fileReducer);
  const { transactions } = useSelector((state) => state.documentReducer);
  const { currentUserDid } = useSelector((state) => state.didReducer);

  useEffect(() => {
    dispatch(resetDocuments());
    dispatch(resetFile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SUMMARY_TYPE = [
    {
      type: 'issued',
      backgroundColor: 'primary.main',
      text: 'Documents Issued',
      icon: <TaskIcon />,
      quantity: transactions.filter((transaction) => transaction.status === 'Issued').length,
    },
    {
      type: 'revoke',
      backgroundColor: '#2D5FAA',
      text: 'Documents Revoked',
      icon: <InsertPageBreakIcon />,
      quantity: transactions.filter((transaction) => transaction.status === 'Revoked').length,
    },
  ];

  // * Handle whenever user update new config file
  const handleUploadConfigFile = (file) => {
    fileToJSON(file)
      .then((data) => {
        // eslint-disable-next-line array-callback-return
        data.forms.map((item) => {
          dispatch(updateCurrentDocument(item.data));
        });
        dispatch(onIssueTypeChange(data.forms[0].data.name));
        dispatch(onConfigFileChange(data));
      })
      .catch((e) => {
        dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.convertToJson));
      });
  };

  const classes = styles();
  return (
    <div className={classes.container}>
      {configFile ? (
        <div className={classes.processContainer}>
          <Process update={false} />
        </div>
      ) : (
        <>
          <p className={classes.titleTxt}>Create or Revoke document</p>
          <Grid container direction="row">
            <Grid item xs={12} lg={6}>
              <div className={classes.summaryContainer}>
                <SummaryCard classes={classes} SUMMARY_TYPE={SUMMARY_TYPE} transactions={transactions} />
              </div>
              <DragDocument
                uploadIcon={true}
                configFile={configFile}
                type={DRAG_TYPE}
                setFile={handleUploadConfigFile}
                isIssuer = {currentUserDid?.content?.data?.issuer}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Transactions />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
