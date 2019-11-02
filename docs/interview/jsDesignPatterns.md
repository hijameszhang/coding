# JavaScript 设计模式&设计原则&编程技巧
> 本文摘至: https://lovejames.oschina.io/home/templates/ProgramDesignPattern/programDesignPattern.html

## 基础知识
### 1. call和apply

call和apply的区别: 
* apply, 接受两个参数:
  * 第一个参数指定了函数体内的this对象的指向
  * 第二个参数为一个带下标的集合, 这个集合可以为数组, 也可以为类数组, apply方法把这个集合中的元素作为参数传递给被调用的函数.
* call, 传入的参数数量不固定, 跟apply相同的是: 
  * 第一个参数也是代表函数体内this指向, 从第二个参数开始往后, 每个参数被依次传入函数.
  * 当使用call或者apply的时候:
    * 如果传入的第一个参数为null, 函数体内的this会指向默认的宿主对象, 在浏览器中则是window.
    * 如果是在严格模式下, 函数体内的this还是为null.
    
``` js
    var func = function(a, b, c){
        console.log(this === window);
    };
    func.apply(null, [1,2,3]);
    func.call(null, 1,2,3);
     /**
     *  2. call和apply的用途
     *
     *      a. 改变this指向
     *          call和apply最常见的用途是改变函数内部的this指向.
      *
      *     b. Function.prototype.bind
      *         大部分高级浏览器都实现了内置的Function.prototype.bind, 用来指定函数内部的this指向, 即使没有原生
      *         的Function.prototype.bind实现, 模拟一个也不是难事.
      *
      *     c. 借用其他对象的方法
      *
     *
     */
    // 改变this的指向
    var obj1 = {
         name: "sven"
     };
    var obj2 = {
        name: "anne"
    };
    window.name = "window";
    var getName = function(){
        console.log(this.name);
    };

    getName();          // 输出: window
    getName.call(obj1); // 输出: sven
    getName.call(obj2); // 输出: anne


    // 简单模拟Function.prototype.bind的实现
    Function.prototype.bind = function(context){
        var self = this;
        return function(){
            return self.apply(context, arguments);
        };
    };
    var obj4 = {
        name: "sven"
    };
    var func2 = function(){
        console.log(this.name);
    }.bind(obj4);
    func2();

    // 复杂一点的实现Function.prototype.bind
    Function.prototype.bind = function(){
        var self = this;    // 保存原函数
        var context = [].shift.call(arguments); // 需要绑定的this上下文,(第一个参数)
        var args = [].slice.call(arguments);    // 剩余的参数转成数组,(余下的参数)
        return function(){
            return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
            // 执行新的函数的时候, 会把之前传入的context当作新函数体内的this
            // 并且组合两次分别传入的参数, 作为新函数的参数
        };
    };
    var obj3 = {
        name: "sven"
    };
    var func3 = function(a, b, c, d){
        console.log(this.name);
        console.log([a, b, c, d]);
    }.bind(obj3, 1, 2);
    func3(3, 4);

    // 借用其他对象的方法
    var A = function(name){
        this.name = name;
    };
    var B = function(){
        A.apply(this, arguments);
    };
    B.prototype.getName = function(){
        return this.name;
    };
    var b = new B("sven");
    console.log(b.getName());
```
### 2. this的指向
``` js
var googleMap = {
        show: function () {
            console.log("google map");
        }
    };
    var baiduMap = {
        show: function () {
            console.log("baidu map");
        }
    };
    var sosoMap = {
        show: function () {
            console.log("soso map");
        }
    };

    var renderMap = function (map) {
        if(map.show instanceof Function)
        {
            map.show();
        }
    };


    renderMap(googleMap);
    renderMap(baiduMap);
    renderMap(sosoMap);



    /*****  this 的指向    *****/
    /*
        1. 作为对象的方法调用
        2. 作为普通函数调用
        3. 构造器调用
        4. Function.prototype.call或Function.prototype.apply调用
     */
    /**
     * 1. 作为对象的方法调用
     *
     * 当函数作为对象的方法被调用时, this指向该对象
     */
    var obj = {
        a: 1,
        getA: function(){
            console.log(this === obj);
            console.log( this.a);
        }
    };
    obj.getA();


    /***
     * 2. 作为普通函数调用
     *
     * 当函数不作为对象的属性被调用时, 也就是我们常说的普通函数方式, 此时的this总是指向全局对象. 在浏览器的JavaScript里,
     * 这个全局对象是window对象.
     */
    window.name = "globalName";
    var getName = function(){
        return this.name;
    };
    console.log(getName());

    //或者
    var myObject = {
        name: "sven",
        getName: function(){
            return this.name;
        }
    };
    var getName = myObject.getName;
    console.log(getName());


    /***
     * 3. 构造器调用
     *
     * JavaScript中没有类, 但可以从构造器中创建对象, 同时也提供了new运算符, 使得构造器看起来更像一个类.
     *
     * 除了宿主提供的一些内置函数, 大部份JavaScript函数都可以当作构造器使用. 构造器的外表跟普通函数一模一样, 它们的区别
     * 在于被调用的方式. 当用new运算符调用函数时, 该函数总是返回一个对象, 通常情况下, 构造器里的this就指向返回的这个对旬.
     *
     * 但用new调用构造器时,还要注意一个问题, 如果构造器显式地返回一个object类型的对象, 那么此次运算结果最终会返回这个对象,
     * 而不是我们之前所说的this.
     *
     * 如果构造器不显式地返回任何数据, 或者是返回一个非对象类型的数据, 就不会造成上述问题.
     *
     */
    var MyClass = function(){
        this.name = "sven";
    };
    var obj1 = new MyClass();
    console.log(obj1.name);

    var MyClass2 = function(){
        this.name = "sven";
        return {
            name: "anne"
        };
    };
    var obj2 = new MyClass2();
    console.log(obj.name);


    /**
     * 4. Function.prototype.call或Function.prototype.apply调用
     *
     * 跟普通的函数调用相比, 用Function.prototype.call或Function.prototype.apply可以动态地改变传入的函数的this.
     *
     * call和apply方法都能很好地体现JavaScript的函数式语言特性, 在JavaScript中, 几乎每一次编写函数式语言风格的代码, 都
     * 离不开call和apply. 在JavaScript诸多版本的设计模式中, 也用到了call和apply.
     *
     */
    var obj3 = {
        name: "sven",
        getName: function(){
            return this.name;
        }
    };
    var obj4 = {
        name: "anne"
    };

    console.log(obj3.getName());    // 输出: sven
    console.log(obj3.getName.call(obj4));   // 输出: anne
```
### 3. AOP
``` js
/**
     * 把一个函数"动态织入"到另外一个函数之中.
     * @param beforefn
     * @returns {Function}
     */
    Function.prototype.before = function(beforefn){
        var __self = this;      // 保存原函数的引用
        return function(){      // 返回包含了原函数和新函数的"代理"函数
            beforefn.apply(this, arguments);    // 执行新函数, 修正this
            return __self.apply(this, arguments);   // 执行原函数
        }
    };
    Function.prototype.after = function(afterfn){
        var __self = this;
        return function(){
            var ret = __self.apply(this, arguments);
            afterfn.apply(this, arguments);
            return ret;
        }
    };
    var func = function(){
        console.log(2);
    };
    func = func.before(function(){
        console.log(1);
    }).after(function(){
        console.log(3);
    });
    func();


    /***
     *
     * 1. currying
     * 函数柯里化(function currying)
     *
     * currying又称部分求值, 一个currying的函数首先会接受一些参数, 接受了这些参数之后, 该函数并不会立即求值, 而是继续返
     * 回另外一个函数, 刚才传入的参数在函数形成的闭包中被保存起来. 待到函数被真正需要求值的时候, 之前传入的所有参数都会
     * 被一次性用于求值.
     *
     * currying的另一种实现

     Function.prototype.uncurrying = function(){
            var self = this;
            return function(){
                return Function.prototype.call.apply(self, arguments);
            }
     }

     *
     */
    var currying = function(fn){
        var args = [];
        return function(){
            if(arguments.length === 0){
                return fn.apply(this, args);
            }else{
                [].push.apply(args, arguments);
                return arguments.callee;
            }
        };
    };
    var cost = (function () {
        var money = 0;
        return function () {
            for(var i= 0, l=arguments.length; i<l; i++){
                money += arguments[i];
            }
            return money;
        }
    })();

    var cost1 = currying(cost);
    cost1(100); // 未真正求值
    cost1(200); // 未真正求值
    cost1(300); // 未真正求值
    cost1();    // 求值并输出;


    /**
     * 2. uncurrying
     *
     *
     *
     */
    Function.prototype.uncurrying = function(){
        var self = this;
        return function(){
            var obj = Array.prototype.shift.call(arguments);
            return self.apply(obj, arguments);
        };
    };

    var push = Array.prototype.push.uncurrying();
    (function () {
        push(arguments, 4);
        console.log(arguments);     // 输出: [1,2,3,4]
    })(1,2,3);


    /**
     * 通过uncurrying的方式, Array.prototype.push.call变成了一个通用的push函数. 这样一来, push函数
     * 的作用跟Array.prototype.push一样了, 同样不仅仅局限于只能操作array对象.而对于使用者而言, 调
     * 用push函数的方式也显得更加简洁和意图明了.
     *
     * 我们还可以一次性地把Array.prototype上的方法"复制"到array对象上, 同样这些方法可操作的对象也不仅
     * 仅只是array对象
     */
    for(var i= 0, fn, arr = ['push', 'shift', 'forEach']; fn=arr[i++];){
        Array[fn] = Array.prototype[fn].uncurrying();
    }
    var obj = {
        length: 3,
        0: 1,
        1: 2,
        2: 3
    };
    Array.push(obj, 4); // 向对象中添加一个元素
    console.log(obj.length);    // 输出: 4

    var first = Array.shift(obj);   // 截取第一个元素
    console.log(first); // 输出: 1
    console.log(obj);   // 输出: {0:2, 1:3, 2:4, length: 3}

    Array.forEach(obj, function(i, n){
        console.log(n); // 分别输出: 0, 1, 2
    });


    /***
     * 3. 函数节流的代码实现
     *
     * 关于函数节流的代码实现有许多种, 下面的throttle函数的原理是:
     *  将即被执行的函数用setTimeout延迟一段时间执行. 如果该次延迟执行还没有完成, 则忽略接下来调用
     *  该函数的请求. throttle函数接受2个参数, 第一个参数为需要被延迟执行的函数, 第二个参数为延迟执行的时间.
     *  具体实现代码如下:
     *
     */
    var throttle = function(fn, interval){
        var __self = fn;
        var timer;
        var firstTime = true;
        return function(){
            var args = arguments;
            var __me = this;
            if(firstTime){
                __self.apply(__me, args);
                return firstTime = false;
            }
            if(timer){
                return false;
            }
            timer = setTimeout(function(){
                clearTimeout(timer);
                timer = null;
                __self.apply(__me, args);
            }, interval || 500);
        };
    };
    window.onresize = throttle(function () {
        console.log(1);
    }, 500);


    /**
     * 4. 分时函数
     *
     * 某些函数确实是用户主动调用的, 但因为一些客观原因, 这些函数会严重地影响页面的性能.
     *      一个例子就是创建WebQQ的QQ好友列表. 列表中通常会有成百上千个好友, 如果一个好友用一个节点来表示, 当我们在页面中
     *   渲染这个列表的时候, 可能要一次性往页面中创建成百上千个节点.
     *      在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消, 我们看到的结果往往就是浏览器的卡顿甚至假死.
     *      这个问题的解决方案之一是下面的的timeChunk函数, timeChunk函数让创建节点的工作分批进行, 比如把1秒创建1000个节
     *   点, 改为间隔200毫秒创建8个节点.
     *      timeChunk函数接受3个参数, 第1个参数是创建节点时需要用到的数据, 第2个参数是封装了创建节点的逻辑函数, 第3个参
     *   数表示每一批创建的节点数量.
     *
     *
     */
    var timeChunk = function (ary, fn, count) {
        var obj, t;
        var len = ary.length;
        var start = function(){
            for(var i=0; i>Math.min(count || 1, ary.length); i++){
                var obj = ary.shift();
                fn(obj);
            }
        };
        return function () {
            t = setInterval(function () {
                if(ary.length === 0){
                    return clearInterval(t);
                }
                start();
            }, 200)
        };
    };

    // 测试一下
    var ary = [];
    for(var j= 1; j<=100; j++){
        ary.push(j);
    }
    var renderFriendList = timeChunk(ary, function (n) {
        var div = document.createElement("div");
        div.innerHTML = n;
        document.body.appendChild(div);
    }, 8);
    renderFriendList();


    /***
     * 5. 惰性加载函数
     *
     *      在Web开发中, 因为浏览器之间的实现差异, 一些嗅探工作总是不可避免. 比如我们需要一个在各个浏览器中能够通用的
     *      事件绑定函数addEvent, 常用的写法如下:
                var addEvent = function(elem, type, handler){
                    if(window.addEventListener){
                        return elem.addEventListener(type, handler, false);
                    }
                    if(window.attachEvent){
                        return elem.attachEvent("on"+type, handler);
                    }
                }
     *      这个函数的缺点是, 当它每次被调用的时候都会执行里面的if条件分支, 虽然执行这些if分支的开销不算大, 但也许有
     *      一些方法可以让程序避免这些重复的执行过程.
     *
     *      第二个方案是这样的, 我们把嗅探浏览器的操作提前到代码加载的时候, 在代码加载的时候就立刻进行一次判断, 以便
     *      让addEvent返回一个包裹了正确逻辑的函数, 代码如下:
            var addEvent = (function(){
                if(window.addEventListener){
                    return function(elem, type, handler){
                        elem.addEventListener(type, handler, false);
                    }
                }
                if(window.attachEvent){
                    return function(elem, type, handler){
                        elem.attachEvent("on"+type, handler);
                    }
                }
            })()
     *      目前的addEvent函数依然有个缺点, 也许我们从头到尾都没有使用过addEvent函数, 这样看来, 前一次的浏览嗅探就是完
     *      全多余的操作, 而且这也会稍稍延长页面的ready的时间.
     *
     *      第三种方案即是我们将要讨论的惰性载入函数方案. 此时addEvent依然被声明为一个普通函数, 在函数里依然有一些分支
     *      判断. 但是在第一次进入条件分支后, 在函数内部会重写这个函数, 重写之后的函数就是我们期望的addEvent函数, 在下
     *      一次进入addEvent函数的时候, addEvent函数里不再存在条件分支语句:
     *
     */
    var addEvent = function (elem , type, handler) {
        if(window.addEventListener){
            addEvent = function(elem, type, handler){
                elem.addEventListener(type, handler, false);
            }
        }else if(window.attachEvent){
            addEvent = function(elem, type, handler){
                elem.attachEvent("on"+type, handler);
            }
        }
        addEvent(elem, type, handler);
    };

    var div1 = document.getElementById("div1");
    addEvent(div1, "click", function () {
        alert("demo div1");
    })
```
## 设计模式
### 1. 单例模式
#### 定义:
保证一个类仅有一个实例, 并提供一个访问它的全局访问点.

单例模式是一种常用的模式, 有一些对象我们往往只需要一个, 比如:
* 线程池
* 全局缓存
* 浏览器中的window对象等. 

在JavaScript开发中, 单例模式的用途同样非常广泛. 试想一下, 当我们单击登录按钮的时候, 页面中会出现一个登录浮窗, 而 这个登录浮窗是唯一的, 无论单击多少次登录按钮, 这个浮窗都只会被创建一次, 那么这个登录浮窗就适合用单例模式来创建.

通过引入代理类的方式, 同样完成了一个单例模式的编写, 跟之前不同的是, 现在我们把负责管理单例的逻辑移到了代理类ProxySingletonCreateDiv中, 这样一来, CreateDiv就变成了一个普通的类, 它跟ProxySingletonCreateDiv组合起来可以达到单例模式的效果.
``` js
    var CreateDiv = function(html){
        this.html = html;
        this.init();
    };
    CreateDiv.prototype.init = function(){
        var div = document.createElement("div");
        div.innerHTML = this.html;
        document.body.appendChild(div);
    };

    var ProxySingletonCreateDiv = (function(){
        var instance;
        return function(html){
            if(!instance){
                instance = new CreateDiv(html);
            }
            return instance;
        };
    })();

    var a = new ProxySingletonCreateDiv("sven1");
    var b = new ProxySingletonCreateDiv("sven2");

    console.log(a === b);
```

#### 通用惰性单例
把如何管理单例的逻辑抽离出来, 这些逻辑被封装在getSingle函数内部, 创建对象的方法fn被当成参数动态传入getSingle函数.
在下面的这个例子中, 我们把创建实例对象的职责和管理单例的职责分别放置在两个方法里, 这两个方法可以独立变化而互不影响,
当它们连接在一起的时候, 就完成了创建唯一实例对象的功能.
``` js

    var getSingle = function(fn){
        var result;
        return function(){
            return result || (result = fn.apply(this, arguments));
        }
    };
    var createLoginLayer = function(){
        var div = document.createElement("div");
        div.innerHTML = "登录窗";
        div.style.display = "none";
        document.body.appendChild(div);
        return div;
    };

    var createSingleLoginLayer = getSingle(createLoginLayer);

    document.getElementById("loginBtn").onclick = function () {
        var loginLayer = createSingleLoginLayer();
        loginLayer.style.display = "block";
    }

```
### 2. 策略模式
``` js

    var tween = {
        linear: function(t, b, c, d){
            return c * t/d + b;
        },
        easeIn: function(t, b, c, d){
            return c * (t /= d) * t + b;
        },
        strongEaseIn: function(t, b, c, d){
            return c * (t /= d) * t * t * t * t + b;
        },
        strongEaseOut: function(t, b, c, d){
            return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
        },
        sineaseIn: function(t, b, c, d){
            return c * ( t/=d ) * t * t + b;
        },
        sineaseOut: function(t, b, c, d){
            return c * (( t = t / d - 1) * t * t + 1) + b;
        }
    };


    var Animate = function(dom){
        this.dom = dom;                 // 进行运动的dom节点
        this.startTime = 0;             // 动画开始时间
        this.startPos = 0;              // 动画开始时, dom节点的位置, 即dom的初始位置
        this.endPos = 0;                // 动画结束时, dom节点的位置, 即dom的目标位置
        this.propertyName = null;       // dom节点需要被改变的css属性名
        this.duration = null;           // 动画持续时间
    };
    Animate.prototype.start = function(propertyName, endPos, duration, easing){
        /***
         JavaScript中getBoundingClientRect()方法详解
         getBoundingClientRect()
            这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。

         * @type {number}
         */
        this.startTime = +new Date;     // 动画启动时间 1484961599063
        this.startPos = this.dom.getBoundingClientRect()[propertyName];     // dom节点初始位置
        this.propertyName = propertyName;                                   // dom节点需要被改变的CSS属性名
        this.endPos = endPos;                   // dom节点目标位置
        this.duration = duration;               // 动画持续时间
        this.easing = tween[easing];            // 缓动算法

        var self = this;
        var timeId = setInterval(function(){    // 启动定时器, 开始执行动画
            if(self.step() === false){          // 如果动画已结束, 则清除定时器
                clearInterval(timeId);
            }
        }, 19)
    };
    Animate.prototype.step = function(){
        var t = +new Date;
        if(t >= this.startTime + this.duration){
            this.update(this.endPos);
            return false;
        }
        var pos = this.easing( t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
        // pos 为小球当前位置
        this.update(pos);   // 更新小球的CSS属性值
    };
    Animate.prototype.update = function (pos) {
        this.dom.style[this.propertyName] = pos + "px";
    };

    var div = document.getElementById("div");
    var animate = new Animate(div);
    animate.start("left", 500, 1000, "strongEaseOut");

```
### 3. 代理模式
代理模式是一种非常有意义的模式, 在生活中可以找到很多代理模式的场景. 

比如明星都有经纪人作为代理. 如果想请明星来办一场 商业演出, 只能联系他的经纪人. 经纪人会把商业演出的细节和报酬都谈好之后, 再把合同交给明星签.
代理模式的关键是, 当客户不方便直接访问一个对象或者不满足需要的时候, 提供一个替身对象来控制对这个对象的访问, 客户实际 上访问的是替身对象. 替身对象对请求做出一些处理之后, 再把请求转交给本体对象.

#### 虚拟代理实现图片预加载
在Web开发中, 图片预加载是一种常用的技术, 如果直接给某个img标签节点设置src属性, 由于图片过大或者网络不佳, 图片的位置 往往有段时间会是一片空白. 
常见的做法是先用一张loading图片占位, 然后用异步的方式加载图片, 等图片加载好了再把它填充 到img节点里, 这种场景就很适合使用虚拟代理.
``` js

    var myImage = (function(){
        var imgNode = document.createElement("img");
        document.body.appendChild(imgNode);

        return function(src){
            imgNode.src = src;
        }
    })();

    var proxyImage = (function(){
        var img = new Image;
        img.onload = function(){
            myImage(this.src);
        };
        return function(src){
            myImage("file:// /C:/Users/sven/Desktop/loading.gif");
            img.src = src;
        }
    })();

    proxyImage("http://img/cache/com/music/dklddsafla.jpg");

```

#### 虚拟代理合并HTTP请求
在Web开发中, 也许最大的开销就是网络请求. 假设我们在做一个文件同步的功能, 当我们选中一个checkbox的时候, 它对应的文件 就会被同步到另一台备用服务器上.当我们选中3个checkbox的时候,依次往服务器发送了3次同步文件的请求. 而点击并不是一个很复 杂的操作, 一秒内点中4个checkbox并不是什么难事, 如此频繁的网络请求将会带来相当大的开销. 解决方案是, 可以通过一个代理函数proxySynchronousFile来收集一段时间内的请求, 最后一次性发送给服务器.比如我们等待2秒之 后才把这2秒之内需要同步的文件ID打包发给服务器, 如果不是对实时性要求非常高的系统, 2秒的延迟不会带来太大的副作用, 却能 大大减轻服务器的压力.代码如下:

``` js

    var synchronousFile = function(id){
        console.log("开始同步文件, id为: " + id);
    };
    var proxySynchronousFile = (function(){
        var cache = [];
        var timer;
        return function(id){
            cache.push(id);
            if(timer){
                return;
            }
            timer = setTimeout(function(){
                synchronousFile(cache.join(","));
                clearTimeout(timer);
                timer = null;
                cache.length = 0;
            }, 2000);
        };
    })();

    var checkbox = document.getElementsByTagName("input");
    for(var i= 0, c; c=checkbox[i++];){
        c.onclick = function(){
            if(this.checked === true){
                proxySynchronousFile(this.id);
            }
        }
    }

```

### 4. 迭代器模式
迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素, 而又不需要暴露该对象的内部表示. 迭代器模式可以把迭代的过 程从业务逻辑中分离出来, 在使用迭代器模式之后, 即使不关心对象的内部构造, 也可以顺序访问其中的每个元素.

迭代器可以分为:
* 内部迭代器
* 外部迭代器, 

它们有各自的适用场景. 
##### 1. 内部迭代器
内部迭代器在调用的时候非常方便, 外界不用关心迭代器内部的实现, 跟迭代器的交互也仅仅是一次初始调用, 但也刚好是内部迭代 器的缺点.由于内部迭代器规则已经被提前规定, 上面的each函数就无法同时迭代2个数组了. 比如, 现在有个需求, 要判断2个数组里元素的值是否完全相等, 如果不改写each函数本身的代码, 我们能够入手的地方似乎只剩 下each的回调函数了.

##### 2. 外部迭代器
外部迭代器必须显式地请求迭代下一个元素. 外部迭代器增加了一些调用的复杂度, 但相对也增强了迭代器的灵活性, 我们可以手工控制迭代的过程或者顺序.
外部迭代器虽然调用方式相对复杂, 但它的适用面更广, 也能满足更多变的需求. 内部迭代器和外部迭代器在实际生产中没有优劣 之分, 究竟使用哪个要根据需求场景而定.


``` js

    // 内部迭代器   (实现自己的迭代器)
    var each = function(ary, callback){
        for(var i= 0, l = ary.length; i<l; i++){
            callback.call(ary[i], i, ary[i]);
        }
    };
    var compare1 = function(ary1, ary2){
        if(ary1.length !== ary2.length){
            throw new Error("ary1 和 ary2不相等");
        }
        each(ary1, function(i, n){
            if( n !== ary2[i]){
                throw new Error(" ary1和ary2不相等");
            }
        });
        console.log("ary1 和 ary2 相等");
    };
    compare1([1,2,3], [1,2,4]);


    // 外部迭代器
    var Iterator = function(obj){
        var current = 0;

        var next = function(){
            current +=1;
        };
        var isDone = function(){
            return current >= obj.length;
        };
        var getCurrItem = function(){
            return obj[current];
        };
        return {
            next: next,
            isDone: isDone,
            getCurrItem: getCurrItem
        }
    };
    var compare2 = function(iterator1, iterator2){
        while( !iterator1.isDone() && !iterator2.isDone()){
            if(iterator1.getCurrItem() !== iterator2.getCurrItem()){
                throw new Error(" iterator1 和 iterator2 不相等")
            }
            iterator1.next();
            iterator2.next();
        }
        console.log(" iterator1 和 iterator2相等 ");
    };
    var iterator1 = Iterator([1,2,3]);
    var iterator2 = Iterator([1,2,3]);
    compare1(iterator1, iterator2);

```


#### 迭代类数组对象和字面量对象
迭代器模式不仅可以迭代数组, 还可以迭代一些类数组的对象. 比如arguments, {"0": "a", "1": "b"}等. 通过上面的代码可以 观察到, 无论是内部迭代器还是外部迭代器, 只要被迭代的聚合对象拥有length属性而且可以用下标访问, 那它就可以被迭代.
在JavaScript中, for in语句可以用来迭代普通字面量对象的属性. jQuery中提供了$.each函数来封装各种迭代行为:
``` js 

    // jQuery中提供了$.each函数来封装各种迭代行为:
    $.each = function(obj, callback){
        var value,
                i= 0,
                length = obj.length,
                isArray = isArrayLike(obj);
        if(isArray){
            for(; i<length; i++){
                value = callback.call(obj[i], i, obj[i]);
                if(value === false){  // 如果回调函数的执行结果返回false, 则提前终止循环.
                    break;
                }
            }
        }else{
            for(i in obj){
                value = callback.call(obj[i], i, obj[i]);
                if(value === false){ // 如果回调函数的执行结果返回false, 则提前终止循环.
                    break;
                }
            }
        }
        return obj;
    };

```

#### 迭代器模式应用举例
在不同的浏览器环境下, 选择的上传方式是不一样的. 因为使用浏览器的上传控件进行上传速度快, 可以暂停和续传, 所以会优先 使用控件上传. 
如果浏览器没有安装上传控件, 则使用Flash上传, 如果连Flash也没有安装, 那就只好使用浏览器的表单上传了. 

梳理一下问题 , 目前一共有3种可能的上传方式, 我们不知道目前正使用的浏览器支持哪几种. 就好比我们有一个钥匙串, 共有3把 钥匙, 从第一把钥匙开始, 迭代钥匙进行尝试, 直到找到正确的钥匙为止. 
同样, 我们把每种获取upload对象的方法都封装在各自的函数里, 然后使用一个迭代器,迭代获取这些upload对象, 直到获取一个可用 的为止.
``` js

    var getActiveUploadObj = function(){
        try{
            return new ActiveXObject("TXFNActiveX.FTNUpload"); // IE上传控件
        }catch(e){
            return false;
        }
    };
    var getFlashUploadObj = function(){
        if(supportFlash()){ // supportFlash函数未提供
            var str = "<object type='application/x-shockwave-flash'></object>";
            return $(str).appendTo($('body'));
        }
        return false;
    };
    var getFormUploadObj = function(){
        var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
        return $(str).appendTo($('body'));
    };

    var iteratorUploadObj = function(){
        for(var i= 0, fn; fn=arguments[i++];){
            var uploadObj = fn();
            if(uploadObj !== false){
                return uploadObj;
            }
        }
    };

    var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj);

```
### 5. 发布-订阅模式
发布-订阅模式又叫观察者模式, 它定义对象间的一种一对多的依赖关系, 当一个对象的状态发生改变时, 所有依赖于它的对象都将 得到通知. 
在JavaScript开发中, 我们一般用事件模型来替代传统的发布-订阅模式.

除了DOM事件, 我们还会经常实现一些自定义的事件, 这种依靠自定义事件完成的发布-订阅模式可以在任何JavaScript代码中.
实现发布-订阅模式的步骤:
* 1. 首先要指定好谁充当发布者.
* 2. 然后给发布者添加一个缓存列表, 用于存放回调函数以便通知订阅者.
* 3. 最后发布消息的时候, 发布者会遍历这个缓存列表, 依次触发里面存放的订阅者回调函数.

> 另外, 我们还可以往回调函数里填入一些参数, 订阅者可以接收这些参数.

#### 发布-订阅模式的通用实现
##### 真实的例子 --- 网站登录
假如我们正在开发一个商城网站, 网站里有header头部, nav导航, 消息列表, 购物车等模块. 这几个模块的渲染有一个共同的前提
条件, 就是必须先用ajax异步请求获取用户的登录信息. 至于ajax请求什么时候能成功返回用户信息, 这点无法确定. 现在的情节
看起来像极了售楼处的例子, 小明不知道什么时候开发商的售楼手续能够成功办下来.
更重要的一点是, 我们不知道除了header头部, nav导航, 消息列表, 购物车之外, 将来还有哪些模块需要使用这些用户信息. 如果
它们和用户信息模块产生了强耦合, 比如下面这样的形式:
``` js
    login.succ(function(data){
        header.setAvatar(data.avatar);      // 设置header模块的头像
        nav.setAvatar(data.avatar);         // 设置导航模块的头像
        message.refresh();                  // 刷新消息列表
        cart.refresh();                     // 刷新购物车列表
    });
```

这种耦合性会使程序变得僵硬, header模块不能随意再改变setAvatar的方法名, 它自身的名字也不能被改为header1, header2.这是
针对实现编程的典型例子, 针对具体实现编程是不被赞同的.
用发布-订阅模式重写之后, 对用户信息感兴趣的业务模块将自行订阅登录成功的消息事件. 当登录成功时, 登录模块只需要发布登录
成功的消息, 而业务方接受到消息之后, 就会开始进行各自的业务处理, 登录模块并不关心业务方究竟要做什么, 也不想去了解它们
的内部细节. 改善后的代码下:

``` js
    $.ajax("http://xxx.com?login", function(data){  // 登录成功
        login.trigger("loginSucc", data);           // 发布登录成功的消息
    });

    // 和模块监听登录成功的消息
    var header = (function(){       // header模块
        login.listen("loginSucc", function(data){
            header.setAvatar(data.avatar);
        });
        return {
            setAvatar: function(data){
                console.log("设置header模块的头像!");
            }
        }
    })();

    var nav = (function(){          // nav模块
        login.listen("loginSucc", function(data){
           nav.setAvatar(data.avatar);
        });
        return {
            setAvatar: function(avatar){
                console.log("设置nav模块的头像!");
            }
        }
    })();

    var address = (function(){      // 收货地址模块
        login.listen("loginSucc", function(obj){
            address.refresh(obj);
        });
        return {
            refresh: function(avatar){
                console.log("刷新收货地址列表!");
            }
        }
    })();
```

#### 全局的发布-订阅对象
在程序中, 发布-订阅模式可以用一个全局的Event对象来实现, 订阅者不需要了解消息来自哪个发布者, 发布者也不知道消息会推送 给哪些订阅者, Event作为一个类似"中介者"的角色, 把订阅者和发布者联系起来.见如下代码:

但这里我们要留意另一个问题, 模块之间如果用了太多的全局发布-订阅模式来通信, 那么模块与模块之间的联系就被隐藏到 背后. 我们最终会搞不清楚消息来自哪个模块, 或者消息会流向哪些模块, 这又会给我们的维护带来一些麻烦, 也许某个模块 的作用就是暴露一些接口给其他模块调用.

#### 全局事件的命名冲突
我们所了解的发布-订阅模式中, 都是订阅者先订阅一个消息, 随后才能接收到发布者发布的消息. 如果把顺序返过来, 发布者先发 布一条消息, 而在此之前并没有对象来订阅它, 这条消息无疑将消失在宇宙中.
在某些情况下, 我们需要先将这条消息保存下来, 等到有对象来订阅它的时候, 再重新把消息发布给订阅者. 就如同QQ中的离线消息 一样, 离线消息被保存在服务器中, 接收人下次登录上线之后, 可以重新收到这条消息. 这种需救济在实际项目中是存在的, 比如在之前折商城网站中, 获取到用户信息之后才能渲染用户导航模块, 而获取用户信息的操作 是一个ajax异步请求. 当ajax请求成功返回之后会发布一个事件, 在此之前订阅了此事件的用户导航模块可以接收到这些用户信息. 但这只是理想的状况, 因为异步的原因, 我们不能保证ajax请求返回的时间, 有时它返回得比较快, 而此时用户导航模块的代码还没有 加载好(还没有订阅相应的事件), 特别是在用了一些模块化惰性加载的技术后, 这是很可能发生的事情. 也许我们还需要一个 方案, 使得我们的发布-订阅对象拥有先发布后订阅的能力.
为了满足这个需求, 我们要建立一个存放离线事件的堆栈, 当事件发布的时候, 如果此时还没有订阅者来订阅这个事件, 我们暂时把 发布事件的动作包裹在一个函数里, 这些包装函数将被存入堆栈中, 等到终于有对象来订阅此事件的时候, 我们将遍历堆栈并且依次 执行这些包装函数, 也就是重新发布里面的事件.当然离线事件的生命周期只有一次, 就像QQ的未读信息只会被重新阅读一次, 所以 刚才的操作我们只能进行一次.

### 6. 命令模式
命令模式是最简单和优雅的模式之一, 命令模式中的命令指的是一个执行某些特定事情的指令.
命令模式最常见的应用场景是: 有时候需要向某些对象发送请求, 但是并不知道请求的接收者是谁, 也不知道被请求的操作是什么. 此时希望用一种松耦合的方式来设计程序, 使得请求发送者和请求接收者能够消除彼此之间的耦合关系.

示例代码:
``` js

    var Ryu = {
        attack: function(){
            console.log("攻击");
        },
        defense: function(){
            console.log("防御");
        },
        jump: function(){
            console.log("跳跃");
        },
        crouch: function(){
            console.log("蹲下");
        }
    };
    // 创建命令
    var makeCommand = function(receiver, state){
        return function(){
            receiver[state]();
        }
    };

    var commands = {
        "119": "jump",
        "115": "crouch",
        "97": "defense",
        "100": "attack"
    };

    var commandStack = []; // 保存命令的堆栈

    document.onkeypress = function(ev){
        var keyCode = ev.keyCode,
                command = makeCommand(Ryu, commands[keyCode]);
        if(command){
            command();  // 执行命令
            commandStack.push(command); // 将刚刚执行过的命令保存进堆栈
        }
    };

    document.getElementById("replay").onclick = function(){
        var command;
        // 从堆栈里依次取出命令并执行
        while(command = commandStack.shift()){
            command();
        }
    }

```

#### 宏命令
宏命令是一组命令的集合, 通过执行宏命令的方式, 可以一次执行一批命令.

接下业定义的宏命令MacroCommand, 它的结构也很简单. macroCommand.add方法表示把子命令添加进宏命令对象, 当调用宏命令对象
的execute方法时, 会迭代这一组子命令对象, 并且依次执行它们的execute方法.


当然我们还可以为宏命令添加撤销功能, 跟macroCommand.execute类似, 当调用macroCommand.undo方法时, 宏命令里包含的所有子
命令对象要依次执行各自的undo操作.

``` js

    var closeDoorCommand = {
        execute: function(){
            console.log("关门");
        }
    };
    var openPcCommand = {
        execute: function(){
            console.log("开电脑");
        }
    };
    var openQQCommand = {
        execute: function(){
            console.log("登录QQ");
        }
    };
    var MacroCommand = function(){
        return {
            commandsList: [],
            add: function(command){
                this.commandsList.push(command);
            },
            execute: function(){
                for(var i= 0, command; command = this.commandsList[i++];){
                    command.execute();
                }
            }
        }
    };

    var macroCommand = MacroCommand();
    macroCommand.add(closeDoorCommand);
    macroCommand.add(openPcCommand);
    macroCommand.add(openQQCommand);

    macroCommand.execute();

```
### 7. 组合模式
组合模式将对象组合成树形结构, 以表示"部分-整体"的层次结构. 除了用来表示树形结构之外, 组合模式的另一个好处是通过对象的 多态性表现, 使得用户对单个对象和组合对象的使用具有一致性.

更强大的宏命令.
``` js

    var MacroCommand = function(){
        return {
            commandsList: [],
            add: function(command){
                this.commandsList.push(command);
            },
            execute: function(){
                for(var i= 0, command; command = this.commandsList[i++];){
                    command.execute();
                }
            }
        }
    };
    var openAcCommand = {
        execute: function(){
            console.log("打开空调");
        }
    };

    /***电视和音响是连接在一起的, 所以可以用一个宏命令来组合打开电视和音响折命令***/
    var openTvCommand = {
        execute: function(){
            console.log("打开电视");
        }
    };
    var openSoundCommand = {
        execute: function(){
            console.log("打开音响");
        }
    };
    var macroCommand1 = MacroCommand();
    macroCommand1.add(openTvCommand);
    macroCommand1.add(openSoundCommand);

    /***关门, 打开电脑和登录QQ命令***/
    var closeDoorCommand = {
        execute: function(){
            console.log("关门");
        }
    };
    var openPcCommand = {
        execute: function(){
            console.log("开电脑");
        }
    };
    var openQQCommand = {
        execute: function(){
            console.log("登录QQ");
        }
    };
    var macroCommand2 = MacroCommand();
    macroCommand2.add(closeDoorCommand);
    macroCommand2.add(openPcCommand);
    macroCommand2.add(openQQCommand);

    /***现在把所有的命令组合成一个"超级命令"***/
    var macroCommand = MacroCommand();
    macroCommand.add(openAcCommand);
    macroCommand.add(macroCommand1);
    macroCommand.add(macroCommand2);
    /**最后给制遥控器绑定"超级命令"**/
    var setCommand = (function(command){
        document.getElementById("button").onclick = function(){
            command.execute();
        }
    })(macroCommand)

```

#### 在使用组合模式的时候, 还有以下几个值得我们注意的地方.
##### 组合模式不是父子关系
组合模式是一个HAS-A(聚合)的关系, 而不是IS-A. 组合对象包含一组叶对象. 组合对象把请求委托给它所包含的所有叶对 象, 它们能够合作的关键是拥有相同的接口.

##### 对叶对象操作的一致性
组合模式除了要求组合对象和叶对象拥有相同的接口之外, 还有一个必要条件, 就是对一组叶对象的操作必须具有一致性.

##### 用职责链模式提高组合模式性能
在组合模式中, 如果树的结构比较复杂, 节点数量很多, 在遍历树的过程中, 性能方面也许表现得不够理想. 有时候我们 确实可以借助一些技巧, 在实际操作中避免遍历整棵树, 有一种现成的方案是借助职责链模式. 
职责链模式一般需要我们手动去设置链条, 但在组合模式中, 父对象和子对象之间实际上形成了天然的职责链. 让请求顺着 链条从父对象往子对象传递, 或者是反过来从子对象往父对象传递, 直到遇到可以处理该请求的对象为止, 这也是职责链 模式的经典运用场景之一.

### 8. 模板方法模式
模板方法模式是一种只需要使用继承就可以实现的非常简单的模式.
模板方法模式由两部分结构组成, 第一部份是抽象父类, 第二部份是具体的实现子类. 通常在抽象父类中封装了子类的算法框架, 包括 实现一些公共方法以及封装子类中所有方法的执行顺序. 子类通过继承这个抽象类, 也继承了整个算法结构, 并且可以选择重写父类 的方法.
模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式. 在传统的面向对象语言中, 一个运用了模板方式模式的程序中, 子类的方法种类和执行顺序都是不变的, 所以我们把这部分逻辑抽象到父类的模板方法里面. 而子类的方法具体怎么实现则是可变的, 于是我们把部分的逻辑封装到子类中. 通过增加新的子类, 我们便能给系统增加新的功能, 并不需要改动抽象父类以及其他子类, 这 也是符合开放-封闭原则的.

饮料类Beverage中封装了饮料的冲泡顺序:
* 1. 把水煮沸
* 2. 用沸水冲泡饮料
* 3. 把饮料倒进杯子
* 4. 加调料

下面这段代码中, 我们把brew, pourInCup, addCondiments这些方法依次传入Beverage函数, Beverage函数被调用之后返回构造器F,
F类中包含了"模板方法" F.prototype.init. 跟继承得到的效果一样, 该"模板方法"里依然封装了饮料子类的算法框架.

``` js
        var Beverage = function(param){
        var boilWater = function(){
            console.log("把水煮沸");
        };
        var brew = param.brew || function(){
                    throw new Error("必须传递brew方法")
                };
        var pourInCup = param.pourInCup || function(){
                    throw new Error("必须传递pourInCup方法")
                };
        var addCondiments = param.addCondiments || function(){
                    throw new Error("必须传递addCondiments方法");
                };
        var F = function(){};

        F.prototype.init = function(){
            boilWater();
            brew();
            pourInCup();
            addCondiments();
        };
        return F;
    };

    var Coffee = Beverage({
        brew: function(){
            console.log("用沸水冲泡咖啡");
        },
        pourInCup: function(){
            console.log("把咖啡倒进杯子");
        },
        addCondiments: function(){
            console.log("加糖和牛奶");
        }
    });

    var Tea = Beverage({
        brew: function(){
            console.log("用沸水浸泡茶叶");
        },
        pourInCup: function(){
            console.log("把茶叶倒进杯子");
        },
        addCondiments: function(){
            console.log("加柠檬")
        }
    });

    var coffee = new Coffee();
    coffee.init();

    var tea = new Tea();
    tea.init();
```

### 9. 享元模式
享元模式是一种用于性能优化的模式. 享元模式的核心是运用共享技术来有效支持大量细粒度的对象.
如果系统中因为创建大量类似的对象而导致内存占用过高, 享元模式就非常有用了. 在JavaScript中, 浏览器特别是移动端的浏览 器分配的内存并不算多, 如何节省内存就成了一件非常有意义的事情.
对象池技术的应用非常广泛, HTTP连接池和数据库连接池都是其代表应用. 在Web前端开发中, 对象池使用最多的场景大概就是跟 DOM有关的操作. 很多空间和时间都消耗在了DOM节点上, 如何避免频繁地创建和删除DOM节点就成了一个有意义的话题了.
对象池是另外一种性能优化方案, 它跟享元模式有一些相似之处, 但没有分离内部状态和外部状态这个过程. 
享元模式是为解决性能问题而生的模式, 这跟大部份模式的诞生原因都不一样, 在一个存在大量相似对象的系统中, 享元模式可以 很好地解决大量对象带来的性能问题.

``` js

    var objectPoolFactory = function(createObjFn){
        var objectPool = [];
        return {
            create: function(){
                var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
                return obj;
            },
            recover: function(obj){
                objectPool.push(obj);
            }
        }
    };

    var iframeFactory = objectPoolFactory(function(){
        var iframe = document.createElement("iframe");
        document.body.appendChild(iframe);

        iframe.onload = function(){
            iframe.onload = null;   // 防止iframe重复加载的bug
        };
        return iframe;
    });

    var iframe1 = iframeFactory.create();
    iframe1.src = "http://www.baidu.com";

    var iframe2 = iframeFactory.create();
    iframe2.src = "http://qq.com";

    setTimeout(function(){
        var iframe3 = iframeFactory.create();
        iframe3.src = "http://163.com";
    }, 3000);

```
### 10. 职责链模式
职责链模式的定义是: 使用多个对象都有机会处理请求, 从而避免请求的发送者和接收者之间的耦合关系, 将这些对象连成一条链, 并沿着这条链传递该请求, 直到有一个对象处理它为止.
职责链模式的名字非常形象, 一系列可能会处理请求的对象被连接成一条链, 请求在这些对象之间依次传递, 直到遇到一个可以处理 它的对象, 我们把这些对象称为链中的节点.

#### 实例:
假设负责一个售卖手机的电商网站, 经过分别交纳500元定金和200元定金的两轮预定后(订单已在此时生成), 现在已经到了正式购买的阶段.

公司针对支付过定金的用户有一定的优惠政策. 在正式购买后, 已经支付过500元定金的用户会收到100元商城优惠券, 200元定金的用户会收到50元的优惠券, 而之前没有支付定金的用户只能进入普通购买模式, 也就是没有优惠券, 且在库存有限的情况下不一定保证能买到.代码如下:
``` js

    var order500 = function(orderType, pay, stock){
        if(orderType === 1 && pay === true){
            console.log("500元定金预购, 得到100元优惠券");
        }else{
            return "nextSuccessor";         // 不知道下一个节点是谁, 反正把请求往后面传递
        }
    };

    var order200 = function(orderType, pay, stock){
        if(orderType === 2 && pay === true){
            console.log("200元定金预购, 得到50元优惠券");
        }else{
            return "nextSuccessor";
        }
    };

    var orderNormal = function(orderType, pay, stock){
        if(stock > 0){
            console.log("普通购买, 无优惠券");
        }else{
            console.log("手机库存不足");
        }
    };

    var Chain = function(fn){
        this.fn = fn;
        this.successor = null;
    };
    Chain.prototype.setNextSuccessor = function(successor){
        return this.successor = successor;
    };
    Chain.prototype.passRequest = function(){
        var ret = this.fn.apply(this, arguments);
        if(ret === "nextSuccessor"){
            return this.successor && this.successor.passRequest.apply(this.successor, arguments);
        }
        return ret;
    };

    // 把3个订单函数分别包装成职责链的节点
    var chainOrder500 = new Chain(order500);
    var chainOrder200 = new Chain(order200);
    var chainOrderNormal = new Chain(orderNormal);

    // 然后指定节点在职责链中的顺序
    chainOrder500.setNextSuccessor(chainOrder200);
    chainOrder200.setNextSuccessor(chainOrderNormal);

    // 最后把请求传递给第一个节点;
    chainOrder500.passRequest(1, true, 500);        // 输出: 500元定金预购, 得到100元优惠券
    chainOrder500.passRequest(2, true, 500);        // 输出: 200元定金预购, 得到50元优惠券
    chainOrder500.passRequest(3, true, 500);        // 输出: 普通购买, 无优惠券
    chainOrder500.passRequest(1, false, 0);         // 输出: 手机库存不足


```
#### 异步的职责链
在上面的职责链模式中, 我们让每个节点函数同步返回一个特定的值"nextSuccessor", 来表示是否把请求传递给下一个节点. 而在 现实开发中, 我们经常会遇到一些异步的问题, 比如我们要在节点函数中发起一个ajax异步请求, 异步请求返回的结果才能决定是否 继续在职责链中passRequest.

这时让节点函数返回"nextSuccessor"已经没有意义了, 所以要给Chain类再增加一个原型方法Chain.prototype.next, 表示手动传递 请求给职责链的下一个节点.
``` js

    Chain.prototype.next = function(){
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    };

    var fn1 = new Chain(function(){
        console.log(1);
        return "nextSuccessor";
    });

    var fn2 = new Chain(function(){
        console.log(2);
        var self = this;
        setTimeout(function(){
            self.next();
        }, 1000)
    });

    var fn3 = new Chain(function(){
        console.log(3);
    });

    fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
    fn1.passRequest();

```

现在我们得到了一个特殊的链条, 请求在链中的节点传递, 但节点有权利决定什么时候把请求交给下一个节点. 可以想像, 异步的职责链加上命令模式(把ajax请求封装成命令对象), 我们可以很方便地创建一个异步ajax队列库.


职责链模式使得程序中多了一些节点对象, 可能在某一次的请求传递过程中, 大部分节点并没有起到实质性的作用, 它们的作用仅仅 是让请求传递下去, 从性能方面考虑, 我们要避免过长的职责链带来的性能损耗.
利用JavaScript的函数式特性, 有一种更加方便的方法来创建职责链.
``` js

    Function.prototype.after = function(fn){
        var self = this;
        return function(){
            var ret = self.apply(this, arguments);
            if(ret === "nextSuccessor"){
                return fn.apply(this, arguments);
            }
            return ret;
        }
    };

    var order = order500yuan.after(order200yuan).after(orderNormal);
    order(1, true, 300);
    order(2, true, 300);
    order(3, true, 300);
    order(1, false, 300);

```

### 11. 中介者模式
中介者模式的作用就是解除对象与对象之间的紧耦合关系. 增加一个中介者对象后, 所有的相关对象都通过中介者对象来通信, 而 不是互相引用, 所以当一个对象发生改变时, 只需要通知中介者即可. 
* 中介者使用各对象之间耦合松散, 而且可以独立地改变它们之间的交互, 中介者模式使用网状的多对多关系变成了相对简单的一对多 关系. 
* 中介者模式是迎合迪米特法则的一种实现. 迪米特法则也叫最少知识原则, 是指一个对象应该尽可能少地了解另外的对象(类似不和 陌生人说话).如果对象之间的耦合性太高, 一个对象发生改变之后, 难免会影响到其他的对象, 跟"城门失火, 殃及池鱼"的道理一样. 而在中介者模式里, 对象之间几乎不知道彼此的存在, 它们只能通过中介者对象来互相影响对方.

因此, 中介者模式使各个对象之间得以解耦, 以中介者和对象之间的一对多关系取代了对象之间的网状多对多关系. 各个对象只需关注 自身功能的实现, 对象之间的交互关系交给了中介者对象来实现和维护.
不过, 中介者模式也存在一些缺点. 其中, 最大的缺点是系统中会新增一个中介者对象, 因为对象之间交互的复杂性, 转移成了中介 者对象的复杂性, 使得中介者对象经常是巨大的. 
中介者对象自身往往就是一个难以维护的对象.
``` js

    /**
     * 用JS实现一个泡泡堂游戏.
     *
     *  两队玩家对战, 当一队玩家的队员全部死亡时, 另一队玩家才算获胜!
     *
     *  player为玩家对象, playerDirector为中介者对象
     *
     */
    var playerDirector = (function(){
        var players = {}, // 保存所有玩家
                operations = {}; // 中介者可以执行的操作

        /**新增一个玩家**/
        operations.addPlayer = function(player){
            var teamColor = player.teamColor;   // 玩家队伍颜色
                players[teamColor] = players[teamColor] || [];
            players[teamColor].push(player);
        };
        /**移除一个玩家**/
        operations.removePlayer = function(player){
            var teamColor = player.teamColor,
                    teamPlayers = players[teamColor] || [];
            for(var i=teamPlayers.length - 1; i>=0; i--){
                if(teamPlayers[i] === player){
                    teamPlayers.splice(i, 1);
                }
            }
        };
        /**玩家换队**/
        operations.changeTeam = function(player, newTeamColor){
            operations.removePlayer(player);        // 从原队伍中删除
            player.teamColor = newTeamColor;        // 改变队伍颜色
            operations.addPlayer(player);           // 增加到新队伍中
        };
        /**玩家死亡**/
        operations.playerDead = function(player){
            var teamColor = player.teamColor,
                    teamPlayers = players[teamColor];
            var all_dead = true;

            for (var i= 0, player; player = teamPlayers[i++];){
                if(player.state !== 'dead'){
                    all_dead = false;
                }
            }
            if(all_dead === true){  // 全部死亡
                for(var i = 0, player; player = teamPlayers[i++];){
                    player.lose();  // 本队的所有玩家lose
                }
                for(var color in players){
                    if(color !== teamColor){
                        var teamPlayers = players[color];   //其他队伍的玩家
                        for(var i= 0, player; player = teamPlayers[i++];){
                            player.win();   // 其他队伍的玩家win.
                        }
                    }
                }
            }
        };

        var ReceiveMessage = function(){
            var message = Array.prototype.shift.call(arguments);    // arguments的第一个参数为消息名称
            operations[message].apply(this, arguments);
        };
        return {
            ReceiveMessage: ReceiveMessage
        }
    })();
    var playFactory = function(name, teamColor){
        var newPlayer = new Player(name, teamColor);    // 创造一个新的玩家对象
        playerDirector.ReceiveMessage("addPlayer", newPlayer);  // 给中介者发送消息, 新增玩家
        return newPlayer;
    };
    function Player(name, teamColor){
        this.name = name; // 角色名字
        this.teamColor = teamColor; // 队伍颜色
        this.state = 'alive';   // 玩家生存状态
    }
    Player.prototype.win = function(){
        console.log(this.name + " won ");
    };
    Player.prototype.lose = function(){
        console.log(this.name + " lost ");
    };
    Player.prototype.die = function(){
        this.state = "dead";
        playerDirector.ReceiveMessage("playerDead", this);      // 给中介者发送消息, 玩家死亡
    };
    Player.prototype.remove = function(){
        playerDirector.ReceiveMessage("removePlayer", this);    // 给中介者发送消息, 移除一个玩家
    };
    Player.prototype.changeTeam = function(color){
        playerDirector.ReceiveMessage("changeTeam", this, color);    // 给中介者发送消息, 玩家换队
    };


    // 红队
    var player1 = playFactory("皮蛋1", "red"),
            player2 = playFactory("皮蛋2", "red"),
            player3 = playFactory("皮蛋3", "red"),
            player4 = playFactory("皮蛋4", "red");

    // 蓝队
    var player5 = playFactory("小蓝1", "blue"),
            player6 = playFactory("小蓝2", "blue"),
            player7 = playFactory("小蓝3", "blue"),
            player8 = playFactory("小蓝4", "blue");

    player3.remove();
    player4.changeTeam('blue');
    player1.die();
    player2.die();

```

#### 中介者模式的例子---购买商品
假设我们正在编写一个手机购买页面, 在购买流程中, 可以选择手机的颜色以及输入购买数量, 同时页面中有两个展示区域, 分别向用户展示刚刚选择好的颜色和数量. 还有一个按钮动态显示下一步的操作, 我们需要查询该颜色手机对应的库存, 如果库存数量少于这递增购买的数量, 按钮将被禁用并且显示库存不足, 反之按钮可以点击并且显示放入购物车.
``` js

    var goods = {   //模拟手机库存
        "red|32G": 3,
        "red|16G": 0,
        "blue|32G": 1,
        "blue|16G": 6
    };
    var mediator = (function(){
        var colorSelect = document.getElementById("colorSelect"),   // 颜色选择下拉框
                memorySelect = document.getElementById("memorySelect"), // 内存选择下拉框
                numberInput = document.getElementById("numberInput"),   // 购买数量输入框
                colorInfo = document.getElementById("colorInfo"),   // 显示颜色
                memoryInfo = document.getElementById("memoryInfo"), // 显示内存
                numberInfo = document.getElementById("numberInfo"), // 显示购买数量
                nextBtn = document.getElementById("nextBtn");   // 下一步按钮
        return {
            changed: function(obj){
                var color = colorSelect.value,  // 颜色
                        memory = memorySelect.value,    // 内存
                        number = numberInput.value,    // 数量
                        stock = goods[color + "|" + memory];    // 颜色和内存对应在的手机库存数量
                if(obj === colorSelect){    // 如果改变的是选择颜色下拉框???
                    colorInfo.innerHTML = color;
                }else if(obj === memorySelect){
                    memoryInfo.innerHTML = memory;
                }else if(obj === numberInput){
                    numberInfo.innerHTML = number;
                }
                if(!color){
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = "请选择手机颜色";
                    return;
                }
                if(!memory){
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = "请选择内存大小";
                    return;
                }
                if(((number - 0) | 0 ) !== number - 0){ // 输入购买数量是否为正整数
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = "请输入正确的购买数量";
                    return;
                }
                nextBtn.disabled = false;
                nextBtn.innerHTML = "放入购物车";
            }
        }
    })();

    var colorSelect = document.getElementById("colorSelect"),   // 颜色选择下拉框
            memorySelect = document.getElementById("memorySelect"), // 内存选择下拉框
            numberInput = document.getElementById("numberInput");   // 购买数量输入框
    // 事件函数
    colorSelect.onchange = function(){
        mediator.changed(this);
    };
    memorySelect.onchange = function(){
        mediator.changed(this);
    };
    numberInput.onchange = function(){
        mediator.changed(this);
    };

```

可以想象, 某天我们又要新增一些跟需求相关的节点, 比如CPU型号, 那我们只需要稍稍改动mediator对象即可.
``` js

    var goods = {
        "red|32G|800": 3,
        "red|16G|801": 0,
        "blue|32G|800": 1,
        "blue|16G|801": 6,
    };
    var mediator = (function(){
        // 略
        var cpuSelect = document.getElementById("cpuSelect");
        var cpuInfo = document.getElementById("cpuInfo");
        return {
            changed: function(){
                // 略
                var cpu = cpuSelect.value,
                        stock = goods[color+"|"+memory+"|"+cpu];
                if(obj === cpuSelect){
                    cpuInfo.innerHTML = cpu;
                }
            }
        }
    })();

```

### 12. 装饰者模式
装饰者模式能够在不改变对象自身的基础上, 在程序运行期间给对象动态添加职责. 跟继承相比, 装饰者是一种更轻便灵活的做法, 这是一种"即用即付"的方式.

#### 用AOP装饰函数
``` js
Function.prototype.before = function(beforefn){
    var __self = this;  // 保存原函数的引用
    return function(){  // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply(this, arguments);        // 执行新函数, 且保证this不被劫持, 新函数接受的参数也会被原封不动地
                                                // 传入原函数, 新函数在原函数之前执行
        return __self.apply(this, arguments);   // 执行原函数并返回原函数的执行结果, 并且保证this不被劫持.
    }
    };
    Function.prototype.after = function(afterfn){
        var __self = this;
        return function(){
            var ret = __self.apply(this, arguments);
            afterfn.apply(this, arguments);
            return ret;
        }
    }
    
```

值得注意的是, 上面的AOP实现是在Function.prototype上添加before和after方法, 但许多人不喜欢这种污染原型的方式, 那么我们可以做一些变通, 把原函数和新函数都作为参数传入before或者after方法.

``` js  
    var before = function(fn, beforefn){
        return function(){
            beforefn.apply(this, arguments);
            return fn.apply(this, arguments);
        }
    };

    var a = before(
        function(){alert(3)};
        function(){alert(2)};
    );

    a = before(a, function(){alert(1);});
```

装饰者模式和代理模式的结构看起来非常相像.
* 代理模式和装饰者模式最重要的区别在于它们的意图和设计目的. 
  * 代理模式的目的是, 当直接访问本地不方便或不符合需要时, 为这个本体提供一个替代者. 本体定义了关键功能, 而代理提供或拒绝 对它的访问, 或者在访问本体前做一些额外的事情. 
  * 装饰者模式的作用就是为对象动态加入行为.换句话说, 代理模式强调一种关系(Proxy与它的实体之间的关系), 这种关系可以静态的 表达, 也就是, 这种关系在一开始就可以确定. 而装饰者模式用于一开始不能确定对象的全部功能时. 代理模式通常只有一层 代理-本体的引用, 而装饰者模式经常会形成一条长长的装饰链.

### 13. 状态模式
状态模式是一种非同寻常的优秀模式, 它也许是解决某些需求场景的最好方法. 虽然状态模式并不是一种简单到一目了然的模式(它 往往还会带来代码量的增加), 但你一旦明白了状态模式的精髓, 以后一定会感谢它带给你的无与伦比的好处.

状态模式的关键是区分事物内部的状态, 事物内部状态的改变往往会带来事物的行为改变.

想像这样的一个场景: 有一个电灯, 电灯上面只有一个开关. 它的表现是: 第一次按下打开弱光, 第二次按下打开强光, 第三次才是关闭电灯.
代码如下:
``` js

    /**
     * JavaScript既不支持抽象类, 也没有接口这个概念, 所以在使用状态模式的时候要格外小心, 如果我们编写一个状态子类时, 忘记
     * 了给这个状态子类实现buttonWasPressed方法, 则会在状态切换的时候抛出异常. 因为Context总是把请求委托给状态对象
     * 的buttonWasPressed方法.
     *
     * 不论怎么严格要求程序员, 也许都避免不了犯错的一天, 毕竟如果没有编译器的帮助, 只依靠程序员的自觉以及一点好运气, 是不
     * 靠谱的. 这里建议的解决方案跟"模板方法模式"中一致, 让抽象父类的抽象方法直接抛出一个异常, 这个异常至少会在程序运行
     * 期间就被发现.
     *
     * @constructor
     */
    var State = function(){};
    State.prototype.buttonWasPressed = function(){
        throw new Error("父类的buttonWasPressed方法必须被重写");
    };

    // OffLightState
    var OffLightState = function(light){
        this.light = light;
    };
    OffLightState.prototype = new State();  // 继承抽象父类
    OffLightState.prototype.buttonWasPressed = function(){
        console.log("弱光");      // offLightState对应在的行为
        this.light.setState(this.light.weakLightState); // 切换状态到weakLightState
    };

    // WeakLightState
    var WeakLightState = function(light){
        this.light = light;
    };
    WeakLightState.prototype = new State();  // 继承抽象父类
    WeakLightState.prototype.buttonWasPressed = function(){
        console.log("强光");      // weakLightState对应的行为
        this.light.setState(this.light.strongLightState);   // 切换状态到strongLightState
    };

    // StrongLightState
    var StrongLightState = function(light){
        this.light = light;
    };
    StrongLightState.prototype = new State();  // 继承抽象父类
    StrongLightState.prototype.buttonWasPressed = function(){
        console.log("超强光");          // strongLightState对应的行为---> 改为superStrongLightState
        this.light.setState(this.light.superStrongLightState);  // 切换状态到offLightState---> 改为切换状态到superStrongLightState
    };

    var Light = function(){
        this.offLightState = new OffLightState(this);
        this.weakLightState = new WeakLightState(this);
        this.strongLightState = new StrongLightState(this);
        this.superStrongLightState = new SuperStrongLightState(this);
        this.button = null;
    };
    Light.prototype.init = function(){
        var button = document.createElement("button");
        var self = this;
        this.button = document.body.appendChild(button);
        this.button.innerHTML = "开关";

        this.currState = this.offLightState;    // 设置当前状态


        // 定义用户的请求动作
        this.button.onclick = function(){
            self.currState.buttonWasPressed();
        }
    };
    Light.prototype.setState = function(newState){
        this.currState = newState;
    };

    // 当我们需要为light对象增加一种新的状态时, 只需要增加一个新的状态类, 再稍稍改变一些现有的代码即可.

    var SuperStrongLightState = function(light){
        this.light = light;
    };
    SuperStrongLightState.prototype = new State();  // 继承抽象父类
    SuperStrongLightState.prototype.buttonWasPressed = function(){
        console.log("关灯");
        this.light.setState(this.light.offLightState);
    };


    var light = new Light();
    light.init();

```

#### 另一个状态模式示例----文件上传
相对于电灯的例子, 文件上传不同的地方在于, 现在我们将面临更加复杂的条件切换关系, 在电灯的例子中, 电灯的状态是从关到开 再到关, 或者从关到弱光, 弱光到强光, 强光再到关, 看起来总是循规蹈矩的A->B->C->A, 所以即使不使用状态模式来编写电灯的程序 , 而是使用原始的if, else来控制状态切换, 我们也不至于在逻辑编写中迷失自己, 因为状态的切换总是遵循一些简单的规律.
而文件上传的状态切换就要复杂得多, 控制文件上传的流程需要两个节点按钮:
* 第一个用于暂停和继续上传
* 第二个用于删除文件.

文件在不同的状态下, 点击这两个按钮将分别发生以下行为:

文件在扫描状态中, 是不能进行任何操作的, 既不能暂停也不能删除文件, 只能等待扫描完成. 扫描完成之后, 根据文件的MD5值 判断, 若确认该文件已经存在于服务器, 则直接跳到上传完成状态. 如果该文件的大小超过了允许上传的最大值, 或者该文件已经 损坏, 则跳往上传失败状态. 剩下的情况下才进入上传中状态.
上传过程中可以点击暂停按钮来暂停上传, 暂停后点击同一个按钮会继续上传.
扫描和上传过程中, 点击删除按钮无效, 只有在暂停, 上传完成, 上传失败之后, 才能删除文件.
``` js

    // 上传是一个异步的过程, 所以控件会不停地调用JavaScript提供的一个全局函数window.external.upload来通知JavaScript目前
    // 上传进度, 控件会把当前的文件状态作为参数state塞进window.external.upload.这里没有提供一个完整的上传插件, 只是简单
    // 的利用setTimeout来模拟文件的上传进度, window.external.upload函数在此例中也只负责打印一些log.

    window.external.upload = function(state){
        console.log(state);         // 可能为: sign, uploading, done, error
    };

    var plugin = (function(){
        var plugin = document.createElement("embed");
        plugin.style.display = "none";

        plugin.type = "application/txftn-webkit";

        plugin.sign = function(){
            console.log("开始文件扫描");
        };
        plugin.pause = function(){
            console.log("暂停文件上传");
        };
        plugin.uploading = function(){
            console.log("开始文件上传");
        };
        plugin.del = function(){
            console.log("删除文件上传");
        };
        plugin.done = function(){
            console.log("文件上传完成");
        };

        document.body.appendChild(plugin);

        return plugin;
    })();

    var Upload = function(fileName){
        this.plugin = plugin;
        this.fileName = fileName;
        this.button1 = null;
        this.button2 = null;
        this.signState = new SignState(this);       // 设置初始状态为waiting
        this.uploadingState = new UploadingState(this);
        this.pauseState = new PauseState(this);
        this.doneState = new DoneState(this);
        this.errorState = new ErrorState(this);
        this.currState = this.signState;        // 设置当前状态
    };

    // 负责往页面中创建跟上传流程有关的DOM节点, 并开始绑定按钮的事件
    Upload.prototype.init = function(){
        var that = this;

        this.dom = document.createElement("div");
        this.dom.innerHTML = '<span>文件名称:'+this.fileName+'</span>' +
                '<button data-action="button1">扫描中</button>' +
                '<button data-action="button2">删除</button>';
        document.body.appendChild(this.dom);

        this.button1 = this.dom.querySelector('[data-action="button1"]');
        this.button2 = this.dom.querySelector('[data-action="button2"]');

        this.bindEvent();
    };
    Upload.prototype.bindEvent = function(){
        var self = this;
        this.button1.onclick = function(){
            self.currState.clickHandler1();
        };
        this.button2.onclick = function(){
            self.currState.clickHandler2();
        }
    };
    Upload.prototype.sign = function(){
        this.plugin.sign();
        this.currState = this.signState;
    };
    Upload.prototype.uploading = function(){
        this.button1.innerHTML = "正在上传, 点击暂停";
        this.plugin.uploading();
        this.currState = this.uploadingState;
    };
    Upload.prototype.pause = function(){
        this.button1.innerHTML = "已暂停, 点击继续上传";
        this.plugin.pause();
        this.currState = this.pauseState;
    };
    Upload.prototype.done = function(){
        this.button1.innerHTML = "上传完成";
        this.plugin.done();
        this.currState = this.doneState;
    };
    Upload.prototype.error = function(){
        this.button1.innerHTML = "上传失败";
        this.currState = this.errorState;
    };
    Upload.prototype.del = function(){
        this.plugin.del();
        this.dom.parentNode.removeChild(this.dom);
    };

    // 编写各个状态类的实现, 这里使用StateFactory, 从而避免因为JavaScript中没有抽象类所带来的问题.
    var StateFactory = (function(){
        var State = function(){};

        State.prototype.clickHandler1 = function(){
            throw new Error("子类必须重写父类的clickHandler1方法");
        };
        State.prototype.cllickHandler2 = function(){
            throw new Error("子类必须重写父类的clickHandler2方法");
        };
        return function(param){
            var F = function(uploadObj){
                this.uploadObj = uploadObj;
            };
            F.prototype = new State();
            for(var i in param){
                F.prototype[i] = param[i];
            }
            return F;
        }
    })();

    var SignState= StateFactory({
        clickHandler1: function(){
            console.log("扫描中, 点击无效...");
        },
        clickHandler2: function(){
            console.log("文件正在上传中, 不能删除");
        }
    });
    var UploadingState= StateFactory({
        clickHandler1: function(){
            this.uploadObj.pause();
        },
        clickHandler2: function(){
            console.log("文件正在上传中, 不能删除");
        }
    });
    var PauseState= StateFactory({
        clickHandler1: function(){
            this.uploadObj.uploading();
        },
        clickHandler2: function(){
            this.uploadObj.del();
        }
    });
    var DoneState= StateFactory({
        clickHandler1: function(){
            console.log("文件已完成上传, 点击无效...");
        },
        clickHandler2: function(){
            this.uploadObj.del();
        }
    });
    var ErrorState= StateFactory({
        clickHandler1: function(){
            console.log("文件上传失败, 点击无效...");
        },
        clickHandler2: function(){
            this.uploadObj.del();
        }
    });

    // 测试一下

    var uploadObj = new Upload("JavaScript设计模式与开发实践");
    uploadObj.init();

    window.external.upload = function(state){
        uploadObj[state]();
    };
    window.external.upload("sign");
    setTimeout(function(){
        window.external.upload("uploading");   // 1秒后开始上传
    }, 1000);
    setTimeout(function(){
        window.external.upload("done");         // 5秒后上传完成
    }, 5000);

```


#### 状态模式的优缺点
##### 状态模式的优点如下:
状态模式定义了状态与行为之阐的关系, 并将它们封装在一个类里. 通过增加新的状态类, 很容易增加新的状态和转换.
避免Context无限膨胀, 状态切换的逻辑被分布在状态类中, 也去掉了Context中原本过多的条件分支.
用对象代替字符串来记录当前状态, 使得状态的切换更加一目了然.
Context中请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响.
##### 状态模式的缺点:
状态模式的缺点是会在系统中定义许多状态类, 编写20个状态类是一项枯燥乏味的工作, 而且系统中会因此而增加不少对象. 另外,由于逻辑分散在状态类中, 虽然避开了不受欢迎的条件分支语句, 但也造成了逻辑分散的问题, 我们无法在一个地方就看出整个状态机的逻辑.


#### 状态模式中的性能优化点
在上面的例子中, 我们没有太多地从性能方面考虑问题, 实际上, 这里有些比较大的优化点.
* 1. 第一种是仅当state对象被需要时才创建并随后销毁
* 2. 第二种是一开妈就创建好所有的状态对象, 并且始终不销毁他们.

如果state对象比较庞大, 可以用第一种方式来节省内存,这样可以避免创建一些不会用到的对象并及时回收他们. 但如果状态的改变 很频繁, 最好一开始就把这些state对象都创建出来, 也没有必要销毁他们, 因为可能很快将再次用到他们.

#### 状态模式和策略模式的关系
策略模式和状态模式的相同点是, 它们都有一个上下文, 一些策略或者状态类, 上下文把请求委托给这些类来执行. 
它们之间的区别是: 
* 策略模式中的各个策略之间是平等又平行的, 它们之间没有任何关系, 所以客户必须熟知这些策略类的作用, 以便客户可以随时 主动切换算法;
* 而在状态模式中, 状态和状态对应的行为是早已被封装好的, 状态之间的切换也早被规定完成, "改变行为"这件事情发生在状态 模式内部. 对客户来说, 并不需要了解这些细节. 这正是状态模式的作用所在.

#### JavaScript版本的状态机
状态模式是状态机的实现之一.但在JavaScript这种"无类"语言中, 没有规定让状态对象一定要从类中创建而来. 另外一点, JavaScript可以 非常方便地使用委托技术, 并不需要事先让一个对象持有另一个对象. 
下面的状态机选择了通过Function.prototype.call方法直接把请求委托给某个字面量对象来执行. 下面改写电灯的例子, 来展示这种更加轻巧的做法:
``` js


    var Light = function(){
        this.currState = FSM.off; // 设置当前状态
        this.button = null;
    };
    Light.prototype.init = function(){
        var button = document.createElement("button"),
                self = this;
        button.innerHTML = "已关灯";
        this.button = document.body.appendChild(button);

        this.button.onclick = function(){
            self.currState.buttonWasPressed.call(self);     // 把请求委托给FSM状态机
        }
    };
    var FSM = {
        off: {
            buttonWasPressed: function(){
                console.log("关灯");
                this.button.innerHTML = "下一次按我是开灯";
                this.currState = FSM.on;
            }
        },
        on:{
            buttonWasPressed: function(){
                console.log("开灯");
                this.button.innerHTML = "下一次按我是关灯";
                this.currState = FSM.off;
            }
        }
    };
    var light = new Light();
    light.init();

```

接下来尝试另外一种方法, 即利用下面的delegate函数来完成这个状态机编写. 这是面向对象设计和闭包互换的一个例子, 前者把 变量保存为对象的属性, 而后者把变量封闭在闭包形成的环境中.
代码如下:
``` js
    var delegate = function(client, delegation){
        return {
            buttonWasPressed: function(){       // 将客户的操作委托给delegation对象
                return delegation.buttonWasPressed.apply(client, arguments);
            }
        }
    };
    var FSM = {
        off: {
            buttonWasPressed: function(){
                console.log("关灯");
                this.button.innerHTML = "下一次按我是开灯";
                this.currState = this.onState;
            }
        },
        on: {
            buttonWasPressed: function(){
                console.log("开灯");
                this.button.innerHTML = "下一次按我是关灯";
                this.currState = this.offState;
            }
        }
    };
    var Light = function(){
        this.offState = delegate(this, FSM.off);
        this.onState = delegate(this, FSM.on);
        this.currState = this.offState;
        this.button = null;
    };
    Light.prototype.init = function(){
        var button = document.createElement("button"),
                self = this;
        button.innerHTML = "已关灯";
        this.button = document.body.appendChild(button);
        this.button.onclick = function(){
            self.currState.buttonWasPressed();
        };
    };
    var light = new Light();
    light.init();
```
#### 表驱动的有限状态机
其实还有另外一种实现状态机的方法, 这种方法的核心是基于表驱动的. 
我们可以在表中很清楚地看到下一个状态是由当前状态和 行为共同决定的. 这样一来, 我们就可以在表中查找状态, 而不必定义很多条件分支! 
刚好GitHub上有一个对应的库的实现, 通过这个库, 可以很方便地创建FSM. 关于这个库的更多内容, 有兴趣的话可以前往 https://github.com/jakesgordon/javascript-state-machine 学习
``` js
    var fsm = StateMachine.create({
        initial: "off",
        events: [
            {name: 'buttonWasPressed', from: 'off', to: 'on'},
            {name: 'buttonWasPressed', from: 'on', to: 'off'}
        ],
        callbacks: {
            onbuttonWasPressed: function(event, from, to){
                        console.log(arguments);
                    }
        },
        error: function(eventName, from, to, args, errorCode, errorMessage){
            console.log(arguments);
        }
    });
    button.onclick = function(){
        fsm.buttonWasPressed();
    };
```
### 14. 适配器模式
适配器模式的作用是解决两个软件实体间的接口不兼容的问题. 使用适配器模式之后, 原本由于接口不兼容而不能工作的两个软件实 体可以一起工作.
适配器的别名是包装器(wrapper), 这是一个相对简单的模式. 在程序开发中有许多这样的场景: 
当我们试图调用模块或者对象的某个接口时, 却发现这个接口的格式并不符合目前的需求. 这时候有两种解决方法: 
第一种是修改原来的接口实现, 但如果原来的模块很复杂, 或者我们拿到的模块是一段别人编写的经过压缩的代码, 修改原接口 就显得不太现实了. 第二种办法是创建一个适配器, 将原接口转换为客户希望的另一个接口, 客户只需要和适配器打交道.

适配器模式是一对相对简单的模式. 有一些模式跟适配器模式的结构非常相似, 比如装饰者模式, 代理模式和外观模式. 
这几种模式 都属于"包装模式", 都是由于个对象来包装另一个对象, 区别它们的关键仍然是模式的意图:
* 适配器模式主要用来解决两个已有接口之间不匹配的问题, 它不考虑这些接口是怎样实现的, 也不考虑它们将来可能怎么演化. 适配器模式不需要改变已有的接口, 就能够使它们协同作用.
* 装饰者模式和代理模式也不会改变原有对象的接口, 但装饰者模式的作用是为了给对象增加功能. 装饰者模式常常形成一条长的 装饰链, 而适配器模式通常只包装一次. 代理模式是为了控制对对象的访问, 通常也只包装一次.
* 外观模式的作用倒是和适配器比较相似, 有人把外观模式看成一组对象的适配器, 但外观模式最显著的特点是定义了一个新的接口.

``` js
    var googleMap = {
        show: function(){
            console.log("开始渲染谷歌地图");
        }
    };
    var baiduMap = {
        display: function(){
            console.log("开始渲染百度地图");
        }
    };

    // 编写一个baiduMap的适配器
    var baiduMapAdapter = {
        show: function(){
            return baiduMap.display();
        }
    };

    var renderMap = function(map){
        if(map.show instanceof Function){
            map.show();
        }
    };

    renderMap(googleMap);
    renderMap(baiduMapAdapter);


```


## 设计原则和编程技巧
### 1. 单一职责原则
单一职责原则(SRP)的职责被定义为"引起变化的原因". 如果我们有两个动机去写一个方法, 那么这个方法就具有两个职责. 每个职责都是变化的一个轴线, 如果一个方法承担了过多的职责, 那么在需求的变迁过程中, 需要改写这个方法的可能性 就越大.
此时, 这外方法通常是一个不稳定的方法, 修改代码总是一件危险的事情, 特别是当两个职责耦合在一起的时候, 一个职责 发生变化可能会影响到其他职责的实现, 造成意想不到的破坏, 这种耦合性得到的是低内聚和脆弱的设计.
SRP原则在很多设计模式中都有着广泛的运用, 例如 代理模式, 迭代器模式, 单例模式和装饰者模式.

#### 何时应该分离职责
SRP原则是所有原则中最简单也是最难正确运用的原则之一.
要明确的是, 并不是所有的职责都应该一一分离.
一方面, 如果随着需求的变化 , 有两个职责总是同时变化, 那就不必分离他们. 比如在ajax请求的时候, 创建xhr对象和发 送xhr请求几乎总是在一起的, 那么创建xhr对象的职责和发送xhr请求的职责就没有必要分开.
另一方面, 职责的变化轴线仅当它们确定会发生变化时才具有意义, 即使两个职责已经被耦合在一起, 但它们还没有发生 改变的征兆, 那么也许没有必要主动分离他们, 在代码需要重构的时候再进行分离也不迟.

#### 违反SRP原则
在人的常规思维中, 总是习惯性地把一组相关的行为放到一起, 如何正确地分离职责不是一件容易的事情.
一方面, 我们受设计原则的指导, 另一方面, 我们未必要在任何时候都一成不变地遵守原则.在实际开发中, 因为种种原则 违反SRP的情况并不少见. 比如jQuery的attr等方法, 就是明显违反SRP原则的做法. jQuery的attr是个非常宠大的方法, 既 负责赋值, 又负责取值, 这对于jQuery的维护者来说, 会带来一些困难, 但对于jQuery的用户来说, 却简化了用户的使用.
在方便性与稳定性之间有一些取舍. 具体是选择方便性还是稳定性, 并没有标准答案, 而是要取决于具体的应用环境.

#### SRP原则的优缺点
SRP原则的优点是降低了单个类或者对象的复杂度, 按照职责把对象分解成更小的粒度, 这有助于代码的复用, 也有利于进 行单元测试. 当一个职责需要变更的时候, 不会影响到其他的职责.
但SRP原则也有一些缺点, 最明显的是会增加编写代码的复杂度. 当我们按照职责把对象分解成更小的粒度之后, 实际上也 增大了这些对象之间相互联系的难度.

### 2. 最少知识原则
最少知识原则(LKP)说的是一个软件实体应当尽可能少地与其他实体发生相互作用. 这里的软件实体是一个广义的概念, 不仅 包括对象, 还包括系统, 类, 模块, 函数, 变量等.

#### 减少对象之间的联系
单一职责原则指导我们把对象划分成较小的粒度, 这可能提高对象的可复用性. 但越来越多的对象之间可能会产生错综复杂 的联系, 如果修改了其中一个对象, 很可能会影响到跟它相互引用的其他对象. 对象和对象耦合在一起, 有可能会降低它们 的可复用性.
最少知识原则要求我们在设计程序时, 应当尽量减少对象之间的交互. 如果两个对象之间不必彼此直接通信, 那么这两个对象 就不要发生直接的相互联系. 常见的做法是引入一个第三者对象, 来承担这些对象之间的通信作用. 如果一些对象需要向另 一些对象发起请求, 可以通过第三者对象来转发这些请求.
最少知识原则在设计模式中体现得最多的地方是中介者模式和外观模式.

#### 封装在最少知识原则中的体现
封装在很大程度上表达的是数据的隐藏. 一个模块或者对象可以将内部的数据或者实现细节隐藏起来, 只暴露必要的接 口API供外界访问, 对象之间难免产生联系, 当一个对象必须引用另外一个对象的时候, 我们可以让对象只暴露必要的接口, 让对象之间的联系限制在最小的范围之内.
同时, 封装也用来限制变量的作用域. 在JavaScript中对变量作用域的规定是:
* 变量在全局声明, 或者在代码的任何位置隐式声明(不用var), 则该变量在全局可见.
* 变量在函数内显式申明(使用var), 则在函数内可见.
把变量的可见性限制在一个尽可能小的范围内, 这个变量对其他不相关模块的影响就越小, 变量被改写和发生冲突的机会也 越小. 这也是广义的最少知识原则的一种体现.

### 3. 开放-封闭原则
#### 开放-封闭原则的思想: 
当需要改变一个程序的功能或者给这个程序增加新功能的时候, 可以使用增加代码的方式, 但是不允许改动程序的源代码.

#### 找出变化的地方
开放-封闭原则是一个看起来比较虚幻的原则,并没有实际的模板教导我们怎样亦步亦趋地实现它.但我们还是能找到一些让 程序尽量遵守开放-封闭原则的规律, 最明显的就是找出程序中将要发生变化的地方, 然后把变化封装起来.
通过封装变化的方式, 可以把系统中稳定不变的部份和容易变化的部分隔离开来. 在系统的演变过程中, 我们只需要替换那些 容易变化的部分, 如果这些部分是已经封装好的, 那么替换起来也相对容易. 而变化部分之外的就是稳定的部分. 在系统的 演变过程中, 稳定的部分是不需要改变的.

#### 用对象的多态性消除条件分支
过多的条件分支语句是造成程序违反开放-封闭原则的一个常见原因. 每当需要增加一个新的if语句时, 都要被迫改动原函数. 把if换成switch-case是没有用的, 这是一种换汤不换药的做法. 实际上, 每当我们看到一大片的if或者switch-case语句时, 第一时间就应该考虑, 能否利用对象的多态性来重构它们.
利用对象的多态性来让程序遵守开放-封闭原则, 是一个常用的技巧.

#### 放置挂钩
放置挂钩也是分离变化的一种方式. 我们在程序有可能发生变化的地方放置一个挂钩, 挂钩的返回结果决定了程序的下一步 走向. 这样一来, 原本的代码执行路径上就出现了一个分叉路口, 程序未来的执行方向被预埋下多种可能性.
由于子类的数量是无限制的, 总会有一些"个性化"的子类迫使我们不得已不去改变已经封装好的算法骨架. 于是我们可以在 父类中的某个容易变化的地方放置挂钩, 挂钩的返回结果由具体的子类决定. 这样一来, 程序就拥有了变化的可能.

#### 使用回调函数
在JavaScript中, 函数可以作为参数传递给另外一个参数, 这是高阶函数的意义之一. 在这种情况下, 我们通常会把这个函数 称为回调函数. 在JavaScript版本的设计模式中, 策略模式和命令模式等都可以用回调函数轻松实现.
回调函数是一种特殊的挂钩. 我们可以把一部份易一起变化的逻辑封装在回调函数里, 然后把回调函数当作参数传入一个稳定 和封闭的函数中. 当回调函数被执行的时候, 程序就可以因为回调函数的内部逻辑不同, 而产生不同的结果.
比如, 我们通过ajax异步请求用户信息之后要做一些事情, 请求用户信息的过程是不变的, 而获陬到用户信息之后要做什么 事情, 则是可能变化的.

#### 设计模式中的开放-封闭原则
##### 发布-订阅模式
发布-订阅模式用来降低多个对象之间的依赖关系, 它可以取代对象之间硬编码的通知机制, 一个对象不用再显式 地调用另外一个对象的某个接口. 当有新的订阅者出现的, 发布者的代码不需要进行任何修改. 同样当发布者需要 改变时, 也不会影响到之前的订阅者.

##### 模板方法模式
模板方法模式是一种典型的通过封装变化来提高系统扩展性的设计模式. 在一个运用了模板方法模式的程序中, 子 类的方法种类和执行顺序都是不变的, 所以我们把这部分逻辑抽出来放到父类的模板方法里面;而子类的方法具体 怎么实现则是可变的, 于是把这部份变化的逻辑封装到子类中. 通过增加新的子类, 便能给系统增加新的功能, 并不 需要改动抽象父类以及其他的子类, 这也是符合开放-封闭原则的.

##### 策略模式
策略模式和模板方法模式是一对竞争者. 在大多数情况下, 它们可以相互替换作用. 模板方法模式基于继承的思想, 而策略模式则偏重于组合和委托.
策略模式将各种算法都封装成单独的策略类, 这些策略类可以被交换使用. 策略和使用策略的客户代码可以分别独立 进行修改而互不影响. 我们增加一个新的策略类也非常方便, 完全不用修改之前的代码.

##### 代理模式
预加载图片的功能和给图片设置src的功能被隔离在两个函数里, 它们可以单独改变而互不影响.

##### 职责链模式

#### 开放-封闭原则的相对性
让程序保持完全封闭是不容易做到的. 就算技术上做得到, 也需要花费太多的时阐和精力. 而且让程序符合开放-封闭原则 的代价是引入更多的抽象层次, 更多的抽象有可能会增大代码的复杂度.
更何况, 有一些代码是无论如何也不能完全封闭的, 总会存在一些无法对其封闭的变化. 作为程序员, 我们可以做到以下丙点:
* 挑选出最容易发生变化的地方, 然后构造抽象来封闭这些变化. 
* 在不可避免发生修改的时候, 尽量修改那些相对容易修改的地方. 拿一个开源库来说, 修改它提供的配置文件, 总比修改 它的源代码来得简单.

### 接口和面向接口编程
我们经常说一个库或者模块对外提供了某某API接口. 通过主动暴露的接口来通信, 可以隐藏软件系统内部的工作细节. 这也是我们最 熟悉的第一种接口含义.
第二种接口是一些语言提供的关键字, 比如Java的interface. interface关键字可以产生一个完全抽象的类. 这个完全抽象的类用来 表示一种契约, 专门负责建立类与类之间的联系.
第三种接口即是我们谈论的"面向接口编程"中的接口, 接口的含义在这里体现得更为抽象. 用"设计模式"中的话说就是:
  接口是对象能响应的请求的集合

### 代码重构
模式与重构之间有着一种与生俱来的关系. 从某种角度来看, 设计模式的目的就是为许多重构行为提供目标.

#### 1) 提炼函数
如果一个函数过长, 不得不加上若干注释才能让这个函数显得易读一些, 那这些函数就很有必要进行重构.
如果在函数中有一段代码可以被独立出来, 那我们最好把这些代码放进另外一个独立的函数中. 这是一种很常见的优化工作, 这 样做的好处有以下几点:
* 避免出现超大函数.
* 独立出来的函数有助于代码复用.
* 独立出来的函数更容易被覆写.
* 独立出来的函数如果拥有一个良好的命名, 它本身就起到了注释的作用.
#### 2) 合并重复的条件片段
如果一个函数体内有些条件分支语句, 而这些条件分支语句内部散布了一些重复的代码, 那么就有必要进行合并去重工作.

#### 3) 把条件分支语句提炼成函数
在程序设计中, 复杂的条件分支语句是导致程序难以阅读的重要原因, 而且容易导致一个宠大的函数. 这里应该考虑将条件 分支语句提炼成函数了.

#### 4) 合理使用循环
在函数体内, 有些代码实际上负责的是一些重复性的工作, 那么合理利用循环不仅可以完成同样的功能, 还可以使代码量更少.

#### 5) 提前让函数退出代替嵌套条件分支
嵌套的条件分支语句是代码维护者的噩梦, 对于阅读代码的人来说, 嵌套的if, else语句相比平铺的if, else, 在阅读和理解 上更加困难. 有一个常见的技巧, 即在面对一个嵌套的if分支时, 我们可以把外层if表达式进行反转. 重构后的del函数如下:
``` js
var del = function(obj){
    if(obj.isReadOnly){
        return;
    }
    if(obj.isFolder){
        return deleteFolder(obj);
    }
    if(obj.isFile){
        return deleteFile(obj);
    }
};
```  
#### 6) 传递对象参数代替过长的参数列表
有时一个函数有可能接收多个参数, 而参数的数量越多, 函数就越难理解和使用. 使用该函数的人首先得明白全部参数的含义, 在使用的时候, 还要小心翼翼, 以免少传了某个参数或者把两个参数搞反了位置. 
这时我们可以考虑把参数放入一个对象内, 然后把该对象传入到函数内, 函数需要的数据可以自行从该对象里获取, 不用再 关心参数的数量和顺序, 只要保证参数对应的key值不变就可以了.

#### 7) 尽量减少参数数量
#### 8) 少用三目运算符
有一些程序员喜欢大规模地使用三目运算符, 来代替传统的if, else, 理由是三目运算符性能高, 代码量少. 不过, 这两个理由 其实都很难站得住脚.
相比损失的代码可读性和可维护性, 三目运算符节省的代码量可以忽略不计. 让JS文件加载更快的办法有很多种, 如压缩, 缓存, 使用CDN和分域名等. 把注意力只放在使用三目运算符节省的字符数量上, 无异于一个300斤重的人把超重的原因归罪于头皮屑.

#### 9) 合理使用链式调用
经常使用jQuery的程序员相当习惯链式调用方法, 在JavaScript中, 可以很容易地实现方法的链式调用, 即让方法调用结束后 返回对象自身.
使用链式调用的方式并不会造成太多阅读上的困难, 也确实能省下一些字符和中间变量, 但节省下来的字符数量同样是微不足道 的. 链式调用带来的坏处就是在调用的时候非常不方便, 如果我们知道一条链中有错误出现, 必须得先把这条链拆开才能加上 一些调试log或者增加断点, 这样才能定位错误出现的地方.
如果该链条的结构相对稳定, 后期不易发生修改, 那么使用链式调用无可厚非. 但如果该链条很容易发生变化, 导致调试和 维护困难, 那么还是建议使用普通调用的形式.

#### 10) 分解大型类
#### 11) 用return退出多重循环
函数中有多重循环语句时,当达到某个临界条件时, 可以使用return退出多重循环.
当然用return直接退出方法会带来一个问题, 如果在循环之后还有一些将被执行的代码呢? 为了解决这个问题, 我们可以把循环后面的代码放到return后面, 如果代码比较多, 就应该把它提炼成一个单独的函数.
