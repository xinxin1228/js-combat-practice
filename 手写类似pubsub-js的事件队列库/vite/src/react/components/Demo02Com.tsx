import React, { memo } from 'react'
import { Button, Space } from 'antd'
import Demo03Com from './Demo03Com'
import pubsub from '../../pubsub'

const Demo02Com: React.FC = memo(() => {
  const addA = () => pubsub.publish('react-addA')
  const addB = () => pubsub.publish('react-addB')

  return (
    <div className="demo">
      <h2>Demo02组件</h2>
      <Space>
        <Button onClick={addA}>a++</Button>
        <Button onClick={addB}>b++</Button>
      </Space>
      <Demo03Com />
    </div>
  )
})

export default Demo02Com
