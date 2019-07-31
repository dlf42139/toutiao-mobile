import axios from '../utils/axios'

export const login = ({ mobile, code }) => {
//   console.log('好难啊')
  return axios({
    method: 'POST',
    url: 'app/v1_0/authorizations',
    data: { mobile, code }
  })
}
