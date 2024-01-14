import { isFunction } from '../utils/check'

// 拦截器
export class InterceptorManager {
  constructor() {
    this.handlers = []
  }

  use(resolve, reject) {
    this.handlers.push({ resolve, reject })
  }

  getAll() {
    return this.handlers
  }

  forEach(callback) {
    this.handlers.forEach((...rest) => {
      if (callback && isFunction(callback)) {
        callback.apply(this, rest)
      }
    })
  }
}
