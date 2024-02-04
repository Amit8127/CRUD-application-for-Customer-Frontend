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
  return myAxios.get("/auth/customer/GetAllCustomers").then((response) => {return response.data});
};

export const createACustomer = (customerObj) => {
  return myAxios.post(`/auth/customer/CreateACustomer`, customerObj).then((response) => {return response.data});
};

export const updateACustomer = (id, customerObj) => {
  return myAxios.put(`/auth/customer/UpdateACustomer/${id}`, customerObj).then((response) => {return response.data});
};

export const deleteACustomerById = (id) => {
  return myAxios.delete(`/auth/customer/DeleteACustomerById/${id}`).then((response) => {return response.data});
};

export const getCustomerById = (id) => {
  return myAxios.get(`/auth/customer/GetCustomerById/${id}`).then((response) => {return response.data});
};

