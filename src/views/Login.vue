<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="欢迎登录" />
    <form action='/' method="post">
      <!-- 表单域 -->
      <van-cell-group>
        <!-- <van-field v-model="phone" label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" /> -->
        <van-field
          v-model="user.mobile"
          v-validate="'required|phone'"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :error-message="errors.first('phone')"
        />
        <van-field v-model="user.code" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <!-- 登录按钮 -->
      <!-- 阻止表单的默认跳转 -->
      <van-button :loading="loginStatus" loading-text="正在登录..." type="info" @click.prevent="toLogin">登&nbsp;&nbsp;&nbsp;录</van-button>
    </form>
  </div>
</template>

<script>
import { login } from '../api/user'
import { Toast, Notify } from 'vant'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      loginStatus: false
    }
  },
  methods: {
    ...mapMutations(['setUserToken']), // 这个相当于声明了一个函数
    async toLogin () {
      this.$validator.validate().then(async valid => {
        if (!valid) {
          // do stuff if not valid.
        }
        this.loginStatus = true
        try {
          const data = await login(this.user)
          console.log(data)
          // this.$store.commit('setUserToken', data)
          this.setUserToken(data)
          Notify({
            message: '登录成功',
            duration: 1000,
            background: '#1989fa'
          })
          this.loginStatus = false
        } catch (error) {
          Toast.fail('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: rgb(240, 240, 240);
}
.van-button {
  width: 100%;
  margin-top: 18px;
}
</style>
