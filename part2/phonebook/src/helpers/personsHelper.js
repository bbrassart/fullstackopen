import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';
const getAllPersons = () => axios.get(baseUrl).then(resp => resp.data);
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);
const createPerson = (personObject) => axios.post(baseUrl, personObject).then(resp => resp.data);

const updatePerson = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(resp => resp.data)
};

export { getAllPersons, createPerson, deletePerson, updatePerson, };
