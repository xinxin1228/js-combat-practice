# 渲染自定义组件

## 需求描述

- 在`html`模版里直接编写**自定义、非`html`**的标签元素，并且支持多种写法。

  比如`<my-title></my-title>`、`<my-button></my-button>`或`<MyTitle></MyTitle>`、`<MyButton></MyButton>`

- 不影响正常的`html标签元素`的展示

- 能绑定事件，可以处理自定义标签特有的属性，并且支持在自定义标签上写`class`

  `<my-title level='1'></my-title>`中，`level`代表自定义元素的等级，比如默认为`h1`，根绝`level`的值自动生成`h1~h6`之间的标签元素

  `<my-button type='primary' onClick='handleClick'></my-button>`中，`type`指定按钮的状态类型，比如`primary`、`error`等，`onClick`代表给该自定义元素绑定的事件类型

## 准备工作

自定义标签`html`代码

```html
<div id="app">
  <h1>我是标准的h1标签</h1>
  <my-button onclick="handleClick" class="submit xx my-button" type="primary">
    我是my-button按钮
  </my-button>
  <my-title class="blue">我是my-title</my-title>
  <MyButton onclick="handleClick2" type="error">
    支持多种写法 以及事件绑定
  </MyButton>
  <MyTitle level="3">支持h1～h6的多种标签，默认为h1 </MyTitle>
</div>
```

## 效果展示

渲染自定义标签之前的页面样式和控制台的中`html`结构

### 渲染之前

![渲染之前](../images/01.jpg)

### 渲染之后

![渲染之后](../images/02.jpg)

## 步骤详情

### 一、需要编写的类之间的关系

在练习中，我们需要将`<my-title>`或`<MyTitle>`替换为`<h1> ~ <h6>`标签，将`<my-button>`或`<MyButton>`替换为`<button>`，因此我们需要创建两个对应的类`MyTitle`和`MyButton`。

但是这两个类中有很多相同的步骤，比如将元素的属性添加到真实的`DOM`上，因此我们需要编写一个公共的父类`Components`。

```js
class Components {}

class MyButton extends Components {}
class MyTitle extends Components {}
```

### 二、编写`Render`类

接下来我们来编写入口函数，我们可以借鉴`Vue`的写法。

```js
new Render({
  root: '#app',
  methods: {
    handleClick() {
      console.log('按钮点击了')
    },
    handleClick2() {
      alert('按钮点击了')
    },
  },
})
```

好，我们就以此为准来封装`Render`类，它参数只有一个，接受一个`opthions`参数对象，分别是：

- `root`: 挂载元素的根结点
- `methods`：注入到组件中的函数

首先，我们先获取元素

```js
class Render {
  constructor({ root, methods }) {
    this._root = this._getRoot(root)
    this._methods = this._getMethods(methods)

    this.render()
  }
  
  _getRoot(root) {
    if (typeof root === 'string') {
     	const dom = document.querySelector(root)
      
      if (!dom) throw new Error(`${root} is not exist`)
      return dom
    } else if (root instanceof HTMLElement) {
      return root
    } else {
      throw new Error('请传入正确的html元素或元素class名、id名!')
    }
  }
  
  _getMethods(methods) {
    if(typeof methods !== 'object',) throw new Error('methods类型为对象类型！')

    return methods
  }
}
```

### 三、编写`Components`类

```js
class Components {
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
		
    // 遍历所有的attr
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
```

### 四、编写渲染组件类

`MyTitle.js`

```js
// 标题对应的等级
const LevelType = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}

class MyTitle extends Components {
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
    
    // 挂载 my-title都有的属性
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
```

`MyButton.js`

```js
class MyButton extends Components {
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
```
