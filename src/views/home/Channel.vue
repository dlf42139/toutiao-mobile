<template>
  <van-popup :value="value" @input="$emit('input')" position="bottom" :style="{ height: '90%' }">
  </van-popup>
</template>

<script>
export default {
  name: 'channel',
  props: ['value']
}
</script>

<style>
</style>
