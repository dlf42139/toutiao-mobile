import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import zh from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import VueLazyload from 'vue-lazyload'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'

Vue.use(Vant)
Vue.use(VeeValidate)
Vue.use(VueLazyload)
Validator.localize('zh_CN', zh)
Vue.config.productionTip = false

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// console.log(dayjs().from())
// 过滤器
Vue.filter('getRelativeTime', (val) => {
  return dayjs().from(dayjs(val))
})

const dictionary = {
  zh_CN: {
    messages: {
      required: (name) => {
        if (name === 'phone') {
          return '手机号为必填项'
        }
        return name + '为必填项'
      }
    }
  }
}
Validator.localize(dictionary)

Validator.extend('phone', {
  getMessage: field => '请输入正确的手机号码',
  validate: value =>
    value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})

Vue.prototype.$sleep = (time) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
