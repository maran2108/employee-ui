import api from "../api/axiosConfig";

const login = (data) => {
  return api.post("/auth/login", data);
};

export default {
  login,
};
