import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import * as actionTypes from '../../store/actionTypes';
import Form from './Form';
import ProjectTable from './ProjectTable';


import { rows } from '../../AuxData/ProjectResultData';
import ContentContext from '../../store/context/title-context';
import { searchProjects } from '../../services/ProjectService';

const ManageProjects = (props) => {
  const { setTitle } = useContext(ContentContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [projetos, setProjetos] = useState([]);
  const [filters, setFilters] = useState({
    projectId: ``,
    description: ``,
    clientName: ``,
    contribuitorsIds: [],
    initialDtCreation: null,
    finalDtCreation: null,
    initialDtStart: null,
    finalDtStart: null,
    initialDtCompletion: null,
    finalDtCompletion: null,
  });

  useEffect(() => {
    // props.setTitleOnLoad('Manage Projects');
    setTitle('Manage Projects');
  });

  // useEffect(() => {

  // }, []);

  const inputChangeHandler = (value, identifier) => {
    setFilters({
      ...filters,
      [identifier]: value,
    });
  };

  const getProjetosData = data => {
    return data?.map((p) => ({
      name: p.description,
      client: p.clientName,
      creationDate: p.dtCreation,
      startDate: p.dtStart,
      completionDate: p.dtRealCompletiondtRealCompletion,
      workHours: p.totalHours,
    }));
  }

  const submitSearch = async () => {
    try {
      const { data } = await searchProjects({page, pageSize, ...filters});
      const {currentPage, hasNext, hasPrevious, pageSize: pgSize , totalSize, value} = data;
      setPage(currentPage);
      setPage(pgSize);
      setProjetos(getProjetosData(value));
      console.log(`[submitSearch]`, value);      
    } catch (error) {
        console.log(`ERROR.`, `submitSearch`, error);
      
    }

  }

  return (
    <Grid
      container
      direction='column'
      justify='flex-start'
      alignItems='center'
      spacing={8}
    >
      <Grid item xs={12}>
        <Form onSubmit={submitSearch}  inputChangeHandler={inputChangeHandler} values={filters} />        
      </Grid>
        {/* <pre>{JSON.stringify(filters)}</pre> */}
      <Grid item container xs={12}>
        <ProjectTable
          rows={projetos}
          page={page}
          rowsPerPage={pageSize}
          setRowsPerPage={(value) => setPageSize(value)}
          setPage={(value) => setPage(value)}
        />
      </Grid>
    </Grid>
  );
};

export default ManageProjects;
