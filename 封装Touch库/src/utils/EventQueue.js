// 事件队列
import { throwError, throwWarn } from './throwConsole'

class EventQueue {
  constructor() {
    this.queue = {}
  }

  // 收集事件
  $on(type, callback) {
    throwWarn(!type, '请传入要监听的事件名')
    throwWarn(!callback, '请传入要监听的回调函数')
    throwError(typeof callback !== 'function', '第二个参数必须是一个函数')

    this.queue[type] ||= []
    this.queue[type].push(callback)
  }
  // 派发事件
  $emit(type, thisArg = this, ...rest) {
    throwWarn(!type, '请传入要派发的事件名')

    const callbacks = this.queue[type]
    if (!callbacks?.length) return
    callbacks.forEach((callback) => {
      if (typeof callback !== 'function') return

      callback.apply(thisArg, rest)
    })
  }
  // 移除事件监听
  $remove(type) {
    this.queue[type] = null
  }
}

export default EventQueue
