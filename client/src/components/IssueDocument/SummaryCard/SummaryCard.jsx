import React from 'react';
import styles from './styles/SummaryCard';

// * MUI libraries
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import TaskIcon from '@mui/icons-material/Task';

// * Redux libraries
import { useSelector } from 'react-redux';

export default function SummaryCard(props) {
  const { SUMMARY_TYPE } = props;
  const { fetching } = useSelector((state) => state.documentReducer);

  const classes = styles();

  return SUMMARY_TYPE.map((item, index) => (
    <Box key={index} className={classes.sumCard} sx={{ backgroundColor: item.backgroundColor }}>
      <div className={classes.cardInforDiv}>
        {fetching ? (
          <Box className={classes.loadingContainer}>
            <CircularProgress sx={{ color: 'backgroundColor.white' }} />
          </Box>
        ) : (
          <span className={classes.quantityTxt}>{item.quantity}</span>
        )}
        <p className={classes.typeTxt}>{item.text}</p>
      </div>
      <div className={classes.imgContainer}>
        {item.type === 'issued' ? (
          <TaskIcon className={classes.creationImage} />
        ) : (
          <InsertPageBreakIcon className={classes.creationImage} />
        )}
      </div>
    </Box>
  ));
}
