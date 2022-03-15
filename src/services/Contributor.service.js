// import axios from 'axios';
import axios from './AxiosService';

// const serviceUri = 'http://localhost:8080/project-management-backend';
const serviceUri = '';

const endpoint = 'user';

export const getAll = () => {
  return axios.get(`${serviceUri}/${endpoint}/list-all`);
};
