/**
 * 失败反馈
 * @param {ctx.Context} ctx ctx
 * @param {object} error 错误体内容
 * @param {number} code 自定义状态码
 */
const feedbackFaild = (ctx, error, code = 500) => {
  console.log('error', error)
  if (error.code) {
    ctx.status = error.code
    ctx.body = { error: error.error }
  } else {
    if (error.message) {
      ctx.status = code
      ctx.body = { error: error.message }
    } else {
      ctx.status = code
      ctx.body = { error }
    }
  }
}

/**
 * 成功反馈
 * @param {ctx.Context} ctx 执行上下文
 * @param {number} code 状态码
 * @param {object} data 数据内容
 */
const feedbackSuccess = (ctx, code, data) => {
  ctx.status = code
  ctx.body = data
}

module.exports = {
  feedbackSuccess,
  feedbackFaild
}
