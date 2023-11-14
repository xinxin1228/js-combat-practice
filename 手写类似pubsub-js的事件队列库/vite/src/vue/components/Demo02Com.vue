<template>
  <div class="demo">
    <h2>demo02组件</h2>
    <el-button @click="addA">a++</el-button>
    <el-button @click="addB">b++</el-button>
    <demo03-com />
  </div>
</template>

<script lang="ts" setup>
import Demo03Com from './Demo03Com.vue'
import pubsub from '../../pubsub'

const addA = () => pubsub.publish('vue-addA')
const addB = () => pubsub.publish('vue-addB')
</script>

<style scoped lang="less"></style>
