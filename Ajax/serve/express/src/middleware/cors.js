const cors = require('cors')

module.exports = cors({
  origin: '*',
  credentials: true // 设置跨域
})
