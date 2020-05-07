import axios from "axios";

const url = "/users";

export const login = async (data) => {
  return axios.post(`http://localhost:9090${url}/login`, data);
};
