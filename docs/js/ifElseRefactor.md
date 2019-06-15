# 优雅的处理if/else
[[toc]]

## 背景
日常开发经常会遇到复杂的条件判断, 一般做法就是用`if`/`else`, 或者优雅一点用`switch`来实现多个条件的判断. 如果条件越来越多, 会导致代码越来越臃肿, 如何使用更优雅的方式来实现呢?

## 案例
先来看一段代码:
```js
const clickHandler = (status) => {
  if(status === 1) {
    sendLog('processing')
    jumpTo('IndexPage')
  } else if(status === 2) {
    sendLog('fail')
    jumpTo('FailPage')
  } else if(status === 3) {
    sendLog('fail')
    jumpTo('FailPage')
  } else if(status === 4) {
    sendLog('success')
    jumpTo('SuccessPage')
  } else if(status === 5) {
    sendLog('cancel')
    jumpTo('CancelPage')
  } else {
    sendLog('other')
    jumpTo('Index')
  }
}
```
## 优化1
通过以上代码, 可以看出该函数的作用是: 根据status状态的不同, 发送日志和跳转到对应的页面.
大家可以轻易的使用`switch`来进行重构:
```javascript
const clickHandler = (status) => {
  switch (status) {
    case 1:
      sendLog('processing')
      jumpTo('IndexPage')
      break
    case 2:
    case 3:
      sendLog('fail')
      jumpTo('FailPage')
      break
    case 4:
      sendLog('success')
      jumpTo('SuccessPage')
      break
    case 5:
      sendLog('cancel')
      jumpTo('CancelPage')
      break
    default:
      sendLog('other')
      jumpTo('Index')
  }
}
```
这样看起来比`if / else`清晰多了. 细心的你一定会发现`case2`, `case3`的逻辑是一样的, 

## 优化2

在日常的代码开发中, 基本上大多数同学都是这样写. 这样写固然可以, 但也不太优雅. 
::: tip 编程的本质(个人观点)
`数据结构` + `算法`, 任何算法都包含两部分, `Logic` + `Control`**
* Logic部分就是真正意义上的算法
* Control部分只是影响解决问题的效率. 
:::

如果我们能将 `Logic` 和 `Control`部分有效地分开, 那么代码将会变得更加容易维护和改进.

比如, 我们试着用下面的办法去分离代码:
```javascript
const actions = {
  '1': ['processing', 'IndexPage'],
  '2': ['fail', 'FailPage'],
  '3': ['fail', 'FailPage'],
  '4': ['success', 'SuccessPage'],
  '5': ['cancel', 'CancelPage'],
  'default': ['other', 'Index']
}
const clickHandler = (status) => {
  let action = actions[status] || actions['default'], 
    LogName = action[0],
    pageName = action[1]
  sendLog(LogName)
  jumpTo(pageName)
}
```
这样的形式, 其实就是DSL(Domain Specific Language)解析器. DSL的描述是一个`Logic`, 函数`clickHandler`就是`Control`部分, 代码大大简化, 
## 小结
由此可以总结出如下思想:
* State Machine
  * 状态定义
  * 状态变迁条件
  * 状态的action
* DSL - Domain Specific Language
  * HTML,  SQL, 正则表达式......
* 编程范式
  * 面向对象:  委托, 桥接, 修饰, MVC.......
  * 函数式编程: 修饰, 管道, 拼接
  * 逻辑推导式编程

## 优化3
继续优化. 看看是不是还有其他写法?答案是, 有的
```javascript
const actions = new Map([
  ['1', ['processing', 'IndexPage']],
  ['2', ['fail', 'FailPage']],
  ['3', ['fail', 'FailPage']],
  ['4', ['success', 'SuccessPage']],
  ['5', ['cancel', 'CancelPage']],
  ['default', ['other', 'Index']]
])

const clickHandler = (status) => {
  let action = actions.get(status) || actions.get('default')
  sendLog(action[0])
  jumpTo(action[1])
}
```
## 新需求1
有新的需求过来, 原先只是判断status的状态, 现在还需要判断用户的身份.
```javascript
const clickHandler = (status, identity) => {
  if(identity == 'guest') {
    if(status === 1) {
      // to do something
    } else if (status === 2) {
      // to do something
    } else if (status === 3) {
      // to do something
    } else if (status === 4) {
      // to do something
    } else if (status === 5) {
      // to do something
    } else {
      // to do something
    }
  } else if(identity == 'master') {
    if(status === 1) {
      // to do something
    } else if (status === 2) {
      // to do something
    } else if (status === 3) {
      // to do something
    } else if (status === 4) {
      // to do something
    } else if (status === 5) {
      // to do something
    } else {
      // to do something
    }
  }
}
```
又用了`if / else`来解决问题(里面的逻辑就没有写了, 因为代码太长了). 但当有两个层级的判断条件时, 如果还是用`if / else`, 代码量会加倍. 此时, 我们该如何写更优雅呢?
```javascript
const actions = {new Map([
  ['guest_1', () => {/* to do something */}],
  ['guest_2', () => {/* to do something */}],
  ['guest_3', () => {/* to do something */}],
  ['guest_4', () => {/* to do something */}],
  ['guest_5', () => {/* to do something */}],
  ['master_1', () => {/* to do something */}],
  ['master_2', () => {/* to do something */}],
  ['master_3', () => {/* to do something */}],
  ['master_4', () => {/* to do something */}],
  ['master_5', () => {/* to do something */}],
  ['default', () => {/* to do something */}],
])}
```
上述代码的逻辑是: 
* 把两个条件拼接成字符串
* 以拼接的条件字符串作为`key`, 以处理函数作为值的`Map`对象进行查找并执行

当然, 也可以用`Object`对象来实现(这也是大家常用的)
```javascript
const actions = {
  'guest_1': () => {/* to do something */},
  'guest_2': () => {/* to do something */},
  'guest_3': () => {/* to do something */},
  'guest_4': () => {/* to do something */},
  'guest_5': () => {/* to do something */},
  'master_1': () => {/* to do something */},
  'master_2': () => {/* to do something */},
  'master_3': () => {/* to do something */},
  'master_4': () => {/* to do something */},
  'master_5': () => {/* to do something */},
  'default': () => {/* to do something */}
}
```
可能有些同学会觉得把查询条件拼接成字符串会不太优雅, 还有一种方案, 就是用`Map`对象, 以`Object`对象作为`Key`:
```javascript
const actions = new Map([
  [{identity: 'guest', status: 1}, () => {/* to do something */}],
  [{identity: 'guest', status: 2}, () => {/* to do something */}]
  [{identity: 'guest', status: 3}, () => {/* to do something */}]
])

const clickHandler = (identity, status) {
  let action = [...actions].filter((key, value) => {key.identity === identity && key.status === status})
  action.forEach(([key, value]) => {value.call(this)})
}
```
这样会不会更优雅一点.

> `Map`与`Object`的区别: `Map`可以用任何类型的数据作为`key`

## 新需求2
假如在`guest`情况下, status 1~4 的处理逻辑是一样的, 最差的情况是:
```javascript
functionA(){
  // to do something
}
functionB(){
  // to do something
}
const actions = new Map([
  [{identity: 'guest', status: 1}, functionA],
  [{identity: 'guest', status: 2}, functionA],
  [{identity: 'guest', status: 3}, functionA],
  [{identity: 'guest', status: 4}, functionA],
  [{identity: 'guest', status: 5}, functionB],
])

const clickHandler = (identity, status) {
  let action = [...actions].filter((key, value) => {key.identity === identity && key.status === status})
  action.forEach(([key, value]) => {value.call(this)})
}
```
这样写, 基本也满足需求了, 但重复的写4次`functionA`, 还是觉得有点不舒服(不过现在能够满足需求了, 好像也没什么关系了). 但如果`identity`的状态有3种, `status`的状态有30种呢? 难道......

如果是此种情况, 也可以考虑用正则表达式, 如:
```javascript
functionA(){
  // to do something
}
functionB(){
  // to do something
}
const actions = new Map([
  [/^guest_[1-4]$/, functionA],
  [/^guest_5$/, functionA],
])

const clickHandler = (identity, status) {
  let action = [...actions].filter((key, value) => {key.test(`${identity}_${status}`)})
  action.forEach(([key, value]) => {value.call(this)})
}
```
用`Map`的优势就很明显了, 可以用正则表达式类型作为`key`, 这样就可以满足更多的需求了. 
假如需求变成, 凡是`guest`的情况, 都要发送一个日志埋码, 不同的`status`的情况, 也要单独做处理. 那么我们可以考虑这样写:
```javascript
functionA(){
  // to do something
}
functionB(){
  // to do something
}
functionC(){
  // to do something
}
const actions = new Map([
  [/^guest_[1-4]$/, functionA],
  [/^guest_5$/, functionA],
  [/^guest_.$/, functionC],
])

const clickHandler = (identity, status) {
  let action = [...actions].filter((key, value) => {key.test(`${identity}_${status}`)})
  action.forEach(([key, value]) => {value.call(this)})
}
```
**利用数组循环的特性, 符合正则表达式条件的逻辑都会执行. 这样就可以同时执行公共逻辑和单独逻辑**

## 总结
本文核心讲逻辑(Logic)和控制(Control)如何分离, 如果将所有的程序能够很好的分离, 那么代码的可维护性将会大大提高. 代码除了要运行, 可读性也是很重要的!

 
