import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => axios.get(baseUrl).then(resp => resp.data);

const createPerson = (personObject) => {
  return axios.post(baseUrl, personObject).then(resp => resp.data);
};

export {
  getAllPersons,
  createPerson,
}
