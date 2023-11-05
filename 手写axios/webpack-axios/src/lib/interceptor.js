import { isFunction } from '../utils/check'
import throwError from '../utils/throwError'

class Interceptor {
  constructor() {
    this.list = []
  }

  use(resolve = () => {}, reject = () => {}) {
    throwError(!isFunction(resolve), 'resolve必须是函数')
    throwError(!isFunction(reject), 'reject必须是函数')

    this.list.push({ resolve, reject })
  }

  getAll() {
    return this.list
  }

  // async forEach(fn) {
  //   for (const callbacks of this.list) {
  //     await fn(callbacks)
  //   }
  // }
  forEach(fn) {
    this.list.forEach((callback) => fn(callback))
  }
}

export default Interceptor
