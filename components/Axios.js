import axios from 'axios'

var TOKEN = "";

const ISSERVER = typeof window === "undefined";

if (!ISSERVER) TOKEN = localStorage.getItem("token");

const Axios = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:4001/api',
    timeout: process.env.TIMEOUT || 10000,
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
        if (error.response.status === 401) {
            if (!ISSERVER) {
                localStorage.removeItem('token')
                window.location.href = '/'
            }
        }
        return Promise.reject(error.response.data.error)
    }
)

export default Axios