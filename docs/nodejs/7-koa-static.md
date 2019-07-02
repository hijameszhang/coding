# Koa-static中间件
一般一个Web HTTP请求, 可能会有三种回应:
* 访问文件, 如: js, css, png, jpg, gif等
* 访问静态目录
* 找不到资源(HTTP 404)

在项目中,像一些静态文件的处理，Koa 也要现成的模块，省去我们自己需要从本地目录读取文件的很多步骤。

## 安装
```
npm install koa-static
```
或者
```
yarn add koa-static
```
## 使用
koa-static的使用简单, 主要核心的代码为:
``` js
const static_ = require('koa-static')
const path = require('path')


var app = new Koa();

app.use(static_(
  path.join(__dirname, './static')
))

```

完整示例代码如下:
``` js
const Koa = require('koa');
const Router = require('koa-router');
const static_ = require('koa-static')
const path = require('path')


var app = new Koa();
var router = new Router();

app.use(static_(
  path.join(__dirname, './static')
))

router.get('/', (ctx, next) => {
  ctx.body = 'home'
});

router.get('/list', (ctx, next) => {
  ctx.body = 'list'
})

router.get('/api', (ctx, next) => {
  let res = {hello: 'world'}
  ctx.set("Content-Type", "application/json")
  ctx.body = JSON.stringify(res)
})
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000)
```

我在当前js执行目录下新建了一个`static`目录, 并在`static`目录下新建了一个名为`demo.js`的文件, 并添加以下内容:
``` js
console.log('hello james')
```

启动工程后, 我们在访问: http://localhost:3000/demo.js时, 就会看到浏览器端会响应为:
```
console.log('hello james')
```