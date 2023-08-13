import { throwError, stringLowerCase } from './utils/index.js'
import * as Components from './components/index.js'

export class Render {
  constructor({ root, methods = {}, components = Components }) {
    this._root = this._getRoot(root)
    this._methods = this._getMethods(methods)
    this._components = components

    this.render()
  }

  _getRoot(root) {
    throwError(!root, '请传入要渲染的跟元素！')
    if (typeof root === 'string') {
      const domEl = document.querySelector(root)

      throwError(!domEl, `${root}元素不存在！`)
      return domEl
    } else if (root instanceof HTMLElement) {
      return root
    } else {
      throwError(true, '请传入正确的html元素或元素class名、id名!')
    }
  }

  _getMethods(methods) {
    throwError(!methods, '请传入正确的方法!')
    throwError(typeof methods !== 'object', 'methods类型为对象类型！')

    return methods
  }

  render() {
    const children = this._root.children
    const componentsLowerCase = Object.keys(this._components)

    for (const child of children) {
      // 筛选出所有自定义、并且 Components声明 的自定义元素
      const Com = componentsLowerCase.find(
        item => stringLowerCase(child) === stringLowerCase(item)
      )

      if (Com) {
        const MyCom = this._components[Com]

        const myCom = new MyCom(child, this._methods)
        child.replaceWith(myCom)
      }
    }
  }
}

// 加载样式
const linkEl = document.createElement('link')
linkEl.href = './components/style.css'
linkEl.rel = 'stylesheet'
document.head.append(linkEl)
