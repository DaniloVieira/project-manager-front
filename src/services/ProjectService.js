// import axios from 'axios';
import axios from './AxiosService';

// const serviceUri = 'http://localhost:8080/project-management-backend';
const serviceUri = '';

const project = 'project';

export const fetchProjectDomain = (func, errMsg, contribuitorsIds) => {
  axios
    .get(`${serviceUri}/${project}/domain/${contribuitorsIds}`)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};

export const fetchProjectDomain2 = (contribuitorsIds) => {
  return axios.get(`${serviceUri}/${project}/domain/${contribuitorsIds}`);
};

export const fetchPagesProjetcs = () => {
  return axios.get()
}

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

export const searchProjects = (filter) => {

  return axios.get(`${serviceUri}/${project}/search`, {params: filter});
}
