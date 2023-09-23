class EventQueue {
  constructor() {
    this.queue = new Map()
  }

  $emits(type, ...data) {
    if (!this.queue.has(type) || !this.queue.get(type)?.size) return

    Array.from(this.queue.get(type)).forEach(item => {
      if (typeof item === 'function') {
        item.apply(this, data)
      }
    })
  }

  $on(type, fn) {
    const typeInfo = this.queue.get(type) || new Set()
    typeInfo.add(fn)
    this.queue.set(type, typeInfo)
  }

  $remove(type, fn) {
    if (!this.queue.has(type)) return
    const typeInfo = this.queue.get(type)
    if (!typeInfo.has(fn)) return
    typeInfo.delete(fn)
    this.queue.set(type, typeInfo)
  }

  $clear() {
    this.queue.clear()
  }
}
