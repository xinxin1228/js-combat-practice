import { throwError, throwWarn } from './utils/throwConsole'
import EventQueue from './utils/EventQueue'

const getEl = (el) => {
  throwError(!el, '请传入要绑定的元素或元素名称')

  if (typeof el === 'string') {
    const domEl = document.querySelector(el)
    throwError(!domEl, `${el} 元素不存在`)

    return domEl
  } else if (el instanceof HTMLElement) {
    return el
  } else {
    throwError(true, `不是合法的元素或找不到 ${el} 元素`)
  }
}

// 默认配置
const defaultOptions = {
  scrollX: false, // 禁用横向滚动
  scrollY: true, // 开始纵向滚动
  buffer: 0.3, // 超出最大距离的滚动减速比例，比例越小，减速越大
  animateDuration: 300 // 回弹的时长
}

class MyTouch extends EventQueue {
  constructor(el, options = {}) {
    super()
    this.el = getEl(el)
    throwError(!this.el.children[0], `${el} 里面必须有一个子元素`)

    // 实际滚动元素
    this.container = this.el.children[0]
    // 当前元素滚动距离
    this.position = { x: 0, y: 0 }
    // 配置
    this.options = { ...defaultOptions, ...options }
    // 当前元素可滚动的最大距离
    this.maxScrollX = 0
    this.macScrollY = 0

    // 支持的外部监听事件列表
    this.queueList = {
      Start: 'start',
      Move: 'move',
      End: 'end'
    }

    this._init()
  }

  // 初始化事件
  _init() {
    // 按下瞬间 所在的位置
    let startX = 0
    let startY = 0
    let startPosition

    this.__handleStart = (e) => {
      e.preventDefault()
      e.stopPropagation()

      startX = e.targetTouches[0].clientX
      startY = e.targetTouches[0].clientY
      startPosition = { ...this.position }

      this._start()
    }
    this.__handleMove = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const moveX = e.targetTouches[0].clientX - startX + startPosition.x
      const moveY = e.targetTouches[0].clientY - startY + startPosition.y

      this.position.x = moveX
      this.position.y = moveY

      this._move()
    }
    this.__handleEnd = () => {
      this._end()
    }

    this.el.addEventListener('touchstart', this.__handleStart, false)
    this.el.addEventListener('touchmove', this.__handleMove, false)
    this.el.addEventListener('touchend', this.__handleEnd, false)
  }
  // 销毁事件
  destroy() {
    this.el.removeEventListener('touchstart', this.__handleStart, false)
    this.el.removeEventListener('touchmove', this.__handleMove, false)
    this.el.removeEventListener('touchend', this.__handleEnd, false)
  }

  // 进一步抽取各级事件
  _start() {
    super.$emit(this.queueList.Start, this)
  }
  _move() {
    let { x, y } = this.position
    const { scrollX, scrollY, buffer } = this.options

    if (y > 0) y *= buffer
    if (x > 0) x *= buffer

    if (this.container.clientHeight > this.el.clientHeight) {
      this.maxScrollY = this.el.clientHeight - this.container.clientHeight
    }
    if (this.container.clientWidth > this.el.clientWidth) {
      this.maxScrollX = this.el.clientWidth - this.container.clientWidth
    }

    if (y < this.maxScrollY)
      y = (y - this.maxScrollY) * buffer + this.maxScrollY
    if (x < this.maxScrollX)
      x = (x - this.maxScrollX) * buffer + this.maxScrollX

    if (scrollX && scrollY) {
      this.container.style.transform = `translate(${x}px, ${y}px)`
    } else if (scrollX) {
      this.container.style.transform = `translateX(${x}px)`
    } else if (scrollY) {
      this.container.style.transform = `translateY(${y}px)`
    }

    super.$emit(this.queueList.Move, this, x, y)
  }
  _end() {
    let { x, y } = this.position
    const { animateDuration, scrollX, scrollY } = this.options

    if (x > 0) x = 0
    if (y > 0) y = 0
    if (x < this.maxScrollX) x = this.maxScrollX
    if (y < this.maxScrollY) y = this.maxScrollY

    this.position.x = x
    this.position.y = y
    this.container.style.transition = `transform ${animateDuration}ms`
    if (scrollX && scrollY) {
      this.container.style.transform = `translate(${x}px, ${y}px)`
    } else if (scrollX) {
      this.container.style.transform = `translateX(${x}px)`
    } else if (scrollY) {
      this.container.style.transform = `translateY(${y}px)`
    }

    setTimeout(() => {
      this.container.style.transition = ''
    }, animateDuration)

    super.$emit(this.queueList.End, this, x, y)
  }

  // 监听事件
  $on(type, callback) {
    throwWarn(!Object.values(this.queueList).includes(type), '未知的事件')

    super.$on(type, callback)
  }
}

export default MyTouch
