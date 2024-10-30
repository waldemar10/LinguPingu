import axios from "axios";

const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.request.use((config) => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  config.headers["Authorization"] = `Bearer ${userId}`;

  return config;
});

export default axiosWithAuth;
