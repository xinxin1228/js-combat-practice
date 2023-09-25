const fs = require('fs')
const path = require('path')
const Router = require('@koa/router')
const { feedbackFaild, feedbackSuccess } = require('../../utils/msg')
const upload = require('../../utils/upload')
const removePath = require('../../utils/removePath')

const router = new Router()

// 上传
router.post('/upload', async (ctx) => {
  try {
    const { filePath, filePaths } = upload(ctx, '')

    feedbackSuccess(ctx, 201, {
      mes: '上传成功！',
      filePath,
      filePaths
    })
  } catch (error) {
    feedbackFaild(ctx, error)
  }
})

// 删除
router.delete('/files', async (ctx) => {
  try {
    const publicPath = path.resolve(__dirname, '../../public')
    removePath(publicPath)

    feedbackSuccess(ctx, 204, {
      mes: '删除成功！'
    })
  } catch (error) {
    feedbackFaild(ctx, error)
  }
})

// 读取
router.get('/files', async (ctx) => {
  try {
    const filePath = path.join(__dirname, '../../video/1.gif')
    const data = fs.readFileSync(filePath)

    feedbackSuccess(ctx, 200, {
      mes: '读取文件',
      data,
      url: `${ctx.protocol}://${ctx.host}/1.gif`
    })
  } catch (error) {
    feedbackFaild(ctx, error)
  }
})

module.exports = router
