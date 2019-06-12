# CSS基础
::: tip
CSS全称为“层叠样式表 (Cascading Style Sheets)”，它主要是用于定义HTML内容在浏览器内的显示样式，如文字大小、颜色、字体加粗等。
:::

## 选择器
### 常用选择器
> 这里只列出了一些常用选择器
* id 选择器, e.g: #id {color: red;}
* 元素选择器, e.g: span {color: red;}
* 类选择器, e.g: .class {color: red;}
* 子选择器, e.g: ul > li {color: red;}
* 后代选择器, e.g: ul li {color: red;}
* 伪类选择器, e.g: a:hover{color: red;}
* 分组选择器 , e.g: h2, h3 {color: red;}
* 属性选择器, e.g: input[type='text'] {color: red;}
* 相邻选择器，e.g: p + span {color: red;}
* 兄弟选择器，e.g: p ~ span {color:red;}

## CSS的一些特性
### 1. 继承性
  CSS的某些样式是具有继承性的，什么是继承呢？继承是一种规则，它允许样式不仅应用于某个特定html标签元素，而且应用于其后代。比如下面代码：如某种颜色应用于p标签，这个颜色设置不仅应用p标签，还应用于p标签中的所有子元素文本，这里子元素为span标签。
```
p{color:red;}

<p>六年级的时候，我还是一个<span>漂亮的</span>小帅哥。</p>
```
但需要注意的是, 有些CSS样式是不具有继承性的, 如border: 1px solid #fff;
::: tip 
不具体继承性的CSS样式, 也可以实现继承, 如: border: inherit;
:::

### 2. 特殊性
有时在写CSS样式代码时, 给某一个元素写了多个样式, 那么哪个样式会生效呢? 相信这个问题是很多CSS样式初学者易困惑的.
比如, 
```
p{color:red;}
.six{color:green;}
<p class='six'>六年级的时候，我还是一个<span>漂亮的</span>小帅哥。</p>
```
p和.six都匹配到了p这个标签上，那么会显示哪种颜色呢？green是正确的颜色，那么为什么呢？是因为浏览器是根据权值来判断使用哪种css样式的，权值高的就使用哪种css样式。
#### 权值规则如下:
* 元素的权值为1
* 类选择符的权值为10
* ID选择符的权值最高为100
::: tip
还有一个权值比较特殊--继承也有权值但很低，有的文献提出它只有0.1，所以可以理解为继承的权值最低。
:::
#### 计算权重
从0开始，一个行内样式+1000，一个id+100，一个属性选择器/class或者伪类+10，一个元素名，或者伪元素+1.
```less
body #content .data img:hover
// body: 1    
// #content: 100
// .data:10
// img:1
// :hover: 10     
```
最终的权重值是122

#### 权重计算公式
```text
*{}                         ====》0
 li{}                       ====》1(一个元素)
 li:first-line{}            ====》2(一个元素，一个伪元素)
ul li {}                    ====》2（两个元素）
ul ol+li{}                  ====》3（三个元素）
h1+ *[rel=up] {}            ====》11（一个属性选择器，一个元素）
ul ol li.red{}              ====》13（一个类，三个元素）
li.red.level{}              ====》21（两个类，一个元素）
style=""                    ====》1000(一个行内样式)
p {}                        ====》1（一个元素）
div p {}                    ====》2（两个元素）
sith {}                     ====》10（一个类）
div p.sith{}                ====》12（一个类，两个元素）
#sith{}                     ====》100（一个ID选择器）
body #darkside .sith p {}   ====》112(1+100+10+1,一个Id选择器，一个类，两个元素)
```
#### 权重基本规则
* 相同的权重：以后面出现的选择器为最后规则
* 不同的权重，权重值高则生效

### 4. 层叠性
层叠就是在html文件中对于同一个元素可以有多个css样式存在，当有相同权重的样式存在时，会根据这些css样式的前后顺序来决定，处于最后面的css样式会被应用。
如下面代码:
```css
p{color:red;}
p{color:green;}
<p class='six'>六年级的时候，我还是一个<span>漂亮的</span>小帅哥。</p>
```

最后 p 中的文本会设置为green，这个层叠很好理解，理解为后面的样式会覆盖前面的样式。
所以前面的css样式优先级就不难理解了：
#### 层叠规则如下
内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。

### 5. 重要性
在做网页代码的时，有些特殊的情况需要为某些样式设置具有最高权值，怎么办？这时候我们可以使用!important来解决。
```css
p {color:red !important;}
p {color:green;}

<p class='six'>六年级的时候，我还是一个<span>漂亮的</span>小帅哥。</p>
```
这时 p 段落中的文本会显示的red红色。
::: warning
!important要写在分号的前面
:::

**`!important` 优先级样式是个例外，权值高于用户自己设置的样式**

## 盒子模型
在CSS中，html中的标签元素大体被分为三种不同的类型：块状元素、行内元素和行内块元素。
### 元素分类 
#### 1. 块元素(display: block;)
常见的块元素有:
```
<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>
```

##### 块元素的特点：
* 每个块级元素都从新的一行开始，并且其后的元素也另起一行。
* 元素的高度、宽度、行高以及顶和底边距都可设置。
* 元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。

#### 2. 行内元素(display: inline;)
常见的行内元素:
```
<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>
```
##### 行内元素的特点：
* 和其他元素都在一行上；
* 元素的高度、宽度及顶部和底部边距均不可设置；
* 元素的宽度即它所包含的文字或图片的宽度，不可改变。

#### 3. 行内块元素(display: inline-block;)
行内块元素同时具备块元素和行内元素的特点(css2.1新增)
常见的行内块元素:
```
<img>、<input>
```

inline-block 元素特点：
* 和其他元素都在一行上。
* 元素的高度、宽度、行高以及顶和底边距都可设置。

### 盒子模型
一个盒子中主要的属性有5个:
* widtht：内容的宽度不是盒子的宽度)
* height: 内容的高度(不是盒子的高度)
* padding：内边距。
* border：边框。
* margin：外边距。

盒子模型的示意图：
![image.png](/images/9890665-375d9596b0bdf2e1.png)

#### 标准盒子模型和IE盒子模型
**标准盒子模型**
![image.png](/images/9890665-a571991af3d4e3b4.png)
标准盒子模型包含: margin, padding, border, content, 注意: content不包含border, padding

**IE盒子模型**
![image.png](/images/9890665-74991a8c06dabdba.png)

IE盒子模型包含: margin, padding, border, content, 注意: content包含border, padding

由此, 可以看出,标准盒子模型和IE盒子模型的主要区别在于: content是否包含border, padding

#### 两种模型间切换
```css
  box-sizing: content-box;  // 标准盒子模型
  box-sizing: border-box;  // IE盒子模型
```
## CSS布局模型
布局模型与盒模型一样都是 CSS 最基本、 最核心的概念。

 **CSS包含3种基本的布局模型:**
* 流动布局模型(flow)
* 浮动布局模型(float)
* 层布局模型(layer)

### 流动布局模型(flow)
流动布局模型（Flow）是默认的网页布局模式, 即网页在默认状态下的 HTML 网页元素都是根据流动模型来分布网页内容的。

流动布局模型具有两个特点：
* 块状元素都会在所处的包含元素内自上而下按顺序垂直延伸分布，因为在默认状态下，块状元素的宽度都为100%。实际上，块状元素都会以行的形式占据位置。
* 行内元素都会在所处的包含元素内从左到右水平分布显示。

因此, 在块元素的默认position值为static
![image.png](/images/9890665-5b5b91f1896dc726.png)

### 浮动布局模型(float)
任何元素在默认情况下是不浮动的，但可以用 CSS 定义为浮动，如 div、p、table、img 等元素都可以被定义为浮动。如下代码可以实现两个 div 元素一行显示。
```
div{ width:200px; height:200px; border:2px red solid; float:left;}

<div id="box1"></div>
<div id="box2"></div>
```
效果图: 
![image.png](/images/9890665-87551d0bf3b3a2a1.png)

> 注意: 
  浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响内联元素布局。此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式
#### 清除浮动
##### 为什么要清除浮动?
当包含浮动元素的块元素的高度小于浮动元素的时候，此时就会出现“高度塌陷”。此时即需要清除浮动。下面的例子即展示何为塌陷。

以下是最初的图片样式，未设置浮动。蓝框是写了一个.container类作为包含框。包含三张图片。
```
<div class="pic-box">  
    <div class="container">  
        <img class="pic-1" src="images/system_correct.jpg">  
        <img class="pic-2" src="images/system_practice.jpg">  
        <img class="pic-3" src="images/system_learn.jpg">  
    </div>  
</div> 
```
![image.png](/images/9890665-7e1da8979b889245.png)

要看到塌陷效果很简单。如上面所说，img3的宽高都大于前两张图。因此, 假如把img3设为 float：left；那么此时img3就会脱离原来的文档流。现在来看看给img3设左浮动后的效果
![image.png](/images/9890665-abe756ebe19c89d3.png)

可以看到`<img3>`成功脱离了 .container 类，即脱离了文档流, 产生了"塌陷"。
##### 清除浮动
 清除浮动的方法常用的有3种:
**1. 使用overflow属性来清除浮动**
```
.ovh{　　　　　　
    overflow:hidden;
  }

<div class="pic-box">  
    <div class="container ovh">  
        <img class="pic-1" src="images/system_correct.jpg">  
        <img class="pic-2" src="images/system_practice.jpg">  
        <img class="pic-3" src="images/system_learn.jpg">  
    </div>  
</div> 
```
::: warning 缺点
  会将超出部分隐藏, 在某些时候我们想清除浮动并且保留超出部分
:::

**2. 额外标签法**
```
.clear{
  clear:both;
}

<div class="pic-box">  
    <div class="container">  
        <img class="pic-1" src="images/system_correct.jpg">  
        <img class="pic-2" src="images/system_practice.jpg">  
        <img class="pic-3" src="images/system_learn.jpg">  
        <div class='clear'></div>
    </div>  
</div> 
```
**缺点:** 
   会增加许多不必要的标签,

**3. 伪元素来清除浮动**

我常用也是目前最主流的方法。即用 after伪元素清除浮动。
```
.clearfix:after{  
            display: block;  
            content:'';  
            clear: both;  
            height:0;  
        }  
```

修改之前的代码如下:
```
<div class="pic-box">  
    <div class="container clearfix">  
        <img class="pic-1" src="images/system_correct.jpg">  
        <img class="pic-2" src="images/system_practice.jpg">  
        <img class="pic-3" src="images/system_learn.jpg">  
    </div>  
</div> 
```
效果如下:
![image.png](/images/9890665-8d12fcaea9630f60.png)

此时, 我们已经将`<img3>`放回文档流。且不会影响后续块级元素的布局。

### 层布局模型(layer)
什么是层布局模型？层布局模型PhotoShop中的图层编辑功能一样，每个图层能够精确定位操作.。
如何让html元素在网页中精确定位，就像图像软件PhotoShop中的图层一样可以对每个图层能够精确定位操作。CSS定义了一组定位（positioning）属性来支持层布局模型。

**层模型有3种形式：**
* 相对定位(position: relative)
* 绝对定位(position: absolute)
* 固定定位(position: fixed)

#### 1. 相对定位(position: relative)
如果想为元素设置层模型中的相对定位，需要设置`position:relative`（相对定位），它通过left、right、top、bottom属性确定元素在正常文档流中的偏移位置。相对定位完成的过程是首先按static(float)方式生成一个元素(并且元素像层一样浮动了起来)，然后相对于以前的位置移动，移动的方向和幅度由left、right、top、bottom属性确定，偏移前的位置保留不动。

什么叫做“偏移前的位置保留不动”呢？
下面通过做一个实验来说明一下:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .demo1{
            position: relative;
            left: 100px;
            top: 300px;
            z-index: 99;
            height: 200px;
            width: 200px;
            background-color: #1ABC9C;
        }
    </style>
</head>
<body>
<div class="demo1">
    <span>六年级的时候，我还是一个漂亮的小帅哥。</span>
    <span>六年级的时候，我还是一个漂亮的小帅哥。</span>
    <span>六年级的时候，我还是一个漂亮的小帅哥。</span>
</div>
<div class='hello-world'>
    <h2>hello world</h2>
</div>
</body>
</html>
```
效果图下如下:

![image.png](/images/9890665-500176972041964c.png)

从效果图中可以明显的看出，虽然`div.demo1`元素相对于以前的位置产生了偏移，但是`div.demo1`元素以前的位置还是保留着，所以后面的`div.hello-world`元素是显示在了div元素以前位置的后面。

此时可以发现, body的高度等于 `div.demo1`元素的高度 加上 `div.hello-world`元素的高度 之和.
![image.png](/images/9890665-b045c7b84af12c6a.png)


#### 2. 绝对定位(position: absolute)
如果想为元素设置层模型中的绝对定位，需要设置`position:absolute`(绝对定位)，这条语句的作用将元素从文档流中拖出来，然后使用left、right、top、bottom属性 **相对于其最接近的一个具有定位属性的父包含块进行绝对定位。如果不存在这样的包含块，则相对于body元素**，即相对于浏览器窗口。

修改上例(相对定位的示例代码)中的代码, 将`demo1`属性position修改为: absolute后,
```
 <style>
        .demo1{
            position: relative;
            left: 100px;
            top: 300px;
            z-index: 99;
            height: 200px;
            width: 200px;
            background-color: #1ABC9C;
        }
    </style>
```
 效果如下:
![image.png](/images/9890665-2c5638d49c96ab55.png)

此时发现, body的高度, 即等于`div.hello-world`元素的高度
![image.png](/images/9890665-95c86450d50a20a3.png)


相对定位与绝对定位的区别:
relative 和 absolute的区别就在于, 以前的位置是否保留.

#### 3. 固定定位(position: fixed)
fixed：表示固定定位，与absolute定位类型类似，但它的相对移动的坐标是视图（屏幕内的网页窗口）本身。由于视图本身是固定的，它不会随浏览器窗口的滚动条滚动而变化，除非你在屏幕中移动浏览器窗口的屏幕位置，或改变浏览器窗口的显示大小，因此固定定位的元素会始终位于浏览器窗口内视图的某个位置，不会受文档流动影响。

#### 思考
###### (1). 纯CSS如何实现多级折叠菜单
最终实现效果类似于:
![image.png](/images/9890665-5f1cf84715f8e2e5.png)

> 提示: 
可以运用checkbox的checked值来判断下级栏目是否展开，CSS3的选择器中提供了:checked 这个伪类，当元素拥有checked这个值的时候就特定的CSS。

###### (2). 底部固定
如何设置底部固定，就是不管浏览器界面大小总是固定在底部
如百度首页效果:
![image.png](/images/9890665-9c8b835c46e55dc0.png)

## 媒体查询
使用 @media 查询，你可以针对不同的媒体类型定义不同的样式。
@media 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，@media 是非常有用的。
当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。
![image.png](/images/9890665-6a2ba3a179887f9b.png)

示例代码:
```
// 如果文档宽度小于 300 像素则修改背景颜色(background-color):
@media only screen and (max-width: 500px) {
    .gridmenu {
        width:100%;
    }
    .gridmain {
        width:100%;
    }
    .gridright {
        width:100%;
    }
}
```














## CSS书写规范
大部分前端都没有按照良好的CSS书写规范来写CSS代码，这样会影响代码的阅读体验，这里参考了国外一些文章以及我的个人经验总结出的CSS书写规范。
### CSS书写顺序
* 1.位置属性(position, top, right, z-index, display, float等)
* 2.大小(width, height, padding, margin)
* 3.文字系列(font, line-height, letter-spacing, color- text-align等)
* 4.背景(background, border等)
* 5.其他(animation, transition等)

![image.png](/images/9890665-9f6a746368bb7ac5.png)

### CSS书写规范
CSS有些属性是可以缩写的，比如padding,margin,font等等，这样精简代码同时又能提高用户的阅读体验。

![image.png](/images/9890665-73a60e11ca7e7773.png)


去掉小数点前的“0”

![image.png](/images/9890665-bffd1078e1ad9f30.png)

#### 简写命名
很多用户都喜欢简写类名，但前提是要让人看懂你的命名才能简写！
![image.png](/images/9890665-87ce89aa53594395.png)

#### 连字符CSS选择器命名规范
1.长名称或词组可以使用中横线来为选择器命名。
2.不建议使用“_”下划线来命名CSS选择器，为什么呢？
* 输入的时候少按一个shift键；
* 浏览器兼容问题 （比如使用_tips的选择器命名，在IE6是无效的）
* 能良好区分JavaScript变量命名（JS变量命名是用“_”）
![image.png](/images/9890665-23b2ab8b5f526e63.png)

#### 不要随意使用id
id在JavaScript中是唯一的，不能多次使用，而使用class类选择器却可以重复使用，另外id的优先级优先与class，所以id应该按需使用，而不能滥用。
![image.png](/images/9890665-3ed97cce362660a2.png)

#### 为选择器添加状态前缀
![image.png](/images/9890665-644a40909e828aa4.png)

#### 媒体查询（Media query）的位置
将媒体查询放在尽可能相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部。如果把他们分开了，将来只会被大家遗忘。

### 注意事项:
* 一律小写;
* 尽量用英文;
* 尽量不缩写，除非一看就明白的单词。

## 后记
做为一个前端开发人员, 编写页面的HTML&CSS代码要符合W3C规范, 最简单的判断标准即: 剥离所有的样式后, 还能够较好的呈现页面内容


## 相关资料链接:
* [w3cSchool]( https://www.w3cschool.cn/xuexiw3c/w3c-tutorial.html)
* [CSS参考手册l]( http://www.w3school.com.cn/cssref/)
* [CSS3媒体查询](http://www.runoob.com/cssref/css3-pr-mediaquery.html)