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
  IconButton,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TablePaginationActions from '../../Shared/Components/TablePagination/TablePagination';

const ActivitiesTable = (props) => {
  const {
    rows,
    onClickEditHandler,
    onClickDeleteHandler,
    page,
    pageSize,
    handleChangePage,
    handleChangePageSize,
  } = props;
  console.log('[ActivitiesTable - rows]', rows);

  const table = (
    <TableContainer component={Paper}>
      <Table aria-label='Projects table' size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Details</TableCell>
            <TableCell align='right'>Start</TableCell>
            <TableCell align='right'>End</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.description}
              </TableCell>
              <TableCell>{row.details}</TableCell>
              <TableCell align='right'>{row.dtStart}</TableCell>
              <TableCell align='right'>{row.dtEnd}</TableCell>
              <TableCell align='center'>
                <IconButton onClick={onClickEditHandler} aria-label='edit'>
                  <EditIcon aria-label='edit' />
                </IconButton>
                <IconButton onClick={onClickDeleteHandler} aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              pagesizeoptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={pageSize}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangePageSize}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );

  const emptyTable = (
    <Typography variant='h4' color='textSecondary'>
      You have no activiteis on this project
    </Typography>
  );

  return rows.length > 0 ? table : emptyTable;
};

export default ActivitiesTable;
