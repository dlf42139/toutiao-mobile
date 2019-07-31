import Vue from 'vue'
import Vuex from 'vuex'

// 把auth模块所有方法变成auth对象的属性方法，通过点的方式来调用
import * as author from './utils/author'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 使用Vuex将token保存,方便在多个组件内共享使用
    // 初始化的时候从本地存储获取数据，防止刷新丢失 token
    // 一开始啥也没有的时候就获得undefined呗，没啥
    userToken: author.getToken()
  },
  mutations: {
    // 登录成功，调用 mutation 更新容器中的 user 的状态
    setUserToken (state, data) {
      // 这是我自己写的，现在看来应该没问题，有问题再回来改
      // 存在localStorage里了，看的时候别看错了，别在sessionStorage里找
      author.setToken(data)
      state.userToken = author.getToken()
      // 老师的逻辑
      // state.userToken = data
      // author.setToken(state.userToken)
    }
  },
  actions: {

  }
})
