class Request extends EventQueue {
  constructor() {
    super()

    this._init.get = this.get.bind(this)
    this._init.post = this.post.bind(this)
    this._init.put = this.put.bind(this)
    this._init.delete = this.delete.bind(this)
    this._init.upload = this.upload.bind(this)
    this._init.onProgress = this.onProgress.bind(this)
    this.controller = new AbortController()
    this.signal = this.controller.signal
    this._init.onAbort = this.onAbort.bind(this)

    return this._init
  }

  _init(methods, url, data) {
    this.methods = methods
    this.url = url
    this.data = data
    this.searchParams = ''

    if (data) {
      if (this.methods.toUpperCase() === 'GET') {
        this.params = Reflect.get(data, 'params')
      } else {
        this.params = data
      }
    }

    if (judgeObject(this.params)) {
      for (const key in this.params) {
        this.searchParams += `${key}=${this.params[key]}&`
      }

      if (this.searchParams.endsWith('&'))
        this.searchParams = this.searchParams.slice(0, -1)

      this.methods.toUpperCase() === 'GET' &&
        (this.url += `?${this.searchParams}`)
    }

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(this.url, {
          method: this.methods,
          headers: {
            'Content-Type': 'application/json',
          },
          signal: this.signal,
          body:
            this.methods.toUpperCase() === 'GET'
              ? undefined
              : JSON.stringify(this.params),
        })

        const reader = res.body.getReader()
        // 获得总长度（length）
        const contentLength = +res.headers.get('Content-Length')
        // 读取数据
        let receivedLength = 0 // 当前接收到了这么多字节
        let chunks = [] // 接收到的二进制块的数组（包括 body）
        while (true) {
          const { done, value } = await reader.read()

          if (done) break

          chunks.push(value)
          receivedLength += value.length

          this.$emits('fetch-progress', receivedLength, contentLength)
        }

        // 将块连接到单个 Uint8Array
        let chunksAll = new Uint8Array(receivedLength)
        let position = 0
        for (let chunk of chunks) {
          chunksAll.set(chunk, position)
          position += chunk.length
        }

        // 解码成字符串
        let result = new TextDecoder('utf-8').decode(chunksAll)
        let data = JSON.parse(result)

        resolve(data)
      } catch (error) {
        reject(error)
      }
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
  upload(url, data, maxCount) {
    if (!(data instanceof FormData)) throw `data 必须是 FormData 类型`
    if (!Array.from(data).length) throw '请选择要上传的文件！'

    data.append('maxCount', maxCount)
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(url, {
          method: 'POST',
          body: data,
          signal: this.signal,
        })
        const json = await res.json()
        resolve(json)
      } catch (error) {
        reject(error)
      }
    })
  }
  // 请求进度
  onProgress(callback) {
    this.$on('fetch-progress', callback)
  }
  // 取消请求
  onAbort() {
    this.controller.abort?.()
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
