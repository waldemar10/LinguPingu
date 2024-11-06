import axios from "axios";

const axiosWithAuth = axios.create({
  withCredentials: true, 
});

axiosWithAuth.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosWithAuth;