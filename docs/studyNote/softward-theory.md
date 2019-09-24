# 软件开发工具理论基础

## 软件开发过程的信息要求
### 软件开发过程中信息流通状况
* 有关系统环境, 现状及需求信息
* 有关系统的功能设计与物理设计的各种信息
* 软件成果本身, 包括程序和文档
* 用户对系统的各种变更要求, 以及系统的各种变更记录

围绕以上信息, 涉及到的信息工作有:
* 许多信息需要长期保存
* 在许多环节上需要对信息进行转换或加工
  * 软件开发工具合理存储、正确转化的4类信息是：
    * 需求信息
    * 设计方案
    * 变更要求
    * 代码文档

## 概念模式及其作用
概念模式(也称为 概念模型), 指人们在认识事物过程中, 对于某一事物或某一系统开成的, 抽象的, 一般化的框架.

### 概念模式的作用
概念模式是人们认识客观世界的一种方法, 是人们在长期的实践活动中逐渐形成的. 概念模式总是在一定的理论,思想的指导下形成的, 同时又不断的根据实际情况修正, 概念模式在认识中的作用十分重要, 同时作为交流与表达工具也是十分重要的. 

### 软件开发工具中常用的概念模式
#### 1. 框图
框图是人们在编写软件时, 最早使用的一种概念模式, 它是用来描述程序执行的**逻辑过程**的. 
它把程序的基本步骤归纳为:
* 处理
* 判断 
* 输入输出
* 起始或终止

用**箭头**表示控制或执行的顺序

#### 2. 结构图
人们引入结构图, 用以表示大型软件的层次结构, 即模块结构. 以调用关系为线索, 程序的调用方式有三种:
* 顺序调用 
* 选择调用 
* 循环调用

结构图的好处是: 能够体现层次观点, 由粗到细, 自顶向下地描述程序.

#### 3. 数据流程图
它更多的用于描述某一业务处理系统的信息来源, 存储, 处理, 去向的全面情况. 与结构图相比, 它更适用于客观描述, 而结构图则着重于软件模块之间的控制. 

数据流程图的基本元素是:
* 外部实体, 即系统以外的信息来源或去向
* 数据处理与数据存储

用**箭头**表明信息在它们之间的流动状况.

#### 4. 实体关系
实体关系图(E-R图), 是一种用于描述静态数据结构的概念模式, 

#### 5. 数据字典
数据字典, 简称DD, 一种描述数据内容的概念模式. 

它用表格的形式列出数据的基本属性以及相互关系.

#### 6. 时序网络
常用于一些实时控制方面的软件的功能描述. 

它的基本概念是**状态与转换**: 
* 状态, 指系统在运转中某一特定形态或工作方式
* 转换, 指状态在一定条件下的相互变化

#### 7. 数学与逻辑模型
决策树和决策表也是经常用到的.

#### 8. 计算机模拟模型
计算机模拟模型是一种强有力的概念模式. 

它利用计算机大量,高速处理信息的能力, 在计算机内设置一定的环境(如资源条件等), 又以程序来实现客观系统中的某些规律或规则, 在二者基础上, 计算机就可以高速运行, 以便人们观察与预测客观系统的状况. 

作为一种不需要事先更多的理论假设的概念模式, 计算机模拟有其独特之处, 它已发展成为一个独特的分支.

## 信息库及其一致性
> 信息库研究的核心问题是**如何保持信息库的一致性** 

信息库是一个随项目进度不断修改与补充的**数据集合**。

### 信息库的研究主要有3个方面
#### 1. 信息库的内容包含有哪些?
* 所描述软件的工作环境、 功能需求、性能需求、 有关的各种信息来源、 用户状况、 硬件环境以及在该应用领域中的作用等外部信息.
* 需求分析阶段收集的有关用户的各种信息， 包括用户本身提供的， 也包括在调查研究中得到的。
* 逻辑设计阶段的各种调查材料和由此生成的各种文档， 包括：
  * 调查记录
  * 原始数据
  * 报表
  * 单证的样本
  * 绘制的各种图
  * 最后生成的系统说明书
* 设计阶段的各种资料， 包括：
  * 所有的数据库与数据文件格式
  * 数据字典
  * 程序模块的要求
  * 总体结构
  * 各种接口以及参数的传递方式
  * 最后形成的设计方案
* 编程阶段的所有成果， 包括：
  * 程序代码
  * 框图
  * 变量说明
  * 测试情况（输入数据及输出结果）
  * 验收报告
  * 使用说明等
* 运行及使用状况的详细记录， 包括每次使用的时间、状态、问题， 特别是有关错误及故障的记录情况。
* 维护及修改的情况， 包括：
  * 修改的目标
  * 责任人
  * 过程
  * 时间
  * 修改前后的代码与文档
  * 修改后的结果
  * 原系统的备份
* 项目管理有关的信息包括：
  * 人员变更
  * 资金投入
  * 进度计划以及实施情况
  * 版本信息， 以及各版本的备份， 每个版本的推出日期， 与以前版本相比的变更说明等
#### 2. 信息库应当具备哪些管理功能
#### 3. 如何保持一致性

### 信息库应保存的文档有
* 调查记录
* 原始数据
* 报表与单证的样本
* 绘制的各种图
* 系统说明书

## 人机界面及管理
### 关于用户界面的基本原则
* 用户界面的主要功能是通信
* 用户界面必须始终一致
* 用户界面必须使用户随时掌握任务的进展状况
* 用户界面必须能提供帮助
* 宁可让程序多干， 不要让用户多干 

### 人机交互的手段
* 键盘操作
* 屏幕滚动
* 菜单选择
* 帮助系统
* 鼠标操作
* 色彩应用
* 数据录入
* 信息显示

## 项目管理与版本管理
### 与一般工厂相比， 项目管理的特点
* 子任务多， 关系复杂
* 任务不可重复， 形势不断变化
* 协调组织的任务十分突出， 资源浪费闲置的风险与合理地优化组合、提高效益的机会并存。 
* 信息处理工作的作用与意义更为突出

### 项目管理的基本目标
* 使产品的质量得到有效的控制
* 保证整个系统按预定的进度完成
* 有效地利用各种资源， 尽可能使资源的闲置与浪费减少
* 控制与降低成本

从项目的观点来说， 最终都体现为成本的升高或降低。 可以说， **成本的情况**是项目管理状态的综合的最终体现。

项目管理和版本管理的重要资源是**用户反馈的信息**

### 版本管理
版本管理的核心是， **保持两个一致性**
* 系统完善过程中， 前后一致。
* 系统的局部和整体一致

#### 方法
* 规定版本更新计划
* 制定版本有关信息的管理方法， 项目组内明确分工， 在编程、测试等工作中有明确要求。

## 其他
* 在软件开发过程中， 直接与需求信息关联的界面是**分析界面**
* 