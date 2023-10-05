<template>
  <div class="demo">
    <h2>demo01组件</h2>
    <h3>count: {{ count }} a: {{ a }} b: {{ b }}</h3>
    <el-button @click="addCount">改变app组件count值</el-button>
    <el-button @click="addA">a++</el-button>
    <el-button @click="addB">b++</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import pubsub from '../../pubsub'

defineProps({
  count: Number,
  addCount: Function
})

const a = ref(6)
const b = ref(10)

const addA = () => a.value++
const addB = () => b.value++

pubsub.subscribe('vue-addA', addA)
pubsub.subscribe('vue-addB', addB)

onMounted(() => {
  console.log('demo01组件挂载了')
})
onUnmounted(() => {
  console.log('demo01组件卸载了xxxx')
  pubsub.unsubscribe('vue')
})
</script>

<style scoped lang="less"></style>
