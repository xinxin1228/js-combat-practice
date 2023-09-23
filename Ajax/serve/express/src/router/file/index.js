// 文件操作
const fs = require('fs')
const path = require('path')
const express = require('express')
const upload = require('../../utils/upload')
const { feedbackFaild, feedbackSuccess } = require('../../utils/msg')
const removePath = require('../../utils/removePath')

const router = express.Router()

// 上传
router.post('/upload', async (req, res) => {
  try {
    const uploadFile = await upload('')

    uploadFile(req, res, (err) => {
      if (err) return feedbackFaild(res, err)
      if (req.files?.length > req.body.maxCount) {
        return feedbackFaild(
          res,
          '最多上传' + req.body.maxCount + '个文件',
          400
        )
      }

      feedbackSuccess(res, 201, {
        mes: '上传成功！',
        files: req.files,
        urls: req.files?.map(
          (file) =>
            `${req.protocol}://${req.hostname}:${req.socket.localPort}/public/${file.filename}`
        )
      })
    })
  } catch (error) {
    console.log('🚀  ~ file: index.js:30 ~ router.post ~ error:', error)
    feedbackFaild(res, error)
  }
})

// 删除所有已上传的文件
router.delete('/files', (req, res) => {
  try {
    const publicPath = path.resolve(__dirname, '../../../public')
    removePath(publicPath)

    feedbackSuccess(res, 204, {
      mes: '删除成功！'
    })
  } catch (error) {
    feedbackFaild(res, error)
  }
})

// 读取文件
router.get('/files', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../../video/1.gif')
    const data = fs.readFileSync(filePath)

    feedbackSuccess(res, 200, {
      mes: '读取大文件',
      data,
      url: `${req.protocol}://${req.hostname}:${req.socket.localPort}/video/1.gif`
    })
  } catch (error) {
    feedbackFaild(res, error)
  }
})

module.exports = router
