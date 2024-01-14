import { AxiosHeaders } from './AxiosHeaders'

export class AxiosError {
  constructor(message, code, config, xhr) {
    this.message = message
    this.config = config
    this.code = code
    this.request = xhr
    this.response = {
      data: xhr.responseText,
      headers: new AxiosHeaders(xhr.getAllResponseHeaders()),
      status: xhr.status,
      statusText: xhr.statusText,
      request: xhr
    }
    this.name = 'AxiosError'
    this.stack = new Error(message).stack
  }

  // 界面报错显示
  toString() {
    return this.message
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      stack: this.stack,
      code: this.code,
      config: this.config
    }
  }
}
