import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
  withXSRFToken: true,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    // 'Content-Type': 'application/json',
  }
});

export default axiosClient;