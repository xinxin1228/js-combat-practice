import pubsub from './pubsub'
import './vue'
import './react'

const handleAddA = () => {
  console.log('a++')
}
const handleAddB = () => {
  console.log('b++')
}

pubsub.subscribe('addA', handleAddA)
// pubsub.subscribe('addA', handleAddA)
pubsub.subscribe('adc', handleAddA)
pubsub.subscribe('aa', handleAddA)
pubsub.subscribe('bax', handleAddA)
pubsub.subscribe('bcs', handleAddB)

console.log('查看当前类型下的所有订阅主题 a', pubsub.getSubscriptions('a'))
console.log(
  '查看当前类型下的所有订阅主题 [a, b]',
  pubsub.getSubscriptions(['adc', 'b'])
)

// console.log('取消订阅 uid_0', pubsub.unsubscribe(['a', 'b']))
// console.log('统计订阅', pubsub.countSubscriptions(['aa', 'adc']))
// console.log('清除', pubsub.clearAllSubscriptions())

console.log(pubsub)

export const sum = 10
