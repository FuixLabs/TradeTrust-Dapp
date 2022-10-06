import React, { useEffect, useState } from 'react';
import styles from './styles/Overview';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { resetDocuments, uploadVerifyDocument } from 'redux/slices/document';
import { resetFile } from 'redux/slices/file';

// * MUI libraries
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// * Custom components
import { DragVerifyDocument } from '../../components/DragDocument';
import StaticTable from '../../components/Overview/StaticTable/StaticTable';
import SummaryCard from '../../components/IssueDocument/SummaryCard/SummaryCard';

export default function Overview() {
  const [loading, setLoading] = useState(false);
  const classes = styles();
  const dispatch = useDispatch();
  const { transactions, fetching } = useSelector((state) => state.documentReducer);

  useEffect(() => {
    dispatch(resetDocuments());
    dispatch(resetFile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadVerifyDocument = (document) => {
    dispatch(uploadVerifyDocument(document));
  };

  const SUMMARY_TYPE = [
    {
      type: 'issued',
      backgroundColor: 'primary.main',
      text: 'Documents Issued',
      quantity: transactions.filter((transaction) => transaction.status === 'Issued').length,
    },
    {
      type: 'revoke',
      backgroundColor: '#2D5FAA',
      text: 'Documents Revoked',
      quantity: transactions.filter((transaction) => transaction.status === 'Revoked').length,
    },
  ];

  return (
    <div className={classes.container}>
      <p className={classes.titleTxt}>Overview</p>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} lg={7} className={classes.standardContainer}>
          <div className={classes.summaryContainer}>
            <SummaryCard classes={classes} SUMMARY_TYPE={SUMMARY_TYPE} transactions={transactions} />
          </div>
          <div className={classes.tableContainer}>
            {fetching ? (
              <Box className={classes.loadingContainer}>
                <CircularProgress />
              </Box>
            ) : (
              <StaticTable transactions={transactions} />
            )}
          </div>
        </Grid>
        <Grid item xs={12} lg={5} className={classes.dragContainer}>
          <DragVerifyDocument
            loading={loading}
            setLoading={setLoading}
            setFile={handleUploadVerifyDocument}
            overview={true}
          />
        </Grid>
      </Grid>
    </div>
  );
}
