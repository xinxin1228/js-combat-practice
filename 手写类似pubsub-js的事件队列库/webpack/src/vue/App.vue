<template>
  <div class="vue-content">
    <h1>Vue版 - 全局组件</h1>
    <el-button type="primary" @click="addCount">count++</el-button>
    <h2>count: {{ count }}</h2>
    <el-space>
      是否显示子组件
      <el-switch v-model="isShow" />
    </el-space>
    <el-button @click="handlePrint">打印所有订阅以“vue”开头的主题</el-button>
    <div class="coms" v-if="isShow">
      <demo01-com :count="count" :addCount="addCount" />
      <demo02-com />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Demo01Com from './components/Demo01Com'
import Demo02Com from './components/Demo02Com'
import pubsub from '../pubsub'

const count = ref(0)
const isShow = ref(true)
const addCount = () => count.value++
const handlePrint = () => {
  const info = pubsub.getSubscriptions('vue')

  alert(info)
}
</script>

<style lang="less">
.vue-content {
  background-color: pink;

  .coms {
    display: flex;
    gap: 0 20px;
    .demo {
      flex: 1;
      padding: 15px;
      border: 1px solid #000;
    }
  }
}
</style>
