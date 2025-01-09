import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = 'http://localhost:3001/v1'
axiosInstance.defaults.headers.common['Accept'] = 'application/json'

export default axiosInstance

