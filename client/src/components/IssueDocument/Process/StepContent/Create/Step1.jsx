import React from 'react';
import Box from '@mui/material/Box';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CreateStep1(props) {
  const { classes, handleUploadNewConfig, handleForwardStep, DOCUMENT_TYPE, issueType } = props;
  return (
    <div className={classes.step1Container}>
      <div className={classes.uploadConfigDiv}>
        <Box className="flexRowCenter">
          <PermDataSettingIcon className={classes.configIcon} />
          <p onClick={handleUploadNewConfig} className={classes.uploadTxt}>
            Upload a new config file
          </p>
        </Box>
        <button onClick={handleForwardStep} className={classes.selectBtn}>
          Next
          <ArrowForwardIcon className={classes.changeStepIcon} />
        </button>
      </div>
      <div className={classes.choosenTypeDiv}>
        <span className={classes.bigBoldTxt}>Choose Document Type to Issue</span>
        <Box
          className={classes.groupTypeBtns}
          sx={{
            '& > *': {
              m: 1.5,
            },
          }}
        >
          {DOCUMENT_TYPE.map((item, index) => (
            <button
              key={index}
              disabled={issueType !== item}
              className={issueType === item ? classes.choosenBtn : classes.disabledBtn}
            >
              {item}
            </button>
          ))}
        </Box>
      </div>
    </div>
  );
}
