import axios from "axios";

const url = "/users";
const localhost = "http://localhost:9090";

export const login = async (data) => {
  return axios.post(`${localhost}${url}/login`, data);
};

export const register = async (data) => {
  return axios.post(`${localhost}${url}/register`, data);
};

export const forgotPass = async (data) => {
  return axios.post(`${localhost}${url}/forgot-password`, data);
};

export const updatePass = async (token, data) => {
  return axios.put(`${localhost}${url}/update-password/${token}`, data);
};
