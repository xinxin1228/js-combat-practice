import React, { memo } from 'react'
import { Button } from 'antd'
import pubsub from '../../pubsub'

const Demo01Com = memo(() => {
  const addA = () => pubsub.publish('react-addA')
  const addB = () => pubsub.publish('react-addB')

  return (
    <div className="demo">
      <h2>demo03组件</h2>
      <Button onClick={() => addA()}>a++</Button>
      <Button onClick={addB}>b++</Button>
    </div>
  )
})

export default Demo01Com
