<template>
  <div class="demo">
    <h2>demo03组件</h2>
    <el-button @click="addA">a++</el-button>
    <el-button @click="addB">b++</el-button>
  </div>
</template>

<script setup>
import pubsub from '../../pubsub'

const addA = () => pubsub.publish('vue-addA')
const addB = () => pubsub.publish('vue-addB')
</script>

<style scoped lang="less"></style>
