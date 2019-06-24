# Node.js 基础
Node.js中的模块管理系统遵循`CommonJS`规范.
模块是Node.js的基本组成部分. 一个Node.js文件就是一个模块(可能是一个JavaScript代码, JSON, 或是编译过的C/C++扩展程序等等)

## Node.js模块
在编写比较大的程序时, 一般会将代码进行模块化处理, 使程序更易开发和维护.

Node.js模块采用了CommonJS规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域, 并提供两个主要的函数:
* require, 函数来调用其他模块, 如: var path = require('path')
* exports 对象是当前模块的导出对象，用于导出模块公有方法和属性。exports 是指向的 module.exports 的引用

> Node.js自身实现了require方法作为其引入模块的方法，同时npm也是基于CommonJS定义的包规范

Node.js模块示例
``` js
// add.js
const add = (a, b)=>{
    return a+b
}

module.exports = add
```

``` js
// index.js
const add = require('./add')

let result = add(1, 2)
console.log(result)
```
### 模块引用
require()这个方法存在接受一个模块标识，以此引入模块
``` js
const fs = require('fs')
```
Node中引入模块要经历一下3步：
* 路径分析
* 文件定位
* 编译执行

Node优先从缓存中加载模块。Node的模块可分为两类：
* Node提供的核心模块
* 用户编写的文件模块

Node核心模块加载速度仅次于缓存中加载，然后路径形式的模块次之，最慢的是自定义模块。

### 模块定义
在模块中，上下文提供了`exports`来到处模块的方法或者变量。它是唯一出口, 例如:
``` js
exports.add = function(){
  // TODO
}
```
在模块中还存在一个module对象，它代表模块自身，exports是它的属性。为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令
``` js
var exports = module.exports
```
不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系

#### exports和module.exports 区别

* exports只是module.exports的一个地址引用。Node.js最终只会导出module.exports的指向，若exports指向改变，那么exports不再指向module.exports，自然也不会被导出了. 
* module.exports是真正的接口，exports只不过是它的一个辅助工具。最终返回给调用的是module.exports而不是exports。

所有的exports收集到的属性和方法，都赋值给了module.exports。当然，这有个前提，就是module.exports本身不具备任何属性和方法。如果，module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略
::: tip
Node开发者建议导出对象用module.exports,导出多个方法和变量用exports
:::

## npm模块管理器
npm的出现则是为了在CommonJS规范的基础上，实现解决包的安装卸载，依赖管理，版本管理等问题,npm不需要单独安装。在安装Node的时候，会连带一起安装npm. 
你可以:
* 从NPM服务器下载并安装别人编写的第三方包到本地使用。
* 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

### npm包
一个符合CommonJS规范的包应该是如下这种结构：
* package.json, 一般存在于npm包的顶级目录下
* 二进制文件, 一般放在bin目录下
* JavaScript源代码, 一般放在lib目录下
* 文档, 一舤放在doc目录下
* 单元测试, 一般放在test目录下

### package.json
* name：包名，需要在NPM上是唯一的，小写字母和数字组成可包含_ - .但不能有空格
* description：npm包简介。
* version：版本号。一个语义化的版本号（http://semver.org/ ），通常为x.y.z。该版本号十分重要，常常用于一些版本控制的场合
* keywords：关键字数组。用于NPM中的分类搜索
* maintainers：包维护者的数组。数组元素是一个包含name、email、web三个属性的JSON对象
* contributors：包贡献者的数组。第一个就是包的作者本人。在开源社区，如果提交的patch被merge进master分支的话，就应当加上这个贡献patch的人。格式包含name和email
* bugs：一个可以提交bug的URL地址。可以是邮件地址（mailto:mailxx@domain），也可以是网页地址
* licenses：包所使用的许可证
* repositories：托管源代码的地址数组
* dependencies：当前包需要的依赖。这个属性十分重要，NPM会通过这个属性，帮你自动加载依赖的包

除了前面提到的几个必选字段外，还有一些额外的字段，如bin、scripts、engines、devDependencies、author

### npm的使用
常用的npm查看命令有:

* 查看npm命令列表: `npm help`
* 查看各个命令的简单用法: `npm -l`
* 查看npm的版本: `npm -v`
* 查看npm的配置: `npm config list -l`
### npm包常用命令
Node模块采用npm install命令安装。

每个模块可以“全局安装”，也可以“本地安装”。
* 全局安装, 是将一个模块安装到系统目录中，各个项目都可以调用。一般来说，全局安装只适用于工具模块。
* 本地安装, 是将一个模块下载到当前项目的node_modules子目录，然后只有在项目目录之中，才能调用这个模块。

#### 本地安装: `npm install <package name>`

#### 全局安装:
`sudo npm install --global <package name>`

或者

`sudo npm install -g <package name>`

指定所安装的模块属于哪一种性质的依赖关系

* –-save：模块名将被添加到dependencies，可以简化为参数-S。
* –-save-dev: 模块名将被添加到devDependencies，可以简化为参数-D。

```
npm install <package name> --save
npm install <package name> --save-dev
```

#### 卸载模块: `npm uninstall <package name>`

#### 更新模块: `npm update <package name>`
#### 创建模块:  `npm init`

npm init创建模块会在交互命令行帮我们生产package.json文件

``` sh{1}
E:\github\coding_docs>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (coding) demo
version: (1.0.0)
entry point: (index.js)
keywords: just a demo npm package
license: (MIT)
About to write to E:\github\coding_docs\package.json:

{
  "name": "demo",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "deploy": "yarn build && ./deploy.bat"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hijameszhang/coding.git"
  },
  "author": "jameszhang <hellojameszhang@163.com>",
  "license": "MIT",
  "devDependencies": {
    "cz-conventional-changelog": "^2.1.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "description": "Record some of the experience accumulated during the coding process",
  "bugs": {
    "url": "https://github.com/hijameszhang/coding/issues"
  },
  "homepage": "https://github.com/hijameszhang/coding#readme",
  "directories": {
    "doc": "docs"
  },
  "dependencies": {},
  "keywords": [
    "just",
    "a",
    "demo",
    "npm",
    "package"
  ]
}


Is this OK? (yes) yes

E:\github\coding_docs>
```
以上信息, 根据各自的实际情况输入, 一般默认回车即可. 最后会在当前目录下生成package.json文件.

#### 模块发布
发布模块前, 首先要在npm注册用户
> [注册npm新用户](https://www.npmjs.com/signup)

```
E:\github\coding_docs>npm adduser
Username: jameszhang
Password:
Email: (this IS public) hellojameszhang@163.com
E:\github\coding_docs>npm publish
```
现在我们的npm包就成功发布了。

## 相关链接
[npm文档](https://docs.npmjs.com/)