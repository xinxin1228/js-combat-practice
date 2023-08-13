import { throwWarn } from '../utils/index.js'
import { Components } from './Components.js'

const LevelType = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}

export default class MyTitle extends Components {
  constructor(el) {
    super(el)
    this._titleEl = el
    this.renderEl = null

    this.render()
    return this.renderEl
  }

  render() {
    const attributeNames = this._titleEl.getAttributeNames()
    this.renderEl = document.createElement('h1')
    this.renderEl.classList.add('my-title')
    attributeNames.forEach(name => {
      const val = this._titleEl.getAttribute(name)
      if (name === 'level') {
        if (val in LevelType) {
          this.renderEl = document.createElement(LevelType[val])
        } else {
          throwWarn(true, 'Level类型不正确')
        }
      }
    })

    super.render()
    this.renderEl.innerHTML = this._titleEl.innerHTML
  }
}
