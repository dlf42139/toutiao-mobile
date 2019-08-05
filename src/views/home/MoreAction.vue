<template>
  <van-dialog :value="value" @input="$emit('input')" :show-confirm-button="showConfimBtn" :close-on-click-overlay="true">
    <van-cell-group v-if="!fankui">
      <van-cell @click="addDislike()" icon="location-o" title="不感兴趣" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="fankui=true" />
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>
     <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="fankui=false" />
      <van-cell title="侵权" icon="location-o" />
      <van-cell title="色情" icon="location-o" />
      <van-cell title="暴力" icon="location-o" />
      <van-cell title="低俗" icon="location-o" />
      <van-cell title="不适" icon="location-o" />
      <van-cell title="错误" icon="location-o" />
      <van-cell title="其他" icon="location-o" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeNews } from '../../api/article.js'
export default {
  props: ['value', 'dislike'],
  data () {
    return {
      showConfimBtn: false,
      fankui: false
    }
  },
  methods: {
    async addDislike () {
      try {
        const id = this.dislike.art_id
        const data = await dislikeNews(id)
        // 关闭弹出层对话框
        console.log(this.dislike)
        this.$emit('disSuccess')
        this.$emit('input', false)
        this.$toast('操作成功')
        console.log(data)
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style>
</style>
