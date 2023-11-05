import urlLib from 'node:url'
import mergeConfig from '../utils/mergeConfig'
import defaultConfig from './defaultConfig'
import { isArray, isObject, isString } from '../utils/check'
import requestMethod from './requestMethods'
import throwError from '../utils/throwError'
import request from './request'
import response from './response'
import deepCopy from '../utils/deepCopy'
import Interceptor from './interceptor'

class Axios {
  constructor() {
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor()
    }

    return new Proxy(this.request, {
      apply: (fn, _, argArray) => {
        return fn.apply(this, argArray)
      },
      set: (_, propName, newVal) => {
        this[propName] = newVal
        return true
      },
      get: (_, propName) => {
        return this[propName]
      }
    })
  }

  // 预处理，处理所有请求方式相同的方法
  // 比如 axios[method](url)
  _preprocessing(method, rest) {
    let config = null

    if (rest.length === 1 && isString(rest[0])) {
      config = { url: rest[0], method }
    } else {
      config = undefined
    }

    return config
  }

  /**
   * 获取配置上的值 非headers
   * @param {object} config 配置
   * @param {string} key 配置的属性名
   * @param {any} defaultValue 默认值
   */
  _getConfigValue(config, key, defaultValue = '') {
    return (
      config[key] || this.defaults[key] || defaultConfig[key] || defaultValue
    )
  }

  // 合并参数 调用发起请求
  _mergeConfig(config) {
    let { method, url } = config
    let headers = {}

    method = method.toLowerCase()

    // 计算headers
    headers = mergeConfig(
      defaultConfig['headers'],
      defaultConfig['headers']['common'],
      defaultConfig['headers'][method],
      config['headers'],
      config['headers']?.['common'],
      config['headers']?.[method]
    )
    // 删除header无用项
    for (const key in headers) {
      if (['get', 'post', 'put', 'delete', 'common'].includes(key)) {
        const val = headers[key]
        const mergeVal = mergeConfig(
          defaultConfig['headers'][key],
          config['headers']?.[key]
        )

        if (JSON.stringify(val) === JSON.stringify(mergeVal)) {
          delete headers[key]
        }
      }
    }

    // url
    const baseURL = this._getConfigValue(config, 'baseURL', '')

    config.url = urlLib.resolve(baseURL, url)
    config.headers = headers

    // transformRequest
    this.transformRequest = this._getConfigValue(
      config,
      'transformRequest',
      () => {}
    )
    // transformResponse
    this.transformResponse = this._getConfigValue(
      config,
      'transformResponse',
      () => {}
    )

    if (!this.transformRequest(deepCopy(config)))
      console.warn('transformRequest必须返回config！否则不生效！')

    config = this.transformRequest(deepCopy(config)) || config

    // 请求拦截器调用链 [默认的请求发送]
    const requestList = [this.dispatchRequest()]
    this.interceptors.request.forEach((item) => {
      requestList.unshift(item)
    })
    this.interceptors.response.forEach((item) => {
      requestList.push(item)
    })

    let requestPromise = Promise.resolve(config)

    while (requestList.length) {
      const { resolve, reject } = requestList.shift()

      requestPromise = requestPromise.then(resolve, reject)
    }

    return requestPromise
  }

  // 发起请求
  dispatchRequest() {
    let _this = this

    return {
      resolve(config) {
        return new Promise((r, j) => {
          request(config).then(
            (res) => {
              const data = response(res, config)

              if (!_this.transformResponse(data.data))
                console.warn('transformResponse必须返回res！否则不生效！')

              data.data = _this.transformResponse(data.data)

              r(data)
            },
            (err) => {
              j(err)
            }
          )
        })
      },
      reject(err) {
        return Promise.reject(err)
      }
    }
  }

  request(...rest) {
    let config = this._preprocessing(requestMethod.GET, rest)

    if (!config) {
      if (rest.length === 1 && isObject(rest[0])) {
        config = { method: requestMethod.GET, ...rest[0] }
      } else if (rest.length === 2) {
        throwError(!isString(rest[0]), 'url必须为string类型')
        throwError(!isObject(rest[1]), 'config必须是json格式')

        config = { method: requestMethod.GET, ...rest[1], url: rest[0] }
      } else {
        throwError(true, '参数不合法')
      }
    }

    console.log('request', config)
    return this._mergeConfig(config)
  }

  get(...rest) {
    let config = this._preprocessing(requestMethod.GET, rest)

    if (!config) {
      if (rest.length === 2 && isObject(rest[1])) {
        config = { ...rest[1], url: rest[0], method: requestMethod.GET }
      } else {
        throwError(true, '参数不合法')
      }
    }

    console.log('get', config)
    return this._mergeConfig(config)
  }

  post(...rest) {
    let config = this._preprocessing(requestMethod.POST, rest)

    if (!config) {
      if (rest.length === 2) {
        throwError(!isString(rest[0]), 'url必须是string类型')
        throwError(
          !isObject(rest[1]) && !isArray(rest[1]),
          'data必须是object类型'
        )

        config = { url: rest[0], data: rest[1], method: requestMethod.POST }
      } else if (rest.length === 3) {
        throwError(!isString(rest[0]), 'url必须是string类型')
        throwError(
          !isObject(rest[1]) && !isArray(rest[1]),
          'data必须是object类型'
        )
        throwError(!isObject(rest[2]), 'config必须是json类型')

        config = {
          ...rest[2],
          url: rest[0],
          data: rest[1],
          method: requestMethod.POST
        }
      } else {
        throwError(true, '参数不合法')
      }
    }

    console.log('post', config)
    return this._mergeConfig(config)
  }

  put(...rest) {
    let config = this._preprocessing(requestMethod.PUT, rest)

    if (!config) {
      if (rest.length === 2) {
        throwError(!isString(rest[0]), 'url必须是string类型')
        throwError(
          !isObject(rest[1]) && !isArray(rest[1]),
          'data必须是object类型'
        )

        config = { url: rest[0], data: rest[1], method: requestMethod.PUT }
      } else if (rest.length === 3) {
        throwError(!isString(rest[0]), 'url必须是string类型')
        throwError(
          !isObject(rest[1]) && !isArray(rest[1]),
          'data必须是object类型'
        )
        throwError(!isObject(rest[2]), 'config必须是json类型')

        config = {
          ...rest[2],
          url: rest[0],
          data: rest[1],
          method: requestMethod.PUT
        }
      } else {
        throwError(true, '参数不合法')
      }
    }

    console.log('put', config)
    return this._mergeConfig(config)
  }

  delete(...rest) {
    let config = this._preprocessing(requestMethod.DELETE, rest)

    if (!config) {
      if (rest.length === 2 && isObject(rest[1])) {
        config = { ...rest[1], url: rest[0], method: requestMethod.DELETE }
      } else {
        throwError(true, '参数不合法')
      }
    }

    console.log('delete', config)
    return this._mergeConfig(config)
  }

  create(config) {
    const axios = new Axios()

    axios.defaults = mergeConfig(defaultConfig, config)

    return axios
  }
}

Axios.create = Axios.prototype.create

export default Axios.create()
