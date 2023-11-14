<template>
  <div class="vue-content">
    <h1>Vue版 - 全局组件</h1>
    <el-button type="primary" @click="addCount">count++</el-button>
    <h2>count: {{ count }}</h2>
    <el-space>
      <h3>
        是否显示子组件 <el-switch v-model="isShow" @change="switchChange" />
      </h3>
      <el-button @click="print">打印所有订阅以“vue”开头的主题</el-button>
    </el-space>
    <div class="coms" v-if="isShow">
      <demo01-com :count="count" :addCount="addCount" />
      <demo02-com />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Demo01Com from './components/Demo01Com.vue'
import Demo02Com from './components/Demo02Com.vue'
import pubsub from '../pubsub'

const count = ref<number>(10)
const isShow = ref<boolean>(true)

const addCount = () => count.value++
const switchChange = (val: boolean) => (isShow.value = val)
const print = () => {
  alert(pubsub.getSubscriptions('vue'))
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
