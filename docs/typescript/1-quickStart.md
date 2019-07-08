# 快速上手
## 安装TypeScript
有两种主要的方式来获取TypeScript工具：
* 通过npm（Node.js包管理器）
* 安装Visual Studio的TypeScript插件

这里通过npm来进行安装
```
> npm install -g typescript
```

## 构建第一个TypeScript文件
新建一个名为`greeter.ts`的文件, 并添加以下内容:
``` js
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

## 编译代码
我们使用了.ts扩展名，但是这段代码仅仅是JavaScript而已。 你可以直接从现有的JavaScript应用里复制/粘贴这段代码。

在命令行上，运行TypeScript编译器：
```
E:\github\coding_docs>tsc typescript/greeter.ts
```
此时, 会在`greeter.ts`目录下生成一个`greeter.js`文件，它包含了和输入文件中相同的JavsScript代码。其内容为:
``` js
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
document.body.innerHTML = greeter(user);
```
## 类型注解
TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。 在这个例子里，我们希望 greeter函数接收一个字符串参数。 然后尝试把 greeter的调用改成传入一个数组：
接下来让我们看看TypeScript工具带来的高级功能。 给 person函数的参数添加: string类型注解，如下：
``` js
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```
再次编译时, 你会发现有报错, log可能如下:
```
E:\github\coding_docs>tsc typescript/greeter.ts
typescript/greeter.ts:7:35 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.

7 document.body.innerHTML = greeter(user);
                                    ~~~~


Found 1 error.


E:\github\coding_docs>
```
类似地，尝试删除greeter调用的所有参数。 TypeScript会告诉你使用了非期望个数的参数调用了这个函数。 在这两种情况中，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。
要注意的是尽管有错误，greeter.js文件还是被创建了。 就算你的代码里有错误，你仍然可以使用TypeScript。但在这种情况下，TypeScript会警告你代码可能不会按预期执行。

## interface 
我们继续.
这里我们使用接口来描述一个拥有`firstName`和`lastName`字段的对象。 

在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 
这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 `implements`语句。

``` js
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);

```
编译后的js内容为:
``` js
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
```

## Class
TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。

让我们创建一个Student类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别。
::: tip 
在构造函数的参数上使用public等同于创建了同名的成员变量。
::: 

``` js
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```

再次编译, 你会看到生成的JavaScript代码和原先的一样。 TypeScript里的类只是JavaScript里常用的基于原型面向对象编程的简写。最终编译后的结果可能如下:
``` js
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);

```
## 运行TypeScript Web应用
在`index.html`中添加如下代码

``` html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```
至此, 在typescript目录下有3个文件:
* index.html
* greeter.ts
* greeter.js

### 运行TypeScript代码
在运行TypeScript代码之前, 需要借助一个简单的工具来运行js.
::: tip 什么是http-server
A simple zero-configuration command-line http server
::: 

#### 安装`http-server`
```
npm install -g http-server
```
在命令行输入:
```
E:\github\coding_docs>http-server ./typescript
Starting up http-server, serving ./typescript
Available on:
  http://192.168.43.69:8081
  http://127.0.0.1:8081
Hit CTRL-C to stop the server
```
打开浏览器中并运行`http://127.0.0.1:8081/index.html`, 即可看到运行后的效果.