# TypeScript学习手册
## 基础类型
为了让程序有价值，我们需要能够处理最简单的数据单元：数字，字符串，结构体，布尔值等。 TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。
### 布尔值(boolean)
最基本的数据类型就是简单的true/false值，在JavaScript和TypeScript里叫做boolean（其它语言中也一样）。
``` js
let isDone: boolean = false;
```
### 数字(number)
和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。
``` js
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```
### 字符串(string)
TypeScript使用string表示文本数据类型。 和JavaScript一样，可以使用双引号（ "）或单引号（'）表示字符串。
``` js
let name: string = "james";
name = "world";
```
当然, 也可以使用**模板字符串**, 可以定义多行文本和内嵌表达式. 如:
``` js
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`;
```
### 数组
TypeScript和JavaScript一样, 可以操作数组元素, 有两种方式定义数组:
* 在元素类型后面加上 `[]`
* 使用数组泛型 `Array<元素类型>`

``` js
let list: number[] = [1,2,3]
// 或者
let list: Array<number> = [1,2,3]
```
### 元组(tuple)
元组类型允许表示一个已知元素数量和类型的数组, 各元素的类型不必相同. 如, 你可以定义一对值分别为 string 和 number类型的元组.
``` js
let x: [string, number];
// init it
x = ['hello', 10]; // ok
// init it incorrectly
x = [10, 'hello']; // Error
```
当访问一个已经索引的元素,会得到正确的类型. 
``` js
console.log(x[0].substr(1)); // ok
console.log(x[1].substr(1)); // Error, 'number'类型类型的对象没有'substr'方法
```
当访问一个越界的元素, 会使用联合类型替代.
``` js
x[3] = 'world';
console.log(x[5].toString()) // ok, 'string'和'number'都有toString方法
x[6] = true; // Error, 布尔不是{string | number }类型
```
联合类型是高级主题, 会在以后的章节里讨论它.

### 枚举(enum)
`enum`类型是对JavaScript标准数据类型的一个补充, 像C#等其他语言一样, 使用枚举类型可以为一组数值赋予友好的名字.
``` js
enum Color {Red, Green, Blue}
let c:Color = Color.Green;
```
默认情况下, 从0开始为元素编号, 你也可以手动的指定成员的数值. 例如, 我们将上面的例子改从1开始编号.
``` js
enum Color {Red = 1, Green, Blue}
let c:Color = Color.Green;
```
或者, 全部都采用手动赋值
``` js
enum Color {Red = 1, Green = 2, Blue = 4}
let c:Color = Color.Green;
```
枚举类型提供的一个便利是, 你可以由枚举的值得到它的名字. 例如, 我们知道数值为2, 但是不确定它映射到Color里的哪个名字, 我们可以查找相应的名字.
``` js
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```
### any
有时, 我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型, 这些值可能来自于动态的内容. 
例如, 来自用户输入或第三方代码库. 

在这种情况下, 我们不希望类型检查器对这些值进行检查, 而是直接让它们通过编译阶段的检查. 此时, 我们可以使用`any`类型来标记这些变量.

``` js
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```
在对现有代码进行改写的时候, `any`类型是十分有用的, 它允许你在编译时可选择地包含或移除类型检查. 你可能认为`Object`有相似的作用, 就像它在其它语言中那样. 但是`Object`类型的变量只是允许你给它赋任意值, 但是却不能够在它上面调用任意的方法, 即便它真的有这些方法.
``` js
let notSure: any = 4;
notSure.ifItExists(); // ok, ifItExists方法在运行时可能会存在
notSure.toFixed(); // ok, toFixed存在, 但编译器不会云检查它

let prettySure: Object = 4;
prettySure.toFixed(); // Error, prettySure对象不存在属性"toFixed"
```
当你只知道一部分数据类型时, `any`类型也是有用的. 比如, 你有一个数组, 它包含了不同的类型的数据:
``` js
let list: any[] = [1, true, "free"];

list[1] = 100;
```
### void
`void`类型像是与`any`类型相反, 它表示没有任何类型, 当一个函数没有返回值时, 你通常会见到其返回值类型是`void`:
``` js
function warnUser(): void {
  console.log("This is my warning message");
}
```
声明一个`void`类型的变量没有什么大用, 因为你只能为它赋予`undefined`和`null`;
``` js
let unusable: void = undefined;
```
### null 和 undefined
TypeScript里, `undefined`和`null`两者各自有自己的类型, 分别是 `undefined`和`null`, 和`void`相似, 它们的本身的类型不是很大. 
``` js
let u: undefined = undefined;
let n: null = null;
```
默认情况下`null`和`undefined`是所有类型的子类型, 意即你可以把`null`和`undefined`赋值给`number`类型的变量.

然而, 当你指定了`--strictNullChecks`标记时, `null`和`undefined`只能赋值给`void`和它们各自. 
这能避免很多常见的问题, 也许在某处你想传入一个`string`或`null`或`undefined`, 你可以使用联合类型 `string` | `null` | `undefined`.

::: tip 推荐
尽可能地使用--strictNullChecks。
:::
### never
`never`类型表示的是那些永不存在的值的类型. 例如: `never`类型是那些会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型. 

变量也可能是`never`类型, 当它们被永不为真的类型保护所约束时. 

`never`类型是任何类型的子类型, 也可以赋值给任何类型; 然而, 没有类型是`never`的子类型或可以赋值给`never`类型(除了`never`本身之外), 即使`any`也不可以赋值给`never`. 

下面是一些返回`never`类型的函数示例:
``` js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```
### Object
`object`表示非原始类型，也就是除:
* `number`
* `string`
* `boolean`
* `symbol`
* `null`
* `undefined`
之外的类型。

使用`object`类型，就可以更好的表示像`Object.create`这样的`API`。例如：
``` js
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

### 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：
``` js
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```
另一个为as语法：
``` js
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```
两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；
::: warning
当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
:::

### 关于let
我们使用let关键字来代替大家所熟悉的JavaScript关键字`var`。 
`let`关键字是JavaScript的一个新概念，TypeScript实现了它。 
我们会在以后详细介绍它，很多常见的问题都可以通过使用 let来解决，所以尽可能地使用let来代替var吧。
::: tip
在TypeScript中, 尽可能地使用`let`来代替`var`
:::

## 变量声明
`let`和`const`是`JavaScript`里相对较新的变量声明方式。 
* let在很多方面与var是相似的，但是可以帮助大家避免在JavaScript里常见一些问题。 
* const是对let的一个增强，它能阻止对一个变量再次赋值。

因为TypeScript是JavaScript的超集，所以它本身就支持`let`和`const`。 
下面我们会详细说明这些新的声明方式以及为什么推荐使用它们来代替`var`。

### `var`声明
通常我们都是通过`var`关键字定义JavaScript变量。
``` js
var a = 10;
```
很简单, 这里定义了一个名为a值为10的变量。

当然, 我们也可以函数内部定义变量：
``` js
function f() {
    var message = "Hello, world!";
    return message;
}
```
也可以在其它函数内部访问相同的变量。
``` js
function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    }
}

var h = f();
h(); // returns 11;
```
上面的例子里，g可以获取到f函数里定义的a变量。 每当 h被调用时，它都可以访问到f里的a变量。 此时就形成了闭包, 变量h可以随时访问和修改变量a
``` js
function f() {
    var a = 1;

    a = 2;
    var b = g();
    a = 3;

    return b;

    function g() {
        return a;
    }
}

f(); // returns 2
```
#### 作用域规则
对于熟悉其它语言的人来说，var声明有些奇怪的作用域规则。 看下面的例子：
``` js
function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'
```
变量`x`是定义在`if`语句里面的，但是我们却可以在语句的外面访问它。 
这是因为`var`声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问（我们后面会详细介绍），包含它的代码块对此没有什么影响。 有些人称此为**var作用域或函数作用域**。 函数参数也使用函数作用域。

这些作用域规则可能会引发一些错误。 其中之一就是，多次声明同一个变量并不会报错：
``` js
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```
这里很容易看出一些问题，里层的for循环会覆盖变量i，因为所有i都引用相同的函数作用域内的变量。 有经验的开发者们很清楚，这些问题可能在代码审查时漏掉，引发无穷的麻烦。

#### 捕获变量怪异之处
快速的猜一下下面的代码会返回什么：
``` js
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

好吧，看一下结果：
```
10
10
10
10
10
10
10
10
10
10
```
很多JavaScript程序员对这种行为已经很熟悉了，但如果你很不解，你并不是一个人。 大多数人期望输出结果是这样：
```
0
1
2
3
4
5
6
7
8
9
```
还记得我们上面提到的捕获变量吗？

> 我们传给setTimeout的每一个函数表达式实际上都引用了相同作用域里的同一个i。

让我们花点时间思考一下这是为什么。 setTimeout在若干毫秒后执行一个函数，并且是在for循环结束后。 for循环结束后，i的值为10。 所以当函数被调用的时候，它会打印出 10！

一个通常的解决方法是使用立即执行的函数表达式（`IIFE`）来捕获每次迭代时i的值：
``` js
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
```
这种奇怪的形式我们已经司空见惯了。 参数 i会覆盖for循环里的i，但是因为我们起了同样的名字，所以我们不用怎么改for循环体里的代码。

### let 声明
现在你已经知道了`var`存在一些问题，这恰好说明了为什么用`let`语句来声明变量。 除了名字不同外， `let`与`var`的写法一致。
``` js
let hello = "Hello!";
```

主要的区别不在语法上，而是语义，我们接下来会深入研究。

#### 块作用域

::: tip
当用let声明一个变量，它使用的是词法作用域或块作用域。 
不同于使用 var声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或for循环之外是不能访问的。
:::

``` js
function f(input: boolean) {
    let a = 100;

    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }

    // Error: 'b' doesn't exist here
    return b;
}
```
这里我们定义了2个变量a和b。 a的作用域是f函数体内，而b的作用域是if语句块里。

在catch语句里声明的变量也具有同样的作用域规则。
``` js
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}

// Error: 'e' doesn't exist here
console.log(e);
```
拥有块级作用域的变量的另一个特点是: **它们不能在被声明之前读或写**。 

虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码之前的区域都属于 暂时性死区。 它只是用来说明我们不能在 let语句之前访问它们，幸运的是TypeScript可以告诉我们这些信息。
``` js
a++; // illegal to use 'a' before it's declared;
let a;
```
注意一点，我们仍然可以在一个拥有块作用域变量被声明前获取它。 只是我们不能在变量声明前去调用那个函数。 如果生成代码目标为ES2015，现代的运行时会抛出一个错误；然而，现今TypeScript是不会报错的。
``` js
function foo() {
    // okay to capture 'a'
    return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();

let a;
```
关于暂时性死区的更多信息，查看这里[Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let).

#### 重定义及屏蔽
我们提过使用var声明时，它不在乎你声明多少次；你只会得到1个。
``` js
function f(x) {
    var x;
    var x;

    if (true) {
        var x;
    }
}
```
在上面的例子里，所有x的声明实际上都引用一个相同的x，并且这是完全有效的代码。 这经常会成为bug的来源。 好的是， let声明就不会这么宽松了。
``` js
let x = 10;
let x = 20; // 错误，不能在1个作用域里多次声明`x`
```

::: tip
并不是要求两个均是块级作用域的声明TypeScript才会给出一个错误的警告。
::: 

``` js
function f(x) {
    let x = 100; // error: interferes with parameter declaration
}

function g() {
    let x = 100;
    var x = 100; // error: can't have both declarations of 'x'
}
```

::: tip
并不是说块级作用域变量不能用函数作用域变量来声明。 而是块级作用域变量需要在明显不同的块里声明。
:::

``` js
function f(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }

    return x;
}

f(false, 0); // returns 0
f(true, 0);  // returns 100
```
在一个嵌套作用域里引入一个新名字的行为称做屏蔽。 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误。 例如，假设我们现在用 let重写之前的sumMatrix函数。
``` js
function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```
这个版本的循环能得到正确的结果，因为内层循环的i可以屏蔽掉外层循环的i。

通常来讲应该避免使用屏蔽，因为我们需要写出清晰的代码。 同时也有些场景适合利用它，你需要好好打算一下。

#### 块级作用域变量的获取
在var声明的变量后，每次进入一个作用域时，它创建了一个变量的上下文环境。 就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。
``` js
function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }

    return getCity();
}
```
因为我们已经在city的环境里获取到了city，所以就算if语句执行结束后我们仍然可以访问它。

回想一下前面setTimeout的例子，我们最后需要使用立即执行的函数表达式来获取每次for循环迭代里的状态。 实际上，我们做的是为获取到的变量创建了一个新的变量环境。 这样做挺痛苦的，但是幸运的是，你不必在TypeScript里这样做了。

当let声明出现在循环体里时拥有完全不同的行为。 不仅是在循环里引入了一个新的变量环境，而是针对 每次迭代都会创建这样一个新作用域。 这就是我们在使用立即执行的函数表达式时做的事，所以在 setTimeout例子里我们仅使用let声明就可以了。
``` js
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}
```
会输出与预料一致的结果：
```
0
1
2
3
4
5
6
7
8
9
```
### const 声明
const 声明是声明变量的另一种方式。
``` js
const numLivesForCat = 9;
```
它们与let声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 

::: tip
const拥有与 let相同的作用域规则，但是不能对它们重新赋值。
:::

例如:
``` js
const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat,
}

// Error
kitty = {
    name: "Danielle",
    numLives: numLivesForCat
};

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
```
除非你使用特殊的方法去避免，实际上const变量的内部状态是可修改的。 幸运的是，TypeScript允许你将对象的成员设置成只读的。 接口一章有详细说明。

### let vs. const
现在我们有两种作用域相似的声明方式，我们自然会问到底应该使用哪个。 与大多数泛泛的问题一样，答案是：**依情况而定**。

使用**最小特权原则**:
所有变量除了你计划去修改的都应该使用const。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。 使用 const也可以让我们更容易的推测数据的流动。

跟据你的自己判断，如果合适的话，与团队成员商议一下。

这个手册大部分地方都使用了let声明。

### 解构
#### 解构数组
最简单的解构莫过于数组的解构赋值了：
``` js
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
```
这创建了2个命名变量 first 和 second。 相当于使用了索引，但更为方便：
``` js
first = input[0];
second = input[1];
```
解构作用于已声明的变量会更好：
``` js
// swap variables
[first, second] = [second, first];
```
作用于函数参数：
``` js
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f(input);
```
你可以在数组里使用`...`语法创建剩余变量：
``` js
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
```
当然，由于是JavaScript, 你可以忽略你不关心的尾随元素：

``` js
let [first] = [1, 2, 3, 4];
console.log(first); // outputs 1
```
或其它元素：
``` js
let [, second, , fourth] = [1, 2, 3, 4];
```
#### 对象解构
你也可以解构对象：
``` js
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
```
这通过 o.a and o.b 创建了 a 和 b 。 注意，如果你不需要 c 你可以忽略它。

就像数组解构，你可以用没有声明的赋值：
``` js
({ a, b } = { a: "baz", b: 101 });
```
注意，我们需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块。

你可以在对象里使用...语法创建剩余变量：
``` js
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
```
#### 属性重命名
你也可以给属性以不同的名字：
``` js
let { a: newName1, b: newName2 } = o;
```
这里的语法开始变得混乱。 你可以将 a: newName1 读做 "a 作为 newName1"。 方向是从左到右，好像你写成了以下样子：
``` js
let newName1 = o.a;
let newName2 = o.b;
```
令人困惑的是，这里的冒号不是指示类型的。 如果你想指定它的类型， 仍然需要在其后写上完整的模式。
``` js
let {a, b}: {a: string, b: number} = o;
```
#### 默认值
默认值可以让你在属性为 undefined 时使用缺省值：
``` js
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
```
现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。

#### 函数声明
解构也能用于函数声明。 看以下简单的情况：
``` js
type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
```
但是，通常情况下更多的是指定默认值，解构默认值有些棘手。 首先，你需要在默认值之前设置其格式。
``` js
function f({ a="", b=0 } = {}): void {
    // ...
}
f();
```
上面的代码是一个类型推断的例子，将在本手册后文介绍。

其次，你需要知道在解构属性上给予一个默认或可选的属性用来替换主初始化列表。 要知道 C 的定义有一个 b 可选属性：
``` js
function f({ a, b = 0 } = { a: "" }): void {
    // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to {a: ""}, which then defaults b = 0
f({}); // error, 'a' is required if you supply an argument
```
要小心使用解构。 
从前面的例子可以看出，就算是最简单的解构表达式也是难以理解的。 尤其当存在深层嵌套解构的时候，就算这时没有堆叠在一起的重命名，默认值和类型注解，也是令人难以理解的。 
::: tip
解构表达式要尽量保持小而简单。 
:::
你自己也可以直接使用解构将会生成的赋值表达式。

#### 展开
展开操作符正与解构相反。 它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。 例如：
``` js
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
```
这会令bothPlus的值为[0, 1, 2, 3, 4, 5]。 展开操作创建了 first和second的一份浅拷贝。 它们不会被展开操作所改变。

你还可以展开对象：
``` js
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```
search的值为{ food: "rich", price: "$$", ambiance: "noisy" }。 对象的展开比数组的展开要复杂的多。 像数组展开一样，它是从左至右进行处理，但结果仍为对象。 这就意味着出现在展开对象后面的属性会覆盖前面的属性。 因此，如果我们修改上面的例子，在结尾处进行展开的话：
``` js
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { food: "rich", ...defaults };
```
那么，defaults里的food属性会重写food: "rich"，在这里这并不是我们想要的结果。

对象展开还有其它一些意想不到的限制。 首先，它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法：
``` js
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```
其次，TypeScript编译器不允许展开泛型函数上的类型参数。 这个特性会在TypeScript的未来版本中考虑实现。

## 接口(interface)
TypeScript的核心原则之一是: **对值所具有的结构进行类型检查**.

它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

### 接口初探
通过下面这个简单的示例来了解接口是如何工作的:
``` js
function printLabel(labelledObj: {label: string}) {
  console.log(laybelledObj.label);
}

let myObj = {size: 10, label: 'Size 10'};
printLabel(myObj);
```
类型检查器会查看`printLabel`的调用. `printLabel`有一个参数, 并要求这个对象参数有一个名为`label`类型的`string`属性. 

需要注意的是, 我们传入的对象参数实际上会包含很多属性, 但是编译器只会检查那些必需的属性是否存在, 并且其类型是否匹配. 
然而, 有时TypeScript并不会这么宽松, 我们下面会稍做讲解. 

下面, 我们重写上面的例子, 这次使用接口来描述: 必须包含一个`label`属性且类型为`string`.
``` js
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```
`LabelledValue`接口就好比一个名字，用来描述上面例子里的要求。 
它代表了有一个`label`属性且类型为`string`的对象。 
需要注意的是，我们在这里并不能像在其它语言里一样，说传给 printLabel的对象实现了这个接口。
我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
::: tip 注意
TypeScript类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。
:::

### 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 
可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。

下面是应用了“option bags”的例子：
``` js
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```
带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个`?`符号。

可选属性的好处: 
* 可以对可能存在的属性进行预定义
* 可以捕获引用了不存在的属性时的错误。 比如，我们故意将 createSquare里的color属性名拼错，就会得到一个错误提示.

``` js
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```
### 只读属性
一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:
``` js
interface Point {
    readonly x: number;
    readonly y: number;
}
```

### readon vs const
最简单判断该用 readonly 还是 const的方法是看要把它做为变量使用, 还是做为一个属性使用:
* 若作为"变量", 用const
* 若作为"属性", 用readonly

### 属性检查
首先, 定义一个接口
``` js
interface SquareConfig {
    label: string;
    color?: string;
    readonly width?: number;
}
```
此时, 若我们在调用函数时, 传入如下参数:
``` js
const mySquare = createSquare({colord: 'black', label: 'hello'});
```
tslint提示语法错误:
```
Argument of type {color?: string; label?: string; readonly width: number} is not assignable to parameter of type 'SquareConfig'. Object literal man only specify known properties, but "colord" does not exist in type "SquareConfig". Did you mean to write "color"?
```
::: tip
传入的参数"colord"并不在接口"SquareConfig"的已知属性清单中.
:::

TypeScript会认为这段代码可能存在bug, 如果一个对象字面量存在任何"目标类型"不包含的属性时, 都会提示错误. 
若想绕开这些检查也非常简单, 最简便的方法是使用类型断言.
``` js
const mySquare = createSquare({colord: 'black', label: 'hello'} as SquareConfig);
```

然而, 最好的方法是:
添加一个字符串索引签名(前提是, 你能够确定这个对象可能具有某些做为特殊用途使用的额外属性).

如果"SquareConfig"带有除上面定义的类型之外的属性, 我们可以这么定义它.

``` js
interface SquareConfig {
    label: string;
    color?: string;
    readonly width?: number;
    [option: string]: any;      // 其他属性, 可以是任意多个
}
```

### 函数类型
接口能够描述JavaScript中带属性的普通对象外, 也可以描述函数类型.

为了使用接口表示函数类型, 我们需要给接口定义一个调用签名. 

它就像是一个只有参数列表和返回值类型的函数定义, 参数列表里的每个参数都需要名字和类型.

> 如果 interface 有且仅有一个调用签名, 推荐使用此方式替代: `type SearchFunc = (source:string, subString: string) => boolean;`

``` js
// 接口定义
type SearchFunc = (source:string, subString: string) => boolean;

const mySearch:SearchFunc = (source: string, subString: string) => {
    const result = source.search(subString);
    return result > -1;
}
```
函数的参数会逐个检查, 要求对应位置上的参数类型是兼容的. 若不指定类型, TypeScript的类型系统会推断出参数类型. 因为函数直接赋值给了SearchFunc类型变量. 

函数的返回值类型是通过其返回值推断出来的(此例是false或true), 如果让这个函数返回数字或字符串, 类型检查会警告我们函数的返回值类型与SearchFunc接口中的定义不匹配.

### 可索引的类型
与接口描述函数类型差不多, 我们也可以描述那些能够"通过索引得到"的类型, 如: `a[10]` 或 `ageMap['james']`, 可索引类型具胡一个"索引签名", 它描述了对象索引的类型, 还有相应的索引返回值类型.

``` js
interface StringArray {
    [index: number]: string;
}

let myArray:StringArray;
myArray = ['james', 'hello'];

const myStr: string = myArray[1];
```

上面的例子中, 我们定义了 StringArray接口, 它具有索引签名, 这个索引签名表示了当用 number 去索引 StringArray时会得到 string类型的返回值.

TypeScript支持两种索引签名:
* 字符串
* 数字

可同时使用两种类型签名, 但是数字索引的返回值必须是字符串索引返回值类型的子类型. 
这是因为当使用 number 来索引时, JavaScript会将它转换成 string , 然后再去索引对象. 也就是说, 用100(一个number)去索引等同于"100"(一个string)去索引, 因此两者需要保持一致.

``` js
class Animal {
    name: string;
}

class Dog extends Animal {
    breed: string;
}

interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
```
字符串索引签名能够很好的描述`dictionary`模式, 并且它们也会确保所有属性与其返回值类型相匹配, 因为字符串索引声明了`obj.property`和`obj['property']`两种形式都可以.

下面的例子中, name的类型与字符串索引类型不匹配, 所以类型检查器会给出一个错误提示.
``` js
interface NumberDictionary {
    [index: string]: number;
    length: number;         // 可以, length是number类型
    name: string;           // 错误, name的类型与索引类型返回值类型不匹配
}
```

正确的写法是:
``` js
interface NumberDictionary {
    [index: string]: number;
    length: number;         // 可以, length是number类型
    name: number;          
}
```
最后, 你可以将索引签名设置为只读, 这样可以防止给索引赋值.

``` js
interface ReadOnlyStringArray {
    readonly [index: number]: string;
}
const roArray: ReadonlyStringArray = ['hello', 'james'];
roArray[1] = 'helloworld'
```
此时, 编译器会提出错误信息:
```
index signature in type "ReadOnlyStringArray" only permits reading.
```

### class类型
#### 实现接口
与C#和Java里接口的基本作用一样, TypeScript也能够用它来明确的强制一个类去符合某种契约.
``` js
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

export default class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) {
        window.console.log(h, m);
    }

    setTime(d: Date): void {
        this.currentTime = d;
    }
}
```

> 接口仅仅只描述类的**公共部分**, 它不会帮你检查是否有某些私有成员.

#### class静态部分和实例部分的区别

class包含有两部分的类型:
* 静态部分
* 实例 

你会注意到, 当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时, 会得到一个错误:
``` js
interface ClockConstructor {
    new(hour: number, minute: number): any;
}

export default class NewClock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) {
        window.console.log(h, m);
    }
}
```
因为当一个 class 实现了一个接口时, 只对其实例部分进行类型检查, constructor 属于 class 静态部分, 所以不在检查的范围内. 
因此, 我们应该只操作class的静态部分.

下面的例子中, 我们定义了两个接口:
* ClockConstructor为构造函数所用
* ClockInterface为实例方法所用

为了方便, 我们定义了一个构造函数 createClock, 它用传入的类型创建实例.
``` js
type ClockConstructor = new (hour: number, minute: number) => ClockInterface;

interface ClockInterface = {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

export default class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {
        window.console.log(h, m);
    }

    tick(): void{
        window.console.log('beep beep');
    }
}

const digital = createClock(DigitalClock, 12, 17);
```

因为createClock 的第一个参数是DigitalClock类型, 在createClock(DigitalClock, 12, 17)里, 会检查DigitalClock是否符合构造函数签名.

#### 继承接口
和class一样, 接口也可以相互继承.

这让我们能够从一个接口里复制成员到另一个接口里, 可以更灵活地将接口分割到可重用的模块里.

``` js
interface Shape {
    color: string;
}
export default interface Square extends Shape {
    sideLength: number;
}

const square = {} as Square;
square.color = 'blue';
square.sideLength = 10;
```
一个接口可以继承多个接口, 创建出多个接口的合成接口.

``` js
interface Shape {
    color: string;
}

interface PerStroke {
    penWidth: number;
}

interface Square extends Shape, PerStroke {
    sideLength: number;
}

const square = {} as Square;
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 5.0;
```

#### 混合类型
接口能够描述JavaScript
// to do

#### 接口继承类
