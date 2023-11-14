class Pubsub {
  private queue: Map<string, Set<string>>
  private uidList: Map<string, any>
  private uid: number

  constructor() {
    this.queue = new Map()
    this.uidList = new Map()
    this.uid = 0
  }

  /**
   * 订阅主题
   * @param topic 主题
   * @param cb 主题下的事件处理函数
   * @returns {string} uid 返回该主题的uid
   */
  subscribe(topic: string, cb: () => any): string {
    const topicInfo = this.queue.get(topic) || new Set()
    const uid = `uid_${this.uid}`

    topicInfo.add(uid)
    this.queue.set(topic, topicInfo)
    this.uidList.set(uid, {
      topic,
      cb
    })
    this.uid++

    return uid
  }

  /**
   * 发布主题
   * @param topic 主题
   * @param rest 参数
   * @returns {boolean} result 是否发布成功
   */
  publish(topic: string, ...rest: any[]): boolean {
    const topicInfo = this.queue.get(topic) // map
    if (!topicInfo) return false

    topicInfo.forEach((uid) => {
      const callback = this.uidList.get(uid)?.cb
      callback?.(topic, ...rest)
    })

    return true
  }

  /**
   * 查看当前类型下的所有订阅主题 （前置匹配） 不支持uid
   * @param topic 订阅主题的名称 比如 topic='x'时，可以查看到['x', 'xx', 'x1']
   */
  getSubscriptions(topic: string | string[]): string[] {
    const topicList: Array<string> = []

    if (Array.isArray(topic)) {
      topic.forEach((item) => {
        this.queue.forEach((_, key) => {
          if (key.startsWith(item)) {
            topicList.push(key)
          }
        })
      })
    } else {
      this.queue.forEach((_, key) => {
        if (key.startsWith(topic)) {
          topicList.push(key)
        }
      })
    }

    return topicList
  }

  /**
   * 取消订阅 支持通过uid和topic（主题名称前置匹配）来清除
   * 匹配顺序  topic > uid
   * 如果匹配到了前置匹配，那么优先清除前置匹配到，不清除uid
   * @param params 需要清除的uid | uid数组 | topic | topic数组
   * @param deep 针对topic,是否深度匹配，比如 topic为 'a'时，清除'a'和'a.*'的所有
   * @returns {string | boolean} 如果传入的是uid，则返回boolean,如果传入的是topic，则返回topic
   */
  unsubscribe(uid: string | string[]): string | boolean
  unsubscribe(topic: string | string[], deep: boolean): string | boolean
  unsubscribe(params: string | string[], deep = true) {
    // 是否匹配到前置匹配 如果匹配到之后 不再继续删除uid
    let isDelete = false

    if (Array.isArray(params)) {
      params.forEach((u) => {
        // topic
        this.queue.forEach((list, key) => {
          // deep ? 深度匹配 ：全等
          if (deep ? key.startsWith(u) : key === u) {
            list.forEach((uid) => {
              this.uidList.delete(uid)
            })
            this.queue.delete(key)
            isDelete = true
          }
        })

        if (isDelete) return true

        // uid
        const isHas = this.uidList.has(u)
        if (!isHas) return false

        const info = this.uidList.get(u)
        const queueInfo = this.queue.get(info.topic)
        if (!queueInfo || !queueInfo.size) return true

        queueInfo.delete(u)
        this.uidList.delete(u)
        this.queue.set(info.topic, queueInfo)
        !queueInfo.size && this.queue.delete(info.topic)

        return params
      })
    } else {
      // topic
      this.queue.forEach((uidList, key) => {
        // deep ? 深度匹配 ：全等
        if (deep ? key.startsWith(params) : key === params) {
          uidList.forEach((uid) => {
            this.uidList.delete(uid)
          })
          this.queue.delete(key)
          isDelete = true
        }
      })

      if (isDelete) return true

      // uid
      const isHas = this.uidList.has(params)
      if (!isHas) return false

      const info = this.uidList.get(params)
      const queueInfo = this.queue.get(info.topic)
      if (!queueInfo) return true

      queueInfo.delete(params)
      this.uidList.delete(params)
      this.queue.set(info.topic, queueInfo)
      !queueInfo.size && this.queue.delete(info.topic)

      return params
    }
  }

  // 清除所有的订阅
  clearAllSubscriptions(): void {
    this.queue.clear()
    this.uidList.clear()
    this.uid = 0
  }

  /**
   * 统计订阅 仅支持订阅名称（精准匹配）不支持uid
   * @param topic 订阅的名称
   */
  countSubscriptions(topic: string | string[]): number | object {
    if (Array.isArray(topic)) {
      const topicInfo = {} as any

      topic.forEach((m) => {
        topicInfo[m] = this.queue.get(m)?.size || 0
      })

      return topicInfo
    } else {
      return this.queue.get(topic)?.size || 0
    }
  }
}

const pubsub = new Pubsub()

export default pubsub
