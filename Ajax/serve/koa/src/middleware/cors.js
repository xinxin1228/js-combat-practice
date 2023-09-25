const cors = require('@koa/cors')

module.exports = cors({
  origin: '*',
  credentials: true // 设置跨域
})
