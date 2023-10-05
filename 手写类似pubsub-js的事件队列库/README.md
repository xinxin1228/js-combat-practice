### 需求描述：

事件队列的作用和用途在这里不再赘述，本案例的目标是在于手写一个类似于`pubsub-js`这样的事件队列库，实现该库中的以下方法：

- `subscribe` 订阅
- `publish` 发布
- `unsubscribe`取消订阅
- `clearAllSubscriptions` 清除所有的订阅
- `getSubscriptions` 获取订阅
- `countSubscriptions` 统计订阅
- 错误处理

实现事件队列库后，分别在`vue`、`react`中引用该库，实现**兄弟组件通信**和**跨级组件通信**，组件之间的关系架构图如下：

![组件关系架构图](/Users/huangjianxin/工作台/云笔记/docs/image/前端笔记/27.png)

要求如下：

- `App`是根组件，在`App`组件中，引入`子组件1`和`子组件2`。
- 在`App`组件中，包含了数据 `count`、`mes`以及方法`addCount`。其中`count`数据类型为`Number`，通过`addCount`方法可以改变`count`的值。
- 在`子组件1`中，包含了自身的数据`a`、`b`以及方法`addA`和`addB`，分别用来改变`a`和`b`的值。并且引用了`App`中的数据`a`和方法`addCount`。
- 在`子组件2`中，要求可以通过点击按钮调用子组件1的`addA`和`addB`方法。并且在`子组件2`中，引入`子组件3`。
- 在`子组件3`中，要求可以通过点击按钮调用子组件1的`addA`和`addB`方法。

### 所用的知识

- vue
- react
- typescript

### 效果展示

![pubsub使用场景演示](../images/06.gif)

### 项目运行

```shell
# 安装依赖
pnpm i

# 运行
pnpm dev

# 运行成功之后 在浏览器打开 http://localhost:5300
```

