import axios from '../utils/axios'

// 获取频道列表
export const getChannels = () => {
  return axios({
    method: 'get',
    url: 'app/v1_0/user/channels'
  })
}

export const getAllChannels = () => {
  return axios({
    method: 'get',
    url: 'app/v1_0/channels'
  })
}
