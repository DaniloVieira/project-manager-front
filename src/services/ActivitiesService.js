// import axios from 'axios';
import axios from './AxiosService';

// const serviceUri = 'http://localhost:8080/project-management-backend';
const serviceUri = '';

const endpoint = 'activity';

export const fetchActivitiesData = (
  func,
  errMsg,
  projectId,
  contributorId,
  page,
  pageSize
) => {
  axios
    .get(`${serviceUri}/${endpoint}/list`, {
      params: { projectId, contributorId, page, pageSize },
    })
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};

export const saveActivity = (func, errMsg, activity) => {
  axios
    .post(`${serviceUri}/${endpoint}/save`, activity)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};

export const saveActivityNew = async (activity) => {
  return new Promise((resolve, reject) => {
    axios.post(`${serviceUri}/${endpoint}/save`, activity).then(resolve, reject);
  });
};

export const fetchActivityById = (func, errMsg, Id) => {
  axios
    .get(`${serviceUri}/${endpoint}/${Id}`)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};

export const deleteActivityById = (func, errMsg, Id) => {
  axios
    .delete(`${serviceUri}/${endpoint}/${Id}`)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};
