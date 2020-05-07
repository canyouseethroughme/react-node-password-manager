import axios from "axios";

export const setAuthToken = (token) => {
  axios.defaults.baseURL = "localhost:9090";
  axios.defaults.headers.common["Authorization"] = token;
};
