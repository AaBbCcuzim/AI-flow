import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_SEVER_API_URL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer app-YbYog8SdlJri2IFPT1U1jKAo`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { service };
