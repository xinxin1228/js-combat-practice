const { feedbackFaild } = require('./msg')

const httpNotfound = (req, res) => {
  if (req.url.startsWith('/api')) {
    feedbackFaild(res, `${req.method} ${req.url} 接口地址不存在`, 404)
  }
}

module.exports = httpNotfound
