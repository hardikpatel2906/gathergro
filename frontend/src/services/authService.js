import axios from "axios";

const API_URL = "http://localhost:5001/";

const register = (username, email, password, role, profileInfo) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
    role,
    profileInfo,
  });
};


const login = (email, password) => {
  return axios.post(API_URL + "login", {
    email,
    password,
  });
};

const authService = {
  register,
  login,
};

export default authService;
