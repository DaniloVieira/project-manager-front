import axios from 'axios';

const deafultHost = 'http://localhost:8080/project-management-backend';

const endpoint = 'user';

export const fetchUserById = (Id) => {
  return axios.get(`${deafultHost}/${endpoint}/${Id}`);
  //   .then((resp) => {
  //     console.log('[fetchUserById => resp]', resp.data.value);
  //     user = resp.data.value;
  //   })
  //   .catch((err) => {
  //     console.log('fetchUserById', '[ERROR]', err);
  //   });
  // return user;
};
