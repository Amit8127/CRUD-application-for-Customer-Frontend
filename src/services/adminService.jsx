import { myAxios, api} from "./serviceUtils";

export const signUp = (admin) => {
  return myAxios.post("/auth/signup", admin).then((response) => response.data);
};

export const login = (loginDetails) => {
  return myAxios
    .post("/auth/login", loginDetails)
    .then((response) => response.data);
};

export const allCustomers = () => {
  return api
    .get("/home/customer/getAllCustomers")
    .then((response) => {
      return response.data;
    });
};

export const createACustomer = (customerObj) => {
  return api
    .post(`/home/customer/createACustomer`, customerObj)
    .then((response) => {
      return response.data;
    });
};

export const updateACustomer = (id, customerObj) => {
  return api
    .put(`/home/customer/updateACustomer/${id}`, customerObj)
    .then((response) => {
      return response.data;
    });
};

export const deleteACustomerById = (id) => {
  return api
    .delete(`/home/customer/deleteACustomerById/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const getCustomerById = (id) => {
  return api
    .get(`/home/customer/getCustomerById/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const getDataFromSunbase = () => {
  return api.get(`/home/customer/getDataFromSunbase`).then((response) => {
    return response.data;
  });
};
