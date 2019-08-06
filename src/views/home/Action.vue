<template>
  <van-dialog
    :value="value"
    @input="$emit('input')"
    :show-confirm-button="false"
    :close-on-click-overlay="true"
  >
  <van-cell-group v-if="!fankui">
      <van-cell @click="addDislike()" icon="location-o" title="不感兴趣" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="fankui=true" />
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="fankui=false" />
      <van-cell
        v-for="(item,index) in reportdata"
        :key="index"
        :title="item.label"
        @click="report(item.value)"
        icon="location-o"
      />
    </van-cell-group>

  </van-dialog>
</template>

<script>
import { dislikeNews, reportNews } from '../../api/article.js'
export default {
  props: ['value', 'dislike'],
  data () {
    return {
      fankui: false,
      reportdata: [
        { label: '其他问题', value: 0 },
        { label: '标题夸张', value: 1 },
        { label: '低俗色情', value: 2 },
        { label: '错别字多', value: 3 },
        { label: '旧闻重复', value: 4 },
        { label: '广告软文', value: 5 },
        { label: '内容不实', value: 6 },
        { label: '涉嫌违法犯罪', value: 7 },
        { label: '侵权', value: 8 }
      ]
    }
  },
  methods: {
    async report (value) {
      try {
        const data = await reportNews({ id: this.dislike.art_id, type: value })
        this.$emit('input', false)
        this.$toast('举报成功')
        this.fankui = false
        console.log(data)
      } catch (error) {
        console.dir(error)
        if (error.response.status === 409) {
          this.$toast('已被举报过')
          this.$emit('input', false)
          this.fankui = false
        } else {
          this.$toast('举报失败')
          this.$emit('input', false)
          this.fankui = false
        }
      }
    },
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
<style scoped lang="less">

</style>
