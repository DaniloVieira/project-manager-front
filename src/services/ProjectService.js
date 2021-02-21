import axios from 'axios';

const deafultHost = 'http://localhost:8080/project-management-backend';

const project = 'project';

export const fetchProjectDomain = (func, errMsg, contributorId) => {
  axios
    .get(`${deafultHost}/${project}/domain/${contributorId}`)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};
