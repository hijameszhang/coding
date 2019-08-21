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
## 2. Vue组件渲染性能分析
基于上面的案例(`长列表性能优化`), 可以通过`Object.freeze`来实现纯呈现的列表性能优化, 那如何来确认呢?

我们可以通过Chrome Devtools来检测. 但为了获得准确的性能分析数据, 我们需要开启Vue应用的性能模式. 

### 开启Vue性能模式(适用于开发模式)
在工程中的`main.js`中(Vue根实例初始化之前), 添加以下代码:
``` js
Vue.config.performance = true;
```
当然, 你也可以根据需要对当前环境进行判断, 来决定是否开启性能模式.
``` js
const isDev = process.env.NODE_ENV !== "production";
Vue.config.performance = isDev;
```
这样, 将会激活Vue在内部用于标记组件性能的 Timing API. 如下图所示:
![images.png](/coding/images/frontend/vue-performance1.png)

假设, 此时我们创建好了一个demo工程, 并有一个`Hello.vue`的组件, 用于验证长列表渲染性能问题. 运行本地工程后, 打开浏览器到指定路由(确认有加载`Hello.vue`组件). 打开控制台, 并点击"reload"按钮, 如下图所示:
![images.png](/coding/images/frontend/vue-performance2.png)

此时, 将会记录页面性能. 因为已经在main.js上添加了Vue.config.performance设置，此时你将能够在分析中看到时序部分. 如下图所示.
![images.png](/coding/images/frontend/vue-performance3.png)

此时, 你会发现这里有3个指标:
* init, 创建组件实例所花费的时间
* render, 创建vDOM结构所花费的时间
* patch, 将vDOM结构渲染成实际的DOM元素所花费的时间

### 验证性能
在此例中, http://localhost:8080/#/hello 路由下, 只有两个组件:
```
App.vue
  Hello.vue
```

`App.vue`是视图组件, 只有一个`<router-view/>`

`Hello.vue`只做一个简单的长列表(100000条件数据)展示, 代码如下:
``` html {19-22}
<template>
 <div>
   <span v-for="(item, idx) in users" :key="idx">
     {{item.name}}
   </span>
 </div>
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  },
  components: {

  },
  created () {
    let users = Array.from({ length: 100000 }, (item, index) => ({ name: index }))
    this.users = users
  }
}
</script>
```
此时, `Hello.vue`组件`render`&`patch`的时间为:
* render -> 924ms
* patch  -> 1440ms

![images.png](/coding/images/frontend/vue-performance4.png)

修改`Hello.vue`的`created`钩子函数中的代码如下:
``` js
created () {
  let users = Array.from({ length: 100000 }, (item, index) => ({ name: index }))
  this.users = Object.freeze(users)
}
```
再次点击"reload"按钮, 重新测试性能. 

![images.png](/coding/images/frontend/vue-performance5.png)

此时, `Hello.vue`组件`render`&`patch`的时间为:
* render -> 397ms (上一次测试结果为: 924ms, 节省时间: 527ms, 性能提供约为 57%)
* patch  -> 782ms (上一次测试结果为: 1440ms, 节省时间: 658ms, 性能提供约为: 45.7%)

这里仅测试了一次, 但从结果来看, 增加`Object.freeze`冻结后, 整体性能会有明显提升. 


## 3. 不使用Vuex创建Store(Vue.observable)
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

## 4. 属性&事件传递
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

## 5. 监听函数的
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

## 6. 函数式组件

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