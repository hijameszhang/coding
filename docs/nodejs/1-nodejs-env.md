# Nodejs 环境搭建

## 安装Node.js 
有很多种安装方式，进入到[Nodejs中文官网](http://nodejs.cn/)，我们点击 Download 即可下载各个平台上的Node.js。
在Mac / Windows 平台我们可以直接下载安装包安装，就像安装其他软件一样。在Ubuntu 可以通过 apt-get 来安装*（CentOS 使用 yum ）* , Linux 用户推荐使用源码编译安装。

在 Node.js 的官网 你会发现两个版本的Node.js，LTS 是长期支持版，Current 是最新版

以window为例, 使用`.msi`安装, 安装完成后在命令行输入:
```
> node -v
v10.7.0
```
## nrm 快速切换 NPM 源

由于我国的网络环境，npm源访问会很慢，这时我们可以使用nrm把源换成能国内的

### 安装
```
npm install -g nrm
```
#### 使用
```
nrm ls
* npm -----  https://registry.npmjs.org/
  cnpm ----  http://r.cnpmjs.org/
  taobao --  https://registry.npm.taobao.org/
  nj ------  https://registry.nodejitsu.com/
  rednpm -- http://registry.mirror.cqupt.edu.cn
  skimdb -- https://skimdb.npmjs.com/registry
  
# 使用淘宝的源
nrm use taobao
```

## Hello World
到此, Node.js环境已经搭建好!

下面我们来实际动手下. 来结束本文.
下面是官网的一个例子，一个使用 Node.js 编写的 web 服务器，响应返回 'Hello World'.
``` js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
```