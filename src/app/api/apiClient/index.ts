import axios from "axios";
const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/";

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
