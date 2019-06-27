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

router.get('/api', (ctx, next) => {
  let res = {hello: 'world'}
  ctx.set("Content-Type", "application/json")
  ctx.body = JSON.stringify(res)
})
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000)