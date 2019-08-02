import axios from '../utils/axios'

export const getNews = ({ channel_id, timestamp, with_top }) => {
  return axios({
    method: 'get',
    url: 'app/v1_1/articles',
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}
