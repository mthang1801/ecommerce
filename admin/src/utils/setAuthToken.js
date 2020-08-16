import axios from "axios";
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common[
      "Authentication"
    ] = `Bearer ${localStorage.token}`;
    axios.defaults.headers.post["Content-Type"] = "application/json";
  } else {
    delete axios.defaults.headers.common["Authentication"];
  }
};
