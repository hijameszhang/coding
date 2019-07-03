# 模板引擎
Node.js模板引擎主要有以下几种:
* [jade](http://www.nooong.com/docs/jade_chinese.htm)
* [Mustache](http://mustache.github.io/)
* [ejs](https://ejs.co/)
* [pug](https://pug.bootcss.com/api/getting-started.html)
* [handlerbars](http://handlebarsjs.com/)
* [nunjucks](https://nunjucks.bootcss.com/)
* [xtemplate](http://xtemplate.github.io/xtemplate/)
* [art-template](http://aui.github.io/art-template/zh-cn/docs/)

## jade & Mustache
在koa中使用模板引擎 jade 或者 mustache, 需要依赖于`koa-views`.

### 安装依赖
```
npm install koa-views jade mustache
```
或者
```
yarn add koa-views jade mustache
```
### 代码示例
index.js
``` js
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

var app = new Koa();
// 使用路由
var router = new Router();

app.use(views(__dirname + '/views', {
  map: { jade: 'jade', html: 'mustache' }
}));

router.get('/', async (ctx, next) => {
  await ctx.render('index.jade', {
    pageTitle: '首页'
  });
});

router.get('/app', async (ctx, next) => {
  await ctx.render('app.html', {
    pageTitle: '应用控制台'
  });
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000)
console.log('http://localhost:3000/')
```

在index.js所在目录, 添加一个新的目录, 名为: views, 并在其中添加两个文件: index.jade, app.html, 并分别添加以下内容:
index.jade
```
doctype html
html(lang="en")
  head
    title= pageTitle
  body
    h1 首页
    p
      a(href="/app") 前往应用控制台
```

app.html
``` html
<!DOCTYPE html>
<html>
  <head>
    <title>{{ pageTitle }}</title>
  </head>
  <body>
    <h1>应用控制台</h1>
    <p>
      <a href="/">返回首页</a>
    </p>
  </body>
</html>
```
## ejs
模板引擎`ejs`的使用和jade的使用办法是一样的.
### 安装依赖
```
npm install koa-views ejs
```
或者
```
yarn add koa-views ejs
```

### 映射模板引擎
在 koa-views 的 map 属性中配置以 ejs 模板引擎解析 .ejs 文件。
``` js
app.use(views(__dirname + '/views', {
  map: { jade: 'jade', html: 'mustache', ejs: 'ejs' }
}))
```
### 使用模板
在 views 目录下创建 ejs.ejs。
``` html
<!DOCTYPE html>
<html>
  <head>
    <title><%= pageTitle %></title>
  </head>
  <body>
    <h1>ejs</h1>
  </body>
</html>
```
我们可以正式使用了，我们将在 index.js 中注册一个 /ejs 路由，用于渲染 ejs.ejs 文件内容。
``` js
router.get('/ejs', async (ctx, next) => {
  await ctx.render('ejs.ejs', {
    pageTitle: 'ejs 模板引擎'
  });
});
```
通过浏览器访问 http://localhost:3000/ejs 即可展示 views/ejs.ejs 文件内容。

### 完整index.js示例代码
``` js
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

var app = new Koa();
// 使用路由
var router = new Router();

app.use(views(__dirname + '/views', {
  map: { jade: 'jade', html: 'mustache', ejs: 'ejs' }
}))

router.get('/', async (ctx, next) => {
  await ctx.render('index.jade', {
    pageTitle: '首页'
  });
});

router.get('/app', async (ctx, next) => {
  await ctx.render('app.html', {
    pageTitle: '应用控制台'
  });
});

router.get('/ejs', async (ctx, next) => {
  await ctx.render('ejs.ejs', {
    pageTitle: 'ejs 模板引擎'
  });
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000)
console.log('http://localhost:3000/')
```
## nunjucks
主要特性:
* 功能丰富且强大，并支持块级继承（block inheritance）、自动转义、宏（macro）、异步控制等等。完美继承了 jinja2 的衣钵。
* 快速 & 干练 并且高效。运行时代码经过压缩之后只有 8K 大小， 可在浏览器端执行预编译模板。
* 可扩展 性超强，用户可以自定义过滤器（filter）和扩展模块。
* 到处可运行，无论是 node 还是任何浏览器都支持，并且还可以预编译模板。

它的语法也很简单, 个人推荐使用它

### 安装依赖
```
npm install koa-views nunjucks
```
或者
```
yarn add koa-views nunjucks
```
### 使用
使用也比较简单, 和前面的几种模板引擎使用方法一样, 具体代码如下:
index.js
``` js
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

var app = new Koa();
// 使用路由
var router = new Router();

app.use(views(__dirname + '/views', {
  map: { html: 'nunjucks'}
}))

router.get('/app', async (ctx, next) => {
  await ctx.render('app.html', {
    pageTitle: '应用控制台 hello james'
  });
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000)
console.log('http://localhost:3000/')
```
在index.js所在目录, 添加一个新的目录, 名为: views, 并在其中添加两个文件: app.html, 并分别添加以下内容:
``` html
<!DOCTYPE html>
<html>
  <head>
    <title>{{ pageTitle }}</title>
  </head>
  <body>
    <h1>应用控制台</h1>
    <p>
      <a href="/">返回首页</a>
    </p>
  </body>
</html>
```