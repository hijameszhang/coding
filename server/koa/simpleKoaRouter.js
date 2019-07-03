const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

var app = new Koa();
// 使用路由
var router = new Router();

app.use(views(__dirname + '/views', {
  map: { jade: 'jade', html: 'nunjucks', ejs: 'ejs' }
}))

router.get('/', async (ctx, next) => {
  await ctx.render('index.jade', {
    pageTitle: '首页'
  });
});

router.get('/app', async (ctx, next) => {
  await ctx.render('app.html', {
    pageTitle: '应用控制台 hello james'
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