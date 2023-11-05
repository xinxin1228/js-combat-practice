import mergeConfig from './utils/mergeConfig'
// import axios from './lib/axios'
import axios from 'axios'
// axios.defaults.transformRequest
// axios.defaults.transformRequest
// axios.interceptors.request.use(
//   (config) => {
//     console.log('use1', config)
//     config.use1 = 'use1'
//     return config
//   },
//   (err) => {
//     console.log('err1', err)
//     return Promise.reject(err)
//   }
// )
// axios.interceptors.request.use(
//   (config) => {
//     console.log('use2', config)
//     config.use2 = 'use2'
//     // throw 12
//     return config
//   },
//   (err) => {
//     console.log('err2', err)
//     return Promise.reject(err)
//   }
// )
// axios.interceptors.request.use(
//   (config) => {
//     console.log('use3', config)
//     return config
//   },
//   (err) => {
//     console.log('err3', err)
//     return Promise.reject(err)
//   }
// )

// axios.interceptors.response.use(
//   (res) => {
//     console.log('use11', res)
//     return res
//   },
//   (err) => {
//     console.log('err11', err)
//     return Promise.reject(err)
//   }
// )
// axios.interceptors.response.use(
//   (res) => {
//     console.log('use22', res)
//     // return res
//     res.data.message = '兰剑气'
//     return { ...res, message: '拦截器' }
//   },
//   (err) => {
//     console.log('err22', err)
//     return Promise.reject(err)
//   }
// )
// axios.interceptors.response.use(
//   (res) => {
//     console.log('use33', res)
//     // return { ...res, data: JSON.parse(res.data), mes: '拦截器' }
//     return res
//   },
//   (err) => {
//     console.log('err33', err)
//     return Promise.reject(err)
//   }
// )

const obj1 = {
  a: 1,
  arr: [1, 2, 3],
  x: null,
  a1() {},
  info: {
    addres: {
      x: '1',
      arr: [2]
    }
  }
}
const obj2 = {
  b: 2,
  info: {
    hello: 2,
    addres: {
      a: 123,
      bb: 'bbb',
      arr: {}
    }
  }
}

const obj = mergeConfig(
  obj2,
  obj1,
  { c: 11 },
  { nihao: [], aaaa: null, haha: {} },
  1,
  null
)

// console.log(obj, obj1, obj2)

// axios.aa = 1

// console.log(axios, axios.defaults, axios.aa)

// axios.defaults.baseURL = 'http://localhost:5200'
const url = '/data/1.json?search=你ahoy啊?&age=22?12#123'

// axios
// axios(url)
// axios(url, {
//   method: 'post',
//   params: {
//     name: 'web'
//   }
// })

// axios.interceptor.request

axios({
  url,
  method: 'get',
  params: {
    name: 'web'
  },
  data: {
    a: 123,
    b: 20
  },
  headers: {
    name: 'web',
    get: {
      'hello-get': 123
    }
  },
  transformRequest(config) {
    // config.xxxxx = 1000
    // config.headers.aaa = 10
    // console.log('config', config, axios.defaults)
    return config
  },
  transformResponse(data) {
    return { ...JSON.parse(data), message: 'sql额外添加的' }
  }
  // onDownloadProgress(e) {
  //   console.log(e)
  // }
}).then(
  (res) => {
    console.log('res axios', res)
  },
  (err) => {
    console.log('err axios', err)
  }
)

// axios.onDownloadProgress((res) => {
//   console.log('progress', res)
// })
// console.log('xxx', axios.onDownloadProgress)

// let pro = Promise.resolve(1231)

// const pr1 = {
//   resolve(res) {
//     console.log('res1', res)

//     return res
//   },
//   reject() {
//     console.log('err1')
//   }
// }
// const pr2 = {
//   resolve(res) {
//     console.log('res2', res)
//     throw '123'

//     return res
//   },
//   reject() {
//     console.log('err2')
//   }
// }
// const pr3 = {
//   resolve(res) {
//     console.log('res3', res)
//   },
//   reject(err) {
//     console.log('err3', err)

//     return Promise.reject(err)
//   }
// }

// const list = [pr1, pr2, pr3]

// while (list.length) {
//   const { resolve, reject } = list.shift()

//   pro = pro.then(resolve, reject)
// }

// pro.then(
//   (res) => {
//     console.log('res', res)
//   },
//   (err) => {
//     console.log('err', err)
//   }
// )

// console.log('1', new URL('/123/123').search)
// const s = new URLSearchParams(new URL(searchUrl).search)
// console.log(
//   's',
//   s.forEach((val, key) => console.log(key, val))
// )

// get
// axios.get(url)
// axios.get(url, {
//   method: 'post',
//   params: {
//     name: 'web'
//   },
//   data: {
//     a: 20
//   }
// })

// post
// axios.post(url)
// axios.post(
//   url,
//   { name: 'web' },
//   {
//     method: 'get',
//     headers: {
//       common: {
//         'x-author': 'hjx'
//       }
//     }
//   }
// )
// axios.post(url, {
//   headers: {
//     a: 123
//   },
//   data: {
//     name: 'web'
//   }
// })
// axios.post(url, [1, 2, 2])

// put
// axios.put(url)
// axios.put(url, { name: 'web' })
// axios.put(
//   url,
//   { name: 'web' },
//   {
//     headers: {
//       common: {
//         'x-author': 'hjx'
//       }
//     },
//     method: 'get',
//     params: {
//       name: 'web'
//     }
//   }
// )
// axios.put(url, 123)

// delete
// axios.delete(url)
// axios.delete(url, { params: { name: 'web' } })
// axios.delete(url, { params: { name: 'web' }, data: { a: 20 } })
// axios.get(url, {
//   params: { name: 'web' },
//   data: { a: 20 },
//   headers: {
//     aa: 10
//   }
// })
// axios.delete({
//   url,
//   params: {
//     name: 'web'
//   }
// })
