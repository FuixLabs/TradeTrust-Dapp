import React, { useState, useEffect } from 'react';
import styles from './style/GeneralUsers';

// * MUI libraries
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PostAddIcon from '@mui/icons-material/PostAdd';

// * Custom components
import GeneralTable from './GeneralTable';

// * Redux libraries
import { useSelector } from 'react-redux';

export default function GeneralUsers(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const lgBreakpoints = useMediaQuery(theme.breakpoints.up('lg'));
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('Search');
  const { dids } = useSelector((state) => state.didReducer);
  const [currentUsers, setCurrentUsers] = useState(dids);
  const { issuer, setAddUserOpen, setReviewUser, loading, retrieveAllDids } = props;

  useEffect(() => {
    setCurrentUsers(dids);
  }, [dids]);
  const classes = styles();

  const handleOpenAddUserPopup = () => {
    setAddUserOpen(true);
  };

  const handleSearchTextChange = (e) => {
    setSearch(e.target.value);
    setCurrentUsers(dids.filter((_user) => JSON.stringify(_user).includes(e.target.value)));
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>Please select an user to view more profile</p>
        <div className={classes.settingDiv}>
          {issuer && (
            <button onClick={handleOpenAddUserPopup} className={classes.addIssuerBtn}>
              {lgBreakpoints ? (
                <>
                  Add Issuer <ContactPageIcon />
                </>
              ) : (
                <PostAddIcon />
              )}
            </button>
          )}
          <TextField
            id="outlined-start-adornment"
            label="Public Key"
            sx={{ m: 1, width: '25ch', backgroundColor: '#F3F3F3' }}
            onChange={handleSearchTextChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className={classes.tableContainer}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <GeneralTable
            setReviewUser={setReviewUser}
            users={currentUsers}
            classes={classes}
            issuer={issuer}
            retrieveAllDids={retrieveAllDids}
          />
        )}
      </div>
    </div>
  );
}
