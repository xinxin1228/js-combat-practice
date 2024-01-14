export default {
  timeout: 0,
  method: 'get',
  signal: null,
  baseURL: '',
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
  /**
   * 请求数据转换
   * @param {object} data data数据
   * @param {object} headers 请求头
   * @returns
   */
  transformRequest(data) {
    return data
  },
  /**
   * 响应数据转换
   * @param {string} data 结果
   * @param {object} headers 相应头
   * @param {number} status 状态吗
   * @returns
   */
  transformResponse(data) {
    try {
      return JSON.parse(data)
    } catch {
      return data
    }
  }
  // 上传进度
  // onUploadProgress() { },
  // 下载进度
  // onDownloadProgress() {}
}
