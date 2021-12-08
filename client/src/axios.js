import axios from "axios";

// "http://localhost:5010"
// "https://audiophile-e-commerce.herokuapp.com"

const instance = axios.create({
  baseURL: "https://audiophile24.herokuapp.com/",
  withCredentials: true,
});

export default instance;
