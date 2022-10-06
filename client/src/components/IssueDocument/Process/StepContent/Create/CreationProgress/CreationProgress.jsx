import React, { useState, useEffect } from 'react';
import styles from './CreationProgress';

// * MUI libraries
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function CreationProgress(props) {
  const [progress, setProgress] = useState(0);
  const {issueLoading} = props;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if(!issueLoading) return 100;
        if (oldProgress === 85) {
          return 85;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 85);
      });
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, [issueLoading]);

  const classes = styles();
  return (
    <Box className={classes.container}>
      <LinearProgress sx={{ height: 5 }} variant="determinate" value={progress} />
    </Box>
  );
}
