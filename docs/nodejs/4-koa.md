# Koa
## 简介
Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

[中文网](https://koa.bootcss.com/)

## 快速上手
### 安装
你可以使用自己喜欢的版本管理器快速安装支持的 node 版本：
```
> yarn add koa
```
::: tip
* 如若在 Koa 中使用 async 方法, 需保证node > 7.6版本
* 如想使用import语法, 请确保node >= 10.0
:::

### hello world
``` js
const Koa = require('koa');
const app = new Koa();

const port = 3000
const hostName = '127.0.0.1'

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(port, hostName);
console.log(`http://${hostName}:${port}`)
```

## 中间件
::: tip
app.use(function) 将给定的中间件方法添加到此应用程序。参阅 Middleware 获取更多信息.
:::
Koa 中间件以更传统的方式级联，您可能习惯使用类似的工具 - 之前难以让用户友好地使用 node 的回调。然而，使用 async 功能，我们可以实现 “真实” 的中间件。对比 Connect 的实现，通过一系列功能直接传递控制，直到一个返回，Koa 调用“下游”，然后控制流回“上游”。

下面以 “Hello World” 的响应作为示例，当请求开始时首先请求流通过 x-response-time 和 logging 中间件，然后继续移交控制给 response 中间件。当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。

``` js
const Koa = require('koa');
const app = new Koa();

const port = 3000
const hostName = '127.0.0.1'

// logger
app.use(async (ctx, next) => {
  console.log('logger before')
  await next();
  console.log('logger after')
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('x-response-time before')
  await next();
  console.log('x-response-time after')
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  console.log('response')
  ctx.body = 'Hello World';
});

app.listen(port, hostName);
console.log(`http://${hostName}:${port}`)
```
执行后的输出为:
```
$ node ./server/simpleKoa.js
http://127.0.0.1:3000
logger before
x-response-time before
response
x-response-time after
logger after
GET / - 5ms
logger before
x-response-time before
response
x-response-time after
logger after
GET /favicon.ico - 1ms
```

分析输出的结果, 发现请求了两个资源:
* /
* /favicon.ico
每个资源的执行顺序为:
```
logger before
    x-response-time before
        response
    x-response-time after
logger after
GET / - 5ms  // 或者输出 GET /favicon.ico - 1ms
```

## app.listen(...)
Koa 应用程序不是 HTTP 服务器的1对1展现。 可以将一个或多个 Koa 应用程序安装在一起以形成具有单个HTTP服务器的更大应用程序。

创建并返回 HTTP 服务器，将给定的参数传递给 Server#listen()。这些内容都记录在 nodejs.org.

以下是一个无作用的 Koa 应用程序被绑定到 3000 端口：
``` js
const Koa = require('koa');
const app = new Koa();
app.listen(3000);
```
这里的 app.listen(...) 方法只是以下方法的语法糖:
``` js
const http = require('http');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
```
这意味着您可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址：
``` js
const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
```

## 使用nodemon, pm2或forever

编写/更新nodejs代码后, 会经常需要重启本地服务器, 有没有办法可以让文件内容变化自动重启本地服务器? 
有的, 你可以使用nodemon或pm2
### nodemon
nodemon会监测项目中的所有文件，一旦发现文件有改动，Nodemon 会自动重启应用
#### 安装
```
> npm install -g nodemon
```
#### 简单使用
```
> nodemon ./server/index.js
```

::: tip
关于nodemon的更多详情, 可以参阅[github: nodemon](https://github.com/remy/nodemon)
:::

### pm2
主要特性
* 内建负载均衡（使用 Node cluster 集群模块）
* 后台运行
* 0 秒停机重载，我理解大概意思是维护升级的时候不需要停机.
* 具有 Ubuntu 和 CentOS 的启动脚本
* 停止不稳定的进程（避免无限循环）
* 控制台检测
* 提供 HTTP API
* 远程控制和实时的接口 API ( Nodejs 模块,允许和 PM2 进程管理器交互 )

::: tip
pm2适合于生产环境使用
:::
#### 安装
```
> npm install -g pm2
```

#### 简单使用
```
> pm2 start ./server/index.js --watch
```
::: tip
关于pm2的更多详情, 可以参阅[github: pm2](https://github.com/Unitech/pm2)
:::

### forever
forever是一个简单的命令式nodejs的守护进程，能够启动，停止，重启App应用。forever完全基于命令行操作，在forever进程之下，创建node的子进程，通过monitor监控node子进程的运行情况，一旦文件更新，或者进程挂掉，forever会自动重启node服务器，确保应用正常运行。

#### 安装
```
> npm install -g forever
```

#### 简单使用
```
> forever start --watch ./server/index.js
```
::: tip
关于forever的更多详情, 可以参阅[github: forever](https://github.com/foreversd/forever)
:::


## 更多
关于koa的更多内容, 请参阅[koa中文网](https://koa.bootcss.com/)