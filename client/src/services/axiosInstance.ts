import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_PROD_BASE_URL: import.meta.env.VITE_DEV_BASE_URL,
    withCredentials: true
})

export default axiosInstance