import React, { memo } from 'react'
import { Space, Button } from 'antd'
import pubsub from '../../pubsub'

const Demo03Com: React.FC = memo(() => {
  const addA = () => pubsub.publish('react-addA')
  const addB = () => pubsub.publish('react-addB')

  return (
    <div className="demo">
      <h2>Demo03组件</h2>
      <Space>
        <Button onClick={addA}>a++</Button>
        <Button onClick={addB}>b++</Button>
      </Space>
    </div>
  )
})

export default Demo03Com
