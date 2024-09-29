import axios from "axios";

const APIClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export default APIClient;
