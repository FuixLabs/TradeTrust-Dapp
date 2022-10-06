import React, { useState, useEffect } from 'react';
import styles from './styles/Transactions';

// * Custom components
import CustomTable from './CustomTable';

// * Redux libraries
import { useSelector } from 'react-redux';

// * MUI libraries
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// * Constants libraries
import { SORT_PROPERTIES } from '../../../constants/property';

export default function Transactions() {
  const { transactions } = useSelector((state) => state.documentReducer);
  const { fetching } = useSelector((state) => state.documentReducer);

  const [sortType, setSortType] = useState('');
  const [sortObject, setObject] = useState({});
  const [_transactions, setTransaction] = useState([]);

  useEffect(() => {
    setTransaction([...transactions]);
  }, [transactions]);

  useEffect(() => {
    if (sortType && _transactions && sortObject) {
      const tmpArray = [..._transactions];
      tmpArray.sort((a, b) => sortObject.comparator(a, b));
      setTransaction(tmpArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
    setObject(SORT_PROPERTIES.find((prop) => prop.name === e.target.value));
  };

  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <span className={classes.titleTxt}>Transaction</span>
        <FormControl className={classes.transactionFormControl}>
          <InputLabel className={classes.selectDocumentFormTxt} id="select-label">
            Sort by
          </InputLabel>
          <Select
            labelId="select-label"
            id="demo-simple-select"
            value={sortType}
            label="Sort by"
            onChange={handleSortTypeChange}
            sx = {{height: 50}}
          >
            {SORT_PROPERTIES.map((item, index) => (
              <MenuItem sx = {{fontSize: 12}} key={index} value={item.name}>
                Sort by: {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.tableContainer}></div>
      {fetching ? (
        <Box className={classes.loadingContainer}>
          <CircularProgress />
        </Box>
      ) : (
        <CustomTable transactions={_transactions} />
      )}
    </div>
  );
}
