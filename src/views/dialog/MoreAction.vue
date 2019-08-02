<template>
  <van-dialog :value="value" @input="$emit('input')" :show-confirm-button="showConfimBtn" :close-on-click-overlay="true">
    <van-cell-group v-if="!fankui">
      <van-cell icon="location-o" title="不感兴趣" />
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
export default {
  props: ['value'],
  data () {
    return {
      showConfimBtn: false,
      fankui: false
    }
  }
}
</script>

<style>
</style>
