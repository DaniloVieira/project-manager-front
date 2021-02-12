import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Form from './Form';
import ProjectTable from './ProjectTable';

import { Projects } from '../../AuxData/Projects';
import { Contributors } from '../../AuxData/Contributors';
import { rows } from '../../AuxData/ProjectResultData';

const ManageProjects = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    clientName: 'name',
    contributorId: null,
    contributors: Contributors,
    projectId: null,
    projects: Projects,
  });

  const inputChangeHandler = (value, identifier) => {
    setFilters({
      ...filters,
      [identifier]: value,
    });
  };

  return (
    <Grid
      container
      direction='column'
      justify='flex-start'
      alignItems='center'
      spacing={8}
    >
      <Grid item xs={12}>
        <Form inputChangeHandler={inputChangeHandler} values={filters} />
      </Grid>
      <Grid item container xs={12}>
        <ProjectTable
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={(value) => setRowsPerPage(value)}
          setPage={(value) => setPage(value)}
        />
      </Grid>
    </Grid>
  );
};

export default ManageProjects;
