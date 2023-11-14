import pubsub from './pubsub'
import './vue'
import './react'

console.log(pubsub)

const id = pubsub.subscribe('addA', (...rest) => {
  console.log('addA', rest)
})
const id2 = pubsub.subscribe('addA', (...rest) => {
  console.log('addA', rest)
})
const id3 = pubsub.subscribe('addB', (...rest) => {
  console.log('addB', rest)
})

console.log('getSubscriptions', pubsub.getSubscriptions('a'))
pubsub.unsubscribe(id2)
console.log('countSubscriptions addA', pubsub.countSubscriptions('addA'))
