import React, { memo, useState } from 'react'
import { Button, Space, Switch } from 'antd'
import Demo01Com from './components/Demo01Com'
import Demo02Com from './components/Demo02Com'
import pubsub from '../pubsub'

const App: React.FC = memo(() => {
  const [count, setCount] = useState<number>(10)
  const [isShow, setIsShow] = useState<boolean>(true)

  const addCount = () => {
    setCount(count + 1)
  }
  const print = () => {
    alert(pubsub.getSubscriptions('react'))
  }

  return (
    <div className="react-content">
      <h1>React版 - 全局组件</h1>
      <Button type="primary" onClick={addCount}>
        count++
      </Button>
      <h2>count：{count}</h2>
      <Space>
        <h3>是否展示子组件</h3>
        <Switch checked={isShow} onChange={setIsShow} />
        <Button onClick={print}>打印所有以“react”开头的主题</Button>
      </Space>
      {isShow && (
        <div className="coms">
          <Demo01Com count={count} addCount={addCount} />
          <Demo02Com />
        </div>
      )}
    </div>
  )
})

export default App
