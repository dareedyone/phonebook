import axios from 'axios';

const baseUrl = '/api/persons';
export const getAll = () => axios.get(baseUrl).then((res) => res.data);

export const create = (newPerson) =>
  axios.post(baseUrl, newPerson).then((res) => res.data);
export const destroy = (id) => axios.delete(`${baseUrl}/${id}`);
export const replace = (id, replacer) =>
  axios.put(`${baseUrl}/${id}`, replacer).then((res) => res.data);
