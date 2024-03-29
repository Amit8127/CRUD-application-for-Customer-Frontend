// isloggedIn
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) {
    return true;
  } else {
    return false;
  }
};

//doLogdin
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// dologout
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

// getCurrentAdmin
export const getCurrentAdminDetails = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).username;
  } else {
    return false;
  }
};

export const getJwtToken = () => {
  return JSON.parse(localStorage.getItem("data")).jwtToken;
};

