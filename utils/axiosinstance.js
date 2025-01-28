import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = 'https://yetirapi.skyrun.cloud/v1'
axiosInstance.defaults.headers.common['Accept'] = 'application/json'

export default axiosInstance

