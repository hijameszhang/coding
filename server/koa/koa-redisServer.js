const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const koa = require('koa');
const Router = require('koa-router')
 
var app = new koa(); // for koa v1 use `var app = koa();`
app.keys = ['keys', 'keykeys'];
app.use(session({
  store: redisStore()
}));
 
const router = new Router();

const port = 3000
const hostName = '127.0.0.1'

router.get('/', async (ctx, next) => {
  var session = ctx.session;
  console.log(ctx)
  console.log(session)
  session.count = session.count || 0;
  session.count++;
  ctx.body = session.count;
})
router.get('/remove', async (ctx, next) => {
  ctx.session = null;
  ctx.body = 0;
})
router.get('/regenerate', async (ctx, next) => {
  await ctx.regenerateSession();
  ctx.body = 'had regenerate session'
})

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(port, hostName);
console.log(`http://${hostName}:${port}`)