import axios from "axios";
import { getJwtToken } from "../auth/auth";


export const BASE_URL = "https://crud-application-for-customer-production.up.railway.app/";
// export const BASE_URL = "http://localhost:8080"; // for local development purposes

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = getJwtToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
