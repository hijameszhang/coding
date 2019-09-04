# JavaScript 面试题

### 1. 下面代码的输出是什么？
``` js
function sayHi() {
  console.log(name);
  console.log(age);
  var name = "Lydia";
  let age = 21;
}

sayHi();
```

* A: Lydia 和 undefined
* B: Lydia 和 ReferenceError
* C: ReferenceError 和 21
* D: undefined 和 ReferenceError

<details>
  <summary><mark>点击查看答案</mark></summary>
> 答案: D

解析:

在函数中，我们首先使用`var`关键字声明了name变量。 这意味着变量在创建阶段会被提升（JavaScript会在创建变量创建阶段为其分配内存空间），默认值为`undefined`，直到我们实际执行到使用该变量的行。 
我们还没有为name变量赋值，所以它仍然保持undefined的值。

使用`let`关键字（和`const`）声明的变量也会存在变量提升，但与`var`不同，初始化没有被提升。 在我们声明（初始化）它们之前，它们是不可访问的。 这被称为“暂时死区”。 当我们在声明变量之前尝试访问变量时，JavaScript会抛出一个ReferenceError。

关于let的是否存在变量提升，我们何以用下面的例子来验证：
``` js
let name = 'ConardLi'
{
  console.log(name) // Uncaught ReferenceError: name is not defined
  let name = 'code秘密花园'
}
```
let变量如果不存在变量提升，console.log(name)就会输出ConardLi，结果却抛出了ReferenceError，那么这很好的说明了，let也存在变量提升，但是它存在一个“暂时死区”，在变量未初始化或赋值前不允许访问。

变量的赋值可以分为三个阶段：
* 创建变量，在内存中开辟空间
* 初始化变量，将变量初始化为undefined
* 真正赋值

关于let、var和function：
* let 的「创建」过程被提升了，但是初始化没有提升。
* var 的「创建」和「初始化」都被提升了。
* function 的「创建」「初始化」和「赋值」都被提升了。
</details>



### 2. 下面代码的输出是什么?
``` js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```

* A: 0 1 2 and 0 1 2
* B: 0 1 2 and 3 3 3
* C: 3 3 3 and 0 1 2

<details>
  <summary><mark>点击查看答案</mark></summary>
> 答案: C

由于JavaScript中的事件执行机制，setTimeout函数真正被执行时，循环已经走完。 
由于第一个循环中的变量i是使用var关键字声明的，因此该值是全局的。 
在循环期间，我们每次使用一元运算符++都会将i的值增加1。 
因此在第一个例子中，当调用setTimeout函数时，i已经被赋值为3。

在第二个循环中，使用let关键字声明变量i：
使用let（和const）关键字声明的变量是具有块作用域的（块是{}之间的任何东西）。 
在每次迭代期间，i将被创建为一个新值，并且每个值都会存在于循环内的块级作用域。

</details>


### 3. 下面代码的输出是什么?
``` js
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius
};

shape.diameter();
shape.perimeter();
```

* A: 20 and 62.83185307179586
* B: 20 and NaN
* C: 20 and 63
* D: NaN and 63

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

::: tip
diameter是普通函数，而perimeter是箭头函数。
:::

对于箭头函数，this关键字指向是它所在上下文（定义时的位置）的环境，与普通函数不同！ 
这意味着当我们调用perimeter时，它不是指向shape对象，而是指其定义时的环境（window）。
没有值radius属性，返回undefined。
</details>


### 4. 下面代码的输出是什么?
``` js
+true;
!"Lydia";
```

* A: 1 and false
* B: false and NaN
* C: false and false

<details>
  <summary><mark>点击查看答案</mark></summary>
> 答案: A

一元加号会尝试将boolean类型转换为数字类型。 true被转换为1，false被转换为0。

字符串'Lydia'是一个真值。 
我们实际上要问的是“这个真值是假的吗？”。 这会返回false。
</details>


### 5. 哪个选项是不正确的?
``` js
const bird = {
  size: "small"
};

const mouse = {
  name: "Mickey",
  small: true
};
```

* A: mouse.bird.size
* B: mouse[bird.size]
* C: mouse[bird["size"]]
* D: All of them are valid

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

在JavaScript中，所有对象键都是字符串（除了Symbol）。
尽管有时我们可能不会给定字符串类型，但它们总是被转换为字符串。

JavaScript解释语句。当我们使用方括号表示法时，它会看到第一个左括号`[`，然后继续，直到找到右括号`]`。只有在那个时候，它才会对这个语句求值。

`mouse[bird.size]`：首先它会对bird.size求值，得到small。` mouse[“small”]`返回true。

但是，使用点表示法，这不会发生。 mouse没有名为bird的键，这意味着mouse.bird是undefined。
然后，我们使用点符号来询问size：mouse.bird.size。 
由于mouse.bird是undefined，我们实际上是在询问undefined.size。 这是无效的，并将抛出Cannot read property "size" of undefined。
</details>


### 6. 下面代码的输出是什么?
``` js
let c = { greeting: "Hey!" };
let d;

d = c;
c.greeting = "Hello";
console.log(d.greeting);
```

* A: Hello
* B: undefined
* C: ReferenceError
* D: TypeError

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A
在JavaScript中，当设置它们彼此相等时，所有对象都通过引用进行交互。

首先，变量c为对象保存一个值。 之后，我们将d指定为c与对象相同的引用。

更改一个对象时，可以更改所有对象。
</details>

### 7. 下面代码的输出是什么?
``` js
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

* A: true false true
* B: false false true
* C: true false false
* D: false true true

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

`new Number（）`是一个内置的函数构造函数。 虽然它看起来像一个数字，但它并不是一个真正的数字：它有一堆额外的功能，是一个对象。

当我们使用`==`运算符时，它只检查它是否具有相同的值。 他们都有3的值，所以它返回true。

> `==`会引发隐式类型转换，右侧的对象类型会自动拆箱为Number类型。

然而，当我们使用`===`操作符时，类型和值都需要相等，`new Number()`不是一个数字，是一个对象类型。两者都返回 false。
</details>


### 8. 下面代码的输出是什么?
``` js
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
  }

  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: "purple" });
freddie.colorChange("orange");
```

* A: orange
* B: purple
* C: green
* D: TypeError

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: D

colorChange方法是静态的。 
静态方法仅在创建它们的构造函数中存在，并且不能传递给任何子级。 
由于freddie是一个子级对象，函数不会传递，所以在freddie实例上不存在freddie方法：抛出TypeError。
</details>


### 9. 下面代码的输出是什么?
``` js
let greeting;
greetign = {}; // Typo!
console.log(greetign);
```

* A: {}
* B: ReferenceError: greetign is not defined
* C: undefined

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

控制台会输出空对象，因为我们刚刚在全局对象上创建了一个空对象！ 
当我们错误地将greeting输入为greetign时，JS解释器实际上在浏览器中将其视为`global.greetign = {}`（或`window.greetign = {}`）。

为了避免这种情况，我们可以使用**use strict**。 这可以确保在将变量赋值之前必须声明变量。
</details>

### 10. 当我们这样做时会发生什么?
``` js
function bark() {
  console.log("Woof!");
}

bark.animal = "dog";
```

* A: Nothing, this is totally fine!
* B: SyntaxError. You cannot add properties to a function this way.
* C: undefined
* D: ReferenceError

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

这在JavaScript中是可能的，因为函数也是对象！（原始类型之外的所有东西都是对象）

函数是一种特殊类型的对象。您自己编写的代码并不是实际的函数。 该函数是具有属性的对象，此属性是可调用的。
</details>


### 11. 下面代码的输出是什么?
``` js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = () => this.firstName + this.lastName;

console.log(member.getFullName());
```

* A: TypeError
* B: SyntaxError
* C: Lydia Hallie
* D: undefined undefined

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

您不能像使用常规对象那样向构造函数添加属性。 
如果要一次向所有对象添加功能，则必须使用原型。 所以在这种情况下应该这样写：

``` js
Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}
```

这样会使`member.getFullName()`是可用的，为什么样做是对的？ 
假设我们将此方法添加到构造函数本身。 也许不是每个Person实例都需要这种方法。
这会浪费大量内存空间，因为它们仍然具有该属性，这占用了每个实例的内存空间。 
相反，如果我们只将它添加到原型中，我们只需将它放在内存中的一个位置，但它们都可以访问它！

</details>

### 12. 下面代码的输出是什么?
``` js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person("Lydia", "Hallie");
const sarah = Person("Sarah", "Smith");

console.log(lydia);
console.log(sarah);
```

* A: Person {firstName: "Lydia", lastName: "Hallie"} and undefined
* B: Person {firstName: "Lydia", lastName: "Hallie"} and Person {firstName: "Sarah", lastName: "Smith"}
* C: Person {firstName: "Lydia", lastName: "Hallie"} and {}
* D:Person {firstName: "Lydia", lastName: "Hallie"} and ReferenceError

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

对于sarah，我们没有使用`new`关键字。 使用`new`时，它指的是我们创建的新空对象。 
但是，如果你不添加new它指的是全局对象！

我们指定了this.firstName等于'Sarah和this.lastName等于Smith。 我们实际做的是定义`global.firstName ='Sarah'`和`global.lastName ='Smith`。 sarah本身的返回值是`undefined`。
</details>

### 13. 事件传播的三个阶段是什么？?
* A: 目标 `>` 捕获 `>` 冒泡
* B: 冒泡 `>` 目标 `>` 捕获
* C: 目标 `>` 冒泡 `>` 捕获
* D: 捕获 `>` 目标 `>` 冒泡

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: D

在捕获阶段，事件通过父元素向下传递到目标元素。 然后它到达目标元素，冒泡开始。
</details>

### 14. 所有对象都有原型.

* A: 对
* B: 错误

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

除基础对象外，所有对象都有原型。 基础对象可以访问某些方法和属性，例如`.toString`。 
这就是您可以使用内置JavaScript方法的原因！ 
所有这些方法都可以在原型上找到。 
虽然JavaScript无法直接在您的对象上找到它，但它会沿着原型链向下寻找并在那里找到它，这使您可以访问它。

::: tip 
基础对象指原型链终点的对象。基础对象的原型是null。
:::
</details>

### 15. 下面代码的输出是什么?
``` js
function sum(a, b) {
  return a + b;
}

sum(1, "2");
```

* A: NaN
* B: TypeError
* C: "12"
* D: 3

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

JavaScript是一种动态类型语言：我们没有指定某些变量的类型。 在您不知情的情况下，值可以自动转换为另一种类型，称为隐式类型转换。 强制从一种类型转换为另一种类型。

在此示例中，JavaScript将数字1转换为字符串，以使函数有意义并返回值。 在让数字类型和字符串类型相加时，该数字被视为字符串。 我们可以连接像`“Hello”+“World”`这样的字符串，所以这里发生的是`“1”+“2”`返回`“12”`。
</details>

### 16. 下面代码的输出是什么?
``` js
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```

* A: 1 1 2
* B: 1 2 2
* C: 0 2 2
* D: 0 1 2

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

* 后缀一元运算符++：返回值（返回0), 增加值（数字现在是1）
* 前缀一元运算符++：增加值（数字现在是2）
* 返回值（返回2）

所以返回0 2 2。
</details>



### 17. 下面代码的输出是什么?
``` js
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = "Lydia";
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

* A: Lydia 21 ["", "is", "years old"]
* B: ["", "is", "years old"] Lydia 21
* C: Lydia ["", "is", "years old"] 21

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

如果使用标记的模板字符串，则第一个参数的值始终是字符串值的数组。 其余参数获取传递到模板字符串中的表达式的值！
</details>

### 18. 下面代码的输出是什么?
``` js
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log("You are an adult!");
  } else if (data == { age: 18 }) {
    console.log("You are still an adult.");
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });
```

* A: You are an adult!
* B: You are still an adult.
* C: Hmm.. You don't have an age I guess

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

在比较相等性，原始类型通过它们的值进行比较，而对象通过它们的引用进行比较。JavaScript检查对象是否具有对内存中相同位置的引用。

我们作为参数传递的对象和我们用于检查相等性的对象在内存中位于不同位置，所以它们的引用是不同的。

这就是为什么`{ age: 18 } === { age: 18 }`和 `{ age: 18 } == { age: 18 }` 返回 false的原因。

</details>

### 19. 下面代码的输出是什么?
``` js
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
```

* A: "number"
* B: "array"
* C: "object"
* D: "NaN"

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

扩展运算符`（... args）`返回一个带参数的数组。 数组是一个对象，因此`typeof args`返回`object`。
</details>

### 20. 下面代码的输出是什么?
``` js
function getAge() {
  "use strict";
  age = 21;
  console.log(age);
}

getAge();
```

* A: 21
* B: undefined
* C: ReferenceError
* D: TypeError

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

使用`use strict`，可以确保不会意外地声明全局变量。 
我们从未声明变量age，因为我们使用`use strict`，它会引发一个`ReferenceError`。 如果我们不使用`use strict`，它就会起作用，因为属性age会被添加到全局对象中。
</details>

### 21. 下面代码的输出是什么?
``` js
const sum = eval("10*10+5");
```

* A: 105
* B: "105"
* C: TypeError
* D: "10*10+5"

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

eval会为字符串传递的代码求值。 如果它是一个表达式，就像在这种情况下一样，它会计算表达式。 表达式为10 * 10 + 5计算得到105。
</details>

### 22. cool_secret可以访问多长时间?
``` js
sessionStorage.setItem("cool_secret", 123);
```

* A：永远，数据不会丢失。
* B：用户关闭选项卡时。
* C：当用户关闭整个浏览器时，不仅是选项卡。
* D：用户关闭计算机时。

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

关闭选项卡后，将删除存储在`sessionStorage`中的数据。

如果使用localStorage，数据将永远存在，除非例如调用`localStorage.clear()`。
</details>

### 23. 下面代码的输出是什么?
``` js
var num = 8;
var num = 10;

console.log(num);
```

* A: 8
* B: 10
* C: SyntaxError
* D: ReferenceError

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

使用var关键字，您可以用相同的名称声明多个变量。然后变量将保存最新的值。

您不能使用let或const来实现这一点，因为它们是块作用域的。
</details>

### 24. 下面代码的输出是什么?
``` js
const obj = { 1: "a", 2: "b", 3: "c" };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty("1");
obj.hasOwnProperty(1);
set.has("1");
set.has(1);
```

* A: false true false true
* B: false true true true
* C: true true false true
* D: true true true true

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

所有对象键（不包括`Symbols`）都会被存储为字符串，即使你没有给定字符串类型的键。 这就是为什么`obj.hasOwnProperty（'1'）`也返回`true`。

上面的说法不适用于`Set`。 在我们的`Set`中没有“1”：`set.has（'1'）`返回`false`。 它有数字类型1，`set.has（1）`返回`true`。
</details>

### 25. 下面代码的输出是什么?
``` js
const obj = { a: "one", b: "two", a: "three" };
console.log(obj);
``` 

* A: { a: "one", b: "two" }
* B: { b: "two", a: "three" }
* C: { a: "three", b: "two" }
* D: SyntaxError

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

如果对象有两个具有相同名称的键，则将替前面的键。它仍将处于第一个位置，但具有最后指定的值。
</details>

### 26. JavaScript全局执行上下文为你创建了两个东西:全局对象和this关键字.

* A: 对
* B: 错误
* C: 视情况而定

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

基本执行上下文是全局执行上下文:它是代码中随处可访问的内容。
</details>

### 27. 下面代码的输出是什么?
``` js
for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
```

* A: 1 2
* B: 1 2 3
* C: 1 2 4
* D: 1 3 4

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

如果某个条件返回true，则continue语句跳过迭代。

</details>

### 28. 下面代码的输出是什么?
``` js
String.prototype.giveLydiaPizza = () => {
  return "Just give Lydia pizza already!";
};


const name = "Lydia";

name.giveLydiaPizza();
```

* A: "Just give Lydia pizza already!"
* B: TypeError: not a function
* C: SyntaxError
* D: undefined

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

String是一个内置的构造函数，我们可以为它添加属性。 我刚给它的原型添加了一个方法。 原始类型的字符串自动转换为字符串对象，由字符串原型函数生成。 因此，所有字符串（字符串对象）都可以访问该方法！

当使用基本类型的字符串调用giveLydiaPizza时，实际上发生了下面的过程：
* 创建一个String的包装类型实例
* 在实例上调用substring方法
* 销毁实例

</details>

### 29. 下面代码的输出是什么?
``` js
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

* A: 123
* B: 456
* C: undefined
* D: ReferenceError

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

对象键自动转换为字符串。我们试图将一个对象设置为对象a的键，其值为123。

但是，当对象自动转换为字符串化时，它变成了`[Object object]`。 所以我们在这里说的是`a["Object object"] = 123`。 然后，我们可以尝试再次做同样的事情。 
c对象同样会发生隐式类型转换。那么，`a["Object object"] = 456`。

然后，我们打印`a[b]`，它实际上是`a["Object object"]`。 我们将其设置为456，因此返回456。

</details>

### 30. 下面代码的输出是什么?
``` js
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"));
const baz = () => console.log("Third");

bar();
foo();
baz();
```

* A: First Second Third
* B: First Third Second
* C: Second First Third
* D: Second Third First

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

我们有一个`setTimeout`函数并首先调用它。 然而却最后打印了它。

这是因为在浏览器中，我们不只有运行时引擎，我们还有一个叫做`WebAPI`的东西。`WebAPI`为我们提供了`setTimeout`函数，例如`DOM`。
将`callback`推送到`WebAPI`后，`setTimeout`函数本身（但不是回调！）从堆栈中弹出。

现在，调用foo，并打印First。
foo从堆栈弹出，baz被调用，并打印Third。

WebAPI不能只是在准备就绪时将内容添加到堆栈中。 相反，它将回调函数推送到一个称为任务队列的东西。

这是事件循环开始工作的地方。 事件循环查看堆栈和任务队列。 如果堆栈为空，则会占用队列中的第一个内容并将其推送到堆栈中。

bar被调用，Second被打印，它从栈中弹出。
</details>

### 31. 单击按钮时event.target是什么?
``` html
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>
```

* A: div外部
* B: div内部
* C: button
* D: 所有嵌套元素的数组.

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

导致事件的最深嵌套元素是事件的目标。 你可以通过`event.stopPropagation`停止冒泡
</details>

### 32. 单击下面的html片段打印的内容是什么?
``` html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!

</div>
```

* A: p div
* B: div p
* C: p
* D: div

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

如果我们单击p，我们会看到两个日志：p和div。在事件传播期间，有三个阶段：捕获，目标和冒泡。 默认情况下，事件处理程序在冒泡阶段执行（除非您将useCapture设置为true）。
它从最深的嵌套元素向外延伸。

</details>

### 33. 下面代码的输出是什么?
``` js
const person = { name: "Lydia" };

function sayHi(age) {
  console.log(`${this.name} is ${age}`);
}

sayHi.call(person, 21);
sayHi.bind(person, 21);
```

* A: undefined is 21 Lydia is 21
* B: function function
* C: Lydia is 21 Lydia is 21
* D: Lydia is 21 function

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: D

使用两者，我们可以传递我们想要this关键字引用的对象。 但是，`.call`方法会立即执行！

`.bind`方法会返回函数的拷贝值，但带有绑定的上下文！ 它不会立即执行。

</details>

### 34. 下面代码的输出是什么?
``` js
function sayHi() {
  return (() => 0)();
}

typeof sayHi();
```

* A: "object"
* B: "number"
* C: "function"
* D: "undefined"

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

sayHi函数返回立即调用的函数（IIFE）的返回值。 该函数返回0，类型为数字。

仅供参考：只有7种内置类型：null，undefined，boolean，number，string，object和symbol。 function不是一个类型，因为函数是对象，它的类型是object。

</details>

### 35. 下面这些值哪些是假值?
``` js
0;
new Number(0);
("");
(" ");
new Boolean(false);
undefined;
```

* A: 0, '', undefined
* B: 0, new Number(0), '', new Boolean(false), undefined
* C: 0, '', new Boolean(false), undefined
* D: 所有都是假值

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

JavaScript中只有6个假值：
* undefined
* null
* NaN
* 0
* '' (empty string)
* false

函数构造函数，如`new Number`和`new Boolean`都是真值。
</details>

### 36. 下面代码的输出是什么?
``` js
console.log(typeof typeof 1);
```

* A: "number"
* B: "string"
* C: "object"
* D: "undefined"

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

* typeof 1 返回 "number".
* typeof "number" 返回 "string"

</details>

### 37. 下面代码的输出是什么?
``` js
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
```

* A: [1, 2, 3, 7 x null, 11]
* B: [1, 2, 3, 11]
* C: [1, 2, 3, 7 x empty, 11]
* D: SyntaxError

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

当你为数组中的元素设置一个超过数组长度的值时，JavaScript会创建一个名为“空插槽”的东西。 这些位置的值实际上是undefined，但你会看到类似的东西：
`[1, 2, 3, 7 x empty, 11]`

这取决于你运行它的位置（每个浏览器有可能不同）。
</details>

### 38. 下面代码的输出是什么?
``` js
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
```

* A: 1 undefined 2
* B: undefined undefined undefined
* C: 1 1 2
* D: 1 undefined undefined

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

catch块接收参数x。当我们传递参数时，这与变量的x不同。这个变量x是属于catch作用域的。

之后，我们将这个块级作用域的变量设置为1，并设置变量y的值。 现在，我们打印块级作用域的变量x，它等于1。

在catch块之外，x仍然是undefined，而y是2。 当我们想在catch块之外的`console.log(x)`时，它返回`undefined`，而y返回2。
</details>

### 39. JavaScript中的所有内容都是…

* A：原始或对象
* B：函数或对象
* C：技巧问题！只有对象
* D：数字或对象

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

JavaScript只有原始类型和对象。
原始类型是boolean，null，undefined，bigint，number，string和symbol。

</details>

### 40. 下面代码的输出是什么?
``` js
[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2]
);
```

* A: [0, 1, 2, 3, 1, 2]
* B: [6, 1, 2]
* C: [1, 2, 0, 1, 2, 3]
* D: [1, 2, 6]

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

`[1,2]`是我们的初始值。 这是我们开始执行reduce函数的初始值，以及第一个acc的值。 在第一轮中，acc是`[1,2]`，cur是`[0,1]`。 我们将它们连接起来，结果是`[1,2,0,1]`。

然后，acc的值为`[1,2,0,1]`，cur的值为`[2,3]`。 我们将它们连接起来，得到`[1,2,0,1,2,3]`。

</details>

### 41. 下面代码的输出是什么?
``` js
!!null;
!!"";
!!1;
```

* A: false true false
* B: false false true
* C: false true true
* D: true true false

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

```
null是假值。 !null返回true。 !true返回false。

""是假值。 !""返回true。 !true返回false。

1是真值。 !1返回false。 !false返回true。
```
</details>

### 42. `setInterval`方法的返回值什么?
``` js
setInterval(() => console.log("Hi"), 1000);
```

* A：一个唯一的id
* B：指定的毫秒数
* C：传递的函数
* D：undefined

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

它返回一个唯一的id。 此id可用于使用`clearInterval()`函数清除该定时器。
</details>


### 43. What does this return?
``` js
[..."Lydia"];
```

* A: ["L", "y", "d", "i", "a"]
* B: ["Lydia"]
* C: [[], "Lydia"]
* D: [["L", "y", "d", "i", "a"]]

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

字符串是可迭代的。 扩展运算符将迭代的每个字符映射到一个元素。
</details>

### 44. 下面代码的输出是什么?
``` js
function* generator(i){
  yield i;
  yield i *2;
}
const gen= generator(10);
console.log(gen.next().value);
console.log(gen.next().value);
```

* A: [0,10],[10,20]
* B: 20,20
* C: 10,20
* D: 0,10and10,20

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

一般的函数在执行之后是不能中途停下的。但是，生成器函数却可以中途“停下”，之后可以再从停下的地方继续。当生成器遇到 `yield`关键字的时候，会生成 `yield`后面的值。
注意，生成器在这种情况下不 返回(`return` )值，而是 生成 (`yield`)值。

首先，我们用 10作为参数 i来初始化生成器函数。然后使用 `next()`方法一步步执行生成器。第一次执行生成器的时候， i的值为 10，遇到第一个 `yield`关键字，它要生成 i的值。此时，生成器“暂停”，生成了 10。

然后，我们再执行 `next()`方法。生成器会从刚才暂停的地方继续，这个时候 i还是 10。于是我们走到了第二个 `yield`关键字处，这时候需要生成的值是 `i*2`， i为 10，那么此时生成的值便是 20。所以这道题的最终结果是 10,20。
</details>

### 45. 下面代码的返回值是什么?
``` js
const firstPromise =new Promise((res, rej) => {
  setTimeout(res,500,"one");
});
const secondPromise =new Promise((res, rej) => {
  setTimeout(res, 100,"two");
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```

* A: "one"
* B: "two"
* C: "two""one"
* D: "one""two"

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

当我们向 `Promise.race`方法中传入多个` Promise`时，会进行 优先 解析。在这个例子中，我们用 `setTimeout`给 firstPromise和 secondPromise分别设定了`500ms`和`100ms`的定时器。这意味着 secondPromise会首先解析出字符串 two。那么此时 res参数即为 two，是为输出结果。
</details>

### 46. 下面代码的输出是什么?
``` js 
let person ={ name:"Lydia"};

const members =[person];

person =null;

console.log(members);
```

* A: null
* B: [null]
* C: [{}]
* D: [{name:"Lydia"}]

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: D

首先我们声明了一个拥有 name属性的对象 person。

然后我们又声明了一个变量 members. 将首个元素赋值为变量 person。当设置两个对象彼此相等时，它们会通过 引用 进行交互。但是当你将引用从一个变量分配至另一个变量时，其实只是执行了一个 复制 操作。（注意一点，他们的引用 并不相同!）

接下来我们让 person等于 null。

我们没有修改数组第一个元素的值，而只是修改了变量 person的值,因为元素（复制而来）的引用与 person不同。members的第一个元素仍然保持着对原始对象的引用。当我们输出 members数组时，第一个元素会将引用的对象打印出来。

</details>

### 47. 下面代码的输出是什么?
``` js

const person = {name:"Lydia",age:21};
for(const item in person){
  console.log(item);
}
```

* A: {name:"Lydia"},{age:21}
* B: "name","age"
* C: "Lydia",21
* D: ["name","Lydia"],["age",21]

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

在 for-in循环中,我们可以通过对象的key来进行迭代,也就是这里的 name和 age。在底层，对象的key都是字符串（如果他们不是Symbol的话）。
在每次循环中，我们将 item设定为当前遍历到的key.所以一开始， item是 name，之后 item输出的则是 age。
</details>

### 48. 下面代码的输出是什么?
``` js
console.log(3 + 4 + "5");
```

* A: "345"
* B: "75"
* C: 12
* D: "12"

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

当所有运算符的 优先级 相同时，计算表达式需要确定运算符的结合顺序，即从右到左还是从左往右。在这个例子中，我们只有一类运算符 +，对于加法来说，结合顺序就是从左到右。

3+4首先计算，得到数字 7.

由于类型的强制转换， 7+'5'的结果是 "75". JavaScript将 7转换成了字符串，可以参考问题15.我们可以用 +号把两个字符串连接起来。"7"+"5" 就得到了 "75".

</details>

### 49. num的值是什么?
``` js
const num = parseInt("7*6",10);
```

* A: 42
* B: "42"
* C: 7
* D: NaN

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

只返回了字符串中第一个字母. 设定了 进制 后 (也就是第二个参数，指定需要解析的数字是什么进制: 十进制、十六机制、八进制、二进制等等……), parseInt 检查字符串中的字符是否合法. 一旦遇到一个在指定进制中不合法的字符后，立即停止解析并且忽略后面所有的字符。

*就是不合法的数字字符。所以只解析到 "7"，并将其解析为十进制的 7. num的值即为 7.
</details>

### 50. 下面代码的输出是什么?
``` js

[1, 2, 3].map(num => {  
  if(typeof num === "number") return;  
  return num * 2;
});
```

* A: []
* B: [null,null,null]
* C: [undefined,undefined,undefined]
* D: [3x empty]

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

对数组进行映射的时候, num就是当前循环到的元素. 在这个例子中，所有的映射都是number类型，所以if中的判断 `typeofnum==="number"`结果都是 true, `.map`函数创建了新数组并且将函数的返回值插入数组。

但是，没有任何值返回。当函数没有返回任何值时，即默认返回 undefined.对数组中的每一个元素来说，函数块都得到了这个返回值，所以结果中每一个元素都是 undefined.
</details>



### 51. 下面代码输出的是什么?
``` js
function getInfo(member, year){
  member.name = "Lydia";  year = "1998";
}
const person = {
  name:"Sarah" 
};
const birthYear = "1997";

getInfo(person, birthYear);

console.log(person, birthYear);
```

* A: {name:"Lydia"},"1997"
* B: {name:"Sarah"},"1998"
* C: {name:"Lydia"},"1998"
* D: {name:"Sarah"},"1997"

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

普通参数都是 值 传递的，而对象则不同，是 引用 传递。所以说， birthYear是值传递，因为他是个字符串而不是对象。当我们对参数进行值传递时，会创建一份该值的 复制 。

变量 birthYear有一个对 "1997"的引用，而传入的参数也有一个对 "1997"的引用，但二者的引用并不相同。
当我们通过给 year赋值 "1998"来更新 year的值的时候我们只是更新了 year（的引用）。此时 birthYear仍然是 "1997".

而 person是个对象。参数 member引用与之 相同的 对象。当我们修改 member所引用对象的属性时, person的相应属性也被修改了,因为他们引用了相同的对象. person的 name属性也变成了 "Lydia".
</details>

### 52. 下面代码的输出是什么?
``` js
function greeting(){  
throw "Hello world!";
}

function sayHi(){  
  try{
    const data = greeting();
    console.log("It worked!", data);
  }
  catch(e){
    console.log("Oh no an error!", e); 
  }
}

sayHi();
```

* A: "It worked! Hello world!"
* B: "Oh no an error: undefined
* C: SyntaxError:can onlythrowErrorobjects
* D: "Oh no an error: Hello world!

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: D

通过 throw语句，我么可以创建自定义错误。而通过它，我们可以抛出异常。异常可以是一个字符串, 一个 数字, 一个 布尔类型 或者是一个 对象。在本例中，我们的异常是字符串 'Hello world'.

通过 catch语句，我们可以设定当 try语句块中抛出异常后应该做什么处理。在本例中抛出的异常是字符串 'Hello world'. e就是这个字符串，因此被输出。最终结果就是 'Oh an error: Hello world'.
</details>

### 53. 下面代码的输出是什么?
``` js
function Car(){
  this.make = "Lamborghini";  
  return {
    make:"Maserati"
  };
}

const myCar = new Car();
console.log(myCar.make);
```

* A: "Lamborghini"
* B: "Maserati"
* C: ReferenceError
* D: TypeError


<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

返回属性的时候，属性的值等于 返回的 值，而不是构造函数中设定的值。我们返回了字符串 "Maserati"，所以 myCar.make等于 "Maserati".
</details>

### 54. 下面代码的输出是什么?
``` js
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```

* A: "undefined","number"
* B: "number","number"
* C: "object","number"
* D: "number","undefined"


<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

letx=y=10; 是下面这个表达式的缩写:
``` js
y = 10;
let x = y;
```

我们设定 y等于 10时,我们实际上增加了一个属性 y给全局对象(浏览器里的 window, Nodejs里的 global)。在浏览器中， window.y等于 10.

然后我们声明了变量 x等于 y,也是 10.但变量是使用 let声明的，它只作用于 块级作用域, 仅在声明它的块中有效；就是案例中的立即调用表达式(IIFE)。使用 typeof操作符时, 操作值 x没有被定义：因为我们在 x声明块的外部，无法调用它。这就意味着 x未定义。未分配或是未声明的变量类型为 "undefined". console.log(typeofx)返回 "undefined".

而我们创建了全局变量 y，并且设定 y等于 10.这个值在我们的代码各处都访问的到。y已经被定义了，而且有一个 "number"类型的值。`console.log(typeofy)`返回 "number".
</details>

### 55. 下面代码的输出是什么?
``` js
class Dog {
  constructor(name){    
  this.name = name;  
  }
}

Dog.prototype.bark = function() {
  console.log(`Woof I am ${this.name}`);
};

const pet = new Dog("Mara");
pet.bark();

delete Dog.prototype.bark;
pet.bark();
```

* A: "Woof I am Mara", TypeError
* B: "Woof I am Mara", "Woof I am Mara"
* C: "Woof I am Mara", undefined
* D: TypeError, TypeError


<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

我们可以用 delete关键字删除对象的属性，对原型也是适用的。删除了原型的属性后，该属性在原型链上就不可用了。在本例中，函数 bark在执行了 deleteDog.prototype.bark后不可用, 然而后面的代码还在调用它。

当我们尝试调用一个不存在的函数时 TypeError异常会被抛出。在本例中就是 TypeError:pet.barkisnotafunction，因为 pet.bark是 undefined.
</details>

### 56. 下面代码的输出是什么?
``` js
const set = new Set([1,1,2,3,4]);

console.log(set);
```

* A: [1,1,2,3,4]
* B: [1,2,3,4]
* C: {1,1,2,3,4}
* D: {1,2,3,4}


<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: D

Set对象手机 独一无二 的值：也就是说同一个值在其中仅出现一次。

我们传入了数组 [1,1,2,3,4]，他有一个重复值 1.以为一个集合里不能有两个重复的值，其中一个就被移除了。所以结果是 {1,2,3,4}.
</details>

### 57. 下面代码的输出是什么?
```js
// counter.js
let counter = 10;
export default counter;
// index.js
import myCounter from "./counter";

myCounter += 1;
console.log(myCounter);
```

* A: 10
* B: 11
* C: Error
* D: NaN


<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

引入的模块是 只读 的: 你不能修改引入的模块。只有导出他们的模块才能修改其值。

当我们给 myCounter增加一个值的时候会抛出一个异常：myCounter是只读的，不能被修改。
</details>

### 58. 下面代码的输出是什么?
``` js
const name = "Lydia";
age = 21;

console.log(delete name);
console.log(delete age);
```

* A: false, true
* B: "Lydia", 21
* C: true, true
* D: undefined, undefined

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

delete操作符返回一个布尔值：true指删除成功，否则返回 false. 但是通过 var, const 或 let 关键字声明的变量无法用 delete 操作符来删除。

name变量由 const关键字声明，所以删除不成功:返回 false. 而我们设定 age等于 21时,我们实际上添加了一个名为 age的属性给全局对象。
对象中的属性是可以删除的，全局对象也是如此，所以 deleteage返回 true.
</details>

### 59. 下面代码的输出是什么?
``` js
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;
console.log(y);
```

* A: [[1,2,3,4,5]]
* B: [1,2,3,4,5]
* C: 1
* D: [1]

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

我们可以通过解构赋值来解析来自对象的数组或属性的值，比如说：
``` js
[a, b] = [1, 2];
```
a的值现在是 1， b的值现在是 2.而在题目中，我们是这么做的:
``` js
[y] = [1, 2, 3, 4, 5];
```

也就是说， y等于数组的第一个值就是数字 1.我们输出 y， 返回 1.
</details>

### 60. 下面代码的输出是什么?
``` js

const user = {
  name:"Lydia",
  age:21 
};

const admin = {
 admin:true,
 ...user 
};

console.log(admin);
```

* A: {admin:true,user:{name:"Lydia",age:21}}
* B: {admin:true,name:"Lydia",age:21}
* C: {admin:true,user:["Lydia",21]}
* D: {admin:true}

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

扩展运算符 ...为对象的组合提供了可能。你可以复制对象中的键值对，然后把它们加到另一个对象里去。
在本例中，我们复制了 user对象键值对，然后把它们加入到 admin对象中。admin对象就拥有了这些键值对，所以结果为 `{admin:true,name:"Lydia",age:21}`.
</details>

### 61. 下面代码的输出是什么?
``` js
const person = {
 name:"Lydia"
};
Object.defineProperty(person, "age", {
  value:21
});

console.log(person);
console.log(Object.keys(person));
```

* A: {name:"Lydia",age:21}, ["name","age"]
* B: {name:"Lydia",age:21}, ["name"]
* C: {name:"Lydia"}, ["name","age"]
* D: {name:"Lydia"}, ["age"]


<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

通过 defineProperty方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。
而我们使用 defineProperty方法给对象添加了一个属性之后，属性默认为 不可枚举(not enumerable). `Object.keys`方法仅返回对象中 可枚举(enumerable) 的属性，因此只剩下了 "name".

用 defineProperty方法添加的属性默认不可变。你可以通过 writable, configurable 和 enumerable属性来改变这一行为。
这样的话， 相比于自己添加的属性， defineProperty方法添加的属性有了更多的控制权。
</details>

### 62. 下面代码的输出是什么?
``` js
const settings = {
  username:"lydiahallie",
  level:19,
  health:90
};

const data = JSON.stringify(settings, ["level","health"]);
console.log(data);
```

* A: "{"level":19, "health":90}"
* B: "{"username": "lydiahallie"}"
* C: "["level", "health"]"
* D: "{"username": "lydiahallie", "level":19, "health":90}"


<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

JSON.stringify的第二个参数是 替代者(replacer). 替代者(replacer)可以是个函数或数组，用以控制哪些值如何被转换为字符串。

如果替代者(replacer)是个 数组 ，那么就只有包含在数组中的属性将会被转化为字符串。
在本例中，只有名为 "level" 和 "health" 的属性被包括进来， "username"则被排除在外。
data 就等于 `{"level":19, "health":90}`.

而如果替代者(replacer)是个 函数，这个函数将被对象的每个属性都调用一遍。
函数返回的值会成为这个属性的值，最终体现在转化后的JSON字符串中（Chrome下，经过实验，如果所有属性均返回同一个值的时候有异常，会直接将返回值作为结果输出而不会输出JSON字符串），而如果返回值为 undefined，则该属性会被排除在外。
</details>

### 63. 下面代码的输出是什么?
``` js
let num = 10;
const increaseNumber = () => num++;
const increasePassedNumber = number => number++;
const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```

* A: 10, 10
* B: 10, 11
* C: 11, 11
* D: 11, 12

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

一元操作符 ++ 先返回 操作值, 再累加 操作值。num1的值是 10, 因为 increaseNumber函数首先返回 num的值，也就是 10，随后再进行 num的累加。

num2是 10, 因为我们将 num1传入 increasePassedNumber. number等于 10（ num1的值。同样道理， `++` 先返回 操作值, 再累加 操作值。） number是 10，所以 num2也是 10.
</details>

### 64. 下面代码输出什么?
``` js
const value = {
 number:10 
};
const multiply = (x = { 
  ...value 
}) => {
  console.log(x.number *= 2);
};

multiply();
multiply();
multiply(value);
multiply(value);
```

* A: 20, 40, 80, 160
* B: 20, 40, 20, 40
* C: 20, 20, 20, 40
* D: NaN, NaN, 20, 40

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

在ES6中，我们可以使用默认值初始化参数。如果没有给函数传参，或者传的参值为 "undefined" ，那么参数的值将是默认值。
上述例子中，我们将 value 对象进行了解构并传到一个新对象中，因此 x 的默认值为 `{number：10}` 。

默认参数在调用时才会进行计算，每次调用函数时，都会创建一个新的对象。我们前两次调用 multiply 函数且不传递值，那么每一次 x 的默认值都为 `{number：10}` ，因此打印出该数字的乘积值为 20。

第三次调用 multiply 时，我们传递了一个参数，即对象 value。`*=`运算符实际上是 `x.number=x.number*2`的简写，我们修改了 `x.number`的值，并打印出值 20。

第四次，我们再次传递 value对象。`x.number`之前被修改为 20，所以 `x.number*=2`打印为 40。
</details>

### 65. 下面代码输出什么?
``` js
[1,2,3,4].reduce((x, y) => console.log(x, y));
```

* A: 1 2 and 3 3 and 6 4
* B: 1 2 and 2 3 and 3 4
* C: 1 undefined and 2 undefined and 3 undefined and 4 undefined
* D: 1 2 and undefined 3 and undefined 4

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: D

reducer 函数接收4个参数:
* Accumulator (acc) (累计器)
* Current Value (cur) (当前值)
* Current Index (idx) (当前索引)
* Source Array (src) (源数组)

reducer 函数的返回值将会分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

reducer 函数还有一个可选参数 initialValue, 该参数将作为第一次调用回调函数时的第一个参数的值。如果没有提供 initialValue，则将使用数组中的第一个元素。

在上述例子， reduce方法接收的第一个参数(Accumulator)是 x, 第二个参数(Current Value)是 y。

在第一次调用时，累加器 x为 1，当前值 “y”为 2，打印出累加器和当前值：1和 2。

例子中我们的回调函数没有返回任何值，只是打印累加器的值和当前值。如果函数没有返回值，则默认返回 undefined。在下一次调用时，累加器为 undefined，当前值为“3”, 因此 undefined和 3被打印出。

在第四次调用时，回调函数依然没有返回值。累加器再次为 undefined ，当前值为“4”。undefined和 4被打印出。
</details>

### 66. 使用哪个构造函数可以成功继承 Dog类?
``` js
class Dog {
  constructor(name){    
    this.name = name; 
  }
};

class Labrador extends Dog {  
// 1
  constructor(name, size) {    
    this.size = size;  
  }
// 2
  constructor(name, size) {
    super(name);    
    this.size = size; 
  }
// 3
  constructor(size) {
    super(name);    
    this.size = size; 
  }
// 4
  constructor(name, size) {    
    this.name = name;    
    this.size = size;  
  }
};
```

* A: 1
* B: 2
* C: 3
* D: 4


<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

在子类中，在调用 super之前不能访问到 this关键字。如果这样做，它将抛出一个 ReferenceError：1和4将引发一个引用错误。

使用 super关键字，需要用给定的参数来调用父类的构造函数。父类的构造函数接收 name参数，因此我们需要将 name传递给 super。

Labrador类接收两个参数， name参数是由于它继承了 Dog， size作为 Labrador类的额外属性，它们都需要传递给 Labrador的构造函数，因此使用构造函数2正确完成。
</details>

### 67. 下面代码输出什么?
``` js
// index.js

console.log('running index.js');
import { sum } from './sum.js';

console.log(sum(1, 2));
// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

* A: running index.js, running sum.js, 3
* B: running sum.js, running index.js, 3
* C: running sum.js, 3, running index.js
* D: running index.js, undefined, running sum.js

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

import命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行。

这是CommonJS中 `require()`和 import之间的区别。使用 `require()`，您可以在运行代码时根据需要加载依赖项。
如果我们使用 require而不是 import， `running index.js`， `running sum.js`， 3会被依次打印。
</details>

### 68. 下面代码输出什么?
``` js
console.log(Number(2) === Number(2))
console.log(Boolean(false) === Boolean(false))
console.log(Symbol('foo') === Symbol('foo'))
```

* A: true, true, false
* B: false, true, false
* C: true, false, true
* D: true, true, true

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

每个 Symbol都是完全唯一的。传递给 Symbol的参数只是给 Symbol的一个描述。Symbol的值不依赖于传递的参数。
当我们测试相等时，我们创建了两个全新的符号：第一个 `Symbol("foo")`，第二个 `Symbol("foo")`, 这两个值是唯一的，彼此不相等，因此返回 false。
</details>

### 69. 下面代码输出什么?
``` js
const name = "Lydia Hallie"
console.log(name.padStart(13))
console.log(name.padStart(2))
```

* A: "Lydia Hallie", "Lydia Hallie"
* B: " Lydia Hallie", " Lydia Hallie" ( "[13x whitespace]Lydia Hallie", "[2x whitespace]Lydia Hallie")
* C: " Lydia Hallie", "Lydia Hallie" ( "[1x whitespace]Lydia Hallie", "Lydia Hallie")
* D: "Lydia Hallie", "Lyd"

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

使用 padStart方法，我们可以在字符串的开头添加填充。
传递给此方法的参数是字符串的总长度（包含填充）。字符串 LydiaHallie的长度为 12, 因此 `name.padStart(13)`在字符串的开头只会插入1（ 13-12=1）个空格。

如果传递给 padStart方法的参数小于字符串的长度，则不会添加填充。
</details>

### 70. 下面代码输出什么?
``` js
console.log("🥑" + "💻");
```

* A: "🥑💻"
* B: 257548
* C: A string containing their code points
* D: Error

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: A

使用 +运算符，您可以连接字符串。上述情况，我们将字符串 “🥑”与字符串 ”💻“连接起来，产生 ”🥑💻“。
</details>

### 71. 如何能打印出 console.log语句后注释掉的值？
``` js
function* startGame() {  
  const answer = yield "Do you love JavaScript?";
 
  if(answer !== "Yes") 
  {    
    return "Oh wow... Guess we're gone here";  
  }
  return "JavaScript loves you back ❤️";
}


const game = startGame();
console.log(/* 1 */); 
// Do you love JavaScript?
console.log(/* 2 */); 
// JavaScript loves you back ❤️
```

* A: game.next("Yes").value and game.next().value
* B: game.next.value("Yes") and game.next.value()
* C: game.next().value and game.next("Yes").value
* D: game.next.value() and game.next.value("Yes")

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

generator函数在遇到 yield关键字时会“暂停”其执行。
首先，我们需要让函数产生字符串 Doyou loveJavaScript?，这可以通过调用 `game.next().value`来完成。
上述函数的第一行就有一个 `yield`关键字，那么运行立即停止了， `yield`表达式本身没有返回值，或者说总是返回 `undefined`, 这意味着此时变量 answer 为 `undefined`

`next`方法可以带一个参数，该参数会被当作上一个 `yield` 表达式的返回值。
当我们调用 `game.next("Yes").value`时，先前的 `yield` 的返回值将被替换为传递给 `next()`函数的参数 "Yes"。
此时变量 answer 被赋值为 "Yes"， if语句返回 false，所以 JavaScriptloves you back❤️被打印。
</details>

### 72. 下面代码输出什么?
``` js
console.log(String.raw`Hello\nworld`);
```

* A: Helloworld!
* B: Hello 
      world
* C: Hello\nworld
* D: Hello\n 
      world


<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

String.raw函数是用来获取一个模板字符串的原始字符串的，它返回一个字符串，
其中忽略了转义符（ `\n`， `\v`， `\t`等）。
但反斜杠可能造成问题，因为你可能会遇到下面这种类似情况：
``` js
const path = `C:\Documents\Projects\table.html`
String.raw`${path}`
```

这将导致： "C:DocumentsProjects able.html"
直接使用 `String.raw`

``` js
String.raw`C:\Documents\Projects\table.html`
```

它会忽略转义字符并打印：`C:\Documents\Projects\table.html`

上述情况，字符串是 `Hello\nworld`被打印出。

</details>

### 73.下面代码输出什么?
``` js 
async function getData(){  
  return await Promise.resolve("I made it!");
}

const data = getData();
console.log(data);
```

* A: "I made it!"
* B: Promise{<resolved>:"I made it!"}
* C: Promise{<pending>}
* D: undefined

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: C

异步函数始终返回一个promise。await仍然需要等待promise的解决：当我们调用`getData()`并将其赋值给 data，此时 data为 `getData`方法返回的一个挂起的`promise`，该`promise`并没有解决。

如果我们想要访问已解决的值 "I made it!"，可以在 data上使用 `.then()`方法：
``` js
data.then(res=>console.log(res))
```
这样将打印 "I made it!"
</details>

### 74. 下面代码输出什么?
``` js
function addToList(item, list)
{  
  return list.push(item);
}

const result = addToList("apple",["banana"]);

console.log(result);
```

* A: ['apple','banana']
* B: 2
* C: true
* D: undefined

<details>
  <summary><mark>点击查看答案</mark></summary>

> 答案: B

`push()`方法返回新数组的长度。一开始，数组包含一个元素（字符串 "banana"），长度为1。
在数组中添加字符串 "apple"后，长度变为2，并将从 addToList函数返回。

push方法修改原始数组，如果你想从函数返回数组而不是数组长度，那么应该在push item之后返回 list。
</details>