import VNode from './VNode'
import VText from './VText'

export default class VElement extends VNode {
  constructor(dom) {
    super(dom)

    this.type = dom.tagName.toLowerCase()
    this.props = {}
    this.children = []

    // 获取props
    Array.from(dom.attributes).forEach(({ name, value }) => {
      this.props[name] = value
    })

    // 获取子节点
    Array.from(dom.childNodes).forEach((node) => {
      // 元素节点
      if (node.nodeType === Node.ELEMENT_NODE) {
        this.children.push(new VElement(node))
      }
      // 文本节点
      else if (node.nodeType === Node.TEXT_NODE) {
        if (node.data.trim()) {
          this.children.push(new VText(node))
        }
      }
    })
  }
}
