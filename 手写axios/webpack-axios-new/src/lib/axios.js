import urlLib from 'url'
import { isFunction, isString } from '../utils/check'
import { throwError } from '../utils/throwError'
import defaultConfig from './defaultConfig'
import { mergeConfig } from '../utils/mergeConfig'
import { request } from './request'
import { response } from './response'
import { AxiosHeaders } from './AxiosHeaders'
import { InterceptorManager } from './InterceptorManager'

// 支持的axios请求方式
const AxiosMethodTypes = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export class Axios {
  constructor(config) {
    this.defaults = mergeConfig(defaultConfig, config)
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }

    return new Proxy(this.request, {
      get: (_, key) => {
        return this[key]
      },
      set: (_, key, newValue) => {
        this[key] = newValue
        return true
      },
      apply: (target, _, rest) => {
        return target.apply(this, rest)
      }
    })
  }

  request(...rest) {
    let config = this._handleCommonConfig(AxiosMethodTypes.GET, rest)

    if (!config) {
      config = {
        method: AxiosMethodTypes.GET,
        url: rest.url,
        ...rest[0]
      }
    }

    return this._mergeConfig(config)
  }
  get(...rest) {
    let config = this._handleCommonConfig(AxiosMethodTypes.GET, rest)

    if (!config) {
      config = {
        ...rest[1],
        url: String(rest[0]),
        method: AxiosMethodTypes.GET
      }
    }

    return this._mergeConfig(config)
  }
  post(...rest) {
    let config = this._handleCommonConfig(AxiosMethodTypes.POST, rest)

    if (!config) {
      config = {
        ...rest[2],
        data: rest[1],
        url: String(rest[0]),
        method: AxiosMethodTypes.POST
      }
    }

    return this._mergeConfig(config)
  }
  put(...rest) {
    let config = this._handleCommonConfig(AxiosMethodTypes.PUT, rest)

    if (!config) {
      config = {
        ...rest[2],
        data: rest[1],
        url: String(rest[0]),
        method: AxiosMethodTypes.PUT
      }
    }

    return this._mergeConfig(config)
  }
  delete(...rest) {
    let config = this._handleCommonConfig(AxiosMethodTypes.DELETE, rest)

    if (!config) {
      config = {
        ...rest[1],
        url: String(rest[0]),
        method: AxiosMethodTypes.DELETE
      }
    }

    return this._mergeConfig(config)
  }

  create(config) {
    const axios = new Axios(config)

    return axios
  }

  // 处理公共配置的部分
  _handleCommonConfig(method, rest) {
    let config = null

    if (rest.length === 1 && isString(rest[0])) {
      config = {
        url: rest[0],
        method
      }
    }

    return config
  }

  // 合并配置
  _mergeConfig(config) {
    let { url, method } = config
    let headers = {}

    method = method.toLowerCase()
    const mergeCon = mergeConfig(defaultConfig, config)

    headers = mergeConfig(
      mergeCon['headers'],
      mergeCon['headers']['common'],
      mergeCon['headers'][method]
    )

    // 删除默认配置中的无用key 比如common get post ...
    for (const key in headers) {
      if (['common', 'get', 'post', 'delete', 'put'].includes(key)) {
        // delete headers[key]
        if (
          JSON.stringify(headers[key]) ===
          JSON.stringify(mergeCon['headers'][key])
        ) {
          delete headers[key]
        }
      }
    }

    let baseURL =
      mergeCon.baseURL || this.defaults.baseURL || defaultConfig.baseURL

    if (!baseURL.endsWith('/')) {
      baseURL = `${baseURL}/`
    }
    url = urlLib.resolve(baseURL, url)

    mergeCon.url = url
    mergeCon.method = method
    mergeCon.timeout =
      config.timeout ?? this.defaults.timeout ?? defaultConfig.timeout
    mergeCon.headers = new AxiosHeaders(headers)

    // 拦截器执行顺序列表 默认发送请求
    const performList = [this._dispatchRequest()]

    this.interceptors.request.forEach(interceptor => {
      performList.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptors => {
      performList.push(interceptors)
    })

    return performList.reduce((prev, next) => {
      return prev.then(next.resolve, next.reject)
    }, Promise.resolve(mergeCon))
  }

  // 发起请求
  _dispatchRequest() {
    return {
      async resolve(config) {
        let { transformRequest, transformResponse } = config

        throwError(transformRequest && !isFunction(transformRequest))
        throwError(transformResponse && !isFunction(transformResponse))

        if (transformRequest) {
          config.data = transformRequest(config.data, config.headers)
        }

        const xhr = await request(config)

        const res = response(xhr, config)

        if (transformResponse) {
          res.data = transformResponse(res.data, res.headers, res.status)
        }

        return res
      },
      reject(err) {
        return Promise.reject(err)
      }
    }
  }
}

Axios.create = Axios.prototype.create

export default Axios.create()
