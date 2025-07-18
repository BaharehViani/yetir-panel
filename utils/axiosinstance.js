import axios from 'axios'

const axiosInstance = axios.create()

//axiosInstance.defaults.baseURL = 'https://yetirapi.skyrun.cloud/v1'
// axiosInstance.defaults.baseURL = 'http://127.0.0.1:8000/v1'
axiosInstance.defaults.baseURL = 'https://173.212.236.33:16005/v1'

axiosInstance.defaults.headers.common['Accept'] = 'application/json'

export default axiosInstance

