# Redis
## 安装Redis
> 本文仅以window系统作为演示, 其他系统安装过程这里不再綑述, 各位看官可查阅: [菜鸟教程-Redis](https://www.runoob.com/redis/redis-install.html)

首先, 下载redis zip包, 下载地址: https://github.com/MSOpenTech/redis/releases。

本文下载包名为: `Redis-x64-3.0.504.zip`, 下载好后, 解压到合适的位置, 这里我解压到: `E:\Redis-x64` 目录下, 并将`E:\Redis-x64`配置到系统的环境变量中.

打开`cmd.exe`, 输入指令: `redis-server`, 输出结果可能如下:

```
C:\Users\James>redis-server
[3112] 06 Jul 21:28:25.996 # Warning: no config file specified, using the defaul
t config. In order to specify a config file use redis-server /path/to/redis.conf

                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 3.0.504 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 3112
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

[3112] 06 Jul 21:28:26.009 # Server started, Redis version 3.0.504
[3112] 06 Jul 21:28:26.010 * The server is now ready to accept connections on po
rt 6379
```
再打开另一个`cmd.exe`, 输入: `redis-cli`以启动客户端验证redis-server是否可连接.
输出结果可能如下:
```
C:\Users\James>redis-cli
127.0.0.1:6379> ping
PONG
127.0.0.1:6379>
```
此时, 即表示`Redis`已安装成功, 可以在本地进行开发调试了.

## Koa中使用redis
### 安装依赖
```
npm install koa redis koa-redis koa-generic-session
```
或者
```
yarn add koa redis koa-redis koa-generic-session
```

### 使用示例

``` js
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
```

## 相关链接
* [菜鸟教程-Redis](https://www.runoob.com/redis/redis-install.html)
* [github: generic-session](https://github.com/koajs/generic-session)
* [npm: koa-generic-session](https://www.npmjs.com/package/koa-generic-session)
* [npm: koa-redis](https://www.npmjs.com/package/koa-redis)