import axios from "axios";

export default (token) => {
  axios.defaults.headers.post["Content-Type"] = "application/json";
  if (token) {
    axios.defaults.headers.common["Authentication"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authentication"];
  }
};
