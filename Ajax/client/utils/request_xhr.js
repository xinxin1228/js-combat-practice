class Request extends EventQueue {
  constructor() {
    super()

    this._init.get = this.get.bind(this)
    this._init.post = this.post.bind(this)
    this._init.put = this.put.bind(this)
    this._init.delete = this.delete.bind(this)
    this._init.upload = this.upload.bind(this)
    this._init.onProgress = this.onProgress.bind(this)
    this._init.onUploadProgress = this.onUploadProgress.bind(this)

    return this._init
  }

  /**
   *
   * @param {'GET'|"POST"|"PUT"|"DELETE"} methods 请求的方法
   * @param {string} url 请求的地址
   * @param {object} data 请求的参数
   * @returns
   */
  _init(methods, url, data) {
    this.methods = methods
    this.url = url
    this.searchParams = ''
    this.params = {}
    this.formData = new FormData()

    if (data !== undefined && !judgeObject(data))
      throw TypeError('data必修是json类型')

    // 处理参数 GET请求参数全部放在 params 中
    if (data) {
      if (this.methods.toUpperCase() === 'GET') {
        this.params = Reflect.get(data, 'params')
      } else {
        this.params = data
      }
    }

    // 处理GET请求 参数拼接url后面
    if (judgeObject(this.params)) {
      for (const key in this.params) {
        this.searchParams += `${key}=${this.params[key]}&`
      }

      if (this.searchParams.endsWith('&'))
        this.searchParams = this.searchParams.slice(0, -1)

      this.methods.toUpperCase() === 'GET' &&
        (this.url += `?${this.searchParams}`)
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(this.methods, this.url)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.upload.addEventListener('progress', e => {
        this.$emits('uploadProgress', e.loaded, e.total)
      })
      xhr.addEventListener('progress', e => {
        this.$emits('progress', e.loaded, e.total)
      })
      xhr.send(JSON.stringify(this.params))

      xhr.addEventListener('load', () => {
        try {
          resolve(JSON.parse(xhr.responseText))
        } catch (error) {
          resolve(xhr.responseText)
        }
      })
      xhr.addEventListener('error', () => {
        reject(xhr.responseText)
      })
    })
  }

  get(url, data) {
    return this._init('GET', url, data)
  }

  post(url, data) {
    return this._init('POST', url, data)
  }

  put(url, data) {
    return this._init('PUT', url, data)
  }

  delete(url, data) {
    return this._init('DELETE', url, data)
  }

  /**
   * 上传文件
   * @param {string} url API地址
   * @param {FormData} data 携带的数据
   * @param {number} maxCount 最大上传的文件个数
   * @returns
   */
  upload(url, data, maxCount) {
    if (!(data instanceof FormData)) throw `data 必须是 FormData 类型`
    if (!Array.from(data).length) throw '请选择要上传的文件！'

    maxCount && data.append('maxCount', maxCount)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', url)

      xhr.upload.addEventListener('progress', e => {
        this.$emits('uploadProgress', e.loaded, e.total)
      })

      xhr.send(data)

      xhr.addEventListener('load', () => {
        try {
          resolve(JSON.parse(xhr.responseText))
        } catch (error) {
          resolve(xhr.responseText)
        }
      })
      xhr.addEventListener('error', () => {
        reject(xhr.responseText)
      })
    })
  }

  /**
   * 上传进度
   * @param {(loaded, total) => void} callback 回调
   */
  onUploadProgress(callback) {
    this.$on('uploadProgress', callback)
  }
  /**
   * 下载进度
   * @param {(loaded, total) => void} callback 回调
   */
  onProgress(callback) {
    this.$on('progress', callback)
  }
}

/**
 * 检测是否为对象
 * @param {any} rest 检测的目标对象
 * @returns
 */
function judgeObject(res) {
  return !(typeof res !== 'object' || Array.isArray(res) || res === null)
}

const request = new Request()
