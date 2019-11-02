# 常用建模工具

## UML
统一建模语言(Unified Modelinig Language, UML)是一种面向对象的建模语言, 它提供一描述软件系统模型的概念和图形表示法, 是一种定义良好, 易于表达, 功能强大且普遍建模语言. 


## UML建模介绍
复杂性, 多样性和相互关联性是各个信息系统的重要特征. 

面向对象概念认为客观世界的任何事物都是"对象"

在程序设计中, 对象表达为被描述事物的数据和对数据的处理的统一整体, 也称为封装. 由于对象是封装的, 对象间的联系是通过传递信息实现的. 

面向对象方法简称为OO方法, 它由以下3部分组成:
* 面向对象分析(OOA)
* 面向对象设计(OOD)
* 面向对象程序设计(OOP)


### 面向对象的一些概念
* 对象, 是一些属性和操作行为的封装体
* 类, 是一组几乎相同的对象的描述
* 属性, 是以静态的数据组成, 用以描述类和对象所固有的特征, 是类和对象的性质, 并以此来区分不同的类和对象. 
* 抽象, 是人们认识客观世界中复杂性的一种基本方法
* 封装, 即信息隐藏, 接口部分和实现部分, 对于用户来说接口部分是可见, 具体实用部分则不可见. 
* 方法, 是驻留在对象中的过程
* 继承, 指对象继承它所在类的结构
* 消息与多态, 在面向对象方法, 完成一件事情的方法是向有关对象发送消息. 多态是指不同事物具有不同的表现形式的能力. 多态机制使具有不同内部结构的对象可以共享相同的外部接口. 

### 面向对象方法与传递方法相比的优点
* 它解决了信息系统工程中的两个主要问题: 软件维护的复杂性和提高生产效率
* 它所表现出来的灵活性和各种性能使软件开发的风险降低. 

### 面向对象的基本过程
* 标识和定义对象及类
* 组织类间的关系
* 在类中构造构架
* 建立可重用的类库和应用程序框架

### 组件
组件是一个可重用的软件构件, 一个预先构建的封装的代码模块. 

组件的目标是粗粒度的复用, 它的核心是接口. 

组件技术是建立在对象技术之上, 它是对象技术的进一步发展. 

## UML基本内容 
UML把系统开发分成5个阶段:
* 需求分析
* 分析
* 设计
* 编程
* 测试

### UML的组成
* 视图
* 图表
* 模型元素
* 基本机制

#### 视图
* 用例视图, 包括用例图, 活动图和顺序图等
* 逻辑视图
  * 静态关系, 有对象图描述
  * 动态关系, 有状态图, 时序图, 协作图和活动图来描述 
* 组件视图, 由组件图组成
* 配置视图, 由配置图组成 

#### 图表
* 用例图
* 类图
* 对象图
* 状态图
* 顺序图
* 协作图
* 活动图
* 组件图
* 配置图

#### 模型元素
#### 基本机制
* 修饰
* 注释
* 说明 

## Rational Rose建模工具介绍
Rational Rose是由三层解决方案组成的应用模型.
* 用户接口层
* 事物处理原则层
* 数据层

### 建模的主要过程如下
* 确认应用系统的功能要求, 并为事务处理原则建模. 
* 对抽象的对象映射需求, 提供设计模板并创建惯用的模板.
* 分辨和设计对象或划分三层模型的服务.
* 对软件的组成部分映射成对象并设计组件在网络上如何分布.

### 采用Rational Rose实现建模所面临的几个问题
* 何时需要建模
* 兼容性问题
* 对UML的支持程序
* 对大型项目的特殊支持
* 采用可视化建模

### 使用Rational Rose进行可视化建模的特点
* 支持UML的建模
* 采用基于组件的开发
* 支持多语言开发
* 支持双向工程. 

这使得使用者可以很容易地完成从系统分析到系统实现, 然后再从系统实现到系统分析的迭代过程.

使用UML建模时, 一般分三部分:
* 用例视图设计, 主要借助于以下3种图来了解用户的需求
  * 用例图
  * 活动图
  * 状态图
* 逻辑设计, 需要用到:
  * 类图
  * 顺序图
  * 交互图
* 物理设计, 需要借助于:
  * 部署图 等视图


### UML使用的图解释
* 用例图, 主要通过用例来描述系统的功能性需求, 它是系统中与实现无关的视图, 用例视图包括:
  * 角色
  * 用例
  * 关系 
* 用例与用例之间的关系有:
  * 扩展关系
  * 包含关系
  * 泛化关系 
* 活动图, 本质就是流程图, 它很好地描述了系统的活动, 判定点, 先后顺序和分支等
* 顺序图, 强调消息时间顺序的交互图
* 协作图, 强调参加交互的各对象的组织
* 组件图, 系统组件图描述了软件的各种组件和它们之间的依赖关系. 组件图通常包含三种元素, 即组件, 接口和依赖关系.
* 类图, 是根据系统中的类, 以及各个类之间的关系描述系统的静态视图, 类由三部分组成:
  * 类名称
  * 类属性
  * 类操作
* 配置图, 可以很好的描述实施时整个系统的结构和层次.


