// import axios from 'axios';
import axios from './AxiosService';

// const serviceUri = 'http://localhost:8080/project-management-backend';
const serviceUri = '';

const project = 'project';

export const fetchProjectDomain = (func, errMsg, contributorId) => {
  axios
    .get(`${serviceUri}/${project}/domain/${contributorId}`)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};

export const fetchProjectById = (func, errMsg, projetctId) => {
  axios
    .get(`${serviceUri}/${project}/${projetctId}`)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};
