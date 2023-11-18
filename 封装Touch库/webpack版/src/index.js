import './assets/less/index.less'
import MyTouch from './MyTouch'

// 上拉加载 下拉刷新
const touch = new MyTouch('.touch-shell')
const topEl = document.querySelector('.top')
const bottomEl = document.querySelector('.bottom')
let isReload = false
let isLoad = false

const reloadData = () => {
  console.log('刷新数据')
}
const loadData = () => {
  console.log('加载数据')
}

touch.$on('move', function (x, y) {
  if (y > 0) {
    topEl.style.height = `${y}px`
    topEl.textContent = '继续下拉'
  }
  if (y > 150) {
    topEl.textContent = '松手刷新'
    isReload = true
  }

  if (y < this.maxScrollY) {
    bottomEl.style.height = `${this.maxScrollY - y}px`
    bottomEl.textContent = '继续上拉'
  }
  if (y < this.maxScrollY - 150) {
    bottomEl.textContent = '松手刷新'
    isLoad = true
  }
})
touch.$on('end', function () {
  const { animateDuration } = this.options

  topEl.style.height = 0
  bottomEl.style.height = 0
  topEl.style.transition = `height ${animateDuration}ms`
  bottomEl.style.transition = `height ${animateDuration}ms`

  if (isReload) {
    reloadData()
    isReload = false
  }
  if (isLoad) {
    loadData()
    isLoad = false
  }

  setTimeout(() => {
    topEl.style.transition = ``
    bottomEl.style.transition = ``
  }, animateDuration)
})

// 横向轮博
const touch2 = new MyTouch('.banner', {
  scrollX: true,
  scrollY: false
})

touch2.$on('end', function (x) {
  const num = Math.round(x / 600)
  this.position.x = num * 600
  this.container.style.transform = `translateX(${this.position.x}px)`
})
