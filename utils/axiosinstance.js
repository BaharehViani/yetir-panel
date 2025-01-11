import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = 'http://192.168.212.20:8000/v1'
axiosInstance.defaults.headers.common['Accept'] = 'application/json'

export default axiosInstance

