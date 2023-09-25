const path = require('path')
const Koa = require('koa')
const { koaBody } = require('koa-body')
const static = require('koa-static')
const cors = require('./middleware/cors')
const notfound = require('./middleware/notFound')
const router = require('./router')

const app = new Koa()

app
  .use(cors)
  .use(static(path.resolve(__dirname, './public')))
  .use(static(path.resolve(__dirname, './video')))
  .use(koaBody({ multipart: true }))
  .use(router.routes())
  .use(notfound)
  .listen(3000, () => {
    console.log('3000端口已监听')
  })
