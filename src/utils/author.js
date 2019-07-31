// 设置token
// 将token进行本地存储 , 向外部提供对应的方法
const TOKEN_KEY = 'user'

// 传参进来，将获取的值local存储上，设置为名字为 TOKEN_KEY （‘user’）的token
export const setToken = (data) => {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
}

// 获取名字为 TOKEN_KEY 的token
export const getToken = () => {
  return JSON.parse(window.localStorage.getItem(TOKEN_KEY))
}

// 删除token
export const delToken = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}
