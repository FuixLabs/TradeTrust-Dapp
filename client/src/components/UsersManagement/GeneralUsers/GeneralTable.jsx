import React, { useState } from 'react';

// * MUI libraries
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Typography } from '@mui/material';
import { Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

// * Redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from 'redux/slices/alert';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';

// * Constants libraries
import { COMPANY_NAME } from 'constants/app';

// * Utilities libraries
import { addNewIssuer } from 'fuixlabs-documentor/utils/did';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
  {
    id: 'address',
    label: 'Address',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 170,
    align: 'center',
    component: true,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  width: '10%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'transparent',
    color: theme.palette.textColor.primary,
    fontWeight: 'bold',
    zIndex: 1000,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: 'backgroundColor.secondary',
    borderRadius: '5px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.secondary,
}));

export default function GeneralTable(props) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentIssuer, setCurrentIssuer] = useState(null);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState('body');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { dids } = useSelector((state) => state.didReducer);
  const { users, classes, issuer, setReviewUser, retrieveAllDids } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipBoard = (value) => {
    try {
      navigator.clipboard.writeText(value);
      dispatch(alertActions.copyToClipboardSuccessfully());
    } catch (e) {
      dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.cannotCopyToClipboard));
    }
  };

  const handleOpenDialog = (row) => {
    setCurrentIssuer(row);
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // * Confirm remove existed issuer
  const handleConfirmRemoveIssuer = async () => {
    setLoading(true);
    const currentPublicKey = currentIssuer?.content?.did.split(':')[3];
    try {
      await addNewIssuer(dids, COMPANY_NAME, currentPublicKey, currentIssuer?.content?.data || {}, true);
      dispatch(alertActions.showSuccessNotification(ALERT_CONSTANTS.SUCCESS.removeIssuer));
      retrieveAllDids(COMPANY_NAME);
    } catch (e) {
      dispatch(alertActions.showErrorNotification(e?.message || e?.error_message));
    }
    setOpen(false);
    setLoading(false);
  };

  const handleOpenUserReview = (user) => {
    setReviewUser(user);
  };

  return (
    <>
      <div className="flexColumnCenter">
        <TableContainer>
          <Table
            className={classes.generalTable}
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
                backgroundColor: '',
              },
            }}
          >
            <TableHead
              sx={{
                borderWidth: 0,
                backgroundColor: 'primary.white',
                zIndex: 1,
              }}
            >
              <TableRow>
                {columns.map((item, index) => {
                  return (
                    <StyledTableCell align={'left'} key={index}>
                      {item.label}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            {users && users.length !== 0 && (
              <TableBody>
                {users
                  .filter((_user) => (issuer ? _user?.content?.data?.issuer : _user))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <StyledTableRow sx={{ cursor: 'pointer' }} hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column, index) => {
                          const value =
                            column.id === 'role' && row?.content?.data?.issuer ? (
                              <>
                                <ManageAccountsIcon sx={{ height: 20, width: 20 }} />
                                ISSUER
                              </>
                            ) : (
                              row?.content?.data[column.id]
                            );
                          return (
                            <StyledTableCell
                              onClick={() => {
                                if (column.id !== 'role') {
                                  handleOpenUserReview(row);
                                }
                              }}
                              key={column.id}
                              align={column.align}
                            >
                              {column.id === 'role' ? (
                                <Typography
                                  sx={{
                                    color: column.id === 'address' && 'primary.main',
                                  }}
                                  className={
                                    column.id === 'role' &&
                                    row?.content?.data?.issuer &&
                                    classes.issuerRole + ' ' + classes.tableTxt
                                  }
                                >
                                  {value}
                                </Typography>
                              ) : (
                                <Tooltip
                                  placement="bottom-start"
                                  title={
                                    <p className={'mediumFontSize '}>
                                      {value}{' '}
                                      <ContentCopyOutlinedIcon
                                        onClick={() => copyToClipBoard(value)}
                                        className={classes.copyClipBoardIcon}
                                      />
                                    </p>
                                  }
                                >
                                  <Typography
                                    className={classes.tableTxt}
                                    sx={{
                                      color: column.id === 'address' && 'primary.main',
                                    }}
                                  >
                                    {value}
                                  </Typography>
                                </Tooltip>
                              )}
                            </StyledTableCell>
                          );
                        })}
                        {issuer && (
                          <StyledTableCell align="center">
                            <Button
                              onClick={() => handleOpenDialog(row)}
                              variant="outlined"
                              className={classes.removeBtn}
                            >
                              Remove
                            </Button>
                          </StyledTableCell>
                        )}
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={users.filter((_user) => (issuer ? _user?.content?.data?.issuer : _user)).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth={'lg'}
          sx={{
            '& .MuiDialogContent-root': {
              width: '100% !important',
            },
          }}
        >
          <div className={classes.popupContainer}>
            <div className={classes.headerContainer}>
              <CloseIcon onClick={handleClose} className={classes.closeIcon} />
            </div>
            <div className={classes.popupContent}>
              <span className={classes.popupTitle}>Remove Issuer</span>
              <span className={classes.descriptionTxt}>
                You are about to remove the following issuer. This step is irreversible.
              </span>
            </div>
            <div className={classes.popupFooter}>
              <Button
                disabled={loading}
                onClick={handleClose}
                className={`${classes.functionalBtn}`}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmRemoveIssuer}
                disabled={loading}
                variant="contained"
                className={classes.functionalBtn + ' ' + classes.confirmBtn}
              >
                {loading ? (
                  <CircularProgress className={classes.circleProgress} sx={{ color: 'primary.white' }} />
                ) : (
                  'Remove'
                )}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
}
