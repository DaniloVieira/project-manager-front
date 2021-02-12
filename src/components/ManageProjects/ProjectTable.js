import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import TablePaginationActions from '../../Shared/Components/TablePagination/TablePagination';

const ProjectTable = (props) => {
  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label='Projects table' size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Client</TableCell>
            <TableCell align='right'>Creation Date</TableCell>
            <TableCell align='right'>Start Date</TableCell>
            <TableCell align='right'>Completion Date</TableCell>
            <TableCell align='right'>Work Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell>{row.client}</TableCell>
              <TableCell align='right'>{row.creationDate}</TableCell>
              <TableCell align='right'>{row.startDate}</TableCell>
              <TableCell align='right'>{row.completionDate}</TableCell>
              <TableCell align='right'>{row.workHours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.rows.length}
              rowsPerPage={props.rowsPerPage}
              page={props.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
