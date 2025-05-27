import axios from 'axios';
import { API_URL } from '../config/index.js';
const axiosInstace = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default axiosInstace;