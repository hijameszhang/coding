# 页面性能常用办法

## 前言
::: tip "8"秒准绳
用户在访问Web网页时, 
* 若时间超过`8`秒, 就会感觉不耐烦了. 
* 若加载时间太长, 用户很有可能会放弃访问. 
::: 
大部分用户希望网页在2~3秒内完成加载. 事实上, 加载时间每多1秒, 可能会流失7%的用户, 8秒并不是确切的数据, 只是向网站开发者表明网页加载时间的重要性. 那我们应该如何页面性能, 加快页面加载速度呢? 

本文只关注一些要点, 以下是本人总结的几种常见的方法.

## 浏览器缓存
之所以把浏览器缓存放在首位, 是因为:
::: tip
对于Web应用来说, 缓存是提升页面性能以及减少服务器压力的利器
:::
### 1. 强缓存
不会向服务器发送请求, 直接从缓存中读取资源, 在Chrome控制台的network, 可以看到该请求的状态码为`200`, 但`size`标识为: `from disk cache`或者`from memory cache`.

### 2. resonse header
#### 1) Expires
Expires: reponse header里的过期时间. 
浏览器在再次加载该资源时, 如果在有效时间内, 则使用**强缓存**, 它的一个绝对时间(GMT时间字符串), 如: Expires: Thu, 21 Jan 2018 22:30:02 GMT. 

#### 2) Cache-Control
##### request
* no-cache, 不要读取缓存中的文件, 要求向Web服务器重新请求
* no-store, 请求和响应都禁止被缓存
* max-age, 表示当访问此网页后的max-age秒内再次访问不会去服务器请求, 其功能和`Expires`类似, 只是`Expires`是根据某个特定日期做比较. 一旦缓存者自身的时间不准确, 则结果可能就是错误的, 而`max-age`显然无此问题. `max-age`的优先级高于`Expires`. 
* max-stale, 允许读取过期时间必须小于`max-stale`值的缓存对象. 
* min-fresh, 接受其`max-age`生命期大于其当前时间跟`min-fresh`值之和的缓存对象. 
* only-if-cached, 告知缓存者, 我希望内容来自缓存, 我并不关心被缓存的响应是否是最新的.
* no-transform, 告知代理, 不要更改媒体类型, 比如jpg被改成png.

##### response
* public, 数据内容均被储存起来, 就连有密码保护的网页也储存, 安全性很低. 
* private, 数据内容只能被储存到私有的cache, 仅对某个用户有效, 不能共享.
* no-cache, 可以缓存, 但是只有在跟Web服务器验证了其有效后, 才能返回给客户端.
* no-store, 请求和响应都禁止被缓存
* max-age, 该响应所包含的对象的过期时间.
* must-revalidate, 如果缓存过期了, 会再次和原来的服务器确定是否为最新数据, 而不是和中间的proxy.
* max-stale, 允许读取过期时间必须小于max-stale值的缓存对象. 
* proxy-revalidate, 与`must-revalidate`类似, 区别在于: `proxy-revalidate`要排除掉用户代理的缓存, 即其规则并不应用于用户代理的本地缓存上.
* s-maxage, 与`max-age`的唯一区别是`s-mageage`仅仅应用于共享缓存, 而不应用于用户代理的本地缓存等针对单用户的缓存, 另外, `s-maxage`的优先级要高于`max-age`
* no-transform, 告知代理, 不要更改媒体类型, 比如jpg被改成png.

#### 3) Last-Modified & If-Modified-Since
都是用户记录页面最后修改时间的HTTP header信息, 但是:
* Last-Modified 是由服务器往客户端发送的 HTTP header.
* If-Modified-Since是由客户端往服务器发送的HTTP header.

再次请求本地存在的 cache 页面时, 
* 客户端会通过 If-Modified-Since 头将先前服务器端发过来的 Last-Modified 最后修改时间戳发送回去，这是为了让服务器端进行验证
* 通过这个时间戳判断客户端的页面是否是最新的，如果不是最新的，则返回新的内容，如果是最新的，则 返回 `304` 告诉客户端其本地 `cache` 的页面是最新的，
* 于是客户端就可以直接从本地加载页面了，这样在网络上传输的数据就会大大减少，同时也减轻了服务器的负担。而且在一些ajax应用中，要求获取的数据永远是最新的，而不是读取位于缓存中的数据，做这样的设置是非常有必要的。

![images.png](/coding/last-modified.png)

但Last-Modified存在一些缺点:
* 有些服务器无法获取文件最新的修改时间
* 文件的修改时间变了, 但内容可能没有变化

既然按文件修改时间无法保证缓存是否合适, 那么是否可以考虑按文件内容来决定文件是否缓存呢?—-ETag和If-None-Match

#### 4) ETag & If-None-Match

ETag是上一次加载资源时, 服务器返回给浏览器客户端的response header, 是对该资源的一种`唯一标识`, 只要资源有变化, Etag就会重新生成, 浏览器每次加载资源向服务器发送请求时, 都会将文件上一次的Etag值放到request header的`If-None-Match`中, 服务器与客户端传入的`If-None-Match`进行比对, 看是否一致, 就能很好的断定资源是否有更新过. 若匹配, 则返回`HTTP 304`状态码, 浏览器则会直接使用本地缓存, 否则, 返回`HTTP 200`状态码, 返回最新的资源 .

![images.png](/coding/etag-if-none-match.png)

Etag & Last-Modified 两者比较:
* 从准确度来看, Etags要优于 Last-Modified, Last-Modified设置时间的最小单位是秒, 若某个文件在1秒内修改了两次或更多, Last-Modified无法精确的保证文件是否是最新的, 但Etag可以. 若是负载均衡服务器, 每个服务器生成的 Last-Modified值也可能不一致.
* 从性能来看, Etag要逊于 Last-Modified, 因为 Last-Modified只需要设置时间即可, 而Etag则必须要服务器通过比对算法来比较hash值.

从优先级来看, 服务器优先考虑校验Etag

#### 5) Cache-Control
浏览器缓存机制流程图

![images.png](/coding/images/9890665-a04013a56dc87052.png)

## 资源压缩&合并
主要包含有:
* html压缩
* css压缩
* js压缩和紊乱
* 文件合并
资源压缩可以从文件中去掉多余的字符, 比如回车和空格, 从而减小文件大小.

### 1) html压缩
html代码压缩就是压缩这些在文本文件中有意义，可是在HTML中不需要的字符，比如: 空格，制表符，换行符等，还有一些其他意义的字符，如HTML注释也可以被压缩。

### 2) css压缩
css代码压缩简单来说就是无效代码删除和css语义合并

### 3) js的压缩和紊乱
如何进行js代码的压缩和紊乱呢?
* 使用uglifyjs2对js进行压缩
* 使用在线网站进行压缩
* 使用html-minifier工具

其实css压缩与js的压缩和紊乱比html压缩收益要大得多，同时css代码和js代码比html代码多得多。所以对大公司来说，html压缩无关紧要，但css压缩与js的压缩非常有必要！

### 4) 文件合并
将多个js/css小文件合并为一个文件, 减少网络请求数.

## 非核心必要代码异步加载
### 1) 异步加载
实现异步加载有三种可行办法:
* async
* defer
* 动态创建script标签

#### async
* async属性是HTML5新增属性, 目前在Chrome, Firefox, IE9+上支持.
* async的设置，会使得script脚本异步的加载并在允许的情况下执行
* async的执行，并不会按着script在页面中的顺序来执行，而是谁先加载完谁执行。

#### defer
* 兼容所有浏览器
* 如果script标签设置了该属性，则浏览器会异步的下载该文件并且不会影响到后续DOM的渲染；
* 如果有多个设置了defer的script标签存在，则会按照顺序执行所有的script；
* defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行。

#### 动态创建script标签
在没有defer和async属性前, 异步加载是通过动态创建script标签, 在window.onload事件中触发动态创建script到dom中实现的.
示例代码:

``` js
function addScriptTag(src){
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function{
  addScriptTag("js/index.js");
}
```

### 2) defer&async异步加载的区别
* defer是在HTML解析完之后才会实行，若是是多个，按照加载的依次实行
* async是在加载完之后立即实行，若是是多个，实行按次和加载按次无关

## CDN
CDN服务提供商会有全国各个省份部署节点, 将网站静态资源部署到CDN后, 用户在访问页面时, CDN静态资源会从就近的CDN节点上加载资源. 
当请求至达CDN节点后, 节点会判断资源是缓存是否有效, 若有效, 直接返回给用户, 若无效, 会从CDN服务器加载最新的资源返回给用户同时将资源保存一份到该CDN节点上, 以便后续的访问用户使用. 因此, 只在该地区有一个用户先加载了资源, 在CDN中建立了缓存, 该地区的其他用户都能受益.

## DNS预解析
DNS 作为互联网的基础协议，其解析的速度似乎容易被网站优化人员忽视。现在大多数新浏览器已经针对DNS解析进行了优化，典型的一次DNS解析耗费20-120 毫秒，减少DNS解析时间和次数是个很好的优化方式。DNS Prefetching是具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能减少用户的等待时间，提升用户体验。

预解析的实现过程：

* 用meta信息来告知浏览器, 当前页面要做DNS预解析: `<meta http-equiv="x-dns-prefetch-control" content="on" />`
* 在页面header中使用link标签来强制对DNS预解析: `<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />`

> dns-prefetch需慎用，多页面重复DNS预解析会增加重复DNS查询次数。

::: tip
DNS预解析主要是用于网站前端页面优化，在SEO中的作用湛蓝还未作验证，但作为增强用户体验的一部分rel="dns-prefetch"或许值得大家慢慢发现。
::: 

浏览器对网站第一次的域名DNS解析查找流程依次为： 

浏览器缓存 -> 系统缓存 -> 路由器缓存 -> ISP DNS缓存 -> 递归搜索

![images.png](/coding/dns-pefetch.png)

> Chrome内置了DNS Prefetching技术, Firefox 3.5 也引入了这一特性，由于Chrome和Firefox 3.5本身对DNS预解析做了相应优化设置，所以设置DNS预解析的不良影响之一就是可能会降低Google Chrome浏览器及火狐Firefox 3.5浏览器的用户体验。

> 本文部分摘至网络