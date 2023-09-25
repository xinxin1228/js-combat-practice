const { feedbackFaild } = require('../utils/msg')

const httpNotfound = async (ctx) => {
  if (ctx.response.status === 404 && ctx.url.startsWith('/api')) {
    feedbackFaild(ctx, `${ctx.method} ${ctx.url} 接口地址不存在`, 404)
  }
}

module.exports = httpNotfound
