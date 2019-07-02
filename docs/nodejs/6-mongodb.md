# MongoDB
MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

::: tip
关于MongoDB的学习, 入门推荐大家看[菜鸟教程:MongoDB](https://www.runoob.com/mongodb/mongodb-tutorial.html)
:::

## 安装MongoDB
有3个版本可供选择: window, linux, osx

本文以安装Window版本的MongoDB为例

### 安装
首先, 根据自己的系统的需要下载安装包, 这里我下载的是`mongodb-win32-x86_64-2008plus-ssl-4.0.10-signed.msi`, [下载地址](https://www.mongodb.com/download-center#community)

![mongo-install1](/coding/images/mongodb/install1.jpg)

![mongo-install2](/coding/images/mongodb/install2.jpg)

![mongo-install3](/coding/images/mongodb/install3.png)

下一步安装 "install mongoDB compass" 不勾选，否则可能要很长时间都一直在执行安装，MongoDB Compass 是一个图形界面管理工具，我们可以在后面自己到官网下载安装，下载地址：https://www.mongodb.com/download-center/compass。
![mongo-install4](/coding/images/mongodb/install4.jpg)

#### 创建数据目录
MongoDB将数据目录存储在 db 目录下。这个数据目录不会主动创建，我们在安装完成后需要创建它。
这里, 我已经将MongoDB安装在`E:\MongoDB\`目录下, 然后我们在该目录下创建数据目录以及创建db目录. 

最终的目录结构如下:
```
E:\MongoDB\
        |- data
           |- db
           |- log     
```
#### 配置MongoDB
1. 创建配置文件

创建一个配置文件。该文件必须设置 systemLog.path 参数，包括一些附加的配置选项更好。

例如，创建一个配置文件位于 E:\MongoDB\bin\mongod.cfg，其中指定 systemLog.path 和 storage.dbPath。具体配置内容如下：
```
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: E:\MongoDB\data\db
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path:  E:\MongoDB\data\log\mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1


#processManagement:

#security:

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:

```

2. 安装 MongoDB服务
通过执行mongod.exe，使用--install选项来安装服务，使用--config选项来指定之前创建的配置文件。

```
E:\MongoDB\bin\mongod.exe --config "E:\MongoDB\bin\mongod.cfg" --install
```
要使用备用 dbpath，可以在配置文件（例如：E:\MongoDB\bin\mongod.cfg）或命令行中通过 --dbpath 选项指定。

如果需要，您可以安装 mongod.exe 或 mongos.exe 的多个实例的服务。只需要通过使用 --serviceName 和 --serviceDisplayName 指定不同的实例名。只有当存在足够的系统资源和系统的设计需要这么做。

3. 启动MongoDB服务

```
net start MongoDB
```
4. 关闭MongoDB服务
```
net stop MongoDB
```
5. 移除 MongoDB 服务
```
E:\MongoDB\bin\mongod.exe --remove
```
::: tip
如果想更方便的使用mongo.exe等命令, 可以考虑将安装的mongoDB的bin目录配置到系统的环境变量中, 例如此例中的`E:\MongoDB\bin\`
:::
## 使用MongoDB
如果你需要进入MongoDB后台管理，你需要先打开mongodb装目录的下的bin目录，然后执行mongo.exe文件，MongoDB Shell是MongoDB自带的交互式Javascript shell,用来对MongoDB进行操作和管理的交互式环境。

当你进入mongoDB后台后，它默认会链接到 test 文档（数据库）：
```
> mongo
MongoDB shell version: 3.0.6
connecting to: test
……
```
由于它是一个JavaScript shell，您可以运行一些简单的算术运算:
```
> 2 + 2
4
>
```
db 命令用于查看当前操作的文档（数据库）：
```
> db
test
>
```
插入一些简单的记录并查找它：
```
> use james
switched to db james
> db.james.insert({hello: 'james'})
WriteResult({ "nInserted" : 1 })
> db.james.find()
{ "_id" : ObjectId("5d1626643f63c546ecd9be2e"), "hello" : "james" }
>
```
第一个命令将"james" 插入到 james 集合的 "hello" 字段中。

## 在Node.js中使用MongoDB
### 安装mongoose
```
npm install mongoose --save
```
或者
```
yarn add mongoose
```
### 使用mongoose

``` js
var Koa = require('koa');
var Router = require('koa-router');
var mongoose = require('mongoose')

const db = mongoose.connect("mongodb://localhost/james", { useNewUrlParser: true } )



var app = new Koa();
// 使用路由
var router = new Router();


// 账户的数据库模型
var UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  email:String
});
var User = mongoose.model('Hello',UserSchema);

// 新增数据
var user = {
  username: 'hello',
  password: 'james',
  email: ''
}
var newUser = new User(user);
newUser.save();

router.get('/', async (ctx, next) => {
  let val = null
  const data = await User.findOne({username: 'hello'})
  console.log('data', data)
  const result = {
    code:200,
    response: data,
    ts: 12345
  }
  ctx.response.body = result
  return result
})

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000)
```
访问`http://localhost:3000/`, 然后进入到mongodb中查看是否有此数据:
```
> use james
switched to db james
> show collections
hellos
users
> db.hellos.find()
{ "_id" : ObjectId("5d1b584ec99a1812042542f7"), "username" : "ydj", "password" :
 "123123", "email" : "", "__v" : 0 }
>
```

## 相关链接
[Mongoose.js中文网](http://mongoosejs.net/docs/index.html)