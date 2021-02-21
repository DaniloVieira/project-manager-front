import axios from 'axios';

const deafultHost = 'http://localhost:8080/project-management-backend';

const activities = 'activities';

export const fetchActivitiesData = (
  func,
  errMsg,
  projetctId,
  page,
  pageSize,
  contributorId
) => {
  axios
    .get(`${deafultHost}/${activities}/list`, {
      params: { projetctId, page, pageSize, contributorId },
    })
    .then((resp) => {
      func(resp);
    })
    .catch((err) => {
      errMsg(err);
    });
};
