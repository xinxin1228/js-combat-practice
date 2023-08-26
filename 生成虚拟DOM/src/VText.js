import VNode from './VNode'

export default class VText extends VNode {
  constructor(dom) {
    super(dom)

    this.type = 'text'
    this.props = {}
    this.children = dom.data.trim()
  }
}
