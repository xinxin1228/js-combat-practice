import { isFunction, isObject } from '../utils/check'
import throwError from '../utils/throwError'
import requestMethods from './requestMethods'

// 发送ajax请求
export default function request(config) {
  let { url, method, headers, params, data } = config

  throwError(!url, '请输入url地址')
  throwError(
    !Object.values(requestMethods).includes(method?.toLowerCase()),
    'method不合法'
  )
  throwError(headers && !isObject(headers), 'headers必须是json格式')
  throwError(params && !isObject(params), 'params必须是json格式')

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // 挂载params
    // 去除hash
    const searchIndex = url.indexOf('?')
    const hashIndex = url.indexOf('#')

    if (!!~hashIndex) {
      url = url.substring(0, hashIndex)
    }

    if (!~searchIndex) {
      url += '?'
    } else {
      if (url.slice(-1) !== '&') {
        url += '&'
      }
    }

    let searchParams = ''
    for (const key in params) {
      searchParams += `${key}=${params[key]}&`
    }
    if (searchParams.slice(-1) === '&') {
      searchParams = searchParams.slice(0, -1)
    }
    url += searchParams

    xhr.open(method, url)

    // 挂载headers
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }

    xhr.send(JSON.stringify(data))

    xhr.addEventListener('load', () => {
      console.log('xhr', xhr)

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr)
      } else {
        reject(xhr)
      }
    })
    xhr.addEventListener('error', (err) => {
      reject(err)
    })
    xhr.addEventListener('progress', (e) => {
      if (isFunction(config.onDownloadProgress)) {
        config.onDownloadProgress(e)
      }
    })
    xhr.upload.addEventListener('progress', (e) => {
      if (isFunction(config.onUploadProgress)) {
        config.onUploadProgress(e)
      }
    })
  })
}
