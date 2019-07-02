const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose')
const session = require('koa-session');
const SessionStore = require('./sessionStore'); 

const db = mongoose.connect("mongodb://localhost/james", { useNewUrlParser: true } )



var app = new Koa();
// 使用路由
var router = new Router();

// 密钥字符串
app.keys = ['some secret string'];
// session 配置信息
const CONFIG = {
  key: 'koa:sess',
  maxAge: 24 * 60 * 60 * 1000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  autoCommit: true, // 自动提交
  store: new SessionStore({
      collection: 'sessions',       //数据库集合
      connection: db,         // 数据库链接实例
      expires: 24 * 60 * 60,        // 默认时间为1天
      name: 'session'               // 保存session的表名称
  }),
  renew: false, // 默认为false, 当用户session快过期时, 是否自动续期
};

// 以中间件的方式使用session
app.use(session(CONFIG, app));

app.use(async (ctx, next) => {
  // 获取session对象
  const session = ctx.session;

  // 给session赋值
  session.userInfo = {
      name:'james',
      email:'hellojameszhang@163.com',
      age : 31
  }
  ctx.body = 'hello world'
})

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000)