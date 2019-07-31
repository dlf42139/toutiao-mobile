<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="欢迎登录" />
    <!-- 表单域 -->
    <van-cell-group>
      <!-- <van-field v-model="phone" label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" /> -->
      <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="user.code" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <van-button type="info" @click="toLogin">登&nbsp;&nbsp;&nbsp;录</van-button>
  </div>
</template>

<script>
import { login } from '../api/user'
import { Toast, Notify } from 'vant'
// import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      }
    }
  },
  methods: {
    // ...mapMutations(['setUserToken',data]),
    async toLogin () {
      try {
        const data = await login(this.user)
        console.log(data)
        this.$store.commit('setUserToken', data)
        Notify({
          message: '登录成功',
          duration: 1000,
          background: '#1989fa'
        })
      } catch (error) {
        Toast.fail('登录失败')
      }
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
