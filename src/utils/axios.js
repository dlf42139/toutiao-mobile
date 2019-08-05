import axios from 'axios'
import store from '../store'
import JSONBig from 'json-bigint'

const axiosInstance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

axiosInstance.defaults.transformResponse = [function (data) {
  try {
    return JSONBig.parse(data)
  } catch (error) {
    return data
  }
}]

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  // const user = window.localStorage.getItem('user')
  // if (user) {
  //   config.headers.Authorization = 'Bearer ' + JSON.parse(user).token
  // }
  // userToken里面有俩数据，别忘了再点一下
  const user = store.state.userToken
  if (config.url !== 'app/v1_0/authorizations' && user) {
    config.headers.Authorization = 'Bearer ' + user.token
  }
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
