(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{190:function(i,t,a){"use strict";a.r(t);var _=a(0),v=Object(_.a)({},function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":i.$parent.slotKey}},[a("h1",{attrs:{id:"css布局解决方案"}},[i._v("CSS布局解决方案")]),i._v(" "),a("p",[i._v("前端布局非常重要的一环就是页面框架的搭建，也是最基础的一环。在页面框架的搭建之中，又有居中布局、多列布局以及全局布局，今天我们就来总结总结前端干货中的CSS布局。")]),i._v(" "),a("h2",{attrs:{id:"居中布局"}},[i._v("居中布局")]),i._v(" "),a("h3",{attrs:{id:"水平居中"}},[i._v("水平居中")]),i._v(" "),a("h4",{attrs:{id:"_1）使用inline-block-text-align"}},[i._v("1）使用inline-block+text-align")]),i._v(" "),a("h5",{attrs:{id:"原理、用法"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：先将子框由块级元素改变为行内块元素，再通过设置行内块元素居中以达到水平居中。")])]),i._v(" "),a("li",[a("p",[i._v("用法：对子框设置display:inline-block，对父框设置text-align:center。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-59dddae4bd9d8d04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：兼容性好，甚至可以兼容ie6、ie7")])]),i._v(" "),a("li",[a("p",[i._v("缺点：child里的文字也会水平居中，可以在.child添加text-align:left;还原")])])]),i._v(" "),a("h4",{attrs:{id:"_2-使用table-margin"}},[i._v("2) 使用table+margin**")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-2"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：先将子框设置为块级表格来显示（类似 ），再设置子框居中以达到水平居中。")])]),i._v(" "),a("li",[a("p",[i._v("用法：对子框设置display:table，再设置margin:0 auto。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-2"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-e48d1afc0bf31097.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点："}},[i._v("优缺点：")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：只设置了child，ie8以上都支持")])]),i._v(" "),a("li",[a("p",[i._v("缺点：不支持ie6、ie7,将div换成table")])])]),i._v(" "),a("h4",{attrs:{id:"_3）使用absolute-transform"}},[i._v("3）使用absolute+transform")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-3"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：将子框设置为绝对定位，移动子框，使子框左侧距离相对框左侧边框的距离为相对框宽度的一半，再通过向左移动子框的一半宽度以达到水平居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。")])]),i._v(" "),a("li",[a("p",[i._v("用法：对父框设置position:relative，对子框设置position:absolute，left:50%，transform:translateX(-50%)。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-3"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-65900396b86366af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-2"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：居中元素不会对其他的产生影响")])]),i._v(" "),a("li",[a("p",[i._v("缺点：transform属于css3内容，兼容性存在一定问题，高版本浏览器需要添加一些前缀")])])]),i._v(" "),a("h4",{attrs:{id:"_4）使用flex-margin"}},[i._v("4）使用flex+margin")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-4"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过CSS3中的布局利器flex将子框转换为flex item，再设置子框居中以达到居中。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为display:flex，再设置子框margin:0 auto。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-4"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-e02202f3a7d2ad94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-3"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[i._v("缺点：低版本浏览器(ie6 ie7 ie8)不支持")])]),i._v(" "),a("h4",{attrs:{id:"_5）使用flex-justify-content"}},[i._v("5）使用flex+justify-content")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-5"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过CSS3中的布局利器flex中的justify-content属性来达到水平居中。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为display:flex，再设置justify-content:center。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-5"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-f4f95d1d23cca2a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-4"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：设置parent即可")])]),i._v(" "),a("li",[a("p",[i._v("缺点：低版本浏览器(ie6 ie7 ie8)不支持")])])]),i._v(" "),a("h3",{attrs:{id:"垂直居中"}},[i._v("垂直居中")]),i._v(" "),a("h4",{attrs:{id:"_1）使用table-cell-vertical-align"}},[i._v("1）使用table-cell+vertical-align")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-6"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过将父框转化为一个表格单元格显示（类似 "),a("code",[i._v("<td>")]),i._v(" 和 "),a("code",[i._v("<th>")]),i._v("），再通过设置属性，使表格单元格内容垂直居中以达到垂直居中。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为display:table-cell，再设置vertical-align:middle。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-6"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-576548c2f4667158.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-5"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[i._v("优点：兼容性较好，ie8以上均支持")])]),i._v(" "),a("h4",{attrs:{id:"_2）使用absolute-transform"}},[i._v("2）使用absolute+transform")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-7"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：类似于水平居中时的absolute+transform原理。将子框设置为绝对定位，移动子框，使子框上边距离相对框上边边框的距离为相对框高度的一半，再通过向上移动子框的一半高度以达到垂直居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为position:relative，再设置子框position:absolute，top:50%，transform:translateY(-50%)。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-7"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-54942f05495f31f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-6"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：居中元素不会对其他的产生影响")])]),i._v(" "),a("li",[a("p",[i._v("缺点：transform属于css3内容，兼容性存在一定问题，高版本浏览器需要添加一些前缀")])])]),i._v(" "),a("h4",{attrs:{id:"_3）使用flex-align-items"}},[i._v("3）使用flex+align-items**")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-8"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过设置CSS3中的布局利器flex中的属性align-times，使子框垂直居中。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为position:flex，再设置align-items:center。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-8"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-195644a95dd907b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-7"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：只设置parent")])]),i._v(" "),a("li",[a("p",[i._v("缺点：兼容性存在一定问题")])])]),i._v(" "),a("h3",{attrs:{id:"水平垂直居中"}},[i._v("水平垂直居中")]),i._v(" "),a("h4",{attrs:{id:"_1）使用absolute-transform"}},[i._v("1）使用absolute+transform**")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-9"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：将水平居中时的absolute+transform和垂直居中时的absolute+transform相结合。详见：水平居中的3）和垂直居中的2）。")])]),i._v(" "),a("li",[a("p",[i._v("见水平居中的3）和垂直居中的2）。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-9"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-9e3fe89a8fdcf422.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-8"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：child元素不会对其他元素产生影响")])]),i._v(" "),a("li",[a("p",[i._v("缺点：兼容性存在一定问题")])])]),i._v(" "),a("h4",{attrs:{id:"_2）使用inline-block-text-align-table-cell-vertical-align"}},[i._v("2）使用inline-block+text-align+table-cell+vertical-align")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-10"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：使用inline-block+text-align水平居中，再用table-cell+vertical-align垂直居中，将二者结合起来。详见：水平居中的1）和垂直居中的1）。")])]),i._v(" "),a("li",[a("p",[i._v("见水平居中的1）和垂直居中的1）。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-10"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-bf216820a06139cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-9"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[i._v("优点：兼容性较好")])]),i._v(" "),a("h4",{attrs:{id:"_3）使用flex-justify-content-align-items"}},[i._v("3）使用flex+justify-content+align-items")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-11"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过设置CSS3布局利器flex中的justify-content和align-items，从而达到水平垂直居中。详见：水平居中的4）和垂直居中的3）。")])]),i._v(" "),a("li",[a("p",[i._v("见水平居中的4）和垂直居中的3）。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-11"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-ece839a0de38babe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-10"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：只设置了parent")])]),i._v(" "),a("li",[a("p",[i._v("缺点：兼容性存在一定问题")])])]),i._v(" "),a("h2",{attrs:{id:"多列布局"}},[i._v("多列布局")]),i._v(" "),a("h3",{attrs:{id:"定宽-自适应"}},[i._v("定宽+自适应")]),i._v(" "),a("h4",{attrs:{id:"_1）使用float-overflow"}},[i._v("1）使用float+overflow")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-12"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过将左边框脱离文本流，设置右边规定当内容溢出元素框时发生的事情以达到多列布局。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将左框设置为float:left、width、margin-left，再设置实际的右框overflow:hidden。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-12"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-4af707b48de123d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-11"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：简单")])]),i._v(" "),a("li",[a("p",[i._v("缺点：不支持ie6")])])]),i._v(" "),a("h4",{attrs:{id:"_2）使用float-margin"}},[i._v("2）使用float+margin")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-13"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过将左框脱离文本流，加上右框向右移动一定的距离，以达到视觉上的多列布局。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将左框设置为float:left、margin-left，再设置右框margin-left。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-13"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-806d67de00021d4e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-12"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：简单，易理解")])]),i._v(" "),a("li",[a("p",[i._v("缺点：兼容性存在一定问题，ie6下有3px的bug。right下的p清除浮动将产生bug")])])]),i._v(" "),a("h4",{attrs:{id:"_3）使用float-margin（改良版）"}},[i._v("3）使用float+margin（改良版）")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-14"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：在1）的基础之上，通过向右框添加一个父框，再加上设置左、右父框属性使之产生BFC以去除bug。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将左框设置为float:left、margin-left、position:relative，再设置右父框float:right、width:100%、margin-left，最后设置实际的右框margin-left。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-14"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-8aeef297f2dfffb1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-13"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[i._v("优点：简单，易理解")])]),i._v(" "),a("h4",{attrs:{id:"_4）使用table"}},[i._v("4）使用table")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-15"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过将父框设置为表格，将左右边框转化为类似于同一行的td，从而达到多列布局。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为display:table、width:100%、table-layout:fixed，再设置左右框display:table-cell，最后设置左框width、padding-right。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-15"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-213d06592e10ddc1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h4",{attrs:{id:"_5）使用flex"}},[i._v("5）使用flex")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-16"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过设置CSS3布局利器flex中的flex属性以达到多列布局。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为display:flex，再设置左框flex:1，最后设置左框width、margin-right。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-16"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-39bf0b474490c307.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-14"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：flex很强大")])]),i._v(" "),a("li",[a("p",[i._v("缺点：兼容性存在一定问题，性能存在一定问题")])])]),i._v(" "),a("h3",{attrs:{id:"两列定宽-一列自适应"}},[i._v("两列定宽+一列自适应")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-17"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：这种情况与两列定宽查不多。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将左、中框设置为float:left、width、margin-right，再设置右框overflow:hidden。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-17"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-5642afa133866f1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h3",{attrs:{id:"不定宽-自适应"}},[i._v("不定宽+自适应")]),i._v(" "),a("h4",{attrs:{id:"_1）使用float-overflow-2"}},[i._v("1）使用float+overflow")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-18"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：这种情况与两列定宽查不多。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将左框设置为float:left、margin-right，再设置右框overflow: hidden，最后设置左框中的内容width。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-18"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-031abc777de5f7ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-15"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：简单")])]),i._v(" "),a("li",[a("p",[i._v("缺点：ie6下兼容性存在一定问题")])])]),i._v(" "),a("h4",{attrs:{id:"_2）使用table"}},[i._v("2）使用table")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-19"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过将父框改变为表格，将左右框转换为类似于同一行的td以达到多列布局，设置父框宽度100%，给左框子元素一个固定宽度从而达到自适应。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为display: table、width: 100%，再设置左、右框display: table-cell，最后设置左框width: 0.1%、padding-right以及左框中的内容width。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-19"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-74ba5d096b6342d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-16"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[i._v("缺点：ie6 ie7不支持")])]),i._v(" "),a("h4",{attrs:{id:"_3）使用flex"}},[i._v("3）使用flex")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-20"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过设置CSS3布局利器flex中的flex属性以达到多列布局，加上给左框中的内容定宽、给右框设置flex达到不定款+自适应。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为display:flex，再设置右框flex:1，最后设置左框margin-right:20px、左框中的内容width。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-20"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-08c6e2d974d690a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-17"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：flex很强大")])]),i._v(" "),a("li",[a("p",[i._v("缺点：兼容性存在一定问题，性能存在一定问题")])])]),i._v(" "),a("h3",{attrs:{id:"两列不定宽-一列自适应"}},[i._v("两列不定宽+一列自适应")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-21"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：这个情况与一列不定宽+一列自适应查不多。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将左、中框设置为float:left、margin-right，再设置右框overflow:hidden，最后给左中框中的内容设置width。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-21"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-8df4f133b0349112.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h3",{attrs:{id:"等分布局"}},[i._v("等分布局")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-b980378091fab9a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("p",[i._v("公式转化：")]),i._v(" "),a("p",[a("code",[i._v("l=w*n+g*(n-1)->l=w*n+g*n-g->l+g=（w+g）*n")])]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-49c976b598cea239.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("p",[i._v("因此，我们需要解决两个问题：")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("如何让总宽度增加g(即：L+g)")])]),i._v(" "),a("li",[a("p",[i._v("如何让每个宽包含g（即：w+g）")])])]),i._v(" "),a("h4",{attrs:{id:"_1）使用float"}},[i._v("1）使用float")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-22"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：增大父框的实际宽度后，使用CSS3属性box-sizing进行布局的辅助。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为margin-left: -*px，再设置子框float: left、width: 25%、padding-left、box-sizing: border-box。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-22"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-c45aac68b614057c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-18"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：兼容性较好")])]),i._v(" "),a("li",[a("p",[i._v("缺点：ie6 ie7百分比兼容存在一定问题")])])]),i._v(" "),a("h4",{attrs:{id:"_2）使用table-2"}},[i._v("2）使用table")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-23"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过增加一个父框的修正框，增大其宽度，并将父框转换为table，将子框转换为tabel-cell进行布局。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框的修正框设置为margin-left: -*px，再设置父框display: table、width:100%、table-layout: fixed，设置子框display: table-cell、padding-left。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-23"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-186ee4cced71a876.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-19"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：结构和块数无关联")])]),i._v(" "),a("li",[a("p",[i._v("缺点：增加了一层")])])]),i._v(" "),a("h4",{attrs:{id:"_3）使用flex-2"}},[i._v("3）使用flex")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-24"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过设置CSS3布局利器flex中的flex属性以达到等分布局。")])]),i._v(" "),a("li",[a("p",[i._v("用法：将父框设置为display: flex，再设置子框flex: 1，最后设置子框与子框的间距margin-left。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-24"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-371cbc22eee12f1e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-20"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：代码量少，与块数无关")])]),i._v(" "),a("li",[a("p",[i._v("缺点：兼容性存在一定问题")])])]),i._v(" "),a("h3",{attrs:{id:"定宽-自适应-两块高度一样高"}},[i._v("定宽+自适应+两块高度一样高")]),i._v(" "),a("h4",{attrs:{id:"_1）使用float-2"}},[i._v("1）使用float")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-25"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过过分加大左右子框的高度，辅助超出隐藏，以达到视觉上的等高。")])]),i._v(" "),a("li",[a("p",[i._v("用法：将父框设置overflow: hidden，再设置左右子框padding-bottom: 9999px、margin-bottom: -9999px，最后设置左框float: left、width、margin-right，右框overflow: hidden。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-25"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-8de25e54301d7840.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-21"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：兼容性好")])]),i._v(" "),a("li",[a("p",[i._v("缺点：伪等高，不是真正意义上的等高")])])]),i._v(" "),a("h4",{attrs:{id:"_2）使用table-3"}},[i._v("2）使用table")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-26"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：将父框转化为tabel，将子框转化为tabel-cell布局，以达到定宽+自适应+两块高度一样高。")])]),i._v(" "),a("li",[a("p",[i._v("用法：先将父框设置为display:table、width:100%、table-layout:fixed，再设置左右框为display:table-cell，最后设置左框width、padding-right。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-26"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-28d8bd1f36397bf8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h4",{attrs:{id:"_3）使用flex-3"}},[i._v("3）使用flex")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-27"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过设置CSS3布局利器flex中的flex属性以达到定宽+自适应+两块高度一样高。")])]),i._v(" "),a("li",[a("p",[i._v("用法：将父框设置为display: flex，再设置左框width、margin-right，最后设置右框flex:1。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-27"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-c4ea08e086824c14.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-22"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("优点：代码少，flex很强大")])]),i._v(" "),a("li",[a("p",[i._v("缺点：兼容性存在一定问题")])])]),i._v(" "),a("h4",{attrs:{id:"_4-使用display"}},[i._v("4)使用display")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-28"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过设置display中的CSS3的-webkit-box属性以达到定宽+自适应+两块高度一样高。")])]),i._v(" "),a("li",[a("p",[i._v("用法：将父框设置为display: -webkit-box、width: 100%，再设置左框width、margin-right，最后设置右框-webkit-box-flex: 1。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-28"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-2384f0b5a56ae6a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-23"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[i._v("缺点：兼容性存在较大的问题")])]),i._v(" "),a("h3",{attrs:{id:"全屏布局"}},[i._v("全屏布局")]),i._v(" "),a("p",[a("strong",[i._v("全屏布局的特点")])]),i._v(" "),a("ul",[a("li",[a("p",[i._v("滚动条不是全局滚动条，而是出现在内容区域里，往往是主内容区域")])]),i._v(" "),a("li",[a("p",[i._v("浏览器变大时，撑满窗口")])])]),i._v(" "),a("p",[a("strong",[i._v("全屏布局的方法")])]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-a0990fd47c8f787b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h4",{attrs:{id:"_1）使用position"}},[i._v("1）使用position")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-29"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：将上下部分固定，中间部分使用定宽+自适应+两块高度一样高。")])]),i._v(" "),a("li",[a("p",[i._v("用法：见实例。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-29"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-322f2f3dbdbe7e8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-24"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[i._v("优点：兼容性好，ie6下不支持")])]),i._v(" "),a("h4",{attrs:{id:"_2）使用flex"}},[i._v("2）使用flex")]),i._v(" "),a("h5",{attrs:{id:"原理、用法-30"}},[i._v("原理、用法")]),i._v(" "),a("ul",[a("li",[a("p",[i._v("原理：通过灵活使用CSS3布局利器flex中的flex属性和flex-direction属性以达到全屏布局。")])]),i._v(" "),a("li",[a("p",[i._v("用法：见实例。")])])]),i._v(" "),a("h5",{attrs:{id:"代码实例-30"}},[i._v("代码实例")]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-3dab72b0a85dcfc1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h5",{attrs:{id:"优缺点-25"}},[i._v("优缺点")]),i._v(" "),a("ul",[a("li",[i._v("缺点：兼容性差，ie9及ie9以下不兼容")])]),i._v(" "),a("p",[a("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/9890665-49226bc4791b03b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}})]),i._v(" "),a("h3",{attrs:{id:"全屏布局相关方案的兼容性、性能和自适应一览表"}},[i._v("全屏布局相关方案的兼容性、性能和自适应一览表")]),i._v(" "),a("table",[a("thead",[a("tr",[a("th",[i._v("方案")]),i._v(" "),a("th",[i._v("兼容性")]),i._v(" "),a("th",[i._v("性能")]),i._v(" "),a("th",[i._v("是否自适应")])])]),i._v(" "),a("tbody",[a("tr",[a("td",[i._v("Position")]),i._v(" "),a("td",[i._v("好")]),i._v(" "),a("td",[i._v("好")]),i._v(" "),a("td",[i._v("部分自适应")])]),i._v(" "),a("tr",[a("td",[i._v("Flex")]),i._v(" "),a("td",[i._v("较差")]),i._v(" "),a("td",[i._v("差")]),i._v(" "),a("td",[i._v("可自适应")])]),i._v(" "),a("tr",[a("td",[i._v("Grid")]),i._v(" "),a("td",[i._v("差")]),i._v(" "),a("td",[i._v("较好")]),i._v(" "),a("td",[i._v("可自适应")])])])]),i._v(" "),a("blockquote",[a("p",[i._v("(转发)作者：无悔铭 https://segmentfault.com/a/1190000013565024")])])])},[],!1,null,null,null);t.default=v.exports}}]);