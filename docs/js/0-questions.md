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

