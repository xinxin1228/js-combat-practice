import { isObject, isString } from '../utils/check'

export class AxiosHeaders {
  constructor(headers) {
    if (isString(headers)) {
      this.disposeText(headers)
    } else if (isObject(headers)) {
      this.disposeJSON(headers)
    }
  }

  // 处理文本类型
  disposeText(headersText) {
    headersText
      .split('\r\n')
      .filter(Boolean)
      .forEach(item => {
        const [key, value] = item.split(': ')
        this[key] = value
      })
  }

  // 处理JSON类型
  disposeJSON(headers) {
    for (const key in headers) {
      this[key] = headers[key]
    }
  }
}
