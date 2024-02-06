import axios from "axios";

export const BASE_URL = "https://crud-application-for-customer-production.up.railway.app/";
// export const BASE_URL = "http://localhost:8080"; // for local development purposes

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

