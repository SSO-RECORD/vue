import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', // 환경변수 또는 기본 URL
  timeout: 5000, // 요청 제한 시간
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
