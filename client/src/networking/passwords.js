import axios from "axios";

const url = "/passwords";
// const localhost = "http://localhost:9090";

export const getPasswords = async (data) => {
  return axios.get(`${url}/`, data);
};

export const createPassword = async (data) => {
  return axios.post(`${url}/create`, data);
};

export const updatePassword = async (passId, data) => {
  return axios.put(`${url}/update/${passId}`, data);
};

export const deletePassword = async (passId, data) => {
  return axios.delete(`${url}/update/${passId}`, data);
};
