import axios from "axios";

export const redAlrertApiAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_RAL_API_URL + "/api",
  validateStatus: (status) => {
    return status >= 100 && status <= 600; // default
  },
});

redAlrertApiAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    }
    return Promise.reject(error.response);
  },
);
