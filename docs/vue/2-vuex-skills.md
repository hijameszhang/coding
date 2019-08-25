# Vuex 开发技巧

## 1. Vuex 严格模式
开启严格模式，仅需在创建 store 的时候传入 strict: true：
``` js
const store = new Vuex.Store({
  // ...
  strict: true
})
```
::: tip 注意
在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
这能保证所有的状态变更都能被调试工具跟踪到。
:::

### 开发环境与发布环境
::: danger
不要在发布环境下启用严格模式！

严格模式会深度监测状态树来检测不合规的状态变更. 

请确保在发布环境下关闭严格模式，以避免性能损失!
:::

类似于插件，我们可以让构建工具来处理这种情况：
``` js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```

## 2. 使用Vuex进行表单处理

当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 v-model 会比较棘手：
``` html
<input v-model="obj.message">
```
假设这里的 `obj` 是在计算属性中返回的一个属于 `Vuex store` 的对象. 
在用户输入时，`v-model` 会试图直接修改 `obj.message`。
> 因为 `obj`是一个对象, 存在引用关系, 因此可以直接修改`obj.message`, 但不会触发到Vuex的mutation

在严格模式中，由于这个修改不是在 `mutation` 函数中执行的, 这里会抛出一个错误。

### 用“Vuex 的思维”去解决这个问题
给 `<input>` 中绑定 `value`，然后侦听 `input` 或者 `change` 事件，在事件回调中调用 `action`:

``` html
<input :value="message" @input="updateMessage">
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```
下面是 mutation 函数：
``` js
// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```

> 若如果这样实现, 的确会显得有点麻烦.

### 双向绑定的计算属性

必须承认，这样做比简单地使用`v-model + 局部状态`要啰嗦得多，并且也损失了一些 `v-model` 中很有用的特性。

另一个方法是使用带有 `setter` 的双向绑定计算属性：
``` html
<input v-model="message">
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```
这也是目前比较好的实现方式了.

## 3. Vuex插件

`Vuex` 的 `store` 接受 `plugins` 选项. 
这个选项暴露出每次 `mutation` 的钩子。

`Vuex` 插件就是一个函数，它接收 `store` 作为唯一参数：
``` js
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}
```
然后像这样使用：
```
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```
### 在插件内提交 Mutation

在插件中不允许直接修改状态——类似于组件，只能通过提交 `mutation` 来触发变化。

通过提交 `mutation`，插件可以用来同步数据源到 `store`。
例如，同步 `websocket` 数据源到 `store`. 

下面是个大概例子，实际上 createPlugin 方法可以有更多选项来完成复杂任务：
``` js
export default function createWebSocketPlugin (socket) {
  return store => {
    socket.on('data', data => {
      store.commit('receiveData', data)
    })
    store.subscribe(mutation => {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }
}
const plugin = createWebSocketPlugin(socket)

const store = new Vuex.Store({
  state,
  mutations,
  plugins: [plugin]
})
```

### 生成 State 快照
有时候插件需要获得状态的“快照”，比较改变的前后状态。

想要实现这项功能，你需要对状态对象进行深拷贝：
``` js
const myPluginWithSnapshot = store => {
  let prevState = _.cloneDeep(store.state)
  store.subscribe((mutation, state) => {
    let nextState = _.cloneDeep(state)

    // 比较 prevState 和 nextState...

    // 保存状态，用于下一次 mutation
    prevState = nextState
  })
}
```
生成状态快照的插件应该只在开发阶段使用，使用 `webpack` 或 `Browserify`，让构建工具帮我们处理：

``` js
const store = new Vuex.Store({
  // ...
  plugins: process.env.NODE_ENV !== 'production'
    ? [myPluginWithSnapshot]
    : []
})
```
上面插件会默认启用。

在发布阶段，你需要使用 `webpack` 的 `DefinePlugin` 或者是 `Browserify` 的 `envify` 使 `process.env.NODE_ENV !== 'production'` 为 false。

### 内置 Logger 插件
如果正在使用 `vue-devtools`，你可能不需要此插件。

`Vuex` 自带一个日志插件用于一般的调试:

``` js
import createLogger from 'vuex/dist/logger'

const store = new Vuex.Store({
  plugins: [createLogger()]
})
```

createLogger 函数有几个配置项：

``` js
const logger = createLogger({
  collapsed: false, // 自动展开记录的 mutation
  filter (mutation, stateBefore, stateAfter) {
    // 若 mutation 需要被记录，就让它返回 true 即可
    // 顺便，`mutation` 是个 { type, payload } 对象
    return mutation.type !== "aBlacklistedMutation"
  },
  transformer (state) {
    // 在开始记录之前转换状态
    // 例如，只返回指定的子树
    return state.subTree
  },
  mutationTransformer (mutation) {
    // mutation 按照 { type, payload } 格式记录
    // 我们可以按任意方式格式化
    return mutation.type
  },
  logger: console, // 自定义 console 实现，默认为 `console`
})
```

日志插件还可以直接通过 `<script>` 标签引入，它会提供全局方法 `createVuexLogger`。

::: tip
logger 插件会生成状态快照，所以仅在开发环境使用。
::: 

## 相关链接
* [Vuex官方文档](https://vuex.vuejs.org/zh/guide/strict.html)