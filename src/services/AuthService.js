// import axios from 'axios';
import axios from './AxiosService';

const serviceUri = 'http://localhost:8080/project-management-backend/';

const endpoint = 'api/public/';

export const authUserByUsernamePassword = (loginData) => {
  return axios.post(`${serviceUri}${endpoint}login`, loginData);
};
