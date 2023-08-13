import { throwWarn } from '../utils/index.js'
import { Components } from './Components.js'

const MyButtonType = {
  primary: 'my-button-primary',
  error: 'my-button-error',
}

export default class MyButton extends Components {
  constructor(el, methods) {
    super(el, methods)
    this._btnEl = el
    this.renderEl = null // 真实html元素

    this.render()
    return this.renderEl
  }

  /**
   * 生成真实html元素，并且根据自定义元素上的属性，设置该元素上 特有的 属性，比如 type
   */
  render() {
    // 真实的html元素
    this.renderEl = document.createElement('button')
    this.renderEl.classList.add('my-button')

    const attributeNames = this._btnEl.getAttributeNames()

    attributeNames.forEach(name => {
      const val = this._btnEl.getAttribute(name)
      if (name === 'type') {
        if (val in MyButtonType) {
          this.renderEl.classList.add(MyButtonType[val])
        } else {
          throwWarn(true, 'type类型不正确！')
        }
      }
    })

    super.render()
    this.renderEl.innerHTML = this._btnEl.innerHTML
  }
}
