const Koa = require('koa');
const app = new Koa();
const mysql = require('mysql')
const Router = require('koa-router')
const pool = mysql.createPool({
  host: 'localhost',          // 数据库地址
  user: 'root',               // 登录数据的用户名
  password: 'helloworld',     // 密码
  database: 'demo'            // 所用的数据库
})

const port = 3000
const hostName = '127.0.0.1'

const router = new Router();

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      connection.query(sql,values, (error, results) => {
        if(error) throw error
        connection.release()
        resolve(results)
      })
    })
  }) 
}

router.get('/', async (ctx, next) => {
  ctx.res.type = 'application/json'
  ctx.body = await query('select * from demo_table')
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(port, hostName);
console.log(`http://${hostName}:${port}`)