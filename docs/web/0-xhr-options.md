# XHR 什么时候会发送options请求

## 引言
在开发项目中, 经常发现所有的ajax请求都会发送2次.(每次都会发送额外的`options`请求).如下图所示:

![images.png](/coding/images/frontend/options1.png)

## 现象分析
发送的额外的options请求, 可以看到控制台看到request&response请求头包含有以下信息:

### 预检请求头request header的关键字段：
* Request-Method, 告知服务器实际请求所使用的 HTTP 方法(上图示例为: OPTIONS)
* Access-Control-Request-Headers, 告知服务器实际请求所携带的自定义首部字段. 

上图示例中, 实际请求首部字段中content-type为自定义, 服务器基于从预检请求头部获得的信息来判断，是否接受接下来的实际请求。
![images.png](/coding/images/frontend/options2.png)


### 预检响应头response header的关键字段：
* Access-Control-Allow-Methods, 返回了服务端允许的请求，包含GET/HEAD/PUT/PATCH/POST/DELETE
* Access-Control-Allow-Credentials, 允许跨域携带cookie（跨域请求要携带cookie必须设置为true）
* Access-Control-Allow-Origin, 允许跨域请求的域名，这个可以在服务端配置一些信任的域名白名单
* Access-Control-Request-Headers, 客户端请求所携带的自定义首部字段content-type

此次OPTIONS请求返回了响应头的内容，但没有返回响应实体response body内容。
![images.png](/coding/images/frontend/options3.png)


### 原(POST/GET等)请求
原本来要发送的请求，如图所示是普通的post请求。其中`Content-Type`的`application/json`是此次和后端约定的请求内容格式，这个也是后面讲到为什么会发送options请求的原因之一。
![images.png](/coding/images/frontend/options4.png)


## 关于OPTIONS请求
从很多资料我们可以了解到使用OPTIONS方法对服务器发起请求，可以检测服务器支持哪些 HTTP 方法。
但是这次我们并没有主动去发起OPTIONS请求，那OPTIONS请求为何会自动发起？

### OPTIONS请求自动发起
MDN的CORS一文中提到：
> 规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。

所以这个跨域请求触发了浏览器自动发起OPTIONS请求，看看此次跨域请求具体触发了哪些条件。

### 跨域请求时，OPTIONS请求触发条件
> CORS预检请求触发条件	本次请求是否触发该条件

#### 1. 使用了下面任一HTTP 方法：	
PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH	否，本次为post请求

#### 2. 人为设置了以下集合之外首部字段：	
Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width	否，未设置其他头部字段

#### 3. Content-Type 的值不属于下列之一:	
application/x-www-form-urlencoded、multipart/form-data、text/plain	是，为application/json
由于修改了Content-Type为application/json，触发了CORS预检请求。

## 优化OPTIONS请求：Access-Control-Max-Age 或者 避免触发

可见一旦达到触发条件，跨域请求便会一直发送2次请求，这样增加的请求数是否可优化呢？
答案是可以，OPTIONS预检请求的结果可以被缓存。

::: tip MDN
`Access-Control-Max-Age`这个响应首部表示 preflight request （预检请求）的返回结果（即 Access-Control-Allow-Methods 和Access-Control-Allow-Headers 提供的信息） 可以被缓存的最长时间，单位是秒。)
:::

如果值为 -1，则表示禁用缓存，每一次请求都需要提供预检请求，即用OPTIONS请求进行检测。

::: tip warning
尽量避免不要触发OPTIONS请求，上面例子中把content-type改掉是可以的。
在其他场景，比如跨域并且业务有自定义请求头的话就很难避免了。
现在使用的axios或者superagent等第三方ajax插件，如果出现CORS预检请求，可以看看默认配置或者二次封装是否规范。
:::

## 总结
OPTIONS请求即预检请求，可用于检测服务器允许的http方法。
当发起跨域请求时，由于安全原因，触发一定条件时浏览器会在正式请求之前自动先发起OPTIONS请求，即CORS预检请求，服务器若接受该跨域请求，浏览器才继续发起正式请求。