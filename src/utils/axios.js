import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
axiosInstance.interceptors.response.use((res) => {
  return res.data.data || res.data
}, (err) => {
  return Promise.reject(err)
})
export default axiosInstance
