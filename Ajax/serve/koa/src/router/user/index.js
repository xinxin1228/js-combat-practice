const Router = require('@koa/router')
const { feedbackFaild, feedbackSuccess } = require('../../utils/msg')

const router = new Router()

router.get('/users', async (ctx) => {
  try {
    feedbackSuccess(ctx, 200, {
      mes: '数据列表',
      userList: [{ name: 'web', age: 22 }],
      params: ctx.query
    })
  } catch (error) {
    feedbackFaild(ctx, error)
  }
})

router.post('/users', async (ctx) => {
  try {
    feedbackSuccess(ctx, 201, {
      mes: '添加成功！',
      body: ctx.request.body
    })
  } catch (error) {
    feedbackFaild(ctx, error)
  }
})

router.delete('/users/:id', async (ctx) => {
  try {
    console.log('id', ctx.params.id)
    console.log('body', ctx.request.body)

    feedbackSuccess(ctx, 204, {
      mes: '删除成功！',
      id: ctx.params.id,
      body: ctx.request.body
    })
  } catch (error) {
    feedbackFaild(ctx, error)
  }
})

router.put('/users/:id', async (ctx) => {
  try {
    console.log('id', ctx.params.id)
    console.log('body', ctx.request.body)

    feedbackSuccess(ctx, 200, {
      mes: '修改成功！',
      id: ctx.params.id,
      body: ctx.request.body
    })
  } catch (error) {
    feedbackFaild(ctx, error)
  }
})

module.exports = router
