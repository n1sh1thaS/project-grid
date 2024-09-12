import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api/";
const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["x-auth-token"] = token;
export default axios;
