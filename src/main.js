import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import zh from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'

Vue.use(Vant)
Vue.use(VeeValidate)
Validator.localize('zh_CN', zh)
Vue.config.productionTip = false

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
