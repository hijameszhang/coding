# Koa Router
## 原生路由控制
即将具体的访问路径，指向特定的功能模块，以完成路由的工作.

``` js
const koa = require('koa2')
const app = new koa()

app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
      // 首页
      ctx.response.status = 200
      ctx.response.body = 'index'
    } else if (ctx.request.path === '/list') { 
      // 列表页
      ctx.response.status = 200
      ctx.response.body = 'list'
    } else {
      // 404 页
    	ctx.throw(404, 'Not found')
    }
  await next()
})

app.listen(3000)

```
这样编码可能会很繁琐的, 类似这样繁琐的工作，已经有人封装成特定的插件共享到社区，解决我们这个问题的模块，叫做 koa-router，接下来我们来尝试使用它.

## koa-router 路由中间件
官方特性介绍:
* Express-style routing using app.get, app.put, app.post, etc.
* Named URL parameters.
* Named routes with URL generation.
* Responds to OPTIONS requests with allowed methods.
* Support for 405 Method Not Allowed and 501 Not Implemented.
* Multiple route middleware.
* Multiple routers.
* Nestable routers.
* ES7 async/await support.

[github:koa-router](https://github.com/ZijianHe/koa-router)
### 安装
```
> npm install koa-router 
```
或者
```
> yarn add koa-router
```

### 简单示例
``` js
var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'home'
});

router.get('/list', (ctx, next) => {
  ctx.body = 'list'
})

// 接口 /api 返回json数据 
router.get('/api', (ctx, next) => {
  let res = {hello: 'world'}
  // 设置响应类型为: application/json, 默认为: text/html
  ctx.set("Content-Type", "application/json")
  ctx.body = JSON.stringify(res)
})
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000)
```

::: tip
如果想更方便的提供返回JSON数据的API, 可以考虑使用[koa-json](https://github.com/koajs/json)
:::

### 更多
关于koa-router的更多详情, 大家可自行参阅[github:koa-router](https://github.com/ZijianHe/koa-router).

