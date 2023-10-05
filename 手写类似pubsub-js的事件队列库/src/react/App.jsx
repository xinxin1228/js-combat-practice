import React, { memo, useState } from 'react'
import { Button, Space, Switch } from 'antd'
import Demo01Com from './components/Demo01Com'
import Demo02Com from './components/Demo02Com'
import pubsub from '../pubsub'

const App = memo(() => {
  const [count, setCount] = useState(0)
  const [isShow, setIsShow] = useState(true)

  const addA = () => setCount(count + 1)

  const handlePrint = () => {
    const info = pubsub.getSubscriptions('react')

    alert(info)
  }

  return (
    <div className="react-content">
      <h1>React版 - 全局组件</h1>
      <Button type="primary" onClick={() => addA()}>
        count++
      </Button>
      <h2>count: {count}</h2>
      <Space>
        是否显示子组件
        <Switch checked={isShow} onChange={setIsShow} />
      </Space>
      <Button onClick={handlePrint}>打印所有订阅以“react”开头的主题</Button>
      {isShow && (
        <div className="coms">
          <Demo01Com count={count} addCount={addA} />
          <Demo02Com />
        </div>
      )}
    </div>
  )
})

export default App
