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


// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/',
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
// });

// api.interceptors.request.use((config) => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     } else {
//         window.location.href = '/login';
//     }
//     return config;
// });

// export default api;
