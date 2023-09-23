/**
 * 成功反馈前端
 * @param res 响应体
 * @param code 状态码
 * @param data 数据内容
 */
const feedbackSuccess = (res, code, data) => {
  res.status(code).send(data)
}

/**
 * 失败反馈前端
 * @param res 响应体
 * @param error 错误体内容
 * @param code 自定义状态码
 */
const feedbackFaild = (res, error, code = 500) => {
  if (error.code) {
    res.status(error.code).send({ error: error.error })
  } else {
    if (error.message) {
      res.status(code).send({ error: error.message })
    } else {
      res.status(code).send({ error })
    }
  }
}

module.exports = {
  feedbackSuccess,
  feedbackFaild
}
