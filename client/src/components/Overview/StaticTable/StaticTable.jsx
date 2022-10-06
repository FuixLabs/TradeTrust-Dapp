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

const columns = [
  { id: 'fileName', label: 'Title', minWidth: 170, align: 'left' },
  {
    id: 'documentHash',
    label: 'Document Hash',
    minWidth: 100,
    align: 'center',
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
    backgroundColor: theme.palette.backgroundColor.secondary,
    borderRadius: '5px',
    textOverflow: 'ellipsis',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.secondary,
}));

export default function StaticTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { transactions } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        height: '100%',
        minHeight: 370,
      }}
    >
      <TableContainer>
        <Table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0px 4px',
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
              backgroundColor: '',
            },
          }}
        >
          <TableHead sx={{ borderWidth: 0, backgroundColor: 'primary.white', zIndex: 1 }}>
            <TableRow>
              {columns.map((item, index) => (
                <StyledTableCell align={index !== 0 ? 'center' : 'left'} key={index}>
                  {item.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {value}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {transactions.length > 7 && (
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
  );
}
