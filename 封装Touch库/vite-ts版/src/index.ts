import MyTouch from './MyTouch'
import './assets/less/index.less'

// 案例一：实现上拉加载 下拉刷新
;(() => {
  const topEl: HTMLElement = document.querySelector('.top')!
  const bottomEl: HTMLElement = document.querySelector('.bottom')!

  let isReload = false
  let isLoad = false

  const touch1 = new MyTouch('.app', {
    name: 'we',
    age: 22, // 测试添加数据 校验ts交叉类型 touch1.age
    animateDuration: 500
    // scrollX: true

    // scrollX: true
  })

  touch1.$on('start', function () {
    topEl.style.transition = ''
    bottomEl.style.transition = ''
    topEl.innerText = ''
    bottomEl.innerText = ''
  })

  touch1.$on('move', function (x, y) {
    if (y > 0) {
      topEl.innerText = '下拉刷新'
      isReload = false
    }
    if (y > 70) {
      topEl.innerText = '松开刷新'
      isReload = true
    }
    if (y < -this.maxScrollY) {
      bottomEl.innerText = '下拉加载'
      isLoad = false
    }
    if (y < -this.maxScrollY - 70) {
      bottomEl.innerText = '松手加载'
      isLoad = true
    }

    topEl.style.height = `${y}px`
    bottomEl.style.height = `${-y - this.maxScrollY}px`
  })

  touch1.$on('end', function () {
    const { animateDuration } = this.config

    topEl.style.height = `0`
    bottomEl.style.height = `0`
    topEl.style.transition = `height ${animateDuration}ms`
    bottomEl.style.transition = `height ${animateDuration}ms`

    if (isReload) {
      console.log('刷新数据')
      isReload = false
    }
    if (isLoad) {
      console.log('加载数据')
      isLoad = false
    }

    setTimeout(() => {
      topEl.innerText = ''
      bottomEl.innerText = ''
    }, animateDuration)
  })
})()

// 案例二：实现轮播图
;(() => {
  const touch2 = new MyTouch('.swiper', {
    scrollX: true,
    scrollY: false
  })

  touch2.$on('end', function (x) {
    const clientWidth = document.documentElement.clientWidth

    this.position.x = Math.round(x / clientWidth) * clientWidth
    this.children.style.transform = `translateX(${this.position.x}px)`
  })
})()
