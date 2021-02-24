import axios from 'axios';

const deafultHost = 'http://localhost:8080/project-management-backend';

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
    .get(`${deafultHost}/${endpoint}/list`, {
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
    .post(`${deafultHost}/${endpoint}/save`, activity)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};

export const fetchActivityById = (func, errMsg, Id) => {
  axios
    .get(`${deafultHost}/${endpoint}/${Id}`)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};

export const deleteActivityById = (func, errMsg, Id) => {
  axios
    .delete(`${deafultHost}/${endpoint}/${Id}`)
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};
