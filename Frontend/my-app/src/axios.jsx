import axios from "axios";

// we need to pass the baseURL as an object
const api = axios.create({
  baseURL: "http://localhost:8010",
  withCredentials: true
});

export default api;