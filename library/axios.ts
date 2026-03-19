import axios from "axios";

export const redAlrertApiAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_RAL_API_URL,
});
