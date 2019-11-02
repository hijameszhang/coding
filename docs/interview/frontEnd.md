# Web 前端面试经
分级考查:
* 初级, ✶✶✶, 及以下
* 中级, ✶✶✶✶ 及以下
* 高级, ✶✶✶✶✶ 及以下

## JavaScript
### 1.typeof 和instance of 检测数据类型有什么区别？ 星级(✶✶✶)
* 相同点：都常用来判断一个变量是否为空，或者是什么类型的。
* 不同点：
  * typeof, 返回值是一个字符串，用来说明变量的数据类型
  * instanceof, 用于判断一个变量是否属于某个对象的实例.

### 2. 深克隆和浅克隆？星级(✶✶✶)
* 浅克隆:
  * 只是拷贝了基本类型的数据，而引用类型数据，复制后也是会发生引用，我们把这种拷贝叫做“（浅复制）浅拷贝”，换句话说，浅复制仅仅是指向被复制的内存地址，如果原地址中对象被改变了，那么浅复制出来的对象也会相应改变。
* 深克隆：
  * 创建一个新对象，属性中引用的其他对象也会被克隆，不再指向原有对象地址。
  * 简单实现: JSON.parse、JSON.stringify(), 但也有不足之处, 如无法复制特殊的数据类型(如: 时间类型数据, 正则表达式类型数据等)

> 考查点: 知道什么是深/浅克隆, 以及相关的实现方法

### 3. ES6的新特性都有哪些？星级(✶✶✶)
* let定义块级作用域变量, 没有变量的提升，必须先声明后使用, let声明的变量，不能与前面的let，var，conset声明的变量重名
* const 定义只读变量
  * const声明变量的同时必须赋值，const声明的变量必须初始化，一旦初始化完毕就不允许修改
  * const声明变量也是一个块级作用域变量
  * const声明的变量没有“变量的提升”，必须先声明后使用
  * const声明的变量不能与前面的let， var ， const声明的变量重
  * const定义的对象\数组中的属性值可以修改,基础数据类型不可以
* 形参函数可设置默认值
* 展开运算符（...）
* 解构赋值(数组/对象)
* 箭头函数的特点
  * 箭头函数相当于匿名函数，是不能作为构造函数的，不能被new
  * 箭头函数没有arguments实参集合,取而代之用...剩余运算符解决
  * 箭头函数没有自己的this。他的this是继承当前上下文中的this
  * 箭头函数没有函数原型
  * 箭头函数不能当做Generator函数，不能使用yield关键字
  * 不能使用call、apply、bind改变箭头函数中this指向
* Set数据结构，数组去重
* 模板字符串
* Promise
* Class
* async/await

> 考查点: 了解面试者对ES6的熟悉程度

### 4. ==和===区别是什么？星级(✶✶✶)
* =, 赋值
* ==, 返回一个布尔值；相等返回true，不相等返回false；
  * 允许不同数据类型之间的比较；
  * 如果是不同类型的数据进行，会默认进行数据类型之间的转换；
* ===, 只要数据类型不一样，就返回false；

### 5. 常见的设计模式有哪些？星级(✶✶✶✶)
* 单例模式
* 工厂模式
* 观察者模式
* 发布订阅模式
* 策略模式
* 代理模式

### 6.call bind apply 的区别？星级(✶✶✶✶)
* call & apply 相同点:
  * 第一个参数相同，都是指定的对象。这个对象就是该函数的执行上下文。
* call & apply 区别, 在于两者之间的参数。
  * call()在第一个参数之后的 后续所有参数就是传入该函数的值。
  * apply() 只有两个参数，第一个是对象，第二个是数组，这个数组就是该函数的参数。
* bind() 方法和前两者不同在于：
  * bind() 方法会返回执行上下文被改变的函数而不会立即执行
  * 而前两者是, 直接执行该函数。他的参数和call()相同。

### 7.js继承方式有哪些？星级(✶✶✶✶✶)
* 原型链继承: 将父类的实例作为子类的原型
* 构造继承: 使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类
* 实例继承: 为父类实例添加新特性，作为子类实例返回
* 拷贝继承
* 组合继承: 通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现	函数复用
* 寄生组合继承：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实	例方法/属性，避免的组合继承的缺点

### 8.你怎样看待闭包？星级(✶✶✶✶)

闭包就是在函数内声明函数，本质上说就是在函数内部和函数外部搭建起一座桥梁，使得子函数可以访问父函数中所有的局部变量，但是反之不可以，这只是闭包的作用之一，
另一个作用，则是保护变量不受外界污染，使其一直存在内存中，在工作中我们还是少使用闭包的好，因为闭包太消耗内存，不到万不得已的时候尽量不使用。

> 考查点: 闭包的定义, 以及闭包的好处和坏处

### 9.你是如何理解原型和原型链的？星级(✶✶✶✶)

把所有的对象共用的属性全部放在堆内存的一个对象（共用属性组成的对象），然后让每一个对象的 `__proto__`存储这个`「共用属性组成的对象」`的地址。而这个共用属性就是原型

原型出现的目的就是为了减少不必要的内存消耗。而原型链就是对象通过`__proto__`向当前实例所属类的原型上查找属性或方法的机制，如果找到Object的原型上还是没有找到想要的属性或者是方法则查找结束，最终会返回`undefined`

### 10.浏览器渲染的主要流程是什么? 星级(✶✶✶✶✶)
* 将html代码按照深度优先遍历来生成DOM树。
* css文件下载完后也会进行渲染，生成相应的CSSOM。
* 当所有的css文件下载完且所有的CSSOM构建结束后，就会和DOM一起生成Render Tree。
* 接下来，浏览器就会进入Layout环节，将所有的节点位置计算出来。
* 最后，通过Painting环节将所有的节点内容呈现到屏幕上。

### 11.从输入url地址到页面相应都发生了什么？星级(✶✶✶✶✶)
* 1、浏览器的地址栏输入URL并按下回车。
* 2、浏览器查找当前URL是否存在缓存，并比较缓存是否过期。3、DNS解析URL对应的IP。
* 4、根据IP建立TCP连接（三次握手）。
* 5、HTTP发起请求。
* 6、服务器处理请求，浏览器接收HTTP响应。
* 7、渲染页面，构建DOM树。
* 8、关闭TCP连接（四次挥手）

### 12.session、cookie、localStorage的区别 星级(✶✶✶✶)
* 相同点, 都是保存在浏览器端，且同源的。
* 不同点
  * 作用&大小限制:
    * cookie数据始终在同源的http请求中携带，即cookie在浏览器和服务器间来回传递。
      * cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。
      * 存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据。
    * sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
      * sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
      * 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；
    * localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；
    * cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
  * 作用域不同
    * sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；
    * localStorage 在所有同源窗口中都是共享的；
    *cookie也是在所有同源窗口中都是共享的。

### 13.js中跨域方法 星级(✶✶✶✶)
同源策略（协议+端口号+域名要相同）

#### jsonp跨域(只能解决get）星级(✶✶✶✶)
动态创建一个script标签。利用script标签的src属性不受同源策略限制，因为所有的src属性和href属性都不受同源策略的限制，可以请求第三方服务器资源内容

步骤：
* 创建一个script标签
* script的src属性设置接口地址
* 接口参数，必须要带一个自定义函数名，要不然后台无法返回数据
* 通过定义函数名去接受返回的数据

#### document.domain 基础域名相同 子域名不同 星级(✶✶✶✶✶)
#### window.name 利用在一个浏览器窗口内，载入所有的域名都是共享一个window.name 星级(✶✶✶✶✶)
#### 服务器设置对CORS的支持 星级(✶✶✶✶)
服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求
#### 5、利用h5新特性window.postMessage() 星级(✶✶✶✶)

### 14.前端有哪些页面优化方法? 星级(✶✶✶✶✶)
* 减少 HTTP请求数
* 从设计实现层面简化页面
* 合理设置 HTTP缓存
* 资源合并与压缩
* 合并 CSS图片，减少请求数的又一个好办法。
* 将外部脚本置底（将脚本内容在页面信息内容加载后再加载）
* 多图片网页使用图片懒加载。
* 在js中尽量减少闭包的使用
* 尽量合并css和js文件
* 尽量使用字体图标或者SVG图标，来代替传统的PNG等格式的图片
* 减少对DOM的操作
* 在JS中避免“嵌套循环”和 “死循环”
* 尽可能使用事件委托（事件代理）来处理事件绑定的操作

### 15.Ajax的四个步骤 星级(✶✶✶✶✶)
* 1.创建ajax实例
* 2.执行open 确定要访问的链接 以及同步异步
* 3.监听请求状态
* 4.发送请求

### 16.数组去重的方法 星级(✶✶✶✶)
#### 1. ES6的set对象
先将原数组排序，在与相邻的进行比较，如果不同则存入新数组
``` js
function unique(arr){
    var arr2 = arr.sort();
    var res = [arr2[0]];
    for(var i=1;i<arr2.length;i++){
        if(arr2[i] !== res[res.length-1]){
        res.push(arr2[i]);
    }
}
return res;
}
```
#### 2. 利用下标查询(indexOf)
```js
 function unique(arr){
    var newArr = [arr[0]];
    for(var i=1;i<arr.length;i++){
        if(newArr.indexOf(arr[i]) == -1){
        newArr.push(arr[i]);
    }
}
return newArr;
}
```

### 17.ajax中get和post请求的区别 星级(✶✶✶✶✶)
* get 一般用于获取数据
  * get请求如果需要传递参数，那么会默认将参数拼接到url的后面；然后发送给服务器；
  * get请求传递参数大小是有限制的；是浏览器的地址栏有大小限制；
  * get安全性较低
  * get 一般会走缓存，为了防止走缓存，给url后面每次拼的参数不同；放在?后面，一般用个时间戳
* post 一般用于发送数据
  * post传递参数，需要把参数放进请求体中，发送给服务器；
  * post请求参数放进了请求体中，对大小没有要求；
  * post安全性比较高；
  * post请求不会走缓存；

### 18.HTTP状态码 星级(✶✶✶✶✶)
* 2开头
  * 200 : 代表请求成功；
* 3开头
  * 301 : 永久重定向；
  * 302: 临时转移
  * 304 : 读取缓存 [表示浏览器端有缓存，并且服务端未更新，不再向服务端请求资源]
  * 307:临时重定向
* 4开头的都是客户端的问题；
  * 400 :数据/格式错误
  * 401: 权限不够；（身份不合格，访问网站的时候，登录和不登录是不一样的）
  * 404 : 路径错误，找不到文件
* 5开头都是服务端的问题
  * 500 : 服务器的问题
  * 503: 超负荷；

### 19.JS中同步和异步,以及js的事件流 星级(✶✶✶✶✶)
* 同步：在同一时间内做一件事情
* 异步：在同一时间内做多个事情
* JS是单线程的，每次只能做一件事情，JS运行在浏览器中，浏览器是多线程的，可以在同一时间执行多个任务。
* JS事件循环机制(Event Loop)

### 20.JS中常见的异步任务 星级(✶✶✶✶)
* 定时器
* ajax
* 事件绑定
* 回调函数
* async await
* Promise

### 21.TCP的三次握手和四次挥手 星级(✶✶✶✶✶)
* 三次握手
  * 第一次握手：客户端发送一个SYN码给服务器，要求建立数据连接；
  * 第二次握手： 服务器SYN和自己处理一个SYN（标志）；叫SYN+ACK（确认包）；发送给客户端，可以建立连接
  * 第三次握手： 客户端再次发送ACK向服务器，服务器验证ACK没有问题，则建立起连接；
* 四次挥手
  * 第一次挥手： 客户端发送FIN(结束)报文，通知服务器数据已经传输完毕；
  * 第二次挥手: 服务器接收到之后，通知客户端我收到了SYN,发送ACK(确认)给客户端，数据还没有传输完成
  * 第三次挥手： 服务器已经传输完毕，再次发送FIN通知客户端，数据已经传输完毕
  * 第四次挥手： 客户端再次发送ACK,进入TIME_WAIT状态；服务器和客户端关闭连接；

### 22.为什么建立连接是三次握手，而断开连接是四次挥手呢? 星级(✶✶✶✶✶)
建立连接的时候， 服务器在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。
而关闭连接时，服务器收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，而自己也未必全部数据都发送给对方了，所以己方可以立即关闭，也可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和FIN一般都会分开发送，从而导致多了一次。

### 23.DOM diff原理 星级(✶✶✶✶✶)
如果元素类型发生变化，直接替换
如果是文本，则比较文本里面的内容，是否有差异，如果是元素就需要比较当前元素的属性是否相等,会先比较key， 在比较类型 为什么 react中循环 建议不要使用索引 ,如果纯为了展示 那可以使用索引


### 24.作用域 星级(✶✶✶✶)
#### 全局作用域
浏览器打开一个页面时，浏览器会给JS代码提供一个全局的运行环境，那么这个环境就是全局作用域
一个页面只有一个全局作用域，全局作用域下有一个window对象
window是全局作用域下的最大的一个内置对象（全局作用域下定义的变量和函数都会存储在window下）
如果是全局变量，都会给window新增一个键值对；属性名就是变量名，属性值就是变量所存储的值
如果变量只被var过，那么存储值是undefined
在私有作用域中是可以获取到全局变量的，但是在全局作用域中不能获取私有变量

#### 私有作用域
函数执行会形成一个新的私有的作用域（执行多次，形成多个私有作用域）
私有作用域在全局作用域中形成，具有包含的关系；
在一个全局作用域中，可以有很多个私有作用域
在私有作用域下定义的变量都是私有变量
形参也是私有变量
函数体中通过function定义的函数也是私有的，在全局作用域不能使用；

#### 块级作用域
es6中新引入的一种作用域
在js中常见到的if{}、for{}、while{}、try{}、catch{}、switch case{}都是块级作用域
var obj = {} //对象的大括号不是块级作用域
块级作用域中的同一变量不能被重复声明（块级下var和function不能重名，否则会报错）
作用域链
#### 上级作用域
函数在哪里定义，他的上一级作用域就是哪，和函数在哪个作用域下执行没有关系
作用域链：当获取变量所对应的值时，首先看变量是否是私有变量，如果不是私有变量，要继续向上一级作用域中查找，如果上一级也没有，那么会继续向上一级查找，直到找到全局作用域为止；如果全局作用域也没有，则会报错；这样一级一级向上查找，就会形成作用域链
当前作用域没有的，则会继续向上一级作用域查找
当前函数的上一级作用域跟函数在哪个作用域下执行没有关系，只跟函数在哪定义有关（重点）

### 25.Promise处理异步 星级(✶✶✶✶✶)

Promise, 是ES6中新增加的一个类（new Promise）,目的是为了管理JS中的异步编程的，所以把他称为“Promise设计模式”
new Promise 经历三个状态：
  * pending(准备状态：初始化成功、开始执行异步的任务)、
  * fullfilled(成功状态)
  * rejected(失败状态)

Promise本身是同步编程的，他可以管理异步操作的（重点），new Promise的时候，会把传递的函数立即执行
Promise函数天生有两个参数:
  * resolve(当异步操作执行成功，执行resolve方法)
  * rejected(当异步操作失败，执行reject方法)
  * then()方法中有两个函数
    * 第一个传递的函数是resolve
    * 第二个传递的函数是reject

ajax中false代表同步，true代表异步，如果使用异步，不等ajax彻底完成

### 26.map和forEach的区别 星级(✶✶✶✶✶)
#### 相同点
* 都是循环遍历数组中的每一项
* forEach和map方法里每次执行匿名函数都支持3个参数:
  * item（当前每一项）
  * index（索引值）
  * arr（原数组），需要用哪个的时候就写哪个
* 匿名函数中的this都是指向window
* 只能遍历数组

#### 不同点
* map方法
  * 返回一个新的数组, 数组中的元素为原始数组调用函数处理后的值。(原数组进行处理之后对应的一个新的数组。)
  * map()方法不会改变原始数组
  * map()方法不会对空数组进行检测
* forEach()方法
  * 用于调用数组的每个元素，将元素传给回调函数.(没有return，返回值是undefined）
  * forEach对于空数组是不会调用回调函数的。

### 27.async await函数 星级(✶✶✶✶)

* async/await函数是异步代码的新方式
* async/await是基于promise实现的
* async/await使异步代码更像同步代码
* await 只能在async函数中使用，不能再普通函数中使用，要成对出现
* 默认返回一个promise实例，不能被改变
* await下面的代码是异步，后面的代码是同步的

### 28.this指向 星级(✶✶✶✶)
* 全局作用域下的this指向window
* 如果给元素的事件行为绑定函数，那么函数中的this指向当前被绑定的那个元素
* 函数中的this，要看函数执行前有没有 `.` , 有 `.` 的话，点前面是谁，this就指向谁，如果没有点，指向window
* 自执行函数中的this永远指向window
* 定时器中函数的this指向window
* 构造函数中的this指向当前的实例
* call、apply、bind可以改变函数的this指向
* 箭头函数中没有this，如果输出this，就会输出箭头函数定义时所在的作用域中的this

### 29.原型 星级(✶✶✶✶)
* 所有的函数数据类型都天生自带一个prototype属性，该属性的属性值是一个对象
* prototype的属性值中天生自带一个constructor属性，其constructor属性值指向当前原型所属的类
* 所有的对象数据类型，都天生自带一个_proto_属性，该属性的属性值指向当前实例所属类的原型

### 30.异步回调（如何解决回调地狱）星级(✶✶✶✶)
* promise
* async/await
* generator

#### promise
* 1.是一个对象，用来传递异步操作的信息。代表着某个未来才会知道结果的时间，并未这个事件提供统一的api，供进异步处理
* 2.有了这个对象，就可以让异步操作以同步的操作的流程来表达出来，避免层层嵌套的回调地狱
* 3.promise代表一个异步状态，有三个状态pending（进行中），Resolve(以完成），Reject（失败）
* 4.一旦状态改变，就不会在变。任何时候都可以得到结果。从进行中变为以完成或者失败
* promise.all() 里面状态都改变，那就会输出，得到一个数组
* promise.race() 里面只有一个状态变为rejected或者fulfilled即输出
* promis.finally()不管指定不管Promise对象最后状态如何，都会执行的操作（本质上还是then方法的特例）

### 31.前端事件流 星级(✶✶✶✶✶)
事件流:
  * 描述的是从页面中接受事件的顺序
    * 事件 `捕获阶段` 处于目标阶段 
    * 事件`冒泡阶段`, addeventListener 最后这个布尔值参数如果是true，表示在捕获阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序。
  * 事件捕获阶段：实际目标div在捕获阶段不会接受事件，也就是在捕获阶段，事件从document到`<html>`再到`<body>`就停止了。
  * 处于目标阶段：事件在div发生并处理，但是事件处理会被看成是冒泡阶段的一部分。
  * 冒泡阶段：事件又传播回文档
  * 阻止冒泡事件event.stopPropagation()
  * 阻止默认行为event.preventDefault()

``` js
// 阻止冒泡事件event.stopPropagation()
function stopBubble(e) {
    if (e && e.stopPropagation) { // 如果提供了事件对象event 这说明不是IE浏览器
      e.stopPropagation()
    } else {
      window.event.cancelBubble = true //IE方式阻止冒泡
    }
  }

// 阻止默认行为event.preventDefault()
function stopDefault(e) {
  if (e && e.preventDefault) {
    e.preventDefault()
  } else {
    // IE浏览器阻止函数器默认动作的行为
    window.event.returnValue = false
  }
}
```

### 32.事件如何先捕获后冒泡？ 星级(✶✶✶✶✶)

在DOM标准事件模型中，是先捕获后冒泡。但是如果要实现先冒泡后捕获的效果，
对于同一个事件，监听捕获和冒泡，分别对应相应的处理函数，监听到捕获事件，先暂缓执行，直到冒泡事件被捕获后再执行捕获事件。

#### 哪些事件不支持冒泡事件：
  * 鼠标事件：mouserleave  mouseenter
  * 焦点事件：blur focus
  * UI事件：scroll resize

### 33. 如何判断一个变量是对象还是数组（prototype.toString.call()）。星级(✶✶✶✶✶)

**千万不要使用typeof来判断对象和数组，因为这种类型都会返回object**

* typeOf()是判断基本类型的:
  * Boolean
  * Number
  * symbol
  * undefined
  * String。
  * 对于引用类型：除function，都返回object   null返回object。
* installOf() 用来判断A是否是B的实例，installof检查的是原型。
* toString(), 是Object的原型方法，对于 Object 对象，直接调用 toString()  就能返回 [Object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。
* hasOwnProperty()方法返回一个布尔值，指示对象自身属性中是否具有指定的属性，该方法会忽略掉那些从原型链上继承到的属性。
* isProperty()方法测试一个对象是否存在另一个对象的原型链上。

### 34.setTimeout 和 setInterval的机制 星级(✶✶✶✶✶)
因为js是单线程的。浏览器遇到etTimeout 和 setInterval会先执行完当前的代码块，在此之前会把定时器推入浏览器的
待执行时间队列里面，等到浏览器执行完当前代码之后会看下事件队列里有没有任务，有的话才执行定时器里的代码

### 35.splice和slice、map和forEach、 filter()、reduce()的区别 星级(✶✶✶✶✶)
* slice(start,end):方法可以从已有数组中返回选定的元素，返回一个新数组，包含从start到end（不包含该元素）的数组方法
	* 注意：该方法不会更新原数组，而是返回一个子数组
* splice():该方法想或者从数组中添加或删除项目，返回被删除的项目。（该方法会改变原数组）
  * splice(index, howmany,item1,...itemx)
		* index参数：必须，整数规定添加或删除的位置，使用负数，从数组尾部规定位置
		* howmany参数：必须，要删除的数量，
		* item1..itemx:可选，向数组添加新项目
* map()：会返回一个全新的数组。使用于改变数据值的时候。会分配内存存储空间数组并返回，forEach（）不会返回数据
* forEach(): 不会返回任何有价值的东西，并且不打算改变数据，单纯的只是想用数据做一些事情，他允许callback更改原始数组的元素
* reduce(): 方法接收一个函数作为累加器，数组中的每一个值（从左到右）开始缩减，最终计算一个值，不会改变原数组的值
* filter(): 方法创建一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。它里面通过function去做处理

## Vue
### 1. 对vue的理解 星级(✶✶✶)
* Vue是一个渐进式的JS框架。他易用，灵活，高效；
* 可以把一个页面分隔成多个组件；当其它页面有类似功能时，直接让封装的组件进行复用；
* 它是构建用户界面的声明式框架，只关心图层；不关心具体是如何实现的

> 建议考查点: Vue的优点有哪些

### 2. v-model的原理是什么？ 星级(✶✶✶✶✶)
* Vue的双向数据绑定是由数据劫持结合发布者订阅者实现的。
* 数据劫持是通过Object.defineProperty()来劫持对象数据的setter和getter操作。在数据变动时作你想做的事

#### 原理 
* 通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化->视图更新
* 在初始化vue实例时，遍历data这个对象，给每一个键值对利用Object.definedProperty对data的键值对新增get和set方法
* 利用了事件监听DOM的机制，让视图去改变数据

### 3.谈谈对生命周期的理解 星级(✶✶✶)
* beforeCreate阶段：vue实例的挂载元素el和数据对象data都是undefined，还没有初始化。
* created阶段：vue实例的数据对象data有了，可以访问里面的数据和方法，未挂载到DOM，el还没有
* beforeMount阶段：vue实例的el和data都初始化了，但是挂载之前为虚拟的dom节点
* mounted阶段：vue实例挂载到真实DOM上，就可以通过DOM获取DOM节点
* beforeUpdate阶段：响应式数据更新时调用，发生在虚拟DOM打补丁之前，适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器
* updated阶段：虚拟DOM重新渲染和打补丁之后调用，组成新的DOM已经更新，避免在这个钩子函数中操作数据，防止死循环
* beforeDestroy阶段：实例销毁前调用，实例还可以用，this能获取到实例，常用于销毁定时器，解绑事件
* destroyed阶段：实例销毁后调用，调用后所有事件监听器会被移除，所有的子实例都会被销毁

### 4. 嵌套组件加载时, 其生命周期钩子函数的执行顺序是什么(如: beforeCreate, created, mounted)? 星级(✶✶✶✶✶)
例如: 组件A有一个子组件B, 那么A, B组件的生命周期钩子函数执行顺序是:
A@beforeCreate -> A@created -> B@beforeCreate -> B@created -> B@mounted -> A@mounted 

### 5.vuex的流程 星级(✶✶✶)

* 页面通过mapAction异步提交事件到action。action通过commit把对应参数同步提交到mutation。
* mutation会修改state中对于的值。 最后通过getter把对应值跑出去，在页面的计算属性中
* 通过mapGetter来动态获取state中的值

### 6.vuex有哪几种状态和属性 星级(✶✶✶)
* state中保存着共有数据，数据是响应式的
* getter可以对state进行计算操作，主要用来过滤一些数据，可以在多组件之间复用
* mutations定义的方法动态修改state中的数据，通过commit提交方法，方法必须是同步的
* actions将mutations里面处理数据的方法变成异步的，就是异步操作数据，通store.dispatch来分发actions，把异步的方法写在actions中，通过commit提交mutations，进行修改数据。
* modules：模块化vuex

### 7.vue路由的两种模式 星级(✶✶✶✶)
* hash, 即地址栏URL中的#符号（此hsah 不是密码学里的散列运算）
  * hash 虽然出现URL中，但不会被包含在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。
* history, 利用了HTML5 History Interface 中新增的pushState() 和replaceState() 方法

这两个方法应用于浏览器的历史记录站，在当前已有的back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改是，虽然改变了当前的URL，但你浏览器不会立即向后端发送请求。

### 8.vue中 key 值的作用 星级(✶✶✶✶)

当 Vue.js 用`v-for`正在更新已渲染过的元素列表时，它默认用“就地复用”策略。
如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

key的作用主要是为了高效的更新虚拟DOM。

### 9. $route和$router的区别 星级(✶✶✶)

* `$route`是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
* `$router`是“路由实例”对象包括了路由的跳转方法，钩子函数等。

### 10.vue-router守卫 星级(✶✶✶✶)

#### 导航守卫 `router.beforeEach` 全局前置守卫 星级(✶✶✶✶)
  * to: Route: 即将要进入的目标（路由对象）
  * from: Route: 当前导航正要离开的路由
  * next: Function: 一定要调用该方法来 resolve 这个钩子。（一定要用这个函数才能去到下一个路由，如果不用就拦截）执行效果依赖 next 方法的调用参数。
    * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
    * next(false): 取消进入路由，url地址重置为from路由地址(也就是将要离开的路由地址)。

``` js
// main.js 入口文件
import router from './router'; // 引入路由
router.beforeEach((to, from, next) => { 
  next();
});
router.beforeResolve((to, from, next) => {
  next();
});
router.afterEach((to, from) => {
  console.log('afterEach 全局后置钩子');
});
```

#### 路由独享的守卫  星级(✶✶✶✶✶)
你可以在路由配置上直接定义 `beforeEnter` 守卫

``` js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

#### 组件内的守卫 星级(✶✶✶✶✶)

你可以在路由组件内直接定义以下路由导航守卫
``` js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用，我们用它来禁止用户离开
    // 可以访问组件实例 `this`
    // 比如还未保存草稿，或者在用户离开前，
  }
}
```

### 11.axios是什么？有什么用?  星级(✶✶✶)

请求后台资源的模块。安装`$ npm install axios`

### 12. axios 如何拦截request/reponse? 如何进行全局响应错误处理? 如何移除拦截器? 星级(✶✶✶✶)

``` js
axios.interceptors.request.use(function(res){
    success
},function(fail){
    error
})

axios.interceptors.response.use(function(res){
    success
},function(fail){
    error
})
```

#### 移除拦截器
``` js
//命名拦截器
var myintercep = axios.interceptors.request.use(function () {/*...*/});
//移除拦截器
axios.interceptors.request.eject(myInterceptor);
```

### 13.vue修饰符 星级(✶✶✶)
* stop：阻止事件的冒泡
* prevent：阻止事件的默认行为
* once：只触发一次
* self：只触发自己的事件行为时，才会执行
* v-if/v-show
* v-for
* v-bind

### 14.vue项目中的性能优化 星级(✶✶✶✶)
* 1.不要在模板里面写过多表达式
* 2.循环调用子组件时添加key
* 3.频繁切换的使用v-show，不频繁切换的使用v-if
* 4.尽量少用float，可以用flex
* 5.按需加载，可以用require或者import()按需加载需要的组件
* 6.路由懒加载

### 15.Vue.extend和Vue.component 星级(✶✶✶✶)
#### Vue.extend
是构造一个组件的语法器。然后这个组件你可以作用到Vue.component这个全局注册方法里
还可以在任意vue模板里使用组件。也可以作用到vue实例或者某个组件中的components属性中并在内部使用apple组件。
#### Vue.component
你可以创建 ，也可以取组件。

### 16. Vue工程性能优化 星级(✶✶✶✶✶)
、webpack打包文件体积过大？（最终打包为一个js文件）
* 1.异步加载模块
* 2.提取第三库
* 3.代码压缩
* 4.去除不必要的插件


### 17. 如何优化webpack构建的性能  星级(✶✶✶✶✶)
* 减少代码体积 
  * 1.使用CommonsChunksPlugin 提取多个chunk之间的通用模块，减少总体代码体积
  * 2.把部分依赖转移到CDN上，避免每次编译过程都由Webpack处理
  * 3.对一些组件库采用按需加载，避免无用的代码
* 减少目录检索范围
	* 在使用loader的时候，通过制定exclude和include选项，减少loader遍历的目录范围，从而加快webpack编译速度
* 减少检索路经
  * resolve.alias可以配置webpack模块解析的别名，对于比较深的解析路经，可以对其配置alias
### 18. Vue单页面应用如何优化加载速度 星级(✶✶✶✶✶)
* 1.减少入口文件体积
* 2.静态资源本地缓存
* 3.开启Gzip压缩
* 4.使用SSR,nuxt.js
### 19. 前端的性能优化 星级(✶✶✶✶✶)
* 首屏加载和按需加载，懒加载
* 资源预加载
* 图片压缩处理，使用base64内嵌图片
* 合理缓存dom对象
* `[移动端]`: 使用touchstart代替click（click 300毫秒的延迟）
* 利用transform:translateZ(0)，开启硬件GUP加速
* 不滥用web字体，不滥用float（布局计算消耗性能），减少font-size声明
* 使用viewport固定屏幕渲染，加速页面渲染内容
* 尽量使用事件代理，避免直接事件绑定

## CSS
### 1. flex布局 星级(✶✶✶✶)
* display:flex, 在父元素设置，子元素受弹性盒影响，默认排成一行，如果超出一行，按比例压缩
* flex:1, 在子元素设置，设置子元素如何分配父元素的空间
  * flex:1, 子元素宽度占满整个父元素
  * align-items:center, 定义子元素在父容器中的对齐方式，center 垂直居中
  * justify-content:center, 设置子元素在父元素中居中，前提是子元素没有把父元素占满，让子元素水平居中。

### 2. CSS3 的新特性 星级(✶✶✶✶✶)
* transition-property, 规定设置过渡效果的 CSS 属性的名称。
* transition-duration, 规定完成过渡效果需要多少秒或毫秒。
* transition-timing-function, 规定速度效果的速度曲线。
* transition-delay, 定义过渡效果何时开始。
* animation属性可以像Flash制作动画一样，通过控制关键帧来控制动画的每一步，实现更为复杂的动画效果。主要由两部分组成：
  * 通过类似Flash动画中的帧来声明一个动画；
  * 在animation属性中调用关键帧声明的动画。

### 3. img中alt和title的区别 星级(✶✶✶✶)
* alt属性, 是在图片不能正常显示时出现的文本提示。alt有利于SEO优化
* title属性, 是在鼠标在移动到元素上的文本提示。

### 4. 用纯CSS创建一个三角形 星级(✶✶✶✶)
``` css
 <style>
    div {
        width: 0;
        height: 0;
        border-top: 40px solid transparent;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
        border-bottom: 40px solid #ff0000;
    }
    </style>
</head>
<body>
  <div></div>
</body>
```

### 5. 如何理解CSS的盒子模型？ 星级(✶✶✶)
* 标准盒子模型：宽度=内容的宽度（content）+ border + padding
* 低版本IE盒子模型：宽度=内容宽度（content+border+padding)

### 6. 如何让一个div水平居中 星级(✶✶✶)
* 已知宽度，block元素 => margin:0 auto
* 已知宽度，绝对定位的居中 => 上下左右都为0, margin:auto
* 未知宽度, display: inline-block, 父元素设置: text-align: center

### 7. 如何让一个div水平垂直居中 星级(✶✶✶)
``` css
/* 绝对定位实现 */
div {
  position: absolute;
  width:500px;
  height:300px;
  top: 50%;
  left: 50%;
  margin-top:-150px;
  margin-left:-250px; /*外边距为自身宽高的一半 */
  background-color: pink; /* 方便看效果 */
}

/* flex实现 */
.container {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */ 
}
```
### 8. 如何清除浮动？ 星级(✶✶✶)
* 添加空div法(clear清除浮动)在浮动元素下方添加空div,并给该元素写css样式`{clear:both;height:0;overflow:hidden;}`
* 给浮动元素父级设置高度
* 父级同时浮动（需要给父级同级元素添加浮动）
* 父级设置成inline-block，其margin: 0 auto居中方式失效
* 给父级添加overflow:hidden 清除浮动方法
* 万能清除法 after伪类 清浮动（现在主流方法，推荐使用）
``` css
float_div:after{
  content:".";
  clear:both;
  display:block;
  height:0;
  overflow:hidden;
  visibility:hidden;
}
.float_div{
  zoom:1
}
```

### 9. CSS3实现三栏布局，左右固定，中间自适应 星级(✶✶✶✶)
``` html
// 圣杯布局/双飞翼布局

 <style>
        * {
            margin: 0;
            padding: 0;
        }
        .middle,
        .left,
        .right {
            position: relative;
            float: left;
            min-height: 130px;
        }
        .container {
            padding: 0 220px 0 200px;
            overflow: hidden;
        }
        .left {
            margin-left: -100%;
            left: -200px;
            width: 200px;
            background: red;
        }
        .right {
            margin-left: -220px;
            right: -220px;
            width: 220px;
            background: green;
        }
        .middle {
            width: 100%;
            background: blue;
            word-break: break-all;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='middle'></div>
        <div class='left'></div>
        <div class='right'></div>
    </div>
</body>
```

### 10.display:none 和 visibility: hidden的区别 星级(✶✶✶)
* display:none 隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，就当他从来不存在。
* visibility:hidden 隐藏对应的元素，但是在文档布局中仍保留原来的空间。

### 11. CSS中 link 和@import 的区别是？ 星级(✶✶✶✶)
* link属于HTML标签，而@import是CSS提供的页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载
* import只在IE5以上才能识别，而link是HTML标签，无兼容问题
* link方式的样式的权重 高于@import的权重.

### 12.position的absolute与fixed共同点与不同点 星级(✶✶✶)
* 共同点：
  * 改变行内元素的呈现方式，display被置为block
  * 让元素脱离普通流，不占据空间
  * 默认会覆盖到非定位元素上
* 不同点：
  * absolute的”根元素“是可以设置的
  * fixed的”根元素“固定为浏览器窗口。当你滚动网页，fixed元素与浏览器窗口之间的距离是不变的。

### 13..transition和animation的区别 星级(✶✶✶✶)
animation和transition大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是:
* transition, 需要触发一个事件才能改变属性，
* animation, 不需要触发任何事件的情况下才会随时间改变属性值，并且transition为2帧，从from .... to，而animation可以一帧一帧的。
* transition, 规定动画的名字, 规定完成过渡效果需要多少秒或毫秒, 规定速度效果, 定义过渡效果何时开始
* animation, 指定要绑定到选择器的关键帧的名称

### 14. CSS优先级 星级(✶✶✶)
不同级别：总结排序：
* !important > 行内样式>ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性
	* 1.属性后面加!import 会覆盖页面内任何位置定义的元素样式
	* 2.作为style属性写在元素内的样式
	* 3.id选择器
	* 4.类选择器
	* 5.标签选择器
	* 6.通配符选择器（*）
	* 7.浏览器自定义或继承
* 同一级别：后写的会覆盖先写的

CSS选择器的解析原则, 选择器定位DOM元素是从右往左的方向，这样可以尽早的过滤掉一些不必要的样式规则和元素

### 15. 雪碧图  星级(✶✶✶✶)
多个图片集成在一个图片中的图, 使用雪碧图可以减少网络请求的次数，加快允许的速度, 通过background-position，去定位图片在屏幕的哪个位置

### 16. 使元素消失的方法 星级(✶✶✶✶)
* 1.opacity：0,该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定了一些事件，如click事件也能触发
* 2.visibility:hidden,该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件
* 3.display:node, 把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删掉

### 17. 常见的兼容问题 星级(✶✶✶✶✶)
* png24位的图片在iE6浏览器上出现背景
  * 解决方案是做成PNG8.也可以引用一段脚本处理.
* 浏览器默认的margin和padding不同。
  * 解决方案是加一个全局的*{margin:0;padding:0;}来统一。
* IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。
* 浮动ie产生的双倍距离（IE6双边距问题：在IE6下，如果对元素设置了浮动，同时又设置了margin-left或margin-right，margin值会加倍。） #box{ float:left; width:10px; margin:0 0 0 100px;}


## 服务端
### 1. HTTP 状态码 星级(✶✶✶✶)
* 2XX（成功处理了请求状态）
  * 200 服务器已经成功处理请求，并提供了请求的网页
  * 201 用户新建或修改数据成功
  * 202 一个请求已经进入后台
  * 204 用户删除成功
* 3XX（每次请求使用的重定向不要超过5次）
  * 304 网页上次请求没有更新，节省带宽和开销
* 4XX（表示请求可能出错，妨碍了服务器的处理）
  * 400 服务器不理解请求的语法
  * 401 用户没有权限（用户名，密码输入错误）
  * 403 用户得到授权（401相反），但是访问被禁止
  * 404 服务器找不到请求的网页，
* 5XX（表示服务器在处理请求的时候发生内部错误）
  * 500 服务器遇到错误，无法完成请求
  * 503 服务器目前无法使用（超载或停机维护）     

### 2. 304的缓存原理（添加Etag标签.last-modified） 304 网页上次请求没有更新，节省带宽和开销 星级(✶✶✶✶✶)
* 1.服务器首先产生Etag,服务器可在稍后使用它来判断页面是否被修改。本质上，客户端通过该记号传回服务器要求服务器验证（客户端）缓存）
* 2.304是	HTTP的状态码，服务器用来标识这个文件没有被修改，不返回内容，浏览器接受到这个状态码会去去找浏览器缓存的文件
* 3.流程：
  * 客户端请求一个页面A。
  * 服务器返回页面A，并在A上加一个Tage客服端渲染该页面，并把Tage也存储在缓存中。
  * 客户端再次请求页面A	并将上次请求的资源和ETage一起传递给服务器。
  * 服务器检查Tage.并且判断出该页面自上次客户端请求之后未被修改。直接返回304

#### last-modified: 
客户端请求资源，同时有一个last-modified的属性标记此文件在服务器最后修改的时间, 客户端第二次请求此url时，根据http协议。浏览器会向服务器发送一个If-Modified-Since报头，
询问该事件之后文件是否被修改，没修改返回304

#### 有了Last-Modified，为什么还要用ETag？
* 1、因为如果在一秒钟之内对一个文件进行两次更改，Last-Modified就会不正确（Last—Modified不能识别秒单位的修改）
* 2、某些服务器不能精确的得到文件的最后修改时间
* 3、一些文件也行会周期新的更改，但是他的内容并不改变（仅仅改变修改的事件），这个时候我们并不希望客户端认为文件被修改，而重新Get

#### ETag，为什么还要用Last-Modified？
* 1、两者互补，ETag的判断的缺陷，比如一些图片等静态文件的修改
* 2、如果每次扫描内容都生成ETag比较，显然要比直接比较修改时间慢的多。

ETag是被请求变量的实体值（文件的索引节，大小和最后修改的时间的Hash值, ETag的值服务器端对文件的索引节，大小和最后的修改的事件进行Hash后得到的。

### 3. get/post的区别 星级(✶✶✶✶)
* get数据是存放在url之后，以？分割url和传输数据，参数之间以&相连； post方法是把提交的数据放在http包的Body中
* get提交的数据大小有限制，（因为浏览器对url的长度有限制），post的方法提交的数据没有限制
* get需要request.queryString来获取变量的值，而post方式通过request.from来获取变量的值
* get的方法提交数据，会带来安全问题，比如登录一个页面，通过get的方式提交数据，用户名和密码就会出现在url上

### 4. http协议的理解 星级(✶✶✶✶✶)
* 1.超文本的传输协议，是用于从万维网服务器超文本传输到本地资源的传输协议
* 2.基于TCP/IP通信协议来传递数据（HTML，图片资源）
* 3.基于运用层的面向对象的协议，由于其简洁、快速的方法、适用于分布式超媒体信息系统
* 4.http请求信息request：
	* 请求行（request line）、请求头部（header）,空行和请求数据四部分构成
    * 请求行，用来说明请求类型,要访问的资源以及所使用的HTTP版本.
	* 请求头部，用来说明服务器要使用的附加信息
	* 空行，请求头部后面的空行是必须的
	* 请求数据也叫主体，可以添加任意的其他数据。
* 5.http相应信息Response
	* 状态行、消息报头、空行和响应正文
  * 状态行，由HTTP协议版本号， 状态码， 状态消息 三部分组成
	* 消息报头，用来说明客户端要使用的一些附加信息
	* 空行，消息报头后面的空行是必须的
	* 响应正文，服务器返回给客户端的文本信息。

### 5. http和https 星级(✶✶✶✶✶)
* https：是以安全为目标的HTTP通道，简单讲是HTTP的安全版本，通过SSL加密
* http：超文本传输协议。是一个客服端和服务器端请求和应答的标准（tcp）,使浏览器更加高效，使网络传输减少

### 6. HTTP 1.0 HTTP 1.1 HTTP 2.0的区别
* 长连接：
  * HTTP1.0需要使用keep-alive参数来告知服务器建立一个长连接
  * HTP1.1默认支持长连接
* 节约宽带：
  * HTTP1.1支持只发送一个header信息（不带任何body信息）
* host域（设置虚拟站点，也就是说，web server上的多个虚拟站点可以共享同一个ip端口）：
  * HTTP1.0没有host域
* HTTP 2.0
  * 1.http2采用的二进制文本传输数据，而非http1文本格式，二进制在协议的解析和扩展更好
  * 2.数据压缩：对信息头采用了HPACK进行压缩传输，节省了信息头带来的网络流量
  * 3.多路复用：一个连接可以并发处理多个请求
  * 4.服务器推送：我们对支持HTTP2.0的web server请求数据的时候，服务器会顺便把一些客户端需要的资源一起推送到客户端，免得客户端再次创建连接发送请求到服务器端获取。这种方式非常合适加载静态资源

### 7. web缓存 星级(✶✶✶✶)
* web缓存就是存在于客户端与服务器之间的一个副本、当你第一个发出请求后，缓存根据请求保存输出内容的副本
* 缓存的好处:
  * 减少不必要的请求
  * 降低服务器的压力，减少服务器的消耗
  * 降低网络延迟，加快页面打开速度（直接读取浏览器的数据）
### 8. 常见的web安全及防护原理 星级(✶✶✶✶✶)
#### sql注入原理：
是将sql代码伪装到输入参数中，传递到服务器解析并执行的一种攻击手法。也就是说，在一些对server端发起的请求参数中植入一些sql代码，server端在执行sql操作时，会拼接对应参数，
同时也将一些sql注入攻击的“sql”拼接起来，导致会执行一些预期之外的操作。

##### 防范：
* 1.对用户输入进行校验
* 2.不适用动态拼接sql

#### XSS（跨站脚本攻击）
往web页面插入恶意的html标签或者js代码。

例如：在论坛放置一个看是安全的链接，窃取cookie中的用户信息
##### 防范：
* 尽量采用post而不使用get提交表单
* 避免cookie中泄漏用户的隐式

#### CSRF(跨站请求伪装）：
通过伪装来自受信任用户的请求

##### 防范
在客服端页面增加伪随机数，通过验证码

#### XSS和CSRF的区别：
* XSS是获取信息，不需要提前知道其他用户页面的代码和数据包
* CSRF代替用户完成指定的动作，需要知道其他页面的代码和数据包

### 9. CDN（内容分发网络）星级(✶✶✶✶✶)
* 1.尽可能的避开互联网有可能影响数据传输速度和稳定性的瓶颈和环节。使内容传输的更快更稳定。
* 2.关键技术：内容存储和分发技术中
* 3.基本原理：广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对的地区或者网络中。当用户访问网络时利用全局负载技术
	    将用户的访问指向距离最近的缓存服务器，由缓存服务器直接相应用户的请求（全局负载技术）

### 10. TCP三次握手	(客服端和服务器端都需要确认各自可收发）星级(✶✶✶✶✶)
客服端发c起请求连接服务器端s确认，服务器端也发起连接确认客服端确认。
第一次握手：客服端发送一个请求连接，服务器端只能确认自己可以接受客服端发送的报文段
第二次握手： 服务端向客服端发送一个链接，确认客服端收到自己发送的报文段
第三次握手： 服务器端确认客服端收到了自己发送的报文段

### 11. 从输入url到获取页面的完整过程  星级(✶✶✶✶✶)
1.查询NDS(域名解析),获取域名对应的IP地址  查询浏览器缓存
2.浏览器与服务器建立tcp链接（三次握手）
3.浏览器向服务器发送http请求(请求和传输数据）
4.服务器接受到这个请求后，根据路经参数，经过后端的一些处理生成html代码返回给浏览器
5.浏览器拿到完整的html页面代码开始解析和渲染，如果遇到外部的css或者js，图片一样的步骤
6.浏览器根据拿到的资源对页面进行渲染，把一个完整的页面呈现出来

### 12. 浏览器渲染原理及流程 星级(✶✶✶✶✶)

* DOM -> CSSOM -> render -> layout -> print
* 流程：解析html以及构建dom树 -> 构建render树 ->  布局render树 -> 绘制render树
* 概念：
  * 1.构建DOM树： 渲染引擎解析HTML文档，首先将标签转换成DOM树中的DOM node(包括js生成的标签)生成内容树
  * 2.构建渲染树： 解析对应的css样式文件信息（包括js生成的样式和外部的css）
  * 3.布局渲染树：从根节点递归调用，计算每一个元素的大小，位置等。给出每个节点所在的屏幕的精准位置
  * 4.绘制渲染树：遍历渲染树，使用UI后端层来绘制每一个节点
* 重绘：当盒子的位置、大小以及其他属性，例如颜色、字体大小等到确定下来之后，浏览器便把这些颜色都按照各自的特性绘制一遍，将内容呈现在页面上
	* 触发重绘的条件：改变元素外观属性。如：color，background-color等
	* 重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观

> 注意：table及其内部元素需要多次计算才能确定好其在渲染树中节点的属性值，比同等元素要多发时间，要尽量避免使用table布局

* 重排（重构/回流/reflow）： 当渲染书中的一部分（或全部）因为元素的规模尺寸，布局，隐藏等改变而需要重新构建，这就是回流。每个页面都需要一次回流，就是页面第一次渲染的时候
  * 重排一定会影响重绘，但是重绘不一定会影响重排
### 13. 为什么css放在顶部而js写在后面 星级(✶✶✶✶)
* 1.浏览器预先加载css后，可以不必等待HTML加载完毕就可以渲染页面了
* 2.其实HTML渲染并不会等到完全加载完在渲染页面，而是一边解析DOM一边渲染。
* 3.js写在尾部，主要是因为js主要扮演事件处理的功能，一方面很多操作是在页面渲染后才执行的。另一方面可以节省加载时间，使页面能够更加的加载，提高用户的良好体验

但是随着JS技术的发展，JS也开始承担页面渲染的工作。比如我们的UI其实可以分被对待，把渲染页面的js放在前面，时间处理的js放在后面
### 14. 存储方式与传输方式 星级(✶✶✶✶✶)
* 1.indexBD: 是HTML5的本地存储库，把一些数据存储到浏览器中，没网络，浏览器可以从这里读取数据，离线运用。5m
* 2.Cookie: 通过浏览器记录信息确认用户身份，最大4kb,这也就限制了传输的数据，请求的性能会受到影响
* 3.Session: 服务器端使用的一种记录客户状态的机制（session_id存在set_cookie发送到客服端，保存为cookie）
* 4.localStroage: h5的本地存储，数据永久保存在客服端

#### cookie，sessionStorage，localStorage
1、cookie，sessionStorage，localStorage是存放在客户端，session对象数据是存放在服务器上
实际上浏览器和服务器之间仅需传递session id即可，服务器根据session-id找到对应的用户session对象
session存储数据更安全一些，一般存放用户信息，浏览器只适合存储一般的数据

2、cookie数据始终在同源的http请求中携带，在浏览器和服务器来回传递，里面存放着session-id
sessionStorage，localStorage仅在本地保存

3、大小限制区别，cookie数据不超过4kb，localStorage在谷歌浏览中2.6MB

4、数据有效期不同，cookie在设置的（服务器设置）有效期内有效，不管窗口和浏览器关闭
sessionStorage仅在当前浏览器窗口关闭前有效，关闭即销毁（临时存储）
localStorage始终有效

#### SessionStorage和localStorage区别：星级(✶✶✶✶)
1.sessionStorage用于本地存储一个会话（session）中的数据，这些数据只有在用一个会话的页面中才能被访问（也就是说在第一次通信过程中）
并且在会话结束后数据也随之销毁，不是一个持久的本地存储，会话级别的储存
2.localStorage用于持久化的本地存储，除非主动删除数据，否则不会过期

#### token、cookie、session三者的理解？星级(✶✶✶✶✶)
1、token就是令牌，比如你授权(登录)一个程序时,他就是个依据,判断你是否已经授权该软件（最好的身份认证，安全性好，且是唯一的）用户身份的验证方式  
2、cookie是写在客户端一个txt文件，里面包括登录信息之类的，这样你下次在登录某个网站，就会自动调用cookie自动登录用户名, 由服务器生成，发送到浏览器、浏览器保存，下次请求再次发送给服务器（存放着登录信息）
3、session是一类用来客户端和服务器之间保存状态的解决方案，会话完成被销毁（代表的就是服务器和客户端的一次会话过程）cookie中存放着sessionID，请求会发送这个id。sesion因为request对象而产生。

#### 基于Token的身份验证：（最简单的token: uid用户唯一的身份识别 + time当前事件戳 + sign签名）星级(✶✶✶✶✶)
* 1、用户通过用户名和密码发送请求
* 2、服务器端验证
* 3、服务器端返回一个带签名的token，给客户端
* 4、客户端储存token，并且每次用于发送请求
* 5、服务器验证token并且返回数据
> 每一次请求都需要token


#### cookie与session区别 星级(✶✶✶✶✶)
* 1、cookie数据存放在客户的浏览器上，session数据放在服务器上。
* 2、cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗考虑到安全应当使用session。
* 3、session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用COOKIE。
* 4、单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

#### session与token区别 星级(✶✶✶✶✶)
* 1、session认证只是把简单的User的信息存储Session里面，sessionID不可预测，一种认证手段。只存在服务端，不能共享到其他的网站和第三方App
* 2、token是oAuth Token，提供的是认证和授权，认证针对用户，授权是针对App，目的就是让某APP有权访问某用户的的信息。Token是唯一的，token不能转移到其他的App，也不能转到其他用户上。（适用于App）
* 3、session的状态是存在服务器端的，客户端只存在session id， Token状态是存储在客户端的

#### Cookie的弊端有哪些？？？（优势：保存客户端数据，分担了服务器存储的负担）星级(✶✶✶✶✶)
* 1、数量和长度的限制。每个特定的域名下最多生成20个cookie（chorme和safari没有限制）
* 2、安全性问题。

### 15. 设计模式 星级(✶✶✶✶✶)
#### 观察者模式 
在软件开发设计中是一个对象(subject)，维护一系列依赖他的对象（observer），当任何状态发生改变自动通知他们。强依赖关系
简单理解：数据发生改变时，对应的处理函数就会自动执行。一个Subjet,用来维护Observers,为某些event来通知（notify）观察者

#### 发布-订阅者(有一个信息中介，过滤 耦合性低)
它定义了一种一对多的关系，可以使多个观察者对象对一个主题对象进行监听，当这个主题对象发生改变时，依赖的所有对象都会被通知到。

两者的区别：
* 1.观察者模式中，观察者知道Subject ,两者是相关联的，而发发布订阅者只有通过信息代理进行通信
* 2.在发布订阅模式中，组件式松散耦合的。正好和观察者模式相反。
* 3.观察者大部分是同步的，比如事件的触发。Subject就会调用观察者的方法。而发布订阅者大多数是异步的（）
* 4.观察者模式需要在单个应用程序地址空间中实现，而发布订阅者更像交叉应用模式。

### 16. 常用排序算法 星级(✶✶✶✶✶)
#### 1. 冒泡排序 星级(✶✶✶✶)
重复走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把它们交换过来。

实现过程：
  * 比较相邻的元素。如果第一个比第二个大，就交换他们两个
  * 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数
  * 针对所有的元素重复以上的步骤，除了最后一个
  * 重复步骤1-3，直到排序完成。

#### 2. 快速排序 星级(✶✶✶✶)
快速排序使用分治法把一个串（list）分为两个子串

实现过程:
* 1.从数组中挑出一个元素，成为一个基准
* 2.重新排列数组，所有元素比基准小的摆在基准前面，所有元素比基准大的摆在基准后面（相同的可以摆在一边）这个分区退出之后，该基准就处于数列的中间位置。成为分区操作。
* 3.递归的把小于基准值的子数列和大于基准值元素的子数列排序

算法实现： 
``` js
function quickSort (arr) {
  if （arr.length <= 1） {return arr}
  var destIndex = Math.floor(arr.length/2)
  var left = [], right = [];
  var dest = arr.splice(destIndex,1)[0];
  for (var i =0;i<arr.length;i++){
    if (arr[i]<dest) {
    left.push(arr[i])
    } else {
    right.push(arr[i]) 
    }
  }
  return quickSort(left).concat([dest],quickSort(right)
}
```
#### 3. 二分查找（有序数组的查找）(✶✶✶✶✶)
二分查找可以解决已排序数组的查找问题，即只要数组中包含T(要查找的值)，那么通过不断的缩小包含T的数据范围，就可以最终要找到的数
* 一开始,数据范围覆盖整个数组。
* 将数组的中间项与T进行比较，如果T比数组的中间项小，则到数组的前半部分继续查找，反之，则到数组的后半部分继续查找。
* 就这样，每次查找都可以排除一半元素，相当于范围缩小一半。这样反复比较，反复缩小范围，最终会在数组中找到T

代码实现：
``` js
function binarySearch (data, dest, start, end){
  var end = end || data.length-1;
  var start = start || 0;
  var m = Math.floor((start+end)/2);
  if (dest<data[m]){
    return binarySearch(data, dest, 0, m-1)
  } else {
    return binarySearch(data, dest, m+1, end)
  }
  return false;
}
```