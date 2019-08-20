# Vue 开发实战小技巧

## 1. 长列表性能优化
在2.x版本中`Vue`会通过`Object.defineProperty`对数据进行劫持, 以实现双向数据绑定. 
但在一些特定的业务场景, 组件只需要进行纯数据展示, 不会有任何变化, 此时我们可能不需要`Vue`对来数据进行劫持.
在大量数据需要进行呈现时, 如果禁止`Vue`对数据进行劫持, 会明显减少组件初始化的时间. 

::: tip
通过`Object.freeze`方法冻结对象, **对象一旦被冻结就不能再被修改了.**
:::

``` js
export default {
  data: () => ({
    userList: []
  }),
  async created() {
    const userList = await this.$service.get("/getuserList");
    this.userList = Object.freeze(userList);
  }
};
```

## 2. 数据状态共享: Vue.observable( object )
> 2.6.0 新增

* 参数：{Object} object
* 用法：让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：

``` js
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```

我们可以利用这个API来应对一些简单的跨组件数据状态共享的情况.

``` js
// miniStore.js

import Vue from "vue";
 
export const miniStore = Vue.observable({ count: 0 });
 
export const actions = {
  setCount(count) {
    miniStore.count = count;
  }
}

export const getters = {
  count: () => miniStore.count
}

```

``` html
// Demo.vue
<template>
  <div>
    <p>count:{{count}}</p>
    <button @click="add"> +1 </button>
    <button @click="sub"> -1 </button>
  </div>
</template>
 
<script>
import { actions, getters } from "./store";
export default {
  name: "App",
  computed: {
    count() {
      return getters.count;
    }
  },
  methods: {
    add: actions.setCount(this.count+1),
    sub: actions.setCount(this.count-1)
  }
};
</script>
 
```

## 3. 属性&事件传递
在写`Vue`组件时, 经常会遇到:
* 组件层层传递`props`或`listerers`
* 动态绑定`props`或`listerers`

有没有什么办法可以解决以上两种场景的问题呢?

::: tip 
`v-bind`和`v-on`, 可以实现解决上述问题
:::

代码示例如下:
``` html
<template>
  <Child v-bind="$props" v-on="$listeners"> </Child>
</template>
 
<script>
  import Child from "./Child";
  export default {
    props: {
      title: {
        required: true,
        type: String
      }
    }
    components: {
      Child
    }
  };
</script>
```

## 4. 监听函数的
有时, 需要在父组件监听子组件挂载后`mounted`, 做一些逻辑处理. 
例如:
  加载远端组件时, 想抓取组件从远端加载到挂载的耗时. 

此时, 就不能用常规的写法, 在每个子组件中去`this.$emit`事件了.
有没有办法, 只需要在父组件中监听各子组件的生命周期钩子函数呢?

::: tip 
`@hook`可以监听到子组件的生命周期钩子函数(`created`, `updated`等等). 
例如: `@hook:mounted="doSomething"`
::: 

``` html {3}
// Parent.vue
<template>
  <Child v-bind="$props" v-on="$listeners" @hook:mounted="doSomething"> </Child>
</template>
 
<script>
  import Child from "./Child";
  export default {
    props: {
      title: {
        required: true,
        type: String
      }
    }
    components: {
      Child
    },
    methods: {
      doSomething(){
        console.log("child component has mounted!");
      }
    }
  };
</script>
```

## 5. 函数式组件

::: tip
函数式组件, 无状态，无法实例化，内部没有任何生命周期处理方法，非常轻量，因而渲染性能高，特别适合用来只依赖外部数据传递而变化的组件。
:::

写法如下：
* 在template标签里面标明`functional`
* 只接受props值
* 不需要script标签

``` html
<!-- App.vue -->
<template>
  <div>
    <UserList :users="users" :click-handler="clickHandler.bind(this)"></UserList>
  </div>
</template>
 
<script>
import UserList from "./UserList";
 
export default {
  name: "App",
  data: () => {
    users: ['james', 'ian']
  }
  components: { UserList },
  methods: {
    clickHandler(name){
      console.log(`clicked: ${name}`);
    }    
  }
};
</script>
```

``` html
// UserList.vue
<template functional>
  <div>
    <p v-for="(name, idx) in props.users" @click="props.clickHandler(name)" :key="idx">
      {{ name }}
    </p>
  </div>
</template>
```


## 相关链接
* [Vue](https://cn.vuejs.org/v2/api/index.html#Vue-observable)
* [VueDose](https://vuedose.tips/tips/)
* [Posts About Vue.js](https://alligator.io/vuejs/)