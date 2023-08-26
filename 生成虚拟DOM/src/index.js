import VElement from './VElement'

const getEl = (el) => {
  if (typeof el === 'string') {
    const dom = document.querySelector(el)
    if (!dom) throw '传入正确的el元素'
    return dom
  } else if (el instanceof HTMLElement) {
    return el
  } else {
    throw '传入正确的el元素'
  }
}

class VDom {
  constructor(el) {
    this._el = getEl(el)

    return new VElement(this._el)
  }
}

const vdom = new VDom('#app')
console.log('🚀  ~ file: index.js:22 ~ vdom:', vdom)
