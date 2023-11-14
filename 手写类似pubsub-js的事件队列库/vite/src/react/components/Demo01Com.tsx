import React, { memo, useEffect, useState } from 'react'
import { Button, Space } from 'antd'
import pubsub from '../../pubsub'

interface PropsTypes {
  count: number
  addCount: () => void
}

const Demo01Com: React.FC<PropsTypes> = memo(({ count, addCount }) => {
  const [a, setA] = useState<number>(6)
  const [b, setB] = useState<number>(10)

  const addA = () => setA(a + 1)
  const addB = () => setB(b + 1)

  pubsub.subscribe('react-addA', addA)
  pubsub.subscribe('react-addB', addB)

  useEffect(() => {
    console.log('组件挂载了')

    return () => {
      console.log('组件卸载了 清除订阅')
      pubsub.unsubscribe('react')
    }
  }, [])

  return (
    <div className="demo">
      <h2>demo01组件</h2>
      <h3>
        count：{count} a： {a} b：{b}
      </h3>
      <Space>
        <Button onClick={addCount}>改变app组件count的值</Button>
        <Button onClick={addA}>a++</Button>
        <Button onClick={addB}>b++</Button>
      </Space>
    </div>
  )
})

export default Demo01Com
