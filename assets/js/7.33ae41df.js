(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{192:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"css基础"}},[t._v("CSS基础")]),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",[t._v("CSS全称为“层叠样式表 (Cascading Style Sheets)”，它主要是用于定义HTML内容在浏览器内的显示样式，如文字大小、颜色、字体加粗等。")])]),t._v(" "),a("h2",{attrs:{id:"选择器"}},[t._v("选择器")]),t._v(" "),a("h3",{attrs:{id:"常用选择器"}},[t._v("常用选择器")]),t._v(" "),a("blockquote",[a("p",[t._v("这里只列出了一些常用选择器")])]),t._v(" "),a("ul",[a("li",[t._v("id 选择器, e.g: #id {color: red;}")]),t._v(" "),a("li",[t._v("元素选择器, e.g: span {color: red;}")]),t._v(" "),a("li",[t._v("类选择器, e.g: .class {color: red;}")]),t._v(" "),a("li",[t._v("子选择器, e.g: ul > li {color: red;}")]),t._v(" "),a("li",[t._v("后代选择器, e.g: ul li {color: red;}")]),t._v(" "),a("li",[t._v("伪类选择器, e.g: a:hover{color: red;}")]),t._v(" "),a("li",[t._v("分组选择器 , e.g: h2, h3 {color: red;}")]),t._v(" "),a("li",[t._v("属性选择器, e.g: input[type='text'] {color: red;}")]),t._v(" "),a("li",[t._v("相邻选择器，e.g: p + span {color: red;}")]),t._v(" "),a("li",[t._v("兄弟选择器，e.g: p ~ span {color:red;}")])]),t._v(" "),a("h2",{attrs:{id:"css的一些特性"}},[t._v("CSS的一些特性")]),t._v(" "),a("h3",{attrs:{id:"_1-继承性"}},[t._v("1. 继承性")]),t._v(" "),a("p",[t._v("CSS的某些样式是具有继承性的，什么是继承呢？继承是一种规则，它允许样式不仅应用于某个特定html标签元素，而且应用于其后代。比如下面代码：如某种颜色应用于p标签，这个颜色设置不仅应用p标签，还应用于p标签中的所有子元素文本，这里子元素为span标签。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("p{color:red;}\n\n<p>六年级的时候，我还是一个<span>漂亮的</span>小帅哥。</p>\n")])])]),a("p",[t._v("但需要注意的是, 有些CSS样式是不具有继承性的, 如border: 1px solid #fff;")]),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",[t._v("不具体继承性的CSS样式, 也可以实现继承, 如: border: inherit;")])]),t._v(" "),a("h3",{attrs:{id:"_2-特殊性"}},[t._v("2. 特殊性")]),t._v(" "),a("p",[t._v("有时在写CSS样式代码时, 给某一个元素写了多个样式, 那么哪个样式会生效呢? 相信这个问题是很多CSS样式初学者易困惑的.\n比如,")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("p{color:red;}\n.six{color:green;}\n<p class='six'>六年级的时候，我还是一个<span>漂亮的</span>小帅哥。</p>\n")])])]),a("p",[t._v("p和.six都匹配到了p这个标签上，那么会显示哪种颜色呢？green是正确的颜色，那么为什么呢？是因为浏览器是根据权值来判断使用哪种css样式的，权值高的就使用哪种css样式。")]),t._v(" "),a("h4",{attrs:{id:"权值规则如下"}},[t._v("权值规则如下:")]),t._v(" "),a("ul",[a("li",[t._v("元素的权值为1")]),t._v(" "),a("li",[t._v("类选择符的权值为10")]),t._v(" "),a("li",[t._v("ID选择符的权值最高为100")])]),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",[t._v("还有一个权值比较特殊--继承也有权值但很低，有的文献提出它只有0.1，所以可以理解为继承的权值最低。")])]),t._v(" "),a("h4",{attrs:{id:"计算权重"}},[t._v("计算权重")]),t._v(" "),a("p",[t._v("从0开始，一个行内样式+1000，一个id+100，一个属性选择器/class或者伪类+10，一个元素名，或者伪元素+1.")]),t._v(" "),a("div",{staticClass:"language-less extra-class"},[a("pre",{pre:!0,attrs:{class:"language-less"}},[a("code",[t._v("body #content .data "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("img")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("hover\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// body: 1    ")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// #content: 100")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .data:10")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// img:1")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// :hover: 10     ")]),t._v("\n")])])]),a("p",[t._v("最终的权重值是122")]),t._v(" "),a("h4",{attrs:{id:"权重计算公式"}},[t._v("权重计算公式")]),t._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('*{}                         ====》0\n li{}                       ====》1(一个元素)\n li:first-line{}            ====》2(一个元素，一个伪元素)\nul li {}                    ====》2（两个元素）\nul ol+li{}                  ====》3（三个元素）\nh1+ *[rel=up] {}            ====》11（一个属性选择器，一个元素）\nul ol li.red{}              ====》13（一个类，三个元素）\nli.red.level{}              ====》21（两个类，一个元素）\nstyle=""                    ====》1000(一个行内样式)\np {}                        ====》1（一个元素）\ndiv p {}                    ====》2（两个元素）\nsith {}                     ====》10（一个类）\ndiv p.sith{}                ====》12（一个类，两个元素）\n#sith{}                     ====》100（一个ID选择器）\nbody #darkside .sith p {}   ====》112(1+100+10+1,一个Id选择器，一个类，两个元素)\n')])])]),a("h4",{attrs:{id:"权重基本规则"}},[t._v("权重基本规则")]),t._v(" "),a("ul",[a("li",[t._v("相同的权重：以后面出现的选择器为最后规则")]),t._v(" "),a("li",[t._v("不同的权重，权重值高则生效")])]),t._v(" "),a("h3",{attrs:{id:"_4-层叠性"}},[t._v("4. 层叠性")]),t._v(" "),a("p",[t._v("层叠就是在html文件中对于同一个元素可以有多个css样式存在，当有相同权重的样式存在时，会根据这些css样式的前后顺序来决定，处于最后面的css样式会被应用。\n如下面代码:")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("red"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("green"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n<p class="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'six'")]),t._v(">六年级的时候，我还是一个<span>漂亮的</span>小帅哥。</p>\n")])])]),a("p",[t._v("最后 p 中的文本会设置为green，这个层叠很好理解，理解为后面的样式会覆盖前面的样式。\n所以前面的css样式优先级就不难理解了：")]),t._v(" "),a("h4",{attrs:{id:"层叠规则如下"}},[t._v("层叠规则如下")]),t._v(" "),a("p",[t._v("内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。")]),t._v(" "),a("h3",{attrs:{id:"_5-重要性"}},[t._v("5. 重要性")]),t._v(" "),a("p",[t._v("在做网页代码的时，有些特殊的情况需要为某些样式设置具有最高权值，怎么办？这时候我们可以使用!important来解决。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("p")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("red "),a("span",{pre:!0,attrs:{class:"token important"}},[t._v("!important")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("p")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("green"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n<p class="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'six'")]),t._v(">六年级的时候，我还是一个<span>漂亮的</span>小帅哥。</p>\n")])])]),a("p",[t._v("这时 p 段落中的文本会显示的red红色。")]),t._v(" "),a("div",{staticClass:"warning custom-block"},[a("p",[t._v("!important要写在分号的前面")])]),t._v(" "),a("p",[a("strong",[a("code",[t._v("!important")]),t._v(" 优先级样式是个例外，权值高于用户自己设置的样式")])]),t._v(" "),a("h2",{attrs:{id:"盒子模型"}},[t._v("盒子模型")]),t._v(" "),a("p",[t._v("在CSS中，html中的标签元素大体被分为三种不同的类型：块状元素、行内元素和行内块元素。")]),t._v(" "),a("h3",{attrs:{id:"元素分类"}},[t._v("元素分类")]),t._v(" "),a("h4",{attrs:{id:"_1-块元素-display-block"}},[t._v("1. 块元素(display: block;)")]),t._v(" "),a("p",[t._v("常见的块元素有:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>\n")])])]),a("h5",{attrs:{id:"块元素的特点："}},[t._v("块元素的特点：")]),t._v(" "),a("ul",[a("li",[t._v("每个块级元素都从新的一行开始，并且其后的元素也另起一行。")]),t._v(" "),a("li",[t._v("元素的高度、宽度、行高以及顶和底边距都可设置。")]),t._v(" "),a("li",[t._v("元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。")])]),t._v(" "),a("h4",{attrs:{id:"_2-行内元素-display-inline"}},[t._v("2. 行内元素(display: inline;)")]),t._v(" "),a("p",[t._v("常见的行内元素:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>\n")])])]),a("h5",{attrs:{id:"行内元素的特点："}},[t._v("行内元素的特点：")]),t._v(" "),a("ul",[a("li",[t._v("和其他元素都在一行上；")]),t._v(" "),a("li",[t._v("元素的高度、宽度及顶部和底部边距均不可设置；")]),t._v(" "),a("li",[t._v("元素的宽度即它所包含的文字或图片的宽度，不可改变。")])]),t._v(" "),a("h4",{attrs:{id:"_3-行内块元素-display-inline-block"}},[t._v("3. 行内块元素(display: inline-block;)")]),t._v(" "),a("p",[t._v("行内块元素同时具备块元素和行内元素的特点(css2.1新增)\n常见的行内块元素:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<img>、<input>\n")])])]),a("p",[t._v("inline-block 元素特点：")]),t._v(" "),a("ul",[a("li",[t._v("和其他元素都在一行上。")]),t._v(" "),a("li",[t._v("元素的高度、宽度、行高以及顶和底边距都可设置。")])]),t._v(" "),a("h3",{attrs:{id:"盒子模型-2"}},[t._v("盒子模型")]),t._v(" "),a("p",[t._v("一个盒子中主要的属性有5个:")]),t._v(" "),a("ul",[a("li",[t._v("widtht：内容的宽度不是盒子的宽度)")]),t._v(" "),a("li",[t._v("height: 内容的高度(不是盒子的高度)")]),t._v(" "),a("li",[t._v("padding：内边距。")]),t._v(" "),a("li",[t._v("border：边框。")]),t._v(" "),a("li",[t._v("margin：外边距。")])]),t._v(" "),a("p",[t._v("盒子模型的示意图：\n"),a("img",{attrs:{src:"/images/9890665-375d9596b0bdf2e1.png",alt:"image.png"}})]),t._v(" "),a("h4",{attrs:{id:"标准盒子模型和ie盒子模型"}},[t._v("标准盒子模型和IE盒子模型")]),t._v(" "),a("p",[a("strong",[t._v("标准盒子模型")]),t._v(" "),a("img",{attrs:{src:"/images/9890665-a571991af3d4e3b4.png",alt:"image.png"}}),t._v("\n标准盒子模型包含: margin, padding, border, content, 注意: content不包含border, padding")]),t._v(" "),a("p",[a("strong",[t._v("IE盒子模型")]),t._v(" "),a("img",{attrs:{src:"/images/9890665-74991a8c06dabdba.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("IE盒子模型包含: margin, padding, border, content, 注意: content包含border, padding")]),t._v(" "),a("p",[t._v("由此, 可以看出,标准盒子模型和IE盒子模型的主要区别在于: content是否包含border, padding")]),t._v(" "),a("h4",{attrs:{id:"两种模型间切换"}},[t._v("两种模型间切换")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("box-sizing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" content-box"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  // 标准盒子模型\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("box-sizing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" border-box"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  // IE盒子模型\n")])])]),a("h2",{attrs:{id:"css布局模型"}},[t._v("CSS布局模型")]),t._v(" "),a("p",[t._v("布局模型与盒模型一样都是 CSS 最基本、 最核心的概念。")]),t._v(" "),a("p",[a("strong",[t._v("CSS包含3种基本的布局模型:")])]),t._v(" "),a("ul",[a("li",[t._v("流动布局模型(flow)")]),t._v(" "),a("li",[t._v("浮动布局模型(float)")]),t._v(" "),a("li",[t._v("层布局模型(layer)")])]),t._v(" "),a("h3",{attrs:{id:"流动布局模型-flow"}},[t._v("流动布局模型(flow)")]),t._v(" "),a("p",[t._v("流动布局模型（Flow）是默认的网页布局模式, 即网页在默认状态下的 HTML 网页元素都是根据流动模型来分布网页内容的。")]),t._v(" "),a("p",[t._v("流动布局模型具有两个特点：")]),t._v(" "),a("ul",[a("li",[t._v("块状元素都会在所处的包含元素内自上而下按顺序垂直延伸分布，因为在默认状态下，块状元素的宽度都为100%。实际上，块状元素都会以行的形式占据位置。")]),t._v(" "),a("li",[t._v("行内元素都会在所处的包含元素内从左到右水平分布显示。")])]),t._v(" "),a("p",[t._v("因此, 在块元素的默认position值为static\n"),a("img",{attrs:{src:"/images/9890665-5b5b91f1896dc726.png",alt:"image.png"}})]),t._v(" "),a("h3",{attrs:{id:"浮动布局模型-float"}},[t._v("浮动布局模型(float)")]),t._v(" "),a("p",[t._v("任何元素在默认情况下是不浮动的，但可以用 CSS 定义为浮动，如 div、p、table、img 等元素都可以被定义为浮动。如下代码可以实现两个 div 元素一行显示。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('div{ width:200px; height:200px; border:2px red solid; float:left;}\n\n<div id="box1"></div>\n<div id="box2"></div>\n')])])]),a("p",[t._v("效果图:\n"),a("img",{attrs:{src:"/images/9890665-87551d0bf3b3a2a1.png",alt:"image.png"}})]),t._v(" "),a("blockquote",[a("p",[t._v("注意:\n浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响内联元素布局。此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式")])]),t._v(" "),a("h4",{attrs:{id:"清除浮动"}},[t._v("清除浮动")]),t._v(" "),a("h5",{attrs:{id:"为什么要清除浮动"}},[t._v("为什么要清除浮动?")]),t._v(" "),a("p",[t._v("当包含浮动元素的块元素的高度小于浮动元素的时候，此时就会出现“高度塌陷”。此时即需要清除浮动。下面的例子即展示何为塌陷。")]),t._v(" "),a("p",[t._v("以下是最初的图片样式，未设置浮动。蓝框是写了一个.container类作为包含框。包含三张图片。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('<div class="pic-box">  \n    <div class="container">  \n        <img class="pic-1" src="images/system_correct.jpg">  \n        <img class="pic-2" src="images/system_practice.jpg">  \n        <img class="pic-3" src="images/system_learn.jpg">  \n    </div>  \n</div> \n')])])]),a("p",[a("img",{attrs:{src:"/images/9890665-7e1da8979b889245.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("要看到塌陷效果很简单。如上面所说，img3的宽高都大于前两张图。因此, 假如把img3设为 float：left；那么此时img3就会脱离原来的文档流。现在来看看给img3设左浮动后的效果\n"),a("img",{attrs:{src:"/images/9890665-abe756ebe19c89d3.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("可以看到"),a("code",[t._v("<img3>")]),t._v('成功脱离了 .container 类，即脱离了文档流, 产生了"塌陷"。')]),t._v(" "),a("h5",{attrs:{id:"清除浮动-2"}},[t._v("清除浮动")]),t._v(" "),a("p",[t._v("清除浮动的方法常用的有3种:\n"),a("strong",[t._v("1. 使用overflow属性来清除浮动")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('.ovh{　　　　　　\n    overflow:hidden;\n  }\n\n<div class="pic-box">  \n    <div class="container ovh">  \n        <img class="pic-1" src="images/system_correct.jpg">  \n        <img class="pic-2" src="images/system_practice.jpg">  \n        <img class="pic-3" src="images/system_learn.jpg">  \n    </div>  \n</div> \n')])])]),a("div",{staticClass:"warning custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("缺点")]),t._v(" "),a("p",[t._v("会将超出部分隐藏, 在某些时候我们想清除浮动并且保留超出部分")])]),t._v(" "),a("p",[a("strong",[t._v("2. 额外标签法")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('.clear{\n  clear:both;\n}\n\n<div class="pic-box">  \n    <div class="container">  \n        <img class="pic-1" src="images/system_correct.jpg">  \n        <img class="pic-2" src="images/system_practice.jpg">  \n        <img class="pic-3" src="images/system_learn.jpg">  \n        <div class=\'clear\'></div>\n    </div>  \n</div> \n')])])]),a("p",[a("strong",[t._v("缺点:")]),t._v("\n会增加许多不必要的标签,")]),t._v(" "),a("p",[a("strong",[t._v("3. 伪元素来清除浮动")])]),t._v(" "),a("p",[t._v("我常用也是目前最主流的方法。即用 after伪元素清除浮动。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(".clearfix:after{  \n            display: block;  \n            content:'';  \n            clear: both;  \n            height:0;  \n        }  \n")])])]),a("p",[t._v("修改之前的代码如下:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('<div class="pic-box">  \n    <div class="container clearfix">  \n        <img class="pic-1" src="images/system_correct.jpg">  \n        <img class="pic-2" src="images/system_practice.jpg">  \n        <img class="pic-3" src="images/system_learn.jpg">  \n    </div>  \n</div> \n')])])]),a("p",[t._v("效果如下:\n"),a("img",{attrs:{src:"/images/9890665-8d12fcaea9630f60.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("此时, 我们已经将"),a("code",[t._v("<img3>")]),t._v("放回文档流。且不会影响后续块级元素的布局。")]),t._v(" "),a("h3",{attrs:{id:"层布局模型-layer"}},[t._v("层布局模型(layer)")]),t._v(" "),a("p",[t._v("什么是层布局模型？层布局模型PhotoShop中的图层编辑功能一样，每个图层能够精确定位操作.。\n如何让html元素在网页中精确定位，就像图像软件PhotoShop中的图层一样可以对每个图层能够精确定位操作。CSS定义了一组定位（positioning）属性来支持层布局模型。")]),t._v(" "),a("p",[a("strong",[t._v("层模型有3种形式：")])]),t._v(" "),a("ul",[a("li",[t._v("相对定位(position: relative)")]),t._v(" "),a("li",[t._v("绝对定位(position: absolute)")]),t._v(" "),a("li",[t._v("固定定位(position: fixed)")])]),t._v(" "),a("h4",{attrs:{id:"_1-相对定位-position-relative"}},[t._v("1. 相对定位(position: relative)")]),t._v(" "),a("p",[t._v("如果想为元素设置层模型中的相对定位，需要设置"),a("code",[t._v("position:relative")]),t._v("（相对定位），它通过left、right、top、bottom属性确定元素在正常文档流中的偏移位置。相对定位完成的过程是首先按static(float)方式生成一个元素(并且元素像层一样浮动了起来)，然后相对于以前的位置移动，移动的方向和幅度由left、right、top、bottom属性确定，偏移前的位置保留不动。")]),t._v(" "),a("p",[t._v("什么叫做“偏移前的位置保留不动”呢？\n下面通过做一个实验来说明一下:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Title</title>\n    <style>\n        .demo1{\n            position: relative;\n            left: 100px;\n            top: 300px;\n            z-index: 99;\n            height: 200px;\n            width: 200px;\n            background-color: #1ABC9C;\n        }\n    </style>\n</head>\n<body>\n<div class="demo1">\n    <span>六年级的时候，我还是一个漂亮的小帅哥。</span>\n    <span>六年级的时候，我还是一个漂亮的小帅哥。</span>\n    <span>六年级的时候，我还是一个漂亮的小帅哥。</span>\n</div>\n<div class=\'hello-world\'>\n    <h2>hello world</h2>\n</div>\n</body>\n</html>\n')])])]),a("p",[t._v("效果图下如下:")]),t._v(" "),a("p",[a("img",{attrs:{src:"/images/9890665-500176972041964c.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("从效果图中可以明显的看出，虽然"),a("code",[t._v("div.demo1")]),t._v("元素相对于以前的位置产生了偏移，但是"),a("code",[t._v("div.demo1")]),t._v("元素以前的位置还是保留着，所以后面的"),a("code",[t._v("div.hello-world")]),t._v("元素是显示在了div元素以前位置的后面。")]),t._v(" "),a("p",[t._v("此时可以发现, body的高度等于 "),a("code",[t._v("div.demo1")]),t._v("元素的高度 加上 "),a("code",[t._v("div.hello-world")]),t._v("元素的高度 之和.\n"),a("img",{attrs:{src:"/images/9890665-b045c7b84af12c6a.png",alt:"image.png"}})]),t._v(" "),a("h4",{attrs:{id:"_2-绝对定位-position-absolute"}},[t._v("2. 绝对定位(position: absolute)")]),t._v(" "),a("p",[t._v("如果想为元素设置层模型中的绝对定位，需要设置"),a("code",[t._v("position:absolute")]),t._v("(绝对定位)，这条语句的作用将元素从文档流中拖出来，然后使用left、right、top、bottom属性 "),a("strong",[t._v("相对于其最接近的一个具有定位属性的父包含块进行绝对定位。如果不存在这样的包含块，则相对于body元素")]),t._v("，即相对于浏览器窗口。")]),t._v(" "),a("p",[t._v("修改上例(相对定位的示例代码)中的代码, 将"),a("code",[t._v("demo1")]),t._v("属性position修改为: absolute后,")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(" <style>\n        .demo1{\n            position: relative;\n            left: 100px;\n            top: 300px;\n            z-index: 99;\n            height: 200px;\n            width: 200px;\n            background-color: #1ABC9C;\n        }\n    </style>\n")])])]),a("p",[t._v("效果如下:\n"),a("img",{attrs:{src:"/images/9890665-2c5638d49c96ab55.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("此时发现, body的高度, 即等于"),a("code",[t._v("div.hello-world")]),t._v("元素的高度\n"),a("img",{attrs:{src:"/images/9890665-95c86450d50a20a3.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("相对定位与绝对定位的区别:\nrelative 和 absolute的区别就在于, 以前的位置是否保留.")]),t._v(" "),a("h4",{attrs:{id:"_3-固定定位-position-fixed"}},[t._v("3. 固定定位(position: fixed)")]),t._v(" "),a("p",[t._v("fixed：表示固定定位，与absolute定位类型类似，但它的相对移动的坐标是视图（屏幕内的网页窗口）本身。由于视图本身是固定的，它不会随浏览器窗口的滚动条滚动而变化，除非你在屏幕中移动浏览器窗口的屏幕位置，或改变浏览器窗口的显示大小，因此固定定位的元素会始终位于浏览器窗口内视图的某个位置，不会受文档流动影响。")]),t._v(" "),a("h4",{attrs:{id:"思考"}},[t._v("思考")]),t._v(" "),a("h6",{attrs:{id:"_1-纯css如何实现多级折叠菜单"}},[t._v("(1). 纯CSS如何实现多级折叠菜单")]),t._v(" "),a("p",[t._v("最终实现效果类似于:\n"),a("img",{attrs:{src:"/images/9890665-5f1cf84715f8e2e5.png",alt:"image.png"}})]),t._v(" "),a("blockquote",[a("p",[t._v("提示:\n可以运用checkbox的checked值来判断下级栏目是否展开，CSS3的选择器中提供了:checked 这个伪类，当元素拥有checked这个值的时候就特定的CSS。")])]),t._v(" "),a("h6",{attrs:{id:"_2-底部固定"}},[t._v("(2). 底部固定")]),t._v(" "),a("p",[t._v("如何设置底部固定，就是不管浏览器界面大小总是固定在底部\n如百度首页效果:\n"),a("img",{attrs:{src:"/images/9890665-9c8b835c46e55dc0.png",alt:"image.png"}})]),t._v(" "),a("h2",{attrs:{id:"媒体查询"}},[t._v("媒体查询")]),t._v(" "),a("p",[t._v("使用 @media 查询，你可以针对不同的媒体类型定义不同的样式。\n@media 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，@media 是非常有用的。\n当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。\n"),a("img",{attrs:{src:"/images/9890665-6a2ba3a179887f9b.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("示例代码:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// 如果文档宽度小于 300 像素则修改背景颜色(background-color):\n@media only screen and (max-width: 500px) {\n    .gridmenu {\n        width:100%;\n    }\n    .gridmain {\n        width:100%;\n    }\n    .gridright {\n        width:100%;\n    }\n}\n")])])]),a("h2",{attrs:{id:"css书写规范"}},[t._v("CSS书写规范")]),t._v(" "),a("p",[t._v("大部分前端都没有按照良好的CSS书写规范来写CSS代码，这样会影响代码的阅读体验，这里参考了国外一些文章以及我的个人经验总结出的CSS书写规范。")]),t._v(" "),a("h3",{attrs:{id:"css书写顺序"}},[t._v("CSS书写顺序")]),t._v(" "),a("ul",[a("li",[t._v("1.位置属性(position, top, right, z-index, display, float等)")]),t._v(" "),a("li",[t._v("2.大小(width, height, padding, margin)")]),t._v(" "),a("li",[t._v("3.文字系列(font, line-height, letter-spacing, color- text-align等)")]),t._v(" "),a("li",[t._v("4.背景(background, border等)")]),t._v(" "),a("li",[t._v("5.其他(animation, transition等)")])]),t._v(" "),a("p",[a("img",{attrs:{src:"/images/9890665-9f6a746368bb7ac5.png",alt:"image.png"}})]),t._v(" "),a("h3",{attrs:{id:"css书写规范-2"}},[t._v("CSS书写规范")]),t._v(" "),a("p",[t._v("CSS有些属性是可以缩写的，比如padding,margin,font等等，这样精简代码同时又能提高用户的阅读体验。")]),t._v(" "),a("p",[a("img",{attrs:{src:"/images/9890665-73a60e11ca7e7773.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("去掉小数点前的“0”")]),t._v(" "),a("p",[a("img",{attrs:{src:"/images/9890665-bffd1078e1ad9f30.png",alt:"image.png"}})]),t._v(" "),a("h4",{attrs:{id:"简写命名"}},[t._v("简写命名")]),t._v(" "),a("p",[t._v("很多用户都喜欢简写类名，但前提是要让人看懂你的命名才能简写！\n"),a("img",{attrs:{src:"/images/9890665-87ce89aa53594395.png",alt:"image.png"}})]),t._v(" "),a("h4",{attrs:{id:"连字符css选择器命名规范"}},[t._v("连字符CSS选择器命名规范")]),t._v(" "),a("p",[t._v("1.长名称或词组可以使用中横线来为选择器命名。\n2.不建议使用“_”下划线来命名CSS选择器，为什么呢？")]),t._v(" "),a("ul",[a("li",[t._v("输入的时候少按一个shift键；")]),t._v(" "),a("li",[t._v("浏览器兼容问题 （比如使用_tips的选择器命名，在IE6是无效的）")]),t._v(" "),a("li",[t._v("能良好区分JavaScript变量命名（JS变量命名是用“_”）\n"),a("img",{attrs:{src:"/images/9890665-23b2ab8b5f526e63.png",alt:"image.png"}})])]),t._v(" "),a("h4",{attrs:{id:"不要随意使用id"}},[t._v("不要随意使用id")]),t._v(" "),a("p",[t._v("id在JavaScript中是唯一的，不能多次使用，而使用class类选择器却可以重复使用，另外id的优先级优先与class，所以id应该按需使用，而不能滥用。\n"),a("img",{attrs:{src:"/images/9890665-3ed97cce362660a2.png",alt:"image.png"}})]),t._v(" "),a("h4",{attrs:{id:"为选择器添加状态前缀"}},[t._v("为选择器添加状态前缀")]),t._v(" "),a("p",[a("img",{attrs:{src:"/images/9890665-644a40909e828aa4.png",alt:"image.png"}})]),t._v(" "),a("h4",{attrs:{id:"媒体查询（media-query）的位置"}},[t._v("媒体查询（Media query）的位置")]),t._v(" "),a("p",[t._v("将媒体查询放在尽可能相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部。如果把他们分开了，将来只会被大家遗忘。")]),t._v(" "),a("h3",{attrs:{id:"注意事项"}},[t._v("注意事项:")]),t._v(" "),a("ul",[a("li",[t._v("一律小写;")]),t._v(" "),a("li",[t._v("尽量用英文;")]),t._v(" "),a("li",[t._v("尽量不缩写，除非一看就明白的单词。")])]),t._v(" "),a("h2",{attrs:{id:"后记"}},[t._v("后记")]),t._v(" "),a("p",[t._v("做为一个前端开发人员, 编写页面的HTML&CSS代码要符合W3C规范, 最简单的判断标准即: 剥离所有的样式后, 还能够较好的呈现页面内容")]),t._v(" "),a("h2",{attrs:{id:"相关资料链接"}},[t._v("相关资料链接:")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://www.w3cschool.cn/xuexiw3c/w3c-tutorial.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("w3cSchool"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"http://www.w3school.com.cn/cssref/",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSS参考手册l"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"http://www.runoob.com/cssref/css3-pr-mediaquery.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSS3媒体查询"),a("OutboundLink")],1)])])])},[],!1,null,null,null);s.default=n.exports}}]);