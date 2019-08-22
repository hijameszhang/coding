# Vue 开发技巧

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

## 5. 监听函数的生命周期函数
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

## 7. 作用域插槽
> 在 2.6.0 中，Vue为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除且仍在文档中的特性。新语法的由来可查阅这份 RFC。

### 简单示例
如何使用作用域插槽呢? 请先看如下示例:
``` html
<template>
  <List :items="items">
    <template slot-scope="{ filteredItems }">
      <p v-for="item in filteredItems" :key="item">{{ item }}</p>
    </template>
  </List>
</template>
```
使用`v-slot`, 可以直接在组件标签上写入该插槽的`scope`. 
``` html
<template>
  <List v-slot="{ filteredItems }" :items="items">
    <p v-for="item in filteredItems" :key="item">{{ item }}</p>
  </List>
</template>
```

::: tip
`v-slot`只能在组件或`template`标签上使用, 不能使用在普通原生的HTML标签上.
:::

这样使得代码可读性增强, 特别是在一些很难说明模板变量来源的场景中.

### v-slot 高级使用
`v-slot`指令还引入了一种方法来组合使用`slot`&`scoped-slot`, 但需要用":"来分隔.

``` html
<template>
  <Promised :promise="usersPromise">
    <p slot="pending">Loading...</p>

    <ul slot-scope="users">
      <li v-for="user in users">{{ user.name }}</li>
    </ul>

    <p slot="rejected" slot-scope="error">Error: {{ error.message }}</p>
  </Promised>
</template>
```
使用`v-slot`重写:
``` html
<template>
  <Promised :promise="usersPromise">
    <template v-slot:pending>
      <p>Loading...</p>
    </template>

    <template v-slot="users">
      <ul>
        <li v-for="user in users">{{ user.name }}</li>
      </ul>
    </template>

    <template v-slot:rejected="error">
      <p>Error: {{ error.message }}</p>
    </template>
  </Promised>
</template>
```

`v-slot`还可以简写为 `#` , 重写上面的例子:
``` html
<template>
  <Promised :promise="usersPromise">
    <template #pending>
      <p>Loading...</p>
    </template>

    <template #default="users">
      <ul>
        <li v-for="user in users">{{ user.name }}</li>
      </ul>
    </template>

    <template #rejected="error">
      <p>Error: {{ error.message }}</p>
    </template>
  </Promised>
</template>
```

::: tip
注意, `v-slot`的简写是 `#default`
:::


## 8. watch
虽然`Vue.js`为我们提供了有用的`computed`, 但在某些场景下, 仍然还是需要使用到`watch`.

::: tip
默认情况下, `watch`只在被监听的属性值发生变化时执行. 
:::

例如:
``` js
export default {
  data: () => ({
    dog: ""
  }),
  watch: {
    dog(newVal, oldVal) {
      console.log(`Dog changed: ${newVal}`);
    }
  }
};
```
如上代码所示, 只有当`dog`的值有发生改变时, `watch`中的`dog`函数才会执行.

但是, 在某些情况下, 你可能需要在创建组件后立即运行监听程序. 
当然, 你可以将逻辑迁移至`methods`中, 然后从`watch`和`created`钩子函数中分别调用它, 但有没有更简单一点的办法呢?

你可以在使用`watch`时, 使用`immediate: true`选项, 这样它就会在组件创建时立即执行.

``` js
export default {
  data: () => ({
    dog: ""
  }),
  watch: {
    dog: {
      handler(newVal, oldVal) {
        console.log(`Dog changed: ${newVal}`);
      },
      immediate: true
    }
  }
};
```

## 9. 图片懒加载

[v-lazy-image](https://github.com/alexjoverm/v-lazy-image)图片懒加载组件.

安装: 
`npm install v-lazy-image`

使用: 
``` js
// main.js
import Vue from "vue";
import { VLazyImagePlugin } from "v-lazy-image";

Vue.use(VLazyImagePlugin);
```

``` html
<template>
  <v-lazy-image src="http://lorempixel.com/400/200/" />
</template>
```
你也可以使用渐进式图像加载方式来加载图片, 通过设置`src-placeholder`先加载缩略图, 同时使用CSS应用自己的过滤效果.
``` html
<template>
  <v-lazy-image
    src="http://demo.com/demo.jpeg"
    src-placeholder="http://demo.com/min-demo.jpeg"
  />
</template>

<style scoped>
  .v-lazy-image {
    filter: blur(10px);
    transition: filter 0.7s;
  }
  .v-lazy-image-loaded {
    filter: blur(0);
  }
</style>
```
## 10. .sync 修饰符
> 2.3.0+ 新增

在有些情况下，我们可能需要对一个 `prop` 进行“双向绑定”。
不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。

这也是为什么我们推荐以 **update:myPropName** 的模式触发事件取而代之。

举个例子，在一个包含 `title`的 prop属性的组件中，我们可以用以下方法表达对其赋新值的意图：
``` js
this.$emit('update:title', newTitle)
```
然后父组件可以监听那个事件并根据需要更新一个本地的数据属性。例如：
``` html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```
为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：
``` html
<text-document v-bind:title.sync="doc.title"></text-document>
```
::: danger
带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用. 

例如: 
   v-bind:title.sync=”doc.title + ‘!’” 是无效的。
   
取而代之的是，你只能提供你想要绑定的属性名，类似 v-model。
:::

当我们用一个对象同时设置多个 `prop` 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用：
``` html
<text-document v-bind.sync="doc"></text-document>
```
这样会把 doc 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 **v-on** 监听器。

### 注意
将 **v-bind.sync** 用在一个字面量的对象上. 

例如: 
`v-bind.sync=”{ title: doc.title }”`，是无法正常工作的. 

因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

## 11. 调试 Vue template
在Vue开发过程中, 经常会遇到template模板渲染时JavaScript变量出错的问题, 此时也许你会通过`console.log`来进行调试. 例如:
``` html
<template>
  <h1>
    {{ log(message) }}
  </h1>
</template>
<script>
methods: {
  log(message) {
    console.log(message);
  }
}
</script>
```

每次调试模板渲染时, 都类似重复这样写, 可能会很无聊, 有没有更好的办法呢?

在`Vue.prototype`原型链上添加一个自定义的方法.
``` js
// main.js
Vue.prototype.$log = window.console.log;
```
至止, 我们可以在每个组件的模板中使用`$log`, 如果我们不想影响模板的渲染, 也可以:
``` html
<h1>
  {{ log(message) || message }}
</h1>
```
这样是不是很方便的调试模板了? 

那延展一下, 有没有办法增加一个断点, 以调试模板渲染时, 查看相关联的变量?
我们在使用模板时放入一个`debugger`. 
``` html
<h1>
  {{ debugger }}
</h1>
```
你会发现, 组件根本就没有编译模板. 有没有办法呢?

我们可以尝试在模板中添加一个自执行的函数, 例如:
``` html
<h1>
  {{ (function(){degugger;}) || message }}
</h1>
```

此时, 我们将可以看到断点定位到了模板的渲染函数中了.
![images.png](/coding/images/frontend/debugger1.png)

此时的`_vm`, 就是我们组件的实例对象.

检查编译的模板虽然很有意思, 但由于某些原因, 变量在被我们放在`debugger`后, 在chrome devtools的函数范围内变得不可用.

修改下写法:
``` html
<h1>
  {{ (function(){degugger; message}) || message }}
</h1>
```
此时, 你就可以随心所欲了.

![images.png](/coding/images/frontend/debugger2.png)


## 12. Vue组件局部样式
Vue中style标签的scoped属性表示它的样式只作用于当前模块，是**样式私有化**, 设计的初衷就是让样式变得不可修改. 

渲染的规则/原理：
* 给HTML的DOM节点添加一个 不重复的data属性 来表示 唯一性
* 在对应的 CSS选择器 末尾添加一个当前组件的 data属性选择器来私有化样式，如：.demo[data-v-2311c06a]{}
* 若组件内部包含其他组件，只会给其他组件的最外层标签加上当前组件的 data-v 属性

例如, 如下代码所示:
``` html
<template>
  <div class="demo">
    <span class="content">
      Vue.js scoped
    </span>
  </div>
</template>

<style lang="less" scoped>
  .demo{
    font-size: 14px;
    .content{
      color: red;
    }
  }
</style>

```

浏览器渲染后的代码：
``` html
<div data-v-fed36922>
  Vue.js scoped
</div>
<style type="text/css">
.demo[data-v-039c5b43] {
  font-size: 14px;
}
.demo .content[data-v-039c5b43] {
  color: red;
}
</style>
```

::: tip 注意
添加scoped属性后, 父组件无法修改子组件的样式. 
:::

## 13. Vue组件样式之 deep选择器
如上例中, 若想在父组件中修改子组件的样式, 怎么办呢? 

* 1.采用全局属性和局部属性混合的方式
* 2.每个组件在最外层添加一个唯一的class区分不同的组件
* 3.使用深层选择器deep

这里我们主要讲解使用`deep`修改子组件的样式. 将上例的代码修改为:
``` html
<template>
  <div class="demo">
    <span class="content">
      Vue.js scoped
    </span>
  </div>
</template>

<style lang="less" scoped>
  .demo{
    font-size: 14px;
  }
  .demo /deep/ .content{
    color: blue;
  }
</style>

```

最终style编译后的输出为:
``` html
<style type="text/css">
.demo[data-v-039c5b43] {
  font-size: 14px;
}
.demo[data-v-039c5b43] .content {
  color: blue;
}
</style>
```

从编译可以看出, 就是`.content`后有无添加CSS属性`data-v-xxx`的区别, 属性CSS选择器权重问题的同学, 对此应该立即明白了吧!


## 相关链接
* [Vue](https://cn.vuejs.org/v2/api/index.html#Vue-observable)
* [VueDose](https://vuedose.tips/tips/)
* [Posts About Vue.js](https://alligator.io/vuejs/)