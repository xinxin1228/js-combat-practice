// 测试ajax请求
// Restful api风格接口
const express = require('express')
const { feedbackFaild, feedbackSuccess } = require('../../utils/msg')

const router = express.Router()

// get
router.get('/users', (req, res) => {
  try {
    feedbackSuccess(res, 200, {
      mes: '数据列表',
      userList: [{ name: 'web', age: 22 }],
      params: req.query
    })
  } catch (error) {
    feedbackFaild(res, error)
  }
})

// post
router.post('/users', (req, res) => {
  try {
    console.log('first', req.body)
    feedbackSuccess(res, 201, {
      mes: '添加成功！',
      body: req.body
    })
  } catch (error) {
    feedbackFaild(res, error)
  }
})

router.delete('/users/:id', (req, res) => {
  try {
    console.log(req.params.id)
    console.log(req.body)
    feedbackSuccess(res, 204, {
      mes: '删除成功',
      id: req.params.id,
      body: req.body
    })
  } catch (error) {
    feedbackFaild(res, error)
  }
})

router.put('/users/:id', (req, res) => {
  try {
    feedbackSuccess(res, 200, {
      mes: '修改成功',
      id: req.params.id,
      body: req.body
    })
  } catch (error) {
    feedbackFaild(res, error)
  }
})

module.exports = router
