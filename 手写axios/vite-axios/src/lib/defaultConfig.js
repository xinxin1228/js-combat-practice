// 默认配置
export default {
  baseURL: '/',
  timeout: 0,
  method: 'get',
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Request-type': 'comm'
    },
    get: {
      'X-Request-type': 'get'
    },
    post: {
      'X-Request-type': 'post'
    },
    put: {
      'X-Request-type': 'put'
    },
    delete: {
      'X-Request-type': 'delete'
    },
    'X-Author': 'hjx'
  },
  transformRequest(config) {
    return config
  },
  transformResponse(data) {
    try {
      return JSON.parse(data)
    } catch {
      return data
    }
  }
}
