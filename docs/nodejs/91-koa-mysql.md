# MySQL

## 快速开始
### 安装MySQL数据库(Window)
这里以安装window系统下的Mysql为例. 更多Mysql版本的安装, 可以参考[菜鸟教程-Mysql安装](https://www.runoob.com/mysql/mysql-install.html)
#### 下载windows mysql-8.0.16-winx64 版本. 
[mysql下载地址](https://dev.mysql.com/downloads/mysql/)

下载完后，将 zip 包解压到相应的目录，这里我将解压后的文件夹放在 `E:\mysql-8.0.16-winx64`目录下.

### 配置 MySQL
进入到路径: `E:\mysql-8.0.16-winx64` ，在该文件夹下创建 `my.ini` 配置文件，编辑 `my.ini`, 并配置以下基本信息:
``` ini
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
 
[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=E:\\mysql-8.0.16-winx64
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
# datadir=E:\\mysql-8.0.16-winx64\\sqldata
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```
### 启动MySQL
以管理员身份打开 cmd 命令行工具，切换目录：
```
cd E:\mysql-8.0.16-winx64\bin
```
初始化数据库：
```
mysqld --initialize --console
```
执行完成后，会输出 root 用户的初始默认密码，如：
```
E:\mysql-8.0.16-winx64\bin>mysqld --initialize --console
2019-07-04T14:59:00.179711Z 0 [System] [MY-013169] [Server] E:\mysql-8.0.16-winx
64\bin\mysqld.exe (mysqld 8.0.16) initializing of server in progress as process
2724
2019-07-04T14:59:00.182711Z 0 [Warning] [MY-013242] [Server] --character-set-ser
ver: 'utf8' is currently an alias for the character set UTF8MB3, but will be an
alias for UTF8MB4 in a future release. Please consider using UTF8MB4 in order to
 be unambiguous.
2019-07-04T14:59:29.346379Z 5 [Note] [MY-010454] [Server] A temporary password i
s generated for root@localhost: f9Lh2JSH8w_0
2019-07-04T14:59:40.152997Z 0 [System] [MY-013170] [Server] E:\mysql-8.0.16-winx
64\bin\mysqld.exe (mysqld 8.0.16) initializing of server has completed
```
`f9Lh2JSH8w_0` 就是初始密码，后续登录需要用到，你也可以在登陆后修改密码。

输入以下安装命令：
```
mysqld install
```
输出结果可能如下:
```
E:\mysql-8.0.16-winx64\bin>mysqld install
Service successfully installed.

E:\mysql-8.0.16-winx64\bin>
```
### 启动mysql服务
启动输入以下命令即可：
```
net start mysql
```
::: tip 注意: 
在 5.7 需要初始化 data 目录：

```
cd C:\web\mysql-8.0.11\bin 
mysqld --initialize-insecure 
```
初始化后再运行 `net start mysql` 即可启动 mysql。

输出结果可能如下:
```
E:\mysql-8.0.16-winx64\bin>net start mysql
MySQL 服务正在启动 ...
MySQL 服务已经启动成功。
```
::: 

### 登录 MySQL
当 MySQL 服务已经运行时, 我们可以通过 MySQL 自带的客户端工具登录到 MySQL 数据库中, 首先打开命令提示符, 输入以下格式的命名:

mysql -h 主机名 -u 用户名 -p
参数说明：
* -h : 指定客户端所要登录的 MySQL 主机名, 登录本机(localhost 或 127.0.0.1)该参数可以省略;
* -u : 登录的用户名;
* -p : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。

如果我们要登录本机的 MySQL 数据库，只需要输入以下命令即可：

```
E:\mysql-8.0.16-winx64\bin>mysql -u root -p
Enter password: ************
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.16

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```
至此, window版本的mysql已经安装好了. 
::: tip 更改root的初始默认密码
根据自己的需要来决定是否需要更改root初始的默认密码, 这里我将root密码修改为: `helloworld`, 操作log如下:
```
mysql> alter user 'root'@'localhost' identified by 'helloworld';
Query OK, 0 rows affected (0.08 sec)
```
:::

然后, 你就可以愉快的使用mysql进行coding了.
```
E:\mysql-8.0.16-winx64\bin>mysql -u root -p
Enter password: **********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.16 MySQL Community Server - GPL

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use mysql
Database changed
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.10 sec)

mysql>
```
::: tip 建议
将E:\mysql-8.0.16-winx64\bin配置到系统的环境变量中, 方便使用.
:::

## 安装npm包-mysql
```
npm install --save mysql
```
或者
```
yarn add mysql
```
## mysql模块介绍
mysql模块是node操作MySQL的引擎，可以在node.js环境下对MySQL数据库进行建表，增、删、改、查等操作。

### 开始使用
在使用之前先创建一个名为: demo 的数据库, 同时定义一张名为: demo_tabel 的表, 操作log可能如下:
```
C:\Users\James>mysql -u root -p
Enter password: **********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 11
Server version: 8.0.16 MySQL Community Server - GPL

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> create database demo;
Query OK, 1 row affected (0.12 sec)

mysql> create table demo_tabel
    -> (
    -> id int(11),
    -> name varchar(30),
    -> sex varchar(4)
    -> );
Query OK, 0 rows affected (0.49 sec)
mysql> show tables;
+----------------+
| Tables_in_demo |
+----------------+
| demo_table     |
+----------------+
1 row in set (0.02 sec)

mysql>
```
### 示例代码
接下来, 编写一个简单的server.js代码, 在访问 `http://localhost:3000/query/`时, 返回表中的数据. 
server.js 中完整的示例代码如下:
``` js
// server.js
const Koa = require('koa');
const app = new Koa();
const mysql = require('mysql')
const Router = require('koa-router')

/*
 一般情况下操作数据库是很复杂的读写过程，不只是一个会话，
 如果直接用会话操作，就需要每次会话都要配置连接参数。
 因此需要连接池管理会话。
*/
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
```
## 相关链接
* [mysql (npm package) api](https://www.npmjs.com/package/mysql)
* [mysql下载](https://dev.mysql.com/downloads/mysql/)
