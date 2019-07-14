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
### 未声明类型的变量
变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
``` js
let hello;
hello = 'james';
hello = 30;

hello.world('James');
```
等价于
``` js
let hello: any;
hello = 'james';
hello = 30;

hello.world('James');
```

### 类型推断
若在变量声明时, 没有指定类型, TypeScript会依据类型推断出一个类型. 

例如:
以下代码虽然没有指定类型，但是会在编译的时候报错：
``` js
let hello = "world";
```
等价于:
``` js
let hello: string;
hello = "world"
```

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
``` js
let hello;
hello = 'world';
hello = 10;
```
等价于:
``` js
let hello: any;
hello = 'world';
hello = 10;
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
### 联合类型
联合类型（Union Types）表示取值可以为多种类型中的一种。
例如:
``` js
let hello: string | number;
hello = 'world';
hello = 7;
let hello: string | number;
hello = true;
```
此时TypeScript会编译出错:
```
demo.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
Type 'boolean' is not assignable to type 'number'.
```

联合类型使用 `|` 分隔每个类型。例如:
``` js
let hello: string | number;
// 允许 hello 的类型是 string 或者 number，但是不能是其他类型。
```

访问联合类型的属性或方法
当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
``` js
function getLength(something: string | number): number {
    return something.length;
}
```
此时编译会出错, 因为`string`与`number`的不存在共有属性`length`. 访问 `string` 和 `number` 的共有属性(如: `toString方法`是没问题的
```
demo.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
 Property 'length' does not exist on type 'number'.
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
``` js 
let hello: string | number;
hello = 'world';
console.log(hello.length); // 5
hello = 10;
console.log(hello.length); // error TS2339: Property 'length' does not exist on type 'number'.
```
此例中，第二行的 `hello` 被推断成了 `string`，访问它的 `length` 属性不会报错。
而第四行的 `hello` 被推断成了 `number`，访问它的 `length` 属性时就报错了。
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


## 类型推论

### 基础
TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。例如:
``` js
let x = 3;
```
变量x的类型被推断为数字。 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。

大多数情况下，类型推论是直截了当的。

### 通用类型
当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，
``` js
let x = [0, 1, null];
```
为了推断x的类型，我们必须考虑所有元素的类型。 这里有两种选择： `number`和`null`。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。

由于最终的通用类型取自候选类型，有些时候候选类型共享相同的通用类型，但是却没有一个类型能做为所有候选类型的类型。例如：
``` js
let zoo = [new Rhino(), new Elephant(), new Snake()];
```
这里，我们想让zoo被推断为Animal[]类型，但是这个数组里没有对象是Animal类型的，因此不能推断出这个结果。 为了更正，当候选类型不能使用的时候我们需要明确的指出类型：
``` js
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
```
如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，`(Rhino | Elephant | Snake)[]`。

### 上下文类型
TypeScript类型推论也可能按照相反的方向进行。 这被叫做“按上下文归类”。按上下文归类会发生在表达式的类型与所处的位置相关时。比如：
``` js
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  //<- Error
};
```
这个例子会得到一个类型错误，TypeScript类型检查器使用`window.onmousedown`函数的类型来推断右边函数表达式的类型。 因此，就能推断出 `mouseEvent`参数的类型了。 如果函数表达式不是在上下文类型的位置， `mouseEvent`参数的类型需要指定为`any`，这样也不会报错了。

如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略。 重写上面的例子：
``` js
window.onmousedown = function(mouseEvent: any) {
    console.log(mouseEvent.button);  //<- Now, no error is given
};
```
这个函数表达式有明确的参数类型注解，上下文类型被忽略。 这样的话就不报错了，因为这里不会使用到上下文类型。

上下文归类会在很多情况下使用到。 通常包含函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句。 上下文类型也会做为最佳通用类型的候选类型。比如：
``` js
function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()];
}
```
这个例子里，最佳通用类型有4个候选者：`Animal`，`Rhin`o，`Elephant`和`Snake`。 当然， Animal会被做为最佳通用类型。

## 类型兼容性

TypeScript里的类型兼容性是基于结构子类型的。 
结构类型是一种只使用其成员来描述类型的方式。 它正好与名义（nominal）类型形成对比。（译者注：在基于名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明和/或类型的名称来决定的。这与结构性类型系统不同，它是基于类型的组成结构，且不要求明确地声明。） 

例如：
``` js
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
```
在使用基于名义类型的语言，比如C#或Java中，这段代码会报错，因为Person类没有明确说明其实现了Named接口。

TypeScript的结构性子类型是根据JavaScript代码的典型写法来设计的。 因为JavaScript里广泛地使用匿名对象，例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好。

### 关于可靠性的注意事项
TypeScript的类型系统允许某些在编译阶段无法确认其安全性的操作。
当一个类型系统具此属性时，被当做是“不可靠”的。TypeScript允许这种不可靠行为的发生是经过仔细考虑的。通过这篇文章，我们会解释什么时候会发生这种情况和其有利的一面。

### 开始
::: tip TypeScript结构化类型系统的基本规则
如果`x`要兼容`y`，那么`y`至少具有与`x`相同的属性。比如：
:::

``` js
interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x = y;
```
这里要检查`y`是否能赋值给`x`，编译器检查`x`中的每个属性，看是否能在`y`中也找到对应属性。 
在这个例子中，`y`必须包含名字是`name`的`string`类型成员。`y`满足条件，因此赋值正确。

检查函数参数时使用相同的规则：
``` js
function greet(n: Named) {
    console.log('Hello, ' + n.name);
}
greet(y); // OK
```
注意，`y`有个额外的`location`属性，但这不会引发错误。 只有目标类型（这里是`Named`）的成员会被一一检查是否兼容。

这个比较过程是递归进行的，检查每个成员及子成员。

### 比较两个函数
相对来讲，在比较原始类型和对象类型的时候是比较容易理解的，问题是如何判断两个函数是兼容的。 
下面我们从两个简单的函数入手，它们仅是参数列表略有不同：
``` js
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```
要查看`x`是否能赋值给`y`，首先看它们的参数列表。 `x`的每个参数必须能在`y`里找到对应类型的参数。 
注意的是参数的名字相同与否无所谓，只看它们的类型。 这里，`x`的每个参数在`y`中都能找到对应的参数，所以允许赋值。

第二个赋值错误，因为`y`有个必需的第二个参数，但是`x`并没有，所以不允许赋值。

你可能会疑惑为什么允许忽略参数，像例子`y = x`中那样。 原因是忽略额外的参数在JavaScript里是很常见的。 
例如，`Array#forEach`给回调函数传3个参数：数组元素，索引和整个数组。 尽管如此，传入一个只使用第一个参数的回调函数也是很有用的：

``` js
let items = [1, 2, 3];

// Don't force these extra arguments
items.forEach((item, index, array) => console.log(item));

// Should be OK!
items.forEach((item) => console.log(item));
```
下面来看看如何处理返回值类型，创建两个仅是返回值类型不同的函数：
``` js
let x = () => ({name: 'Alice'});
let y = () => ({name: 'Alice', location: 'Seattle'});

x = y; // OK
y = x; // Error, because x() lacks a location property
```
类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。

### 函数参数双向协变
当比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功。 
这是不稳定的，因为调用者可能传入了一个具有更精确类型信息的函数，但是调用这个传入的函数的时候却使用了不是那么精确的类型信息。 
实际上，这极少会发生错误，并且能够实现很多JavaScript里的常见模式。例如：
``` js
enum EventType { Mouse, Keyboard }

interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}

// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
listenEvent(EventType.Mouse, (e: number) => console.log(e));
```
### 可选参数及剩余参数
比较函数兼容性的时候，可选参数与必须参数是可互换的。 
源类型上有额外的可选参数不是错误，目标类型的可选参数在源类型里没有对应的参数也不是错误。

当一个函数有剩余参数时，它被当做无限个可选参数。

这对于类型系统来说是不稳定的，但从运行时的角度来看，可选参数一般来说是不强制的，因为对于大多数函数来说相当于传递了一些undefinded。

有一个好的例子，常见的函数接收一个回调函数并用对于程序员来说是可预知的参数但对类型系统来说是不确定的参数来调用：
``` js
function invokeLater(args: any[], callback: (...args: any[]) => void) {
    /* ... Invoke callback with 'args' ... */
}

// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));

// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));
```
### 函数重载
对于有重载的函数，源函数的每个重载都要在目标函数上找到对应的函数签名。
这确保了目标函数可以在所有源函数可调用的地方调用。

### 枚举
枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。比如，
``` js
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Green;  // Error
```
### 类
类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。 
比较两个类类型的对象时，只有实例的成员会被比较。 **静态成员和构造函数不在比较的范围内。**
``` js
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK
```
### 类的私有成员和受保护成员
类的私有成员和受保护成员会影响兼容性。 
当检查类实例的兼容时，如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的这个私有成员。 
同样地，这条规则也适用于包含受保护成员实例的类型检查。 这允许子类赋值给父类，但是不能赋值给其它有同样类型的类。

### 泛型
因为TypeScript是结构性的类型系统，类型参数只影响使用其做为类型一部分的结果类型。比如，
``` js
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x
```
上面代码里，`x`和`y`是兼容的，因为它们的结构使用类型参数时并没有什么不同。 把这个例子改变一下，增加一个成员，就能看出是如何工作的了：
``` js
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // Error, because x and y are not compatible
```
在这里，泛型类型在使用时就好比不是一个泛型类型。

对于没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较。 然后用结果类型进行比较，就像上面第一个例子。

比如，
``` js
let identity = function<T>(x: T): T {
    // ...
}

let reverse = function<U>(y: U): U {
    // ...
}

identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
```
### 高级主题
#### 子类型与赋值
目前为止，我们使用了“兼容性”，它在语言规范里没有定义。 
在TypeScript里，有两种兼容性：子类型和赋值。 它们的不同点在于，赋值扩展了子类型兼容性，增加了一些规则，允许和any来回赋值，以及enum和对应数字值之间的来回赋值。

语言里的不同地方分别使用了它们之中的机制。 实际上，类型兼容性是由赋值兼容性来控制的，即使在implements和extends语句也不例外。

更多信息，请参阅[TypeScript语言规范](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md).
## 高级类型
### 交叉类型（Intersection Types）
交叉类型是将多个类型合并为一个类型。 
这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 
例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 
就是说这个类型的对象同时拥有了这三种类型的成员。

我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在JavaScript里发生这种情况的场合很多！） 
下面是如何创建混入的一个简单例子：
``` js
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```
### 联合类型（Union Types）
联合类型与交叉类型很有关联，但是使用上却完全不同。 
偶尔你会遇到这种情况，一个代码库希望传入 number或 string类型的参数。 
例如下面的函数：

``` js
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"
```
padLeft存在一个问题， padding参数的类型指定成了 any。 这就是说我们可以传入一个既不是 number也不是 string类型的参数，但是TypeScript却不报错。

`let indentedString = padLeft("Hello world", true); // 编译阶段通过，运行时报错`

在传统的面向对象语言里，我们可能会将这两种类型抽象成有层级的类型。 
这么做显然是非常清晰的，但同时也存在了过度设计。 
padLeft原始版本的好处之一是允许我们传入原始类型。 这样做的话使用起来既简单又方便。 如果我们就是想使用已经存在的函数的话，这种新的方式就不适用了。
代替 any， 我们可以使用 联合类型做为 padding的参数：
``` js {6}
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
    // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation
```
联合类型表示一个值可以是几种类型之一。 
我们用竖线（ |）分隔每个类型，所以 `number | string | boolean`表示一个值可以是 `number`， `string`，或`boolean`。

如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
``` js
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
```
这里的联合类型可能有点复杂，但是你很容易就习惯了。 如果一个值的类型是 A | B，我们能够 确定的是它包含了 A 和 B中共有的成员。 这个例子里， Bird具有一个 fly成员。 我们不能确定一个 Bird | Fish类型的变量是否有 fly方法。 如果变量在运行时是 Fish类型，那么调用 pet.fly()就出错了。

### 类型保护与区分类型（Type Guards and Differentiating Types）
联合类型适合于那些值可以为不同类型的情况。 
但当我们想确切地了解是否为 Fish时怎么办？ 
JavaScript里常用来区分2个可能值的方法是检查成员是否存在。 如之前提及的，我们只能访问联合类型中共同拥有的成员。
``` js
let pet = getSmallPet();

// 每一个成员访问都会报错
if (pet.swim) {
    pet.swim();
}
else if (pet.fly) {
    pet.fly();
}
```
为了让这段代码工作，我们要使用类型断言：
``` js
let pet = getSmallPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
```
### 用户自定义的类型保护
这里可以注意到我们不得不多次使用类型断言。 
假若我们一旦检查过类型，就能在之后的每个分支里清楚地知道 pet的类型的话就好了。

TypeScript里的 类型保护机制让它成为了现实。
类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：
``` js
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```
在这个例子里， `pet is Fish`就是类型谓词。 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。

每当使用一些变量调用 isFish时，TypeScript会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。
``` js
// 'swim' 和 'fly' 调用都没有问题了

if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
```
::: tip 注意
TypeScript不仅知道在 if分支里 pet是 Fish类型； 它还清楚在 else分支里，一定 不是 Fish类型，一定是 Bird类型。
::: 

### typeof类型保护
现在我们回过头来看看怎么使用联合类型书写 padLeft代码。 我们可以像下面这样利用类型断言来写：
``` js
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```
然而，必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。 
幸运的是，现在我们不必将 typeof x === "number"抽象成一个函数，因为TypeScript可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了。
``` js
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```
这些**typeof类型保护**只有两种形式能被识别： 
* typeof v === "typename"
* typeof v !== "typename"

**"typename"必须是 "number"， "string"， "boolean"或 "symbol"。**

但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。

### instanceof类型保护
instanceof类型保护是通过构造函数来细化类型的一种方式。 
比如，我们借鉴一下之前字符串填充的例子：
``` js
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
```
instanceof的右侧要求是一个构造函数，TypeScript将细化为：此构造函数的 prototype属性的类型，如果它的类型不为 any的话, 构造签名所返回的类型的联合

### 可以为null的类型
TypeScript具有两种特殊的类型:
* null
* undefined
它们分别具有值`null`和`undefined`. 

默认情况下，类型检查器认为 `null`与 `undefined`可以赋值给任何类型。 
`null`与 `undefined`是所有其它类型的一个有效值。 
这也意味着，你阻止不了将它们赋值给其它类型，就算是你想要阻止这种情况也不行。 null的发明者，Tony Hoare，称它为 价值亿万美金的错误。

`--strictNullChecks`标记可以解决此错误：
当你声明一个变量时，它不会自动地包含 null或 undefined。 你可以使用联合类型明确的包含它们：
``` js
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以

sn = undefined; // error, 'undefined'不能赋值给'string | null'
```
注意，按照JavaScript的语义，TypeScript会把 `null`和 `undefined`区别对待。 `string` | `null，` `string` | `undefined`和 `string` | `undefined` | `null`是不同的类型。

### 可选参数和可选属性
使用了 `--strictNullChecks`，可选参数会被自动地加上 `| undefined`:
``` js
function f(x: number, y?: number) {
    return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'
```
可选属性也会有同样的处理：
``` js
class C {
    a: number;
    b?: number;
}
let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 13;
c.b = undefined; // ok
c.b = null; // error, 'null' is not assignable to 'number | undefined'
```

### 类型保护和类型断言
由于可以为null的类型是通过联合类型实现，那么你需要使用类型保护来去除 null。 幸运地是这与在JavaScript里写的代码一致：
``` js
function f(sn: string | null): string {
    if (sn == null) {
        return "default";
    }
    else {
        return sn;
    }
}
```
这里很明显地去除了 null，你也可以使用短路运算符：
``` js
function f(sn: string | null): string {
    return sn || "default";
}
```
如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除。 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined：

``` js
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}
```
本例使用了嵌套函数，因为编译器无法去除嵌套函数的null（除非是立即调用的函数表达式）。 因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数做为外层函数的返回值。 如果无法知道函数在哪里被调用，就无法知道调用时 name的类型。

### 类型别名
类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
``` js
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```
起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。 给原始类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入：
``` js
type Container<T> = { value: T };
```
我们也可以使用类型别名来在属性里引用自己：
``` js
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
```
与交叉类型一起使用，我们可以创建出一些十分稀奇古怪的类型。
``` js
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```
然而，类型别名不能出现在声明右侧的任何地方。
``` js
type Yikes = Array<Yikes>; // error
```

### 接口 vs. 类型别名
像我们提到的，类型别名可以像接口一样；然而，仍有一些细微差别。
* 接口创建了一个新的名字，可以在其它任何地方使用。 
* 类型别名并不创建新名字—比如，错误信息就不会使用别名。 

在下面的示例代码里，在编译器中将鼠标悬停在 interfaced上，显示它返回的是 Interface，但悬停在 aliased上时，显示的却是对象字面量类型。
``` js
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```
另一个重要区别是类型别名不能被 `extends`和 `implements`（自己也不能 extends和 implements其它类型）。 
因为 软件中的对象应该对于扩展是开放的，但是对于修改是封闭的，你应该尽量去使用接口代替类型别名。

另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

### 字符串字面量类型
字符串字面量类型允许你指定字符串必须的固定值。 
在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。 
通过结合使用这些特性，你可以实现类似枚举类型的字符串。
``` js
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
```
你只能从三种允许的字符中选择其一来做为参数传递，传入其它值则会产生错误。
```
Argument of type '"uneasy"' is not assignable to parameter of type '"ease-in" | "ease-out" | "ease-in-out"'
```
字符串字面量类型还可以用于区分函数重载：
``` js
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
    // ... code goes here ...
}
```
### 数字字面量类型
TypeScript还具有数字字面量类型。
``` js
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
}
```
我们很少直接这样使用，但它们可以用在缩小范围调试bug的时候：
``` js
function foo(x: number) {
    if (x !== 1 || x !== 2) {
        //         ~~~~~~~
        // Operator '!==' cannot be applied to types '1' and '2'.
    }
}
```
换句话说，当 `x`与 `2`进行比较的时候，它的值必须为 `1`，这就意味着上面的比较检查是非法的。

### 枚举成员类型
如我们在 枚举一节里提到的，当每个枚举成员都是用字面量初始化的时候枚举成员是具有类型的。

在我们谈及“单例类型”的时候，多数是指枚举成员类型和数字/字符串字面量类型，尽管大多数用户会互换使用“单例类型”和“字面量类型”。

### 可辨识联合（Discriminated Unions）
你可以合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合的高级模式，它也称做 标签联合或 代数数据类型。 可辨识联合在函数式编程很有用处。 一些语言会自动地为你辨识联合；而TypeScript则基于已有的JavaScript模式。 它具有3个要素：

具有普通的单例类型属性— 可辨识的特征。
一个类型别名包含了那些类型的联合— 联合。
此属性上的类型保护。
``` js
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
```
首先我们声明了将要联合的接口。 每个接口都有 kind属性但有不同的字符串字面量类型。 kind属性称做 可辨识的特征或 标签。 其它的属性则特定于各个接口。 注意，目前各个接口间是没有联系的。 下面我们把它们联合到一起：
``` js
type Shape = Square | Rectangle | Circle;
```
现在我们使用可辨识联合:
``` js
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```
### 完整性检查
当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。 比如，如果我们添加了 Triangle到 Shape，我们同时还需要更新 area:
``` js
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // should error here - we didn't handle case "triangle"
}
```
有两种方式可以实现。 首先是启用 --strictNullChecks并且指定一个返回值类型：
``` js
function area(s: Shape): number { // error: returns number | undefined
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```
因为 switch没有包涵所有情况，所以TypeScript认为这个函数有时候会返回 undefined。 如果你明确地指定了返回值类型为 number，那么你会看到一个错误，因为实际上返回值的类型为 number | undefined。 然而，这种方法存在些微妙之处且 --strictNullChecks对旧代码支持不好。

第二种方法使用 never类型，编译器用它来进行完整性检查：
``` js
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // error here if there are missing cases
    }
}
```
这里， assertNever检查 s是否为 never类型—即为除去所有可能情况后剩下的类型。 如果你忘记了某个case，那么 s将具有一个真实的类型并且你会得到一个错误。 这种方式需要你定义一个额外的函数，但是在你忘记某个case的时候也更加明显。

### 多态的 this类型
多态的 this类型表示的是某个包含类或接口的 子类型。 这被称做 F-bounded多态性。 它能很容易的表现连贯接口间的继承. 
比如。 在计算器的例子里，在每个操作之后都返回 this类型：
``` js
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();
```
由于这个类使用了 this类型，你可以继承它，新的类可以直接使用之前的方法，不需要做任何的改变。
``` js
class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
```
如果没有 this类型， ScientificCalculator就不能够在继承 BasicCalculator的同时还保持接口的连贯性。 
multiply将会返回 BasicCalculator，它并没有 sin方法。 
然而，使用 this类型， multiply会返回 this，在这里就是 ScientificCalculator。

### 索引类型（Index types）
使用索引类型，编译器就能够检查使用了动态属性名的代码。 例如，一个常见的JavaScript模式是从对象中选取属性的子集。
``` js
function pluck(o, names) {
    return names.map(n => o[n]);
}
```
下面是如何在TypeScript里使用此函数，通过 索引类型查询和 索引访问操作符：
``` js
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```
编译器会检查 name是否真的是 Person的一个属性。 本例还引入了几个新的类型操作符。 首先是 keyof T， 索引类型查询操作符。 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。 例如：
``` js
let personProps: keyof Person; // 'name' | 'age'
```
keyof Person是完全可以与 'name' | 'age'互相替换的。 不同的是如果你添加了其它的属性到 Person，例如 address: string，那么 keyof Person会自动变为 'name' | 'age' | 'address'。 你可以在像 pluck函数这类上下文里使用 keyof，因为在使用之前你并不清楚可能出现的属性名。 但编译器会检查你是否传入了正确的属性名给 pluck：
``` js
pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'
```
第二个操作符是 T[K]， 索引访问操作符。 在这里，类型语法反映了表达式语法。 这意味着 person['name']具有类型 Person['name'] — 在我们的例子里则为 string类型。 然而，就像索引类型查询一样，你可以在普通的上下文里使用 T[K]，这正是它的强大所在。 你只要确保类型变量 K extends keyof T就可以了。 例如下面 getProperty函数的例子：
``` js
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
getProperty里的 o: T和 name: K，意味着 o[name]: T[K]。 当你返回 T[K]的结果，编译器会实例化键的真实类型，因此 getProperty的返回值类型会随着你需要的属性改变。

let name: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'
```
### 索引类型和字符串索引签名
keyof和 T[K]与字符串索引签名进行交互。 如果你有一个带有字符串索引签名的类型，那么 keyof T会是 string。 并且 T[string]为索引签名的类型：
``` js
interface Map<T> {
    [key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>['foo']; // number
```
### 映射类型
一个常见的任务是将一个已知的类型每个属性都变为可选的：
``` js
interface PersonPartial {
    name?: string;
    age?: number;
}
```
或者我们想要一个只读版本：
``` js
interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}
```
这在JavaScript里经常出现，TypeScript提供了从旧类型中创建新类型的一种方式 — 映射类型。 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 
例如，你可以令每个属性成为 readonly类型或可选的。 下面是一些例子：
``` js
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}
```
像下面这样使用：
``` js
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
``` 
下面来看看最简单的映射类型和它的组成部分：
``` js
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```
它的语法与索引签名的语法类型，内部使用了 `for .. in`。 具有三个部分：

类型变量 K，它会依次绑定到每个属性。
字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
属性的结果类型。
在这个简单的例子里， Keys是硬编码的的属性名列表并且属性类型永远是 boolean，因此这个映射类型等同于：
``` js
type Flags = {
    option1: boolean;
    option2: boolean;
}
```
在真正的应用里，可能不同于上面的 Readonly或 Partial。 它们会基于一些已存在的类型，且按照一定的方式转换字段。 这就是 keyof和索引访问类型要做的事情：
``` js
type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerson = { [P in keyof Person]?: Person[P] }
```
但它更有用的地方是可以有一些通用版本。
``` js
type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial<T> = { [P in keyof T]?: T[P] }
```
在这些例子里，属性列表是 keyof T且结果类型是 T[P]的变体。 
这是使用通用映射类型的一个好模版。 因为这类转换是 同态的，映射只作用于 T的属性而没有其它的。 
编译器知道在添加任何新属性之前可以拷贝所有存在的属性修饰符。 例如，假设 Person.name是只读的，那么 `Partial<Person>.name`也将是只读的且为可选的。

下面是另一个例子， T[P]被包装在 `Proxy<T>`类里：
``` js
type Proxy<T> = {
    get(): T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {
   // ... wrap proxies ...
}
let proxyProps = proxify(props);
```
注意 `Readonly<T>`和 `Partial<T>`用处不小，因此它们与 Pick和 Record一同被包含进了TypeScript的标准库里：
``` js
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}
type Record<K extends string, T> = {
    [P in K]: T;
}
```
Readonly， Partial和 Pick是同态的，但 Record不是。 因为 Record并不需要输入类型来拷贝属性，所以它不属于同态：
``` js
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
```
非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符。

### 由映射类型进行推断
现在你了解了如何包装一个类型的属性，那么接下来就是如何拆包。 其实这也非常容易：
``` js
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}

let originalProps = unproxify(proxyProps);
```
注意这个拆包推断只适用于同态的映射类型。 如果映射类型不是同态的，那么需要给拆包函数一个明确的类型参数。

### 预定义的有条件类型
TypeScript 2.8在lib.d.ts里增加了一些预定义的有条件类型：
```
Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
Extract<T, U> -- 提取T中可以赋值给U的类型。
NonNullable<T> -- 从T中剔除null和undefined。
ReturnType<T> -- 获取函数返回值类型。
InstanceType<T> -- 获取构造函数类型的实例类型。
```
示例
``` js
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
    return { a: 1, b: s };
}

class C {
    x = 0;
    y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error

type T20 = InstanceType<typeof C>;  // C
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
type T23 = InstanceType<string>;  // Error
type T24 = InstanceType<Function>;  // Error
```
::: tip 注意
Exclude类型是建议的Diff类型的一种实现。我们使用Exclude这个名字是为了避免破坏已经定义了Diff的代码，并且我们感觉这个名字能更好地表达类型的语义。我们没有增加Omit<T, K>类型，因为它可以很容易的用Pick<T, Exclude<keyof T, K>>来表示。
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
接口能够描述JavaScript中丰富的类型. 
因为JavaScript的动态灵活的特性, 有时你可能需要一个对象同时具有多种类型.

例如, 一个对象可以同时作为函数和对象使用, 并带有额外的属性.
``` js
interfact Counter{
    (start: number): string;
    interval: nmber;
    reset(): void;
}

export default function getCounter():Counter{
    const counter = ((start: number) => {
        window.console.log("hello");
    }) as Counter;
    counter.reset = () => {
        window.console.log('counter.reset()');
    }
    return counter;
}

const c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

在使用JavaScript第三方库的时候, 你可能需要像上面那样去完整定义类型.

#### 接口继承类
当接口继承了一个`class`类型时, 它会继承`class`的成员, 但不包括其实现. 就好像接口声明了类中存在的成员, 但并没有提供具体的实现一样.

接口同样会继承类的`private`和`protected`成员, 这意味着当你创建了一个接口继承了一个拥有`private`或`protected`成员的`class`时, 这个接口类型只能被这个`class`或其子类所实现(`implement`).

当你有一个庞大的继承结构时, 会很有用. 
但要指出的, 你的代码只在子类拥有特定属性时起作用, 这个子类除了继承自基类外, 与基类没有任何关系.

例如:
``` js
class Control {
    private state: any;
}

interfact SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select():void {
        window.console.log("button select");
    }
}

export default class TextBox extends Control {
    select(): void {
        window.console.log("textbox select");
    }
}

// 错误, ImageBox类型缺少state属性
class ImageBox implements SelectableControl {
    select(): void {
        window.console.log("image select");
    }
}
```
编译将会出错:
```
Class "ImageBox" incorrectly implements interfact "SelectableControl". 
    Property "state" is missing in type "ImageBox" but required in type "SelectableControl".
```

在上面的示例中:
`SelectableControl` 包含了`Control`所有的成员, 包括`private`成员`state`. 因为`state`是`private`私有成员, 所以只能够是`Control`的子类们才能实现`SelectableControl`接口.

> 因为只有"Control"的子类才会拥有一个`Control`的私有成员`state`, 这对私有成员的兼容性是必需的.

在`Control`内部, 是允许通过`SelectableControl`的实例来访问私有成员`state`的. 实际上, `SelectableControl`接口和拥有`select`方法的`Control`类是一样的. 

`Button`和`TextBox`类是`SelectableControl`的子类(因为它们都继承至`Control`并有`select`方法), 但`ImageBox`类没有.


## 类(class)
传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 
从ECMAScript 2015，也就是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象的方式。 
使用TypeScript，我们允许开发者现在就使用这些特性，并且编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本。

### 类
下面看一个使用类的例子：
``` js
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```
如果你使用过C#或Java，你会对这种语法非常熟悉。 我们声明一个 Greeter类。这个类有3个成员：一个叫做 greeting的属性，一个构造函数和一个 greet方法。

你会注意到，我们在引用任何一个类成员的时候都用了 this。 它表示我们访问的是类的成员。

最后一行，我们使用 new构造了 Greeter类的一个实例。 它会调用之前定义的构造函数，创建一个 Greeter类型的新对象，并执行构造函数初始化它。

### 继承
在TypeScript里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

看下面的例子：
``` js
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```
这个例子展示了最基本的继承：类从基类中继承了属性和方法。 
这里， Dog是一个 派生类，它派生自 Animal 基类，通过 `extends`关键字。 派生类通常被称作 **子类**，基类通常被称作 **超类**。

因为 Dog继承了 Animal的功能，因此我们可以创建一个 Dog的实例，它能够 bark()和 move()。

下面我们来看个更加复杂的例子。
``` js
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```
这个例子展示了一些上面没有提到的特性。 这一次，我们使用 extends关键字创建了 Animal的两个子类： Horse和 Snake。

::: tip 注意
与前一个例子的不同点是，派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 
而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 
这个是TypeScript强制执行的一条重要规则。
:::

这个例子演示了如何在子类里可以重写父类的方法。
 Snake类和 Horse类都创建了 move方法，它们重写了从 Animal继承来的 move方法，使得 move方法根据不同的类而具有不同的功能。 
 注意，即使 tom被声明为 Animal类型，但因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法：

```
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```

### 默认为 public
在上面的例子里，我们可以自由的访问程序里定义的成员。 
如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 public来做修饰；
例如，C#要求必须明确地使用 public指定成员是可见的。 

::: tip
在TypeScript里，成员都默认为 public。
:::

你也可以明确的将一个成员标记成 public。 我们可以用下面的方式来重写上面的 Animal类：
``` js
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```
### private
当成员被标记成 `private`时，它就不能在声明它的类的外部访问。

比如：
``` js
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

::: tip
TypeScript使用的是结构性类型系统。 
当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。
:::

然而，当我们比较带有 `private`或 `protected`成员的类型的时候，情况就不同了。 
如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 
对于 protected成员也使用这个规则。

下面来看一个例子，更好地说明了这一点：
``` js
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.
```
这个例子中有 Animal和 Rhino两个类， Rhino是 Animal类的子类。 
还有一个 Employee类，其类型看上去与 Animal是相同的。 我们创建了几个这些类的实例，并相互赋值来看看会发生什么。 
因为 Animal和 Rhino共享了来自 Animal里的私有成员定义 private name: string，因此它们是兼容的。 
然而 Employee却不是这样。当把 Employee赋值给 Animal的时候，得到一个错误，说它们的类型不兼容。
尽管 Employee里也有一个私有成员 name，但它明显不是 Animal里面定义的那个。

### protected
`protected`修饰符与 `private`修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。

例如：
``` js
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```
注意，我们不能在 Person类外使用 name，但是我们仍然可以通过 Employee类的实例方法访问，因为 Employee是由 Person派生而来的。

构造函数也可以被标记成 `protected`。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如，
``` js
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
```

### readonly修饰符
你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
``` js
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
```

### 参数属性
在上面的例子中，我们必须在Octopus类里定义一个只读成员 name和一个参数为 theName的构造函数，并且立刻将 theName的值赋给 name，这种情况经常会遇到。 
参数属性可以方便地让我们在一个地方定义并初始化一个成员。 

下面的例子是对之前 Octopus类的修改版，使用了参数属性：
``` js
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
```
注意看我们是如何舍弃了 theName，仅在构造函数里使用 readonly name: string参数来创建和初始化 name成员。 我们把声明和赋值合并至一处。

参数属性通过给构造函数参数前面添加一个访问限定符来声明。 
使用 `private`限定一个参数属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样。

### 存取器
TypeScript支持通过`getters/setters`来截取对对象成员的访问。 
它能帮助你有效的控制对对象成员的访问。

下面来看如何把一个简单的类改写成使用 get和 set。 首先，我们从一个没有使用存取器的例子开始。
``` js
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```
我们可以随意的设置 fullName，这是非常方便的，但是这也可能会带来麻烦。

下面这个版本里，我们先检查用户密码是否正确，然后再允许其修改员工信息。 我们把对 fullName的直接访问改成了可以检查密码的 set方法。 
我们也加了一个 get方法，让上面的例子仍然可以工作。
``` js
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```
我们可以修改一下密码，来验证一下存取器是否是工作的。
当密码不对时，会提示我们没有权限去修改员工。

::: tip 存取器使用注意事项：
* 存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 
* 只带有 get不带有 set的存取器自动被推断为 readonly。 

这在从代码生成 .d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。
::: 

### 静态属性(static)

到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 
我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。 
在这个例子里，我们使用 `static`定义 `origin`，因为它是所有网格都会用到的属性。 
每个实例想要访问这个属性的时候，都要在 origin前面加上类名。 
如同在实例属性上使用 `this.`前缀来访问属性一样，
这里我们使用 `Grid.`来访问静态属性。

``` js
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

### 抽象类
抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 
不同于接口，抽象类可以包含成员的实现细节。 

::: tip
`abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法。
:::

``` js
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```
抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 
抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 
然而，抽象方法必须包含 `abstract`关键字并且可以包含访问修饰符。
``` js
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

### 构造函数(高级技巧)
当你在TypeScript里声明了一个类的时候，实际上同时声明了很多东西。 
首先就是类的 实例的类型。
``` js
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```
这里，我们写了 let greeter: Greeter，意思是 Greeter类的实例的类型是 Greeter。 
这对于用过其它面向对象语言的程序员来讲已经是老习惯了。

我们也创建了一个叫做 `构造函数`的方法。 
这个函数会在我们使用 `new`创建类实例的时候被调用。 
下面我们来看看，上面的代码被编译成JavaScript后是什么样子的：
``` js
let Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```
上面的代码里， `let Greeter`将被赋值为构造函数。 
当我们调用 new并执行了这个函数后，便会得到一个类的实例。 这个构造函数也包含了类的所有静态属性。 
换个角度说，我们可以认为类具有 **实例部分**与 **静态部分**这两个部分。

让我们稍微改写一下这个例子，看看它们之间的区别：
``` js
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```
这个例子里， greeter1与之前看到的一样。 我们实例化 Greeter类，并使用这个对象。 与我们之前看到的一样。

再之后，我们直接使用类。 我们创建了一个叫做 greeterMaker的变量。 这个变量保存了这个类或者说保存了类构造函数。
然后我们使用 `typeof Greeter`，意思是取Greeter类的类型，而不是实例的类型。 或者更确切的说，"告诉我 Greeter标识符的类型"，也就是构造函数的类型。 
这个类型包含了类的所有静态成员和构造函数。 
之后，就和前面一样，我们在 greeterMaker上使用 `new`，创建 Greeter的实例。

### 把类当做接口使用
如上一节里所讲的，类定义会创建两个东西：
* 类的实例类型
* 构造函数。 

因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。
``` js
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```
## 函数(function)
函数是JavaScript应用程序的基础。 
它帮助你实现抽象层，模拟类，信息隐藏和模块。 
在TypeScript里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义行为的地方。 
TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。

### 函数
和JavaScript一样，TypeScript函数可以创建有名字的函数和匿名函数。 
你可以随意选择适合应用程序的方式，不论是定义一系列API函数还是只使用一次的函数。

通过下面的例子可以迅速回想起这两种JavaScript中的函数：
``` js
// Named function
function add(x, y) {
    return x + y;
}

// Anonymous function
let myAdd = function(x, y) { return x + y; };
```
在JavaScript里，函数可以使用函数体外部的变量。 
当函数这么做时，我们说它‘捕获’了这些变量。 
至于为什么可以这样做以及其中的利弊超出了本文的范围，但是深刻理解这个机制对学习JavaScript和TypeScript会很有帮助。

``` js
let z = 100;

function addToZ(x, y) {
    return x + y + z;
}
```
### 函数类型
#### 为函数定义类型
让我们为上面那个函数添加类型：
``` js
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```
我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 
TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。

#### 书写完整函数类型
现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。
``` js
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
```
函数类型包含两部分：
* 参数类型
* 返回值类型

当写出完整函数类型的时候，这两部分都是需要的。 
我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。 
这个名字只是为了增加可读性。 我们也可以这么写：

``` js
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。

第二部分是返回值类型。 
对于返回值，我们在函数和返回值类型之前使用( =>)符号，使之清晰明了。 
如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 void而不能留空。

函数的类型只是由参数类型和返回值组成的。 函数中使用的捕获变量不会体现在类型里。 实际上，这些变量是函数的隐藏状态并不是组成API的一部分。

### 推断类型
尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：
``` js
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```
这叫做“按上下文归类”，是类型推论的一种。 它帮助我们更好地为程序指定类型。

### 可选参数和默认参数
TypeScript里的每个函数参数都是必须的。 
这不是指不能传递 null或undefined作为参数，而是说编译器检查用户是否为每个参数都传入了值。 
编译器还会假设只有这些参数会被传递进函数。 
简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。
``` js
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right
```
JavaScript里，每个参数都是可选的，可传可不传。 
没传参的时候，它的值就是undefined。 
::: tip
在TypeScript里我们可以在参数名旁使用 `?`实现可选参数的功能。
:::

比如，我们想让last name是可选的：
``` js
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```
可选参数必须跟在必须参数后面。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。

在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 
它们叫做有默认初始化值的参数。 
让我们修改上例，把last name的默认值设置为"Smith"。
``` js
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```
在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型。
``` js
function buildName(firstName: string, lastName?: string) {
    // ...
}
```
和
``` js
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```
共享同样的类型(firstName: string, lastName?: string) => string。 
默认参数的默认值消失了，只保留了它是一个可选参数的信息。

与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 
如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。 

例如，我们重写最后一个例子，让 firstName是带默认值的参数：
``` js
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```
### 剩余参数
默认参数和可选参数有个共同点：它们表示某一个参数。 

有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 
在JavaScript里，你可以使用 arguments来访问所有传入的参数。

在TypeScript里，你可以把所有参数收集到一个变量里：
``` js
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```
剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号（ ...）后面给定的名字，你可以在函数体内使用这个数组。

这个省略号也会在带有剩余参数的函数类型定义上使用到：
``` js
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```
### this
学习如何在JavaScript里正确使用`this`就好比一场成年礼。 
由于TypeScript是JavaScript的超集，TypeScript程序员也需要弄清 `this`工作机制并且当有bug的时候能够找出错误所在。 
幸运的是，TypeScript能通知你错误地使用了 `this`的地方。 

### this和箭头函数
JavaScript里，`this`的值在函数被调用的时候才会指定。 
这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。 
但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

下面看一个例子：
``` js
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
可以看到createCardPicker是个函数，并且它又返回了一个函数。 
如果我们尝试运行这个程序，会发现它并没有弹出对话框而是报错了。 
因为 createCardPicker返回的函数里的this被设置成了window而不是deck对象。 因为我们只是独立的调用了 cardPicker()。 
顶级的非方法式调用会将 `this`视为`window`。 

::: tip 
在严格模式下， this为undefined而不是window。
::: 

为了解决这个问题，我们可以在函数被返回时就绑好正确的this。 这样的话，无论之后怎么使用它，都会引用绑定的‘deck’对象。 我们需要改变函数表达式来使用ECMAScript 6箭头语法。 
箭头函数能保存函数创建时的 this值，而不是调用时的值：
``` js
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
更好事情是，TypeScript会警告你犯了一个错误，如果你给编译器设置了`--noImplicitThis`标记。 
它会指出 `this.suits[pickedSuit]`里的this的类型为`any`。

### this参数
不幸的是，`this.suits[pickedSuit]`的类型依旧为`any`。 
这是因为 this来自对象字面量里的函数表达式。 
修改的方法是，提供一个显式的 `this`参数。 
`this`参数是个假的参数，它出现在参数列表的最前面：
``` js
function f(this: void) {
    // make sure `this` is unusable in this standalone function
}
```
让我们往例子里添加一些接口，Card 和 Deck，让类型重用能够变得清晰简单些：
``` js
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
现在TypeScript知道createCardPicker期望在某个Deck对象上调用。 
也就是说 `this`是Deck类型的，而非any，因此`--noImplicitThis`不会报错了。

### this参数在回调函数里
你可以也看到过在回调函数里的`this`报错，当你将一个函数传递到某个库函数里稍后会被调用时。 
因为当回调被调用的时候，它们会被当成一个普通函数调用， `this`将为undefined。 
稍做改动，你就可以通过 `this`参数来避免错误。 
首先，库函数的作者要指定 `this`的类型：

``` js
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
this: void means that addClickListener expects onclick to be a function that does not require a this type. Second, annotate your calling code with this:

class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        // oops, used this here. using this callback would crash at runtime
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
```
指定了`this`类型后，你显式声明`onClickBad`必须在`Handler`的实例上调用。 
然后TypeScript会检测到 `addClickListener`要求函数带有`this: void`。 改变 `this`类型来修复这个错误：
``` js
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // can't use this here because it's of type void!
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```
因为onClickGood指定了`this`类型为`void`，因此传递addClickListener是合法的。 
当然了，这也意味着不能使用 `this.info`. 如果你两者都想要，你不得不使用箭头函数了：
``` js
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```
这是可行的因为箭头函数不会捕获`this`，所以你总是可以把它们传给期望`this: void`的函数。 
缺点是每个 Handler对象都会创建一个箭头函数。 
另一方面，方法只会被创建一次，添加到 Handler的原型链上。 它们在不同 Handler对象间是共享的。

### 重载
JavaScript本身是个动态语言。 
JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。
``` js
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
pickCard方法根据传入参数的不同会返回两种不同的类型。 
如果传入的是代表纸牌的对象，函数作用是从中抓一张牌。 
如果用户想抓牌，我们告诉他抓到了什么牌。 但是这怎么在类型系统里表示呢。

方法是为同一个函数提供多个函数类型定义来进行函数重载。 
编译器会根据这个列表去处理函数的调用。 

下面我们来重载 pickCard函数。
``` js
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
这样改变后，重载的pickCard函数在调用的时候会进行正确的类型检查。

为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 
它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 
因此，在定义重载的时候，一定要把最精确的定义放在最前面。

注意，`function pickCard(x): any`并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误。

## 泛型
软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 
组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 
这样用户就可以以自己的数据类型来使用组件。

### 泛型之Hello World
下面来创建第一个使用泛型的例子：identity函数。 这个函数会返回任何传入它的值。 你可以把这个函数当成是 echo命令。

不用泛型的话，这个函数可能是下面这样：
``` js
function identity(arg: number): number {
    return arg;
}
```
或者，我们使用any类型来定义函数：
``` js
function identity(arg: any): any {
    return arg;
}
```
使用any类型会导致这个函数可以接收任何类型的arg参数，这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。
如果我们传入一个数字，我们只知道任何类型的值都有可能被返回。

因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。
``` js
function identity<T>(arg: T): T {
    return arg;
}
```
我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 
之后我们再次使用了 T当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。
 这允许我们跟踪函数里使用的类型的信息。

我们把这个版本的identity函数叫做泛型，因为它可以适用于多个类型。 
不同于使用 any，它不会丢失信息，像第一个例子那像保持准确性，传入数值类型并返回数值类型。

我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：
``` js
let output = identity<string>("myString");  // type of output will be 'string'
```
这里我们明确的指定了T是string类型，并做为一个参数传给函数，使用了<>括起来而不是()。

第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型：
``` js
let output = identity("myString");  // type of output will be 'string'
```
注意我们没必要使用尖括号（`<>`）来明确地传入类型；编译器可以查看`myString`的值，然后把T设置为它的类型。 
类型推论帮助我们保持代码精简和高可读性。
如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入T的类型，在一些复杂的情况下，这是可能出现的。

// to do

## 枚举

## JSX

## 装饰器

## Mixins

## 模块

## 模块解析

## 命名空间

## 命名空间和模块

## 声明合并 

## 三斜线指令 

## JavaScript文件类型检查





