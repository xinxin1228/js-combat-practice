<template>
  <div class="demo">
    <h2>demo01组件</h2>
    <h3>count：{{ count }} a： {{ a }} b：{{ b }}</h3>
    <el-button @click="addCount">改变app组件count值</el-button>
    <el-button @click="addA">a++</el-button>
    <el-button @click="addB">b++</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import pubsub from '../../pubsub'

interface PropsTypes {
  count: number
  addCount: () => void
}

withDefaults(defineProps<PropsTypes>(), {
  count: 0,
  addCount: () => {}
})

const a = ref<number>(6)
const b = ref<number>(10)

const addA = () => a.value++
const addB = () => b.value++

pubsub.subscribe('vue-addA', addA)
pubsub.subscribe('vue-addB', addB)

onMounted(() => {
  console.log('组件挂载了')
})
onUnmounted(() => {
  console.log('组件卸载了，清除订阅')
  pubsub.unsubscribe('vue')
})
</script>

<style scoped lang="less"></style>
