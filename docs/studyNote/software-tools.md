# 软件开发工具

## 软件开发工具的功能&性能

### 软件开发的4个阶段
#### 第一阶段, 初始要求的提出. 

软件开发的首要任务是根据初始要求形成严格的, 明确的, 可供实际开发使用的功能说明书.

#### 第二阶段, 总体设计

根据软件功能说明书, 完成软件的总体设计, 这包括:
* 整个软件的结构设计 
* 公用的数据文件或数据库设计 
* 各部分的连接方式
* 信息交换的标准等

总体设计的成果是系统的总体设计文件及各个模块的设计任务书, 总体设计文件包括:
* 结构图
* 模块清单
* 公用数据结构(文件或数据库的格式)

#### 第三阶段, 实现阶段
程序的编写与文档的编写是两件并行的工作.


#### 第四阶段, 调试阶段
包括模块的调试与整个软件的联调两部分

### 软件开发工具的功能要求
* 认识与描述客观系统, 用于需求分析阶段
* 存储及管理开发过程中的信息
* 代码的编写或生成
* 文档的编写或生成
* 软件项目的管理, 为项目管理人员提供支持, 项目管理包括:
  * 进度管理
  * 资源与费用管理
  * 质量管理

### 软件开发工具的性能要求
* 表达能力或描述能力
* 保持信息一致性的能力
* 使用的方便程度
* 工具的可靠程度
* 对硬件和软件环境的要求

### 软件开发工具的分类(按工作阶段划分)
* 计划工具(为项目管理人员服务), 从更宏观的角度去看待软件开发, 不仅从项目管理的角度, 帮助人们组织与实施项目, 并且把有关进度,资源, 质量, 验收情况等信息有条不紊地管理起来, 为信息以至软件重用创造条件.
* 分析工具 
* 设计工具(为程序员服务), 出得最早, 数量**最多**


## 软件开发过程及其组织

::: tip 软件危机
20世纪60年代末期开始, 在认识到软件工作重要性的同时, 人们也认识到了软件工作的困难性, 这就是所谓的"软件危机"问题. 

:::

### 软件工程思想产生的原因
* "软件危机"的产生:
* 程序员的技能与认真负责是不牢靠的
* 要想大幅度提高软件开发的效率和质量, 应吸取人们的成功经验
* 从组件和管理的角度加强力量
* 使软件生产从程序员的个人劳动提高成为可控制的工程

为克服所谓的"软件危机", 人们先后提出了:
* 结构化程序设计方法
* 软件工程方法
* 面向对象程序设计方法
* 即插即用的程序设计方法
* 面向开源软件和互联网平台程序设计

### 软件开发的基本问题
软件开发的基本问题, 关键在于两个转换没有顺利通过, 即: 从用户的理解到程序员的理解, 以及从程序员的理解到程序的实现

#### 1. 从用户的理解到程序员的理解
要想保证这一转换顺利完成的手段, 就是利用:
* 尽可能标准化的方法编写程序设计任务书
* 用明确的语言或图形,表格, 把程序要处理信息的内容,格式,来源,去向,存储与处理清楚地表达出来, 作为双方的共同理解.

#### 2. 从程序员的理解到程序的实现
这层转换是要解决人和机器之间的交流与协调问题, 做好这个转换的关键在于: **程序员的知识水平与实际经验**

### 大型软件开发的困难
* 一致性的保持成为十分困难的问题
* 测试的困难
* 工作进度难以控制
* 文档与代码的协调困难
* 版本更新带来的困难

#### 困难产生的原因
* 大系统的复杂性
* 许多具有主动性的个人之间的组织与协调带大量的困难
* 各个应用领域之间的差别导致困难加重
* 时间的因素, 变化的因素给软件开发工作带来许多困难

### 模块划分的3个原则
* 逻辑上尽可能地单一化, 明确化, 尽量做到一一对应, 即模块的凝聚性
* 模块间的联系及互相影响尽可能地少, 对于必需的联系都应当加以明确的说明. 尽量避免**逻辑耦合**, 而仅限于数据耦合
* 模块的规模应当足够小, 以便使它本身的调试易于进行

### IBM AD/Cycle软件开发理论框架的5个阶段
1. 需求分析
2. 分析与设计
3. 编程实现
4. 测试
5. 使用及维护

### 软件开发标准化的2个努力的方面
* 表达方式的标准化
* 对工作质量及检查制订标准

### 面向对象程序设计的基本思想
* 客观世界的任何事物都是对象, 都有一些静态属性(相应于数据结构), 也都有一些相关操作(相应于程序模块), 即封装性
* 对象之间有抽象与具体, 群体与个体, 整体与部分等几种关系
* 抽象的, 较大的对象所具有的性质, 包括静态属性和动态操作, 子类也会自然而然的具有, 不用加以说明, 这就是所谓的"继承性"或"遗传性"
* 对象之间可以互送消息

### 即插即用的程序设计方法
* 一部分人专门生产软件组件
* 另一部分人构造整个软件结构, 并把软件组件插入这个结构, 以便迅速地完成大型软件的研制工作

#### 实现即插即用的程序设计方法的困难
* 标准化
* 软件组件缺乏统一的标准
* 对各种对象的定义, 难以定出标准
* 软件组件的提供方式存在问题
* 硬件及操作系统的关系问题

### 软件开发过程管理
::: tip 项目管理的要素
* 进度
* 质量
* 费用(开支)
* 资源利用
:::

#### 什么样的软件是好软件
* 正确地实现所要求的功能, 准确地给出预定的输出结果
* 用户界面友好, 符合实际用户的使用习惯和知识能力
* 具有足够的速度, 能在符合用户要求的时间限度内, 给出所要求的处理结果
* 足够的可靠性, 能在各种干扰下保持正常的工作
* 程序易读, 结构良好, 文档齐全, 从而保证系统易于修改

#### 为提高软件开发质量, 程序员应努力的方向
##### 就自身而言
* 具有程序设计所需要的基本知识与技能
* 对项目所在领域有较深入的了解, 从而能够准确地理解用户的信息需求, 正确把握有关的信息流程与信息处理原则.
* 熟悉软件开发的技术环境 
* 有实际运用的经验
##### 作为项目组成员而言
* 仅在本模块内操作
* 按总体设计的要求传递参数
* 按统一规定的格式操作数据库或公用文件
* 按统一的原则使用标识符
* 按统一的要求编写文档
* 保持程序风格一致

