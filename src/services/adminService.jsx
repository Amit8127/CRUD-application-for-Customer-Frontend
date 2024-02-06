import { myAxios } from "./serviceUtils";

export const signUp = (admin) => {
  return myAxios.post("/auth/signup", admin).then((response) => response.data);
};

export const login = (loginDetails) => {
  return myAxios
    .post("/auth/login", loginDetails)
    .then((response) => response.data);
};

export const allCustomers = () => {
  return myAxios.get("/home/customer/GetAllCustomers").then((response) => {return response.data});
};

export const createACustomer = (customerObj) => {
  return myAxios.post(`/home/customer/CreateACustomer`, customerObj).then((response) => {return response.data});
};

export const updateACustomer = (id, customerObj) => {
  return myAxios.put(`/home/customer/UpdateACustomer/${id}`, customerObj).then((response) => {return response.data});
};

export const deleteACustomerById = (id) => {
  return myAxios.delete(`/home/customer/DeleteACustomerById/${id}`).then((response) => {return response.data});
};

export const getCustomerById = (id) => {
  return myAxios.get(`/home/customer/GetCustomerById/${id}`).then((response) => {return response.data});
};

export const getDataFromSunbase = () => {
  return myAxios.get(`/home/customer/getDataFromSunbase`).then((response) => {return response.data});
};