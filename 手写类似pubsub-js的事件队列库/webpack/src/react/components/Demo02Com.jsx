import React, { memo } from 'react'
import { Button } from 'antd'
import pubsub from '../../pubsub'
import Demo03Com from './Demo03Com'

const Demo01Com = memo(() => {
  const addA = () => pubsub.publish('react-addA')
  const addB = () => pubsub.publish('react-addB')

  return (
    <div className="demo">
      <h2>demo02组件</h2>
      <Button onClick={() => addA()}>a++</Button>
      <Button onClick={addB}>b++</Button>
      <Demo03Com />
    </div>
  )
})

export default Demo01Com
