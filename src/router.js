import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: () => import('./views/tabbar/Tabbar.vue'),
    children: [{
      path: '/',
      name: 'home',
      component: () => import('./views/home/Home.vue')
    }]
  }, {
    name: 'login',
    path: '/login',
    component: () => import('./views/Login.vue')
  }]
})
