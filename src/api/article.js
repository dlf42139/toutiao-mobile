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

export const dislikeNews = (id) => {
  return axios({
    method: 'post',
    url: 'app/v1_0/article/dislikes',
    data: {
      target: id
    }
  })
}
