import EventQueue from './utils/EventQueue'
import { isObject } from './utils/check'
import throwError from './utils/throwError'

const defaultConfig = {
  scrollX: false, // 禁用横向滚动
  scrollY: true, // 开始纵向滚动
  buffer: 0.3, // 超出最大距离的滚动减速比例，比例越小，减速越大
  animateDuration: 300 // 回弹的时长
}

// 支持的事件类型
type HandleType = 'start' | 'move' | 'end' | 'destroy' | 'animationEnd'

type ConfigType = typeof defaultConfig

class MyTouch<T> extends EventQueue<HandleType> {
  public el: string
  public config: ConfigType & T
  public dom!: HTMLElement | null
  public children!: HTMLElement | null
  public position = { x: 0, y: 0 }
  public maxScrollX: number = 0
  public maxScrollY: number = 0
  private __handleStart!: (e: TouchEvent) => void
  private __handleMove!: (e: TouchEvent) => void
  private __handleEnd!: (e: TouchEvent) => void
  private timer!: number | undefined

  constructor(el: string, config = {} as Partial<ConfigType> & T) {
    super()

    throwError(!isObject(config), 'config must be an object')

    this.el = el
    this.config = { ...defaultConfig, ...config }

    this._init()
  }

  private _init() {
    this.dom = document.querySelector(this.el)
    throwError(!this.dom, `${this.el} is not exist`)

    this.children = this.dom!.children[0] as HTMLElement
    throwError(!this.children, `${this.el} mush have one child!`)

    // 按下瞬间 所在的位置
    let startX = 0
    let startY = 0
    // 上次移动后的位置
    let startPosition = { x: 0, y: 0 }

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

    this.dom?.addEventListener('touchstart', this.__handleStart)
    this.dom?.addEventListener('touchmove', this.__handleMove)
    this.dom?.addEventListener('touchend', this.__handleEnd)
  }

  private _start() {
    this.children!.style.transition = ``
    clearTimeout(this.timer)

    super.$emit('start', this)
  }

  private _move() {
    let { x, y } = this.position
    const { scrollX, scrollY, buffer } = this.config

    if (x > 0) x *= buffer
    if (y > 0) y *= buffer

    if (this.children!.clientWidth > this.dom!.clientWidth) {
      this.maxScrollX = this.children!.clientWidth - this.dom!.clientWidth
    }
    if (this.children!.clientHeight > this.dom!.clientHeight) {
      this.maxScrollY = this.children!.clientHeight - this.dom!.clientHeight
    }

    if (y < -this.maxScrollY) {
      y = -this.maxScrollY + (y + this.maxScrollY) * buffer
    }
    if (x < -this.maxScrollX) {
      x = -this.maxScrollX + (x + this.maxScrollX) * buffer
    }

    if (scrollX && scrollY) {
      this.children!.style.transform = `translate(${x}px, ${y}px)`
    } else if (scrollX) {
      this.children!.style.transform = `translateX(${x}px)`
    } else if (scrollY) {
      this.children!.style.transform = `translateY(${y}px)`
    }

    super.$emit('move', this, x, y)
  }

  private _end() {
    const { animateDuration, scrollX, scrollY } = this.config
    let { x, y } = this.position

    if (x > 0) x = 0
    if (y > 0) y = 0
    if (x < -this.maxScrollX) x = -this.maxScrollX
    if (y < -this.maxScrollY) y = -this.maxScrollY

    this.children!.style.transition = `transform ${animateDuration}ms`
    if (scrollX && scrollY) {
      this.children!.style.transform = `translate(${x}px, ${y}px)`
    } else if (scrollX) {
      this.children!.style.transform = `translateX(${x}px)`
    } else if (scrollY) {
      this.children!.style.transform = `translateY(${y}px)`
    }

    this.timer = setTimeout(() => {
      this.children!.style.transition = ``
      super.$emit('animationEnd', this)
    }, animateDuration)

    this.position.x = x
    this.position.y = y

    super.$emit('end', this, x, y)
  }

  destroy() {
    this.children?.removeEventListener('touchstart', this.__handleStart)
    this.children?.removeEventListener('touchstart', this.__handleMove)
    this.children?.removeEventListener('touchstart', this.__handleEnd)

    super.$emit('destroy', this)
  }

  $on(type: HandleType, callback: (...rest: any) => any) {
    super.$on(type, callback)
  }
}

export default MyTouch
