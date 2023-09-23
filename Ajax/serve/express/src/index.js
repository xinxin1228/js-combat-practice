const express = require('express')
const cors = require('./middleware/cors')
const router = require('./router')
const httpNotfound = require('./utils/notFound')

const app = express()

app
  .use(cors)
  .use('/public', express.static('public'))
  .use('/video', express.static('video'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/api', router)
  .use(httpNotfound)
  .listen(3000, () => {
    console.log('3000端口已监听')
  })
