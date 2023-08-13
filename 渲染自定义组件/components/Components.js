import { throwError } from '../utils/index.js'

export class Components {
  constructor(el, methods) {
    this._el = el
    this._methods = methods
  }

  /**
   *  挂载自定义元素 默认事件 属性  到真实元素
   */
  render() {
    throwError(
      !(this.renderEl instanceof HTMLElement),
      '请先完成子类真实元素的创建！'
    )
    const attributeNames = this._el.getAttributeNames()

    attributeNames.forEach(name => {
      const val = this._el.getAttribute(name)
      if (name === 'class') {
        this.renderEl.classList.add(...val.split(' '))
      } else if (name.startsWith('on')) {
        this.renderEl.addEventListener(name.substr(2), this._methods[val])
      } else if (name === 'title') {
        this.renderEl.title = val
      }
    })

    // 设置公共默认的 比如title
    if (!attributeNames.includes('title')) {
      this.renderEl.title = this._el.innerText
    }
  }
}
