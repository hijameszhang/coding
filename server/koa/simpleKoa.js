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