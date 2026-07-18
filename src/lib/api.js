import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app",
});

api.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      return Promise.reject(
        new Error("Network error please check your connection"),
      );
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!navigator.onLine || (axios.isAxiosError(error) && !error.response)) {
      return Promise.reject(
        new Error("Network error please check your connection"),
      );
    }
    return Promise.reject(error);
  },
);

export default api;
