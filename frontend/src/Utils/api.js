import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/toast";
import { jwtDecode } from "jwt-decode";
import AuthService from "../Services/AuthService";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate();
    const showToast = useToast();

    if (error.response && error.response.status === 401) {
      const token = AuthService.getToken();
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          AuthService.logout();
          showToast(
            "Sessão expirada. Por favor, faça login novamente.",
            "error"
          );
          navigate("/login");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
