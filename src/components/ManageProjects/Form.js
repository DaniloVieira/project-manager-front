import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '../common/textField';
import DatePicker from '../common/datePicker';
import { format } from 'date-fns';
import Autocomplete from '../common/autocomplete';
import { Contributors } from '../../AuxData/Contributors';
import { Projects } from '../../AuxData/Projects';
import Select from '../common/select/Index';
import { getAll } from '../../services/Contributor.service';
import { useSnackbar } from 'notistack';

const Form = (props) => {
  const {onSubmit, inputChangeHandler} = props;
  const [contributors, setContributors] = useState([]);
  const [projects, setProjects] = useState(Projects);
  const { enqueueSnackbar } = useSnackbar();

  const internalhandleChange = (value, identifier) => {
    inputChangeHandler(value, identifier);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const fetchContributors = useCallback(
    async () => {
      try {
        const { data } = await getAll();
        const con = data?.value[0].map(r => ({value:r.id, label: r.firstName}));
        setContributors(con);
      } catch (error) {
        // setBackDrop(false);
        enqueueSnackbar(error, { variant: "danger" });
      }
    },
    [enqueueSnackbar],
  );

  useEffect(() => {
    fetchContributors();
  }, [fetchContributors]);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <TextField
          id="client-name"
          label="Client Name"
          size={4}
          value={props.values["clientName"]}
          onChange={(event) =>
            internalhandleChange(event.target.value, "clientName")
          }
        />
        <TextField
          id="project-description"
          label="Project Description"
          size={4}
          value={props.values["clientDescription"]}
          onChange={(event) =>
            internalhandleChange(event.target.value, "description")
          }
        />
         <Autocomplete
          multiple
          id="contributors-ids"
          label="Contributors"
          size={4}
          options={contributors}
          onChange={(event, newValue) => {
            return internalhandleChange(newValue, "contribuitorsIds");
          }}
        />
        {/* <Select
          id="project-id"
          label="Project"
          size={4}
          value={props.values["projectId"]}
          options={projects}
          onChange={(event) =>
            internalhandleChange(event.target.value, "projectId")
          }
        /> */}
        <Grid item xs={4} container justify="flex-end">
          <DatePicker
            id="dt-initial-creation"
            label="Creation Start"
            size={6}
            value={props.values["initialDtCreation"]}
            format="MM/dd/yyyy"
            onChange={(value, second) => {
              internalhandleChange(value, "initialDtCreation");
            }}
          />
          <DatePicker
            id="dt-final-creation"
            label="Creation End"
            size={6}
            value={props.values["finalDtCreation"]}
            format="MM/dd/yyyy"
            onChange={(value, second) => {
              internalhandleChange(value, "finalDtCreation");
            }}
          />
        </Grid>
        <Grid item xs={4} container justify="flex-end">
          <DatePicker
            id="dt-initial-start"
            label="Project start"
            size={6}
            value={props.values["initialDtStart"]}
            format="MM/dd/yyyy"
            onChange={(value, second) => {
              internalhandleChange(value, "initialDtStart");
            }}
          />
          <DatePicker
            id="dt-final-start"
            label="Project end"
            size={6}
            value={props.values["finalDtStart"]}
            format="MM/dd/yyyy"
            onChange={(value, second) => {
              internalhandleChange(value, "finalDtStart");
            }}
          />
        </Grid>
        <Grid item xs={4} container justify="flex-end">
          <DatePicker
            id="dt-initial-completion"
            label="Completion start"
            size={6}
            value={props.values["initialDtCompletion"]}
            format="MM/dd/yyyy"
            onChange={(value, second) => {
              internalhandleChange(value, "initialDtCompletion");
            }}
          />
          <DatePicker
            id="dt-final-completion"
            label="Completion end"
            size={6}
            value={props.values["finalDtCompletion"]}
            format="MM/dd/yyyy"
            onChange={(value, second) => {
              internalhandleChange(value, "finalDtCompletion");
            }}
          />
        </Grid>
        <Grid item xs={12} container justify="flex-end">
          <Button type='submit' color='primary'>
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
