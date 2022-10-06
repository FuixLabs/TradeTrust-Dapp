import React, { useState, useEffect } from 'react';
import styles from './styles/History';

// * Custom components
import { HistoryStatus } from './HistoryStatus';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from 'redux/slices/alert';

// * Rest libraries
import { _pullNFTs } from '../../../rest/client.rest';
import { CLIENT_PATH } from '../../../rest/client.path';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';

// * MUI libraries
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function History(props) {
  const [CNFTs, setCNFTs] = useState(null);
  const [filteredCNFTs, setFilteredCNFTs] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.fileReducer);
  const { transactions } = useSelector((state) => state.documentReducer);
  const mdBreakpoints = useMediaQuery(theme.breakpoints.up('md'));

  const { transaction, setUpdateCNFT } = props;

  async function getCNFTs() {
    try {
      let CNFTs = await _pullNFTs(CLIENT_PATH.PULL_NFTS, {
        policyId: transaction?.policyId,
      });
      CNFTs = CNFTs?.data.filter((_item) => _item.onchainMetadata[_item.policyId][_item.assetName].type);
      CNFTs.sort(
        (a, b) =>
          a.onchainMetadata[a.policyId][a.assetName].timestamp - b.onchainMetadata[b.policyId][b.assetName].timestamp
      );
      setCNFTs(CNFTs);
      setUpdateCNFT(CNFTs);
    } catch (e) {
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.pullNfts));
    }
  }

  useEffect(() => {
    getCNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = styles();
  return (
    <div className={classes.container}>
      {CNFTs ? (
        <div className={classes.historyContainer}>
          <HistoryStatus
            classes={classes}
            step={step}
            mdBreakpoints={mdBreakpoints}
            theme={theme}
            CNFTs={CNFTs}
            transaction={transaction}
            transactions={transactions}
            filteredCNFTs={filteredCNFTs}
            setFilteredCNFTs={setFilteredCNFTs}
          />
        </div>
      ) : (
        <Box className={classes.loadingContainer}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
