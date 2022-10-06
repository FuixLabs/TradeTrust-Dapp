import React from 'react';

// * MUI libraries
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CircularProgress } from '@mui/material';

// * Constants libraries
import { ACTIONS_IDENTITY } from '../../constants/action';

export default function TransferForm(props) {
  const { classes, holderKey, handleTextChange, loading, ownerKey, currentAction, originOwnerKey } = props;
  const _action = ACTIONS_IDENTITY.find((action) => action.value === currentAction);
  return (
    <div className={classes.inputForm}>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: 700 },
        }}
      >
        <TextField
          label="Current Holder Public Key"
          disabled
          defaultValue={originOwnerKey || '0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C'}
        />
      </Box>
      {!_action.surrender && (
        <>
          <div className={classes.transferBtnContainer}>
            {loading ? (
              <CircularProgress className={classes.arrowIcon} />
            ) : (
              <div className={classes.transferBtn}>
                <ArrowDownwardIcon className={classes.arrowIcon} />
              </div>
            )}
          </div>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: 700 },
            }}
          >
            <TextField
              disabled={loading}
              id="outlined-multiline-flexible"
              label={_action.formLabel}
              multiline
              maxRows={4}
              inputProps={{ style: { fontWeight: 'bold' } }}
              value={holderKey || ownerKey}
              // * Set value rely on current transfer action
              onChange={(e) => handleTextChange(e, _action.code)}
            />
          </Box>
        </>
      )}
    </div>
  );
}
