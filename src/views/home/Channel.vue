<template>
  <van-popup :value="value" @input="$emit('input')" position="bottom" :style="{ height: '90%' }">
     <div class="channel">
      <div class="channel-head">
        <div>
          <span id="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
          >编辑</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="value in userChannel"
          :key="value.id">
          <span class="text">{{value.name}}</span>
          <!-- <van-icon class="close-icon" name="close" /> -->
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span id="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="value in allChannel"
          :key="value.id">
          <div class="info">
            <span class="text">{{value.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { getChannels, getAllChannels } from '../../api/channel.js'
export default {
  name: 'channel',
  props: ['value'],
  data () {
    return {
      userC: null,
      allC: null
    }
  },
  mounted () {
    this.loadChannels()
  },
  computed: {
    userChannel () {
      return this.userC
    },
    allChannel () {
      return this.allC
    }
  },
  methods: {
    async loadChannels () {
      const uc = await getChannels()
      const ac = await getAllChannels()
      this.userC = uc.channels
      this.allC = ac.channels
      console.log('~~~~~~')
      console.log(uc)
      console.log(ac)
      console.log('~~~~~~')
    }
  }
}
</script>

<style scoped lang="less">
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    #title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
