import axios from 'axios'

var TOKEN = "";

const ISSERVER = typeof window === "undefined";

if (!ISSERVER) TOKEN = localStorage.getItem("token");

const dev = process.env.NODE_ENV !== 'production';

const Axios = axios.create({
    baseURL: dev ? 'http://localhost:4001/api' : process.env.NEXT_PUBLIC_BASE_URL,
    timeout: dev ? 10000 : process.env.NEXT_PUBLIC_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

Axios.interceptors.request.use(
    config => {
        if (TOKEN) {
            config.headers.Authorization = `Bearer ${TOKEN}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error?.response?.status === 401) {
            if (!ISSERVER) {
                // localStorage.removeItem('token')
                window.location.href = '/'
            }
        }
        return Promise.reject(error)
    }
)

export default Axios