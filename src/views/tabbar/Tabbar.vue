<template>
    <div>
        <router-view></router-view>
        <van-tabbar v-model="active">
            <van-tabbar-item name="home" icon="wap-home">首页</van-tabbar-item>
            <van-tabbar-item name="user" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'tabbar',
  data () {
    return {
      active: 'home'
    }
  }
}
</script>

<style>

</style>
