# 拆解JavaScript中的异步模式

> 本文简书: https://zhuanlan.zhihu.com/p/67815990

## 引言
JavaScript中有很多异步编程方式：
* callback
* promise
* generator
* async await
* RxJS

最初接触不同的异步， 曾当然以为： promise 比 callback好， async await 比promise更优雅， 会把它们割裂起来看待。 后来发现也不完全对， 各种异步模式之间其实存在着关联， 也有着其各自适用的场景。 

这段时间看了很多异步相关资料， 觉得对JavaScript中的异步有了全新的认识。 

本文的写作目的是， 建立起各种异步模式之间的联系， 梳理各种异步模式的优缺点， 针对各种异步模式具体的用法， 这里不做赘述， 但会给出一些个人觉得比较好的参考资料。

## Callback
在JavaScript中， **函数**是一等公民。 

当一个函数传入“另外一个函数”作为参数时， 我们就可以把这个函数叫做`Callback`函数。 而这里的“另外一个函数”也有一个常见的名字： **高阶函数**（Hight order function）

需要澄清一点的是， Callback并非都是异步执行的。 
比如， 在我们常用的`Array.prototype.map()`中, 其第一个参数也是一个回调函数, 但它是同步执行的. 

本文关注异步, 如没有特殊说明, 文中提到的`Callback`指的都是异步回调函数.

下面是2个典型的异步回调示例:
``` js
// 示例1
setTimeout(function cb() {
  output('callback')
}, 1000)

// 示例2
fs.readFile('./imaginary.txt', function(err, result) {
   if (err) {
      return console.error('Error:', err);
   }
      return output('Result:', result);
})
```

上述代码很简单, 不过其说明了异步函数的两个特点:
* `callback`实际上把程序分为了立即执行部分和稍后执行部分, 而两部分之间发生了什么, 则在一定程序上并不受我们控制.
* 上面的`setTimeout`和`fs.readFile`都不是JS语言提供的方法, JS中异步的实现严重依赖于宿主环境, 实际上在`Promise`之前, JS语言本身是没有异步机制的.

Callback存在着以下2个问题而饱受诟病:
* 控制反转, 即callback函数的调用在一定程序上是不受我们控制的, 我们缺少可靠的机制确保回调函数能按照预期被执行.
* 难以理解, 即令人生畏的回调地狱. 

### 回调地狱
回调地狱常常被人误解为, 嵌套的回调结构, 如下所示:
``` js
setTimeout(function() {
  output('one')
  setTimeout(function() {
    output('two')
    setTimeout(function() {
      output('three')
    }, 1000)
  }, 1000)
}, 1000)
```

你也能看出, 上述代码虽有多层嵌套, 但是总体还是比较容易理解的, 稍微改动一下, 还可以写做下面的这种没有形式.
``` js
function one(cb) {
  output('one')
  setTimeout(cb, 1000)
}

function two(cb) {
  output('two')
  setTimeout(cb, 1000)
}

function three() {
  output('three')
}

one(function() {
  two(three)
})
```
可见, 回调地狱的问题不在于嵌套. 那么回调地狱的问题究竟出在哪呢? 
也许换一个更真实一些的例子, 能表达更清楚. 

假设, 我们现在有这样一个场景, 我们有3个不同的文件: file1, file2, file3, 我们希望并行请求这些文件, 并按照顺序依次展示出文件内容, 如果仅仅使用Callback, 该怎么做?

这里假设我们有以下工具函数:
* fakeAjax, 用于请求文件内容, 接受地址和callback两个参数
* output, 输入内容

我第一次遇到这个问题时, 还真是尝试了好半天.

答案如下:
``` js
function getFile(file) {
  fakeAjax(file, function(text) {
    fileReceived(file, text)
  })
}

function fileReceived(file, text) {
  if (!responses[file]) {
    responses[file] = text
  }

  const files = ['file1', 'file2', 'file3']

  for (let i = 0; i < files.length; i++) {
    if (files[i] in responses) {
      if (responses[files[i]] !== true) {
        output(responses[files[i]])
        responses[files[i]] = true
      }
    } else {
      return false
    }
  }
  output('Complete!')
}

const responses = {}

getFile('file1')
getFile('file2')
getFile('file3')
```

这个问题最大的难点在于, 我们需要保证顺序输出. 但是每个请求的时间却是不确定的, 使得我们不得不使用额外的变量来管理输出的先后顺序. 

这其实才是回调地狱所在, 必须使用额外的外层变量来协同不同的回调, 这会明显增加代码的复杂度, 让我们的代码难以理解, 难以书写.

这让我们很自然的去想, 如果我们的异步代码不用考虑时间, 也许异步的逻辑就会简单很多, 还真存在着这么一种抽象方式 -- `thunk`

### thunk
`thunk`是一个在1961年就被提出的概念. `thunk`是一种函数, 其返回值也是一个函数.

提到`thunk`, 你可能会马上想到`redux-thunk`, 其对自己的定义如下:
> Redux Thunk middleware allows you to write action creators that return a function instead of an action.

同Callback一样, `thunk`也有同步和异步之分, 这里我们引用getify对二者的定义.

#### 同步thunk
> Form a synchronous perspective , a thunk is a function that has everything already that it needs to do to give your some value back. you do not need to pass any arguments in, you simply call it and it will give you a value back .
> 译文: 从同步的角度看，thunk 是一种函数，这种函数已经包含了所有你需要的值，你不需要传入任何参数，仅仅需要调用它，它就会将值返回给你。

以下是一个同步thunk的示例:
``` js
function add(x,y){
    return x + y;
}

var thunk = function(){
    return add(10,15)
}

thunk()
```
从不同的角度看上述代码可能会有不同的理解, 不知道你会不会想到, 上面的函数`thunk`其实可以看作一个值的包裹体, 我们完全不用考虑其在内部做了什么, 但是我们能保证, 只要调用thunk函数, 我们就能获得一个固定的值.

#### 异步thunk
> Is a function that doesn’t need any arguments passed to it to do it job, except you need to pass it a callback so that you can get the value out.

异步 thunk 也是一种你无需你传入任何参数就可以正常工作的函数，如果你想获取其中的值，则需要传入一个回调函数。

下面是一个异步thunk的示例:
``` js
function addAsync(x,y,cb){
    setTimeout(function(){
        cb(x+y)
    },1000)
}

const thunk = function(cb){
    addAsync(10,15,cb)
}

thunk((sum)=>{output(sum)})
```
初看起来, `thunk`好像让我们的代码变得更加复杂了. 不过如果我们仔细想想就能发现, thunk把时间的概念抽象出去了. 执行`thunk`函数后, 我们只需要等待结果就行了. 无需关心`addAsync`是什么, 做了什么事情, 需要花费多少时间. 

上面我们提到时间是程序中最复杂的状态因素, 管理时间是程序中最复杂的问题之一, 而这里通过`thunk`我们把时间抽象出去了. 

现在, 我们回头来看看前面那个`并发请求, 顺序输出`的问题, 利用异步`thunk`模式, 就可以按照下面的代码来实现了.
``` js
function getFile(file) {
  let resp

  fakeAjax(file, function(text) {
    if (!resp) resp = text
    else resp(text)
  })

  return function th(cb) {
    if (resp) cb(resp)
    else resp = cb
  }
}

const th1 = getFile('file1')
const th2 = getFile('file2')
const th3 = getFile('file3')

th1(function ready(text) {
  output(text)
  th2(function ready(text) {
    output(text)
    th3(function ready(text) {
      output(text)
      output('Complete!')
    })
  })
})
```
比起上面的纯Callback方案, 利用thunk, 我们的代码好理解很多. thunk的本质其实是使用闭包来管理状态.

> 因为 thunk 真的很有用，也存在很多将异步 callback 转换为 thunk 的工具库，比如 thunks 或 node-thunkify ，感兴趣也可以看看。

异步thunk让时间不再是问题, 如果我们换个角度看, 它就好似给一个未来的值添加了占位符, 有没有觉得这种说法似曾相识, 没错, Promise也是如此, 在Promise中, 时间也是被抽离了出去.

> Promises is a time-independent wrapper around a value, it just has a fancier API. Thunk is a promises without fancy api. — getify

虽然异步 thunk 抽离出时间后，我们的代码稍微更好理解了，但是回调的另外一个问题 — 依赖反转，通过 thunk 却难以克服。如果用人话来说「依赖反转」，其实这是一种信任问题，回调函数的调用其实是受外界控制的，其会不会被调用，会被调用几次都不能完全受我们控制。为了解决这个问题，Promise 粉墨登场。


## Promise
有时候在想，学习一门语言的新语法，其实不应该局限于其用法，而应当尝试去了解其背后的理念，其想解决的问题。我其实使用 Promise 很久了，甚至是在现在的工作中，使用最多的还是它。但是其实直到不久前，我才理清 Promise 实际上有以下三重身份：
* 为一个未来值提供了占位符，消除时间的影响;
* 事件监听器，监听 then 时间；
* 提供了一种以可靠的方式管理我们的回调；

Promise 实在是太常用了，在此不再赘述其用法，如果我们使用 Promise 再次解决上面那个顺序输出文件内容的问题，则可以按照下面这样写：
``` js
function getFile(file) {
  return new Promise(function(resolve) {
    fakeAjax(file, resolve)
  })
}

function output(text) {
  output(text)
}

const p1 = getFile('file1')
const p2 = getFile('file2')
const p3 = getFile('file3')

p1.then(output)
  .then(function() {
    return p2
  })
  .then(output)
  .then(function() {
    return p3
  })
  .then(output)
  .then(function() {
    output('Complete!')
  })
```
这个代码太好读了，怪不得人人都爱 Promise。如果你习惯函数式编程，我们甚至还可以进一步简化为下面这样：
``` js
['file1', 'file2', 'file3']
  .map(getFile)
  .reduce(
    function(chain, filePromise) {
      return chain
        .then(function() {
          return filePromise
        })
        .then(output)
    },
    Promise.resolve()
  )
  .then(function() {
    output('Complete!')
  })
```
很多人觉得 `Promise` 的好是好在其链式调用的语法（我刚接触 Promise 的时候，也是这么觉得，毕竟它看起来比嵌套的回调清晰太多了。）
不过链式调用真的不是 Promise 的核心，这种链式调用的方式可以比较容易通过 Callback 模拟的，具体怎么做，可参看一些 polyfill 中的实现，Promise 的 Polyfill 其实很多，如:
* es6-promise
* promise-polyfill 
* native-promise-only

Promise 的核心在于其通过一种协议保障了`then`后注册的函数只会被执行一次。
这和上面提到的回调不同，普通的 callback 实际上是第三方直接调用我们的函数，这个第三方不一定是完全可信的，我们的回调函数可能会被调用，也可能不会调用，还可能会调用多次。
Promise 则将代码的执行控制在我们自己手里，要么成功要么失败，then后面的函数只会执行一次。

不过 Promise 也有一些缺陷被人诟病，主要体现在以下两个方面：
* 一旦开始执行就没办法手动终止；在满足一些条件时我们可能会希望不再执行后续的`then`，这在`Promise`中就很难优雅的做到；
* 我们无法完全捕获可能的错误。比如说 `.catch` 中的错误就难以再被捕获；

介于此，Generator 应运而生。

> 补充说明：
> 值得一提的是，Promise 并非 JavaScript 首创，这个概念在 1976 年就被提出，并在多种语言中有实现 Futures and promises - Wikipedia ,最早的实现可能是 e 语言中的 future。有时候不得不感慨，如果能对计算机软件相关的各种历史背景有更多的了解，学或者用起来一些东西，肯定会更加得心应手。

## generator
`generator`算是 JavaScript 中一个比较难学的概念了，感觉我自己花了好久才弄得比较明白。
它被认为是 JavaScript 这门语言中最具革命性的改变了。
本文不会具体去讲解 generator 该怎么用，如果你觉得还不太会，推荐阅读以下资料:
* The Basics Of ES6 Generators
* Diving Deeper With ES6 Generators[5]
* Going Async With ES6 Generators
* Getting Concurrent With ES6 Generators

这四篇是一个系列，把`generator`讲解得算是很透彻了。

归纳起来`generator`函数具有以下特点：
* 函数可暂停和继续；
* 可返回多个值给外部；
* 在继续的时候，外面也可以再传入值；

通过 `Generator` 写的异步代码看起来就像是同步的；
`generator` 把我们的代码分割成了独立可阻塞的部分，局部的阻塞不会导致全局的阻塞，有时候在想这个特性其实让我们可能可以去模拟独立的线程做的事情，还挺有意思的。

generator 被诟病比较多的一个地方是: 它不能自动执行，每当遇到yield就会暂停，就需要我们手动调用 .next()来继续执行后面的内容。
这个方法在任何地方都可能被调用，因此又出现了在 callback 中出现过的**控制反转**问题。我们完全不知道谁会在什么地方调用.next()，结合 Promise 我们可以比较轻松的解决「控制反转」的问题，一些人把 Promise + Generator 当作是异步最好的解决方案之一。
* Promise 用以解决控制反转问题；
* Generator 则让我们的异步代码看起来像是同步的，非常容易书写和理解；

具体来说，我们可以在 Promise 中调用 .next()，Promise 机制保证了.next() 的调用是受控制的。

以下是二者结合使用的一个示例：
``` js
// 这里封装的 runGenerator 可以让 generator 自动运行起来
function runGenerator(g) {
  const it = g()
  let ret
  (function iterate(val) {
    ret = it.next(val)
    if (!ret.done) {
      if ('then' in ret.value) {
        ret.value.then(iterate)
      } else {
        setTimeout(function() {
          iterate(ret.value)
        }, 0)
      }
    }
  })()
}

function makeAjaxCall(url, cb) {
  setTimeout(cb(url), 1000)
}

function request(url) {
  return new Promise(function(resolve, reject) {
    makeAjaxCall(url, function(err, text) {
      if (err) reject(err)
      else resolve(text)
    })
  })
}

runGenerator(function* main() {
  let result1
  try {
    result1 = yield request('http://some.url.1')
  } catch (err) {
    output('Error: ' + err)
    return
  }
  const data = JSON.parse(result1)

  let result2
  try {
    result2 = yield request('http://some.url.2?id=' + data.id)
  } catch (err) {
    output('Error: ' + err)
    return
  }
  const resp = JSON.parse(result2)
  output('The value you asked for: ' + resp.value)
})
```
上述代码中，我们用 Promise + generator 模拟了 async 函数。如果有面试题问可以怎么自己实现一个 async await 就可以按照上面的思路这样来写一个 webpack 插件来解决了，这里还有一篇文章对此进行了详细的介绍[6]。

如果使用 generator 来解决上面那个老问题，则可以按照下面这样写了，非常清晰明了。
``` js
function* loadFiles() {
  const p1 = getFile('file1')
  const p2 = getFile('file2')
  const p3 = getFile('file3')

  output(yield p1)
  output(yield p2)
  output(yield p3)
}

runGenerator(loadFiles)
```
你可能会说还是需要额外封装 runGenerator 函数，真是麻烦。果然还是`async`函数好。
在一些场景下，async 函数确实非常好用，不过也有一些缺点，后文会有描述。

> generator 是一种新的语法形式，所以不能像 Promise 那样通过引用 polyfill 就可以使用，不过通过 Babel 等工具可以将其转换为 ES5 语法，如果你想了解转换具体在底层到底是怎么做的，可以参看 Pre-ES6 Generators.

## Async await
使用 async 解决我们上述提出的问题，可以使用下面这样的方式。
``` js
async function loadFiles(){
  const p1 = getFile('file1')
  const p2 = getFile('file2')
  const p3 = getFile('file3')

  output(await p1)
  output(await p2)
  output(await p3)
}

loadFiles()
```

确实更加简单优雅了。很长一段时间里，我都把 `async` 函数当作是 `JavaScript` 中处理异步最完美的方案。
直到看到 `redux-saga` 的作者明确表明不会使用 `async` `await` 取代 `generator` 来重写 `redux-saga` 才意识到 `async` 函数还是有很多缺陷的。

### async 函数的一些缺陷如下：
* await 关键字只能结合 Promise 控制异步；
* 无法在外界取消一个正在运行中的 async 函数；

我们应当明确，`async` 函数并非一种让 `generator` 更便于使用的语法糖。`async` 函数只有在结束时，才会返回的是一个 `Promise`。我们无法控制其中间状态，而 `generator` 返回的是迭代器，迭代器让你有充分的控制权。关于 `async` 函数的这种实现方式， getify 在之前还有过下面这样的吐槽：

> This is an unbelievably ,ridiculously stupid idea, in my option. They ought to have async functions return something else that lets you control it and listen to the promise, and it terrible idea what they have come up with but that was happened .

他还推荐如果想让异步更受控制，我们应该尽可能多使用 `generator`。

不过话说回来，对于一些一般复杂的异步问题，`async` 函数其实挺好用的了。

## async generator
在 ES2018 中引入了`Asynchronous iteration` 的概念，我们可以在 `async` 函数中使用 `for await … of` 语法，迭代异步对象，可以通过 `Symbol.asyncIterator` 自定义异步迭代处理逻辑。

在 MDN (参看 for await…of - JavaScript | MDN)上还有一种结合 `generator` 和 `async` 使用的例子. 
``` js
async function* streamAsyncIterator(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

async function getResponseSize(url) {
  const response = await fetch(url);
  let responseSize = 0;
  for await (const chunk of streamAsyncIterator(response.body)) {
    responseSize += chunk.length;
  }

  console.log(`Reponse Size: ${responseSize} bytes`);
  return responseSize;
}
getResponseSize('https://jsonplaceholder.typicode.com/photos');
```
`async` `generator` 允许 `await` 和 `yield` 两个关键字一起使用
* `await`负责获取值（pull，从其它地方读取内容）
* yield 负责输出值（push 将值输出）

我觉得这还真的是一个非常棒的改进，我们的代码可读性更强了，`generator` 也更容易使用了。

上面讲述的所有内容其实都还比较偏向于常规的异步模式，下面要谈到的 Observable 则需要我们换一种思维模式来看待异步。

## Observable
`RxJS` 是 `Observable` 的 `Javascript` 实现。关于 `RxJS` ，可讲的实在太多了，关于它的书都有好多本。说实话，其实我还没有在生产环境中用过它，不过最近也看了很多关于它的资料，觉得稍微有些理解其背后的思想，所以在此记录，如果有不对的地方非常欢迎大家指出。

我们可以从几个不同的角度来理解 `Observable`：

### 角度一：
> observable is a collection that arrives over time。

如果我们换个角度看待异步，其实它们就像是时间流中的数据片段，这和我们熟悉的数组很像，我们知道，数组中元素的索引是从小变大的数值，我们大可以开一下脑洞，将异步数据流中的元素的索引看作是时间的先后。这种想法好美。在上文中我们提到过，使用 `thunk` ，我们是可以把时间抽象出去的，对于数组的操作，我们则再熟悉不过了。

提前放一下下图，帮我们加深这种理解
![images.png](/coding/images/observable1.png)

### 角度二：
> Observable is Observer + Iterator。

迭代器模式`Iterator` 和观察者模式`Observer` 是两种大家更为熟悉的设计模式 。

理解这两种设计模式之间的关系也是理解 Observable 的关键。

上面两种模式的区别在于谁占据主动权：
* Iterator 消费者占主动权，消费者说 next 如果有的话，就将获取下一个值，对于消费者来说，这是一个拉（pull）的过程；
* Observer 生产者占主动权，有了新的内容，生产着就自动通知给所有订阅它的人，对于消费者来说，这是一个推（push）的过程；

web 上有非常多的基于观察者模式的 APIs，比如说：
* DOM Events
* Websockets
* Server-send Events
* Node Streams
* Service Workers
* setInterval
* 异步请求 等等

虽然它们都是观察者模式，但是用法却并不统一。相对而言迭代器的用法则是统一的。
`RxJS` 实际上就提供了一种办法将上述 `api` 转换为 `observable`，而 `observable` 的返回值其实可以看作是一个可迭代的序列。

下面是一个创建 Observable 的示例：
``` js
const Rx = require('rxjs')

const source = Rx.Observable.create(observer => {
  setTimeout(() => {
    observer.next(42)
  }, 500)
  console.log('Observable is started')
})

source.forEach(x => {
  console.log(x)
})
```

这里我们使用 `Rx.Observable.create` 可以很轻松的创建了一个 `Observable` ，其它的一些异步操作，使用 `RxJS` 也可以用类似的办法很容易的创建。

### 角度三
> An observable is nothing but an object with a forEach method.

继续上面的例子，创建的 `Observable` 的过程并不会执行其内部的函数，我们仅仅只是将函数按照一定规则组合起来，返回了一个可迭代序列。`observable` 是惰性的，只有我们则外部调用 `source.forEach` 时，其中内容才会真实的执行。

在统一起来为 `observable` 后，我们还可以通过一些简单的的方法组合和控制它们。

如下是一些常见的方法：
* map
* filter
* concatAll
* TakeUntil
* mergeAll
* switchLatest
* distchUntilChanged

这里我们不去讲述不同的方法的具体含义，仅仅以`switchLatest`为例说明 `observable` 组合的强大。

`switchLatest` 意味着切换到最新的 `observable`，不再去管前一个 `observable` 后续未完成的操作。
举一个常见的交互为例, 
比如说在搜索框中进行搜索时，可以把用户的每一次输入都看作一个 observable，每个字符的输入都会触发后续的一系列操作，如果用户连续输入，通过 `switchLatest`，我们就可以很容易取消一些可能没有用的请求。

示例如下：
``` js
var searchResultSets = keyPresses
  .throttle(250)
  .map(key => getJSON('/searchResults?q=' + input.value).retry(3))
  .switchLatest()
```

[RxMarbles](https://rxmarbles.com/)是一个有助于我们学习这些方法的网站，其用可交互的方式展示了 `Observables` 相关的多种方法具体的含义，能帮助我们更好的理解上面提到的各种属性实际上做的事情。

![images.png](/coding/images/observable2.png)

如上图所示，我们完全可以把横轴看作时间，时间当然只有一条，但是在同一条时间线上，可能有多种操作流在同时发生，我们异步的本质不就是在处理并发嘛，希望能按照我们预期的顺序获取到结果。
通过 `Observable` ，我们可以方便的使用不同的方法组合和控制异步流。
据说通过 `RxMarbles` 就可以学会一半的 `RxJS` ，非常推荐你点击链接去看看。
值得一提的是 `Observable` 对象本质上只有一个方法: `forEach`，其它的方法实际上都是在它的基础上演变而来。

这种编程模式其实又被称作 `reactive programming`。上面提到的 `Observables` 的组合其实也没有什么黑魔法，有人把它比作 Excel 中的单元格。我们知道 Excel 非常强大，我们可以选中 Excel 中的若干单元格进行复杂的运算后，并将结果存储到另外一个单元格中。随后如果前面的单元格中任意一个地方的值有所改变，之前得到的结果也会跟着改变。对应到函数之中，其实就是通过 `callback`，按照一定的规则组件起一个越来越大的等待着被执行的函数。这个函数充分利用了回调和闭包来保证其按照我们的预期行为来执行。

`JS Bin` 上有一个缩略版的 `RxJS` 实现，在 `frontend master` 上还有一个配套的讲解课程，如果有兴趣可以去看看。

有人说，`observable` 是可以控制所有异步操作的模式，你可以通过 `observable` 使用所有的异步 API。
关于 `observable` 还有很多可以聊的内容，比如说 副作用，或者说 `hot` / `cold observable`，我缺少 `observable` 的使用经验，很多地方的理解可能会有欠缺。
下面这些资料，我还只看了一部分，但是觉得还挺好的，推荐你查看阅读:

* [Learn JavaScript Asynchronous Programming - Jafar Husain](https://frontendmasters.com/courses/advanced-async-js/)
* 深入浅出RxJS

## 如何选择异步模式

各种异步模式其实是不同的工具，就我看来其实也不存在完全的优劣，应当都有所理解，在正确的时机使用正确的工具。也并非越强大的工具越好，更强大的往往也意味着更大的学习和使用成本。

在上面提到的 RxJS 那门网课中，Jafar Husain 甚至认为，在浏览器中永远存在着并发，就该优先使用 RxJS，相比较而言 Promise 和 Async 函数，在 node 端会更有用。

在我的大部分工作中，我其实觉得 Promise 就够用了。不过最近我参与到一个 IM 系统的开发中，前端的交互和逻辑相比较而言还有些复杂，通常一个地方的改变意味着其它几个地方需要跟着同步改变，在开发中也会明显感觉到往常习惯的一些模式虽然也可以用，但是觉得代码写得并不足够清晰，也是这就是应当换一种模式处理异步问题的时机了，后面我可能也会尝试使用其它的模式处理相似的问题能不能让代码更为简洁。

这里还有一个对比 Observable 和 Promise 的视频，也非常推荐你观看。

有时候保持开放其实还挺难的，我们熟悉的东西会影响我们的思维方式。也许在熟悉了各种异步模式后，遇到了具体的问题，第一时间想到的就会是最合适的方式。

## JavaScript中是怎么实现异步的

前面我们提到，在 Promise 之前，JavaScript 语言本书是没有异步这个概念的。比如说我们常用的 setTimeout 等api 实际上是由 JavaScript 的运行环境提供的，其存在于 html Timers 相关标准中。

这一节本来想要再描述一下 EventLoop、Task Queue、Job Queue 等等概念，准备过程中发现下面这一个视频和一篇文章，他们讲解的实际上比我想说的清楚多了，所以我就不再赘述。强烈推荐你点击阅读：

* [Tasks, microtasks, queues and schedules - JakeArchibald.com](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
*[What the heck is the event loop anyway? | Philip Roberts | JSConf EU - YouTube](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

下面是从上面的视频中截出来的关于 Event loop 的一张示意图：
![images.png](/coding/images/eventloop.png)


## 参考资料
* You-Dont-Know-JS/callback：https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch2.md
* Learn Asynchronous Patterns in JavaScript with Kyle Simpson：https://frontendmasters.com/courses/rethinking-async-js/
* Thunks A Way of Compiling Procedure Statements with Some Comments on Procedure Declarations*：https://web.archive.org/web/20190415165418/https://portalparts.acm.org/1070000/1064045/fm/frontmatter.pdf?ip=98.14.66.142
* promise+：https://promisesaplus.com/
* Diving Deeper With ES6 Generators：https://davidwalsh.name/es6-generators-dive
* Async-Await ≈ Generators + Promises：https://hackernoon.com/async-await-generators-promises-51f1a6ceede2
* Pre-ES6 Generators：https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch4.md#pre-es6-generators
* Is there any plan to rewrite redux-saga using async-await? · Issue #987 · redux-saga/redux-saga · GitHub：https://github.com/redux-saga/redux-saga/issues/987#issuecomment-301039792
* for await…of - JavaScript | MDN：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
* observables vs promises：https://egghead.io/lessons/rxjs-rxjs-observables-vs-promises
* RxMarbles - Interactive diagrams of Rx Observables：https://rxmarbles.com/
* Learn Advanced Asynchronous JavaScript with Jafar Husain：https://frontendmasters.com/courses/advanced-async-js/
* Tasks, microtasks, queues and schedules - JakeArchibald.com：https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
* What the heck is the event loop anyway? | Philip Roberts | JSConf EU - YouTube ：https://www.youtube.com/watch?v=8aGhZQkoFbQ