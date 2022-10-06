/* eslint-disable */
import React, { useEffect } from 'react';

// * MUI libraries
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import StepConnector from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// * Rest libraries
import { pullCredential } from 'utils/document';

// * Constants libraries
import { GENERATOR_ERROR } from 'constants/error';

// * Redux libraries
import { useDispatch } from 'react-redux';
import { alertActions } from 'redux/slices/alert';

var options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState, index }) => ({
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
  color: '#000',
  width: 16,
  height: 16,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 0,
  ...(ownerState.active && {
    background: `${theme.palette.primary.main} 0% 0% no-repeat padding-box`,
    color: 'white',
  }),
}));

export function HistoryStatus(props) {
  const { classes, step, mdBreakpoints, CNFTs, transactions, filteredCNFTs, setFilteredCNFTs } = props;
  const dispatch = useDispatch();

  async function filterTransactions() {
    let tmpArray = [...CNFTs];
    for (let i = 0; i < CNFTs.length; i++) {
      let _item = CNFTs[i];
      if (_item.onchainMetadata[_item.policyId][_item.assetName].type === 'credential') {
        try {
          const credential = await pullCredential(_item.assetName);
          if (credential?.data?.code === 1 || credential?.data?.error_code)
            throw GENERATOR_ERROR.CANNOT_GET_CONTENT_OF_CREDENTIAL;
          tmpArray[i] = { ...tmpArray[i], action: credential?.data?.credentialSubject?.action?.label };
        } catch (e) {
          dispatch(alertActions.showErrorNotification(e?.msg || e?.error_message));
        }
      }
    }
    setFilteredCNFTs(tmpArray);
  }

  useEffect(() => {
    filterTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CNFTs]);

  function ColorlibStepIcon(props) {
    const { active, completed, className, icon } = props;
    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
        index={icon}
      ></ColorlibStepIconRoot>
    );
  }

  return (
    <div className={classes.steppersContainer}>
      <p className={classes.initTxt}>Document has been issued</p>
      <div className="flexColumn">
        <span className={classes.titleTxt}>Action/Date</span>
        <Stepper
          last={false}
          alternativeLabel={mdBreakpoints ? false : true}
          activeStep={step ? step - 1 : undefined}
          connector={<StepConnector className={classes.customStepConnector}></StepConnector>}
          orientation={mdBreakpoints ? 'vertical' : 'horizontal'}
          className={classes.customConnectorRoot}
        >
          <StepLabel className={classes.stepLabel} StepIconComponent={ColorlibStepIcon}>
            <div className={classes.transactionInforContainer}></div>
          </StepLabel>
          {filteredCNFTs ? (
            filteredCNFTs.map((item, index) => (
              <Step key={index}>
                <StepLabel className={classes.stepLabel} StepIconComponent={ColorlibStepIcon}>
                  <div className={classes.transactionInforContainer}>
                    <span>
                      {item.onchainMetadata[item.policyId][item.assetName].type !== 'credential'
                        ? transactions.find((_transaction) => _transaction.documentHash === item.assetName)?.fileName ||
                          'This document is not belong to you'
                        : item?.action}
                    </span>
                    <span className={classes.timestampTxt}>
                      {new Date(item.onchainMetadata[item.policyId][item.assetName]['timestamp']).toLocaleDateString(
                        'en-US',
                        options
                      )}
                    </span>
                  </div>
                </StepLabel>
              </Step>
            ))
          ) : (
            <Box className={classes.loadingContainer}>
              <CircularProgress />
            </Box>
          )}
        </Stepper>
      </div>
    </div>
  );
}
