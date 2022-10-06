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
import ScrollDialog from './CustomDialog';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Typography } from '@mui/material';
import { Tooltip } from '@mui/material';

const columns = [
  { id: 'fileName', label: 'Title', minWidth: 170, align: 'left' },
  {
    id: 'documentHash',
    label: 'Document Hash',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'center',
    component: true,
  },
];

const TRANSACTION_STATUS = [
  {
    status: 'Issued',
    component: () => (
      <Button
        variant="outlined"
        sx={{
          color: 'primary.success',
          borderColor: 'primary.success',
          minWidth: 100,
          cursor: 'unset !important',
          '&:hover': {
            borderColor: 'primary.success',
            backgroundColor: 'transparent',
          },
        }}
      >
        Issued
      </Button>
    ),
  },
  {
    status: 'Revoked',
    component: () => (
      <Button
        variant="outlined"
        sx={{
          color: 'primary.error',
          borderColor: 'primary.error',
          minWidth: 100,
          cursor: 'unset !important',
          '&:hover': {
            borderColor: 'primary.error',
            backgroundColor: 'transparent',
          },
        }}
      >
        Revoked
      </Button>
    ),
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
    fontSize: 12,
    backgroundColor: 'backgroundColor.secondary',
    borderRadius: '5px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.secondary,
}));

export default function CustomizedTables(props) {
  const [openedTransaction, setOpenedTransaction] = useState(0);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenTransactionDetail = (index) => {
    return () => {
      setOpenedTransaction(index);
      setOpen(true);
    };
  };
  const { transactions } = props;
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between',
        }}
      >
        <TableContainer>
          <Table
            sx={{
              minWidth: 700,
              borderCollapse: 'separate',
              borderSpacing: '0px 4px',
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
                    <StyledTableCell align={index !== 2 ? 'left' : 'center'} key={index}>
                      {item.label}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            {transactions.length !== 0 && (
              <TableBody>
                {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        if (column.component)
                          return (
                            <StyledTableCell key={index} align={column.align}>
                              {TRANSACTION_STATUS.find((item) => item.status === value).component()}
                            </StyledTableCell>
                          );
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            <Tooltip
                              placement="bottom-start"
                              title={<p className = 'mediumFontSize'>{value}</p>}
                            >
                              <Typography
                                sx={{
                                  whiteSpace: 'nowrap',
                                  width: 150,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  fontSize: 14
                                }}
                              >
                                {value}
                              </Typography>
                            </Tooltip>
                          </StyledTableCell>
                        );
                      })}
                      <StyledTableCell align="center">
                        {row['status'] === 'Issued' && (
                          <ModeEditIcon
                            onClick={handleOpenTransactionDetail(index + page * rowsPerPage)}
                            sx={{ color: 'primary.main', cursor: 'pointer' }}
                          />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {transactions?.length > 7 && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </div>
      {transactions.length !== 0 && (
        <ScrollDialog transaction={transactions[openedTransaction]} open={open} setOpen={setOpen} />
      )}
    </>
  );
}
