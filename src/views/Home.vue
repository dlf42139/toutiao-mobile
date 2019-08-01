<template>
  <div>
    <!-- navbar -->
    <van-nav-bar title="首 页" fixed />
    <!-- 滑动的频道tab -->
    <van-tabs v-model="activeName" class="mychannel-tabs">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name" name="item.id">
        <!-- 新闻列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '../api/channel'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      list: [],
      channels: [],
      loading: false,
      finished: false,
      activeName: 'a',
      isLoading: false
    }
  },
  created () {
    this.huoquChannels()
  },
  computed: {
    ...mapState[('userToken')]
  },
  methods: {
    // 获取频道列表
    async huoquChannels () {
      const localChannels = JSON.parse(window.localStorage.getItem('channels'))
      // 没登录且没本地，或者已登录，都是要发请求的
      if ((!this.userToken && !localChannels) || this.userToken) {
        const data = await getChannels()
        this.channels = data.channels
        console.log(data.channels)
      }
      // 没登录但是有本地，才从本地获取
      if (!this.userToken && localChannels) {
        this.channels = localChannels
      }
    },
    //   加载内容
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 页面刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: rgb(82, 162, 228);
  .van-nav-bar__title {
    color: #ffffff;
  }
}
.mychannel-tabs {
  margin-bottom: 100px;
}
.mychannel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  width: 100%;
  top: 92px;
  z-index: 666;
}

.mychannel-tabs /deep/ .van-tabs__content {
  margin-top: 180px;
}
</style>
