import { isFunction, isString } from './check'
import throwError from './throwError'

class EventQueue<T> {
  protected queue: Map<T, Set<any>>

  constructor() {
    this.queue = new Map()
  }

  /**
   * 订阅事件
   * @param type 事件主题
   * @param callback 事件函数
   */
  $on(type: T, callback: (...rest: any) => any) {
    throwError(!isString(type), `${type} is not a string`)
    throwError(!isFunction(callback), `${callback} is not a function`)

    const queueInfo = this.queue.get(type) || new Set()

    queueInfo.add(callback)
    this.queue.set(type, queueInfo)
  }

  /**
   * 触发事件
   * @param type 事件主题
   * @param thisArg this绑定
   * @param args 参数
   */
  $emit(type: T, thisArg: this, ...args: any) {
    const queueInfo = this.queue.get(type)

    if (queueInfo) {
      queueInfo.forEach((callback) => {
        if (isFunction(callback)) {
          callback.apply(thisArg, args)
        }
      })
    }
  }
}

export default EventQueue
