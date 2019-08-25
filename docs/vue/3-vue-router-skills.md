# vue-router 开发技巧
## 1. 路由懒加载
有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

``` js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

## 2. keep-alive 缓存

[keep-alive](https://cn.vuejs.org/v2/api/#keep-alive)是`Vue`官方提供一种缓存组件的方案, 其介绍为:
``` 
`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
```

### 在keep-alive组件的 activated & deactivated 钩子函数
keep-alive组件与一个vue组件是有区别的，除了正常vue组件提供的生命周期之外，其额外新增了2个跟keep-alive相关的钩子函数：
* activated： 缓存的组件再次进入时会触发
* deactivated： 缓存的组件离开时会触发

既然keep-alive组件提供了这么多生命周期函数钩子，那么这些钩子函数具体的执行顺序是怎样的呢？

第一次进入keep-alive组件时，其生命周期执行顺序：
```
beforeRouteEnter --> created --> mounted --> activated --> deactivated
```
非首次进入时，其生命周期执行顺序：
```
beforeRouteEnter --> activated --> deactivated
```

::: tip 现数据更新逻辑
基于以上原理, 可考虑在 activated 钩子函数中实现数据更新逻辑
:::

### max
> 2.5.0 新增

最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。
``` html
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

## 相关链接
[vue-router](https://cn.vuejs.org/v2/api)