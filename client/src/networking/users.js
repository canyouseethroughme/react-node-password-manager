import axios from "axios";

const url = "/users";
const localhost = "http://localhost:9090";

export const login = async (data) => {
  return axios.post(`${localhost}${url}/login`, data);
};

export const register = async (data) => {
  return axios.post(`${localhost}${url}/register`, data);
};
