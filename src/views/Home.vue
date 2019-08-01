<template>
  <div>
    <!-- navbar -->
    <van-nav-bar title="首 页" fixed />
    <!-- 滑动的频道tab -->
    <van-tabs v-model="activeName" class="mychannel-tabs">
      <van-tab title="标签 1" name="a">
        <!-- 新闻列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 其他tab页的内容 -->
      <van-tab title="标签 2" name="b">内容 2</van-tab>
      <van-tab title="标签 3" name="c">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      activeName: 'a',
      isLoading: false
    }
  },
  methods: {
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
