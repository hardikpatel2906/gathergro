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

const updateProfile = (userData) => {
  return axios.put(API_URL + "profileupdate", userData);
};

const changePassword = (passwordData) => {
  return axios.put(API_URL + "changepassword", passwordData);
};

const authService = {
  register,
  login,
  updateProfile,
  changePassword,
};

export default authService;
