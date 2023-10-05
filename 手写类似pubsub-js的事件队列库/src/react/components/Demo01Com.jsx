import React, { memo, useState, useEffect } from 'react'
import { Button } from 'antd'
import pubsub from '../../pubsub'

const Demo01Com = memo((props) => {
  const { count, addCount } = props

  const [a, setA] = useState(6)
  const [b, setB] = useState(10)

  const addA = () => setA(a + 1)
  const addB = () => setB(b + 1)

  pubsub.subscribe('react-addA', addA)
  pubsub.subscribe('react-addB', addB)

  useEffect(() => {
    console.log('demo01组件挂载了')

    return () => {
      console.log('demo01组件卸载了xxxx')
      pubsub.unsubscribe('react')
    }
  }, [])

  return (
    <div className="demo">
      <h2>demo01组件</h2>
      <h3>
        count: {count} a: {a} b: {b}
      </h3>
      <Button onClick={addCount}>改变app组件count值</Button>
      <Button onClick={() => addA()}>a++</Button>
      <Button onClick={addB}>b++</Button>
    </div>
  )
})

export default Demo01Com
