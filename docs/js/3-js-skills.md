# JavaScript实用开发技巧

## 尽量按强类型风格编码
JavaScript是弱类型语言, 但在编码太过随意, 也会惹出不少麻烦. 如果可以, 推荐使用TypeScript. 
下面分几个典型案例讲解下
### 1. 变量声明时即赋值, 以便知晓变量初始为什么数据类型.

``` js
// bad
var numVar, strVar, objVar;
```

> 虽然声明了3个变量, 但JavaScript解释器并不知晓它的类型. 


``` js
// good
var numVar = 0, strVar = '', objVar = {};
```

> 定义变量时并赋值, 会方便JavaScript解释器, 同时也增强了代码可读性, 让代码阅读者大体知道这些变量将会有什么用.

### 2. 不可随意改变变量类型

``` js
// bad
var num = 5;
num = "-" + num;
```

> 这样会使代码阅读者增加比较大的困难, 特别是代码量比较多的情况下. 应尽量避免改变变量的类型, 如果有需要, 可以再定义一个临时变量. 

``` js
// good
var num = 5;
var tempStr = "-" + num;
```

### 3. 函数返回类型要明确
``` js
// bad
function getCount(count){
    if(count < 0) return "";
    else return count * 100;
}
```

函数`getCount`有可能会返回两种类型的返回值:
* 空字符串
* 数字

虽然JavaScript允许这样写, 但这种编码风格很好, 其他人在使用这个函数时可能会比较痛苦. 如果使用者对返回值不做判断, 而直接做加减乘除法, 可能会得到NaN. 

**函数的返回值类型应当确定**


``` js
// good
function getCount(count){
    if(count < 0) return -1;
    else return count * 100;
}
```

## 减少作用域的查找

### 1. 尽量不要让代码暴露在window(全局作用域下)
``` html
// bad
<script>
  var canvas = document.querySelector("#canvas-warpper");
  canvas.style.width = "600px";
  canvas.style.height = "600px";
</script>
```
上例中, 代码的上下文都是全局作用域(window). 
由于全局作用域比较复杂，查找比较慢。同时也可能会污染全局变量. 

> JavaScript变量值在查找时, 优先查找当前作用域链, 如果查找不到, 会向上级作用域链中查找, 然后层层向上级查找, 最终会在全局作用域中查找, 如果实在找不到, 就会报错.

``` html
// good
<script>
(function(){
  var canvas = document.querySelector("#canvas-warpper");
  canvas.style.width = "600px";
  canvas.style.height = "600px";
})(window, undefined)
</script>
```

这里使用到了一个自执行函数, 从而形成一个局部作用域, 以避免上例中出现的问题.  如果使用ES6编码, 可以考虑使用ES6中的块级作用域来规避上例中的问题. 

### 2. 慎用闭包
闭包的作用在于可以让子级作用域使用它父级作用域的变量，同时这些变量在不同的闭包是不可见的。

合理的使用闭包, 可以帮助我们解决一些麻烦的事情, 比如代码封装对外不见.

但如果使用不当, 可以会导致在查找某个变量时, 必须要向父级作用域查找，一级一级向上查找。若闭包嵌套得很深，那查找的时间可能就很长。

``` js
function getResult(count){
    count++;
    function process(){
        var factor = 2;
        return count * factor - 5;
    }
    return process();
}
```
上例的process函数中count变量的查找时间, 显然高于局部变量factor. 其实上例中的代码, 不太适合使用闭包, 可以考虑将count传递到process函数中:
``` js
// good
function getResult(count){
    count++;
    function process(count){
        var factor = 2;
        return count * factor - 5;
    }
    return process(count);
}
```
此时, count和factor两个变量的查找时间是一样的了, 都在当前作用域中直接命中. 如果一个全局变量需要经常使用, 可以考虑使用一个局部变量缓存一下.

例如:
``` js
// bad
var url = "";
if(window.location.protocal === "https:"){
    url = "https://example.com" + window.location.pathname + window.location.search;
}
```
频繁地使用了window.location对象，所以可以先把它缓存一下：

``` js
// good
var url = "";
var location = window.location;
if(location.protocal === "https:"){
    url = "https://example.com" + location.pathname + location.search;
}
```

## 3. 避免使用`==`
`==`和`===`有什么区别呢?
* `==`, 可能会对两边的数据转换, 并对值进行比较
* `===`, 不会对值进行转换, 通过比较两边变量或值的引用地址, 来判断是否相等. 

### 1. 如果变量类型确定, 不可使用`==`
``` js
// bad
if(typeof num != "undefined"){
  // do something
} 
var num = parseInt(value);
if(num == 10){
  // do something
}
```
上例中变量类型都是确定的, 因此最好不用`==`
``` js
// good
if(typeof num !== "undefined"){
  // do something
} 
var num = parseInt(value);
if(num === 10){
  // do something
}
```

### 2. 如果变量类型不确定, 尽量手动进行类型转换, 避免让代码阅读者去猜测类型转换
``` js
// good
var totalPage = "5";
if(parseInt(totalPage) === 1){
  // do something
}
```

### 3. 使用`==`会被ESlint检查不能过
``` js
if(a == b){
  // do something
}
```
如下ESlint的输出：

```
Expected ‘===’ and instead saw ‘==’. 
if(a == b){
```

### 4. 使用`==`, 可能会产生异外情况, 从而给代码埋下隐患
``` js
null == undefined           //true
'' == '0'                   //false
0  == ''                    //true
0  == '0'                   //true
'' == 0                     //true
new String("abc") == "abc"  //true
new Boolean(true) == true   //true
true == 1                   //true
```

null居然会等于undefined，因为null和undefined是两个毫无关系的值，null应该是作为初始化空值使用，而undefined是用于检验某个变量是否未定义。

## 合并表达式
### 1. 用三目运算符取代简单的if/else

``` js
function getCount(count){
    if(count < 0) return -1;
    else return count * 100;
}
```
可以改成：
``` js
function getCount(count){
    return count < 0 ? return -1 : count * 100;
}
```

这样写, 会比if/else好看多了. 但也需要注意的是, 如果if/else之类的条件判断较多或比较复杂时, 应该考虑其他方式来实现. 
三目运算符应仅限于比较简单的if/else判断的场景, 不要过度使用三目运算符, 太偏了, 可能会收到不好的效果. 

### 2. 自增

利用自增也可以简化代码。例如:
``` js
window.hwit.sendMessage(msgId++, msg);
```

## 减少"魔鬼变量"

例如，在某个文件的第xxxx行，发现有这么一段代码:
``` js
messageHander.show("seller", "seil", 5, true);
```
这样的代码, 很容易让人难以理解4个变量分别代码什么? 如果不去检查函数定义, 很难理解这些常量有什么用? 这些意义不明的常量, 我称之为"魔鬼变量"

所以最好还是给这些常量取一个名字，特别是在一些比较关键的地方。例如上面的代码可改成：
``` js

var sender = "seller", messageType = "sell", messageId = 5, isRefreshMessageBox = true;

...
messageHander.show(sender, messageType, messageId, isRefreshMessageBox);
```
这样意义就很明显了。

## ES6使用技巧
ES6已经发展很多年了，许多现代浏览器对其兼容性也已经很好了。并且webpack等打包工具会对ES6语法进行转换. 

合理的使用ES6语法，可以让代码更加地简洁。

### 1. 使用箭头函数代替匿名函数
有很多使用匿名函数的场景，此时用箭头函数一行, 就显得很方便了.
``` js
var nums = [4, 8, 1, 9, 0];
nums.sort(function(a, b){
    return b - a;
});
//output: [9, 8, 4, 1, 0]
```
上例如果用箭头函数的话, 代码会简洁很多：
``` js
var nums = [4, 8, 1, 9, 0];
nums.sort(a, b => b - a);
```
### 2. class
使用ES6的class与使用function的prototype本质是一样的, 都是用原型. 但使用class会更易于进行面向对象开发.  
``` js
// ES5 模拟面向对象编程
function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.setName = function(name){
    this.name = name
};
Person.prototype.getName = function(){
    return this.name
};
```

``` js
// ES6 面向对象编程
class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    getName(){
        return this.name
    }

    setName(name){
        this.name = name
    }
}
```

在ES6中, 可以使用class & extend可以方便地实现继承、静态的成员函数，就不需要自己再去通过一些技巧去实现了。

### 3. 善用模板字符
善用模板字符
``` js
// bad
var temp = 
    '<div>' + 
    '    <span>hello james</span>' +
    '</div>';
```

``` js
// good
var temp = 
`   <div>
        <span>hello james</span>
    </div>
`;
```


``` js
// bad
var username = 'james', num = 10
var userListApi = "/list?num=" + num + "&username=" + username;
```

``` js
// good
var userListApi = `/list?num=${num}&username=${username}`;
```

### 4. 块级作用域变量 

块级作用域变量是ES6的一个特色. 有了块级作用域, 就方便很多了. 

下面的代码是一个任务队列的模型抽象：
``` js
var tasks = [];
for(var i = 0; i < 4; i++){
    tasks.push(function(){
        console.log("i is " + i);
    });
}

for(var j = 0; j < tasks.length; j++){
    tasks[j]();
}
```
但是上面代码的执行输出是4，4，4，4，并不是想要输出：0，1，2，3
所以每个task就不能取到它的index了，这是因为闭包都是用的同一个i变量，i已经变成4了，所以执行闭包的时候就都是4了。那怎么办呢？可以这样解决：

``` js
var tasks = [];
for(var i = 0; i < 4; i++){
    !function(k){
        tasks.push(function(){
            console.log("i is " + k);
        });
    }(i);
}

for(var j = 0; j < tasks.length; j++){
    tasks[j]();
}
```
把i赋值给了k，由于k它是一个function的一个参数，每次执行函数的时候，肯定会实例化新的k，所以每次的k都是不同的变量，这样就输出就正常了。

如果用ES6，实现起来就简单很多了! 只要把`var`改成`let`就行, 因为有块级作用域. 
``` js
var tasks = [];
for(let i = 0; i <= 4; i++){
    tasks.push(function(){
        console.log("i is " + i);
    });
}
for(var j = 0; j < tasks.length; j++){
    tasks[j]();
}
```
### 5. 解构赋值
#### 1) 基础使用
在ES6中新增解构赋值的语法, 解决了很多在变量赋值时的麻烦.
``` js
// ES5
var s = [1,2,3,4];
var a = s[0];
var b = s[2];
```

``` js
// good
let s = [1,2,3,4];
let {first, second} = s
```
#### 2) 使用默认值

如果想按强类型的语法来编写, 可以考虑给`first`给一个默认值, 如果没有取到值, 就使用默认值. 
``` js
// good
let s = [1,2,3,4];
let {first = paramRequired('first'), second = paramRequired('second')} = s

function paramRequired(key) {
    throw new Error(`Param: ${key} is required!`)
}
```
#### 3) 解构赋值时使用别名

在解构赋值时, 也可以使用不同变量赋值
``` js
let element = {
    tag : 'div',
    text : 'hello james'
};
let {tag:localTag,text:localText} = element;
console.log(localTag);//'div'
console.log(localText);//'hello james'
```

#### 4) 嵌套对象/数组中的提取
如果对象嵌套层次较多, 也可以深入到嵌套的对象结构中提取想要的数据
``` js
let element = {
    tag: 'div',
    text: 'hello james',
    attrs: {
        dataIndex: 1,
        userInfo: {
            name: 'jameszhang'
        }
    }
}
let { attrs: { userInfo:userIdenInfo = paramRequired('userIdenInfo') }} = element;
console.log(userIdenInfo.name)

function paramRequired(key) {
    throw new Error(`Param: ${key} is required!`)
}
```
如果上例中的`userInfo`的值为undefined, 则会触发paramRequired函数的执行, 最终会给出一个出错提示.
``` js
VM1642:12 Uncaught Error: Param: userIdenInfo is required!
    at paramRequired (<anonymous>:12:11)
    at <anonymous>:8:40
```
同样的, 如果是一个多维数组, 可以通过深入到嵌套的数组结构中取得想要的数据.
``` js
let colors = [ "red", [ "green", "lightgreen" ], "blue" ];
let [first, [second]] = colors
console.log(second) // output: green
```

#### 5) 数组剩余项赋值
数组解构有个与函数的剩余参数类似的, 名为剩余项（ rest items ）的概
念，它使用`...`语法来将剩余的项目赋值给一个指定的变量
``` js
let colors = [ "red", "green", "blue" ];
let [ firstColor, ...restColors ] = colors;
console.log(firstColor); // "red"
console.log(restColors.length); // 2
console.log(restColors[0]); // "green"
console.log(restColors[1]); // "blue"
```

#### 6) 混合解构
对象中包含有多种数据类型, 如包含有: 数组, 对象, 函数等等. 例如
``` js
let vnode = {
    tag: 'user-info',
    text: 'hello james',
    attrs: {
        ref: 'userId'
    },
    children: [
        {
            tag: 'user-name'
        },
        {
            tag: 'user-profile'
        }
    ]
}
let {attrs: {ref}, children: [first, second]} = vnode
console.log(ref, first.tag, second.tag) // output: userId user-name user-profile
```
#### 7) 函数参数解析
如果上例中的vnode作为函数的参数传入使用, 也可以考虑使用解构赋值来实现. 例如:
``` js
function handleNode({attrs: {ref}, children: [firstChild, secondChild]}) {
    console.log(ref, firstChild, secondChild)
}
handleNode(vnode)
```

### 6. Promise
// todo