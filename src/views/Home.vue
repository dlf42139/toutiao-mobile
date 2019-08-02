<template>
  <div>
    <!-- navbar -->
    <van-nav-bar title="首 页" fixed />
    <!-- 滑动的频道tab -->
    <van-tabs v-model="activeName" class="mychannel-tabs">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 新闻列表 -->
        <van-pull-refresh v-model="item.downPullLoading" @refresh="onRefresh">
          <van-list
            v-model="item.upPullLoading"
            :finished="item.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="val in item.news" :key="val.art_id" :title="val.title">
              <template slot="label">
                <van-grid v-show="val.cover.type != 0" :border="false" :column-num="3">
                  <van-grid-item v-for="(srcitem,index) in val.cover.images" :key="index">
                    <van-image :src="srcitem" lazy-load />
                  </van-grid-item>
                </van-grid>
                <span>作者:{{val.aut_name}}</span>
                &nbsp;&nbsp;
                <span>评论数:{{val.comm_count}}</span>
                &nbsp;&nbsp;
                <span>发布时间:{{val.pubdate | getRelativeTime}}</span>
                &nbsp;&nbsp;
                <van-icon name="cross" @click="showPopup"/>
                <van-popup v-model="ishowPopup">内容</van-popup>
                <!-- 弹出框——更多操作 -->
                <more-action v-model="ishowPopup"></more-action>
                <!-- <van-popup v-model="ishowPopup">内容</van-popup> -->
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '../api/channel'
import { getNews } from '../api/article'
import { mapState } from 'vuex'
import MoreAction from './dialog/MoreAction'
export default {
  data () {
    return {
      list: [],
      channels: [],
      loading: false,
      finished: false,
      activeName: 0,
      isLoading: false,
      ishowPopup: false
    }
  },
  components: {
    MoreAction
  },
  created () {
    this.huoquChannels()
  },
  computed: {
    ...mapState['userToken'],
    currentChannel () {
      return this.channels[this.activeName]
    }
  },
  watch: {
    '$store.state.userToken' (newV, oldV) {
      console.log('来来来')
      this.huoquChannels()
      this.currentChannel.upPullLoading = true
      this.loadNews()
    }
  },
  methods: {
    showPopup () {
      this.ishowPopup = true
    },
    // 获取频道列表
    async huoquChannels () {
      const localChannels = JSON.parse(window.localStorage.getItem('channels'))
      // 没登录且没本地，或者已登录，都是要发请求的
      if ((!this.userToken && !localChannels) || this.userToken) {
        const data = await getChannels()
        // 在赋值之前，改变数据
        data.channels.forEach(element => {
          element.timestamp = Date.now()
          element.with_top = 1
          element.news = []
          element.downPullLoading = false // 当前频道下拉状态
          element.upPullLoading = false // 当前频道上拉加载更多
          element.upPullFinished = false // 当前频道加载完毕
        })
        this.channels = data.channels
      }
      // 没登录但是有本地，才从本地获取
      if (!this.userToken && localChannels) {
        this.channels = localChannels
      }
    },
    async loadNews () {
      const cc = this.currentChannel
      let data = {
        channel_id: cc.id,
        timestamp: cc.timestamp,
        with_top: cc.with_top
      }
      let rel = await getNews(data)
      // console.log(this.currentChannel)
      return rel
    },
    // 这个是ui组件自带的函数，加载内容
    async onLoad () {
      await this.$sleep(600)
      let rel = await this.loadNews()
      if (rel.pre_timestamp && rel.results.length === 0) {
        this.currentChannel.timestamp = rel.pre_timestamp
        rel = await this.loadNews()
      }
      if (!rel.pre_timestamp && rel.results.length === 0) {
        this.currentChannel.upPullFinished = true
        this.currentChannel.upPullLoading = false
      }
      this.currentChannel.timestamp = rel.pre_timestamp
      // 保存已加载出来的文章数据，取消动画，应该是push，不是直接赋值，不然就把前面的也搞没了
      this.currentChannel.news.push(...rel.results)
      this.currentChannel.upPullLoading = false
    },
    // 页面刷新
    onRefresh () {}
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
