# 优雅的使用Git

> Git的一些实用基本操作, 这里就不作复述了. 主要和大家分享如何更优雅的使用Git

## 写好commit message
Git每次提交代码, 都要写Commit message, 否则提交不了. 我们不仅要写commit message, 而且要写得清晰明了, 以说明本次提交的目的. 

写好commit message好处有很多, 如:
* 统一项目组的Git commit 日志风格
* 便于日后code review
* 便于收集Change log

## Commit 提交规范
目前业界比较流行的commit规范, 主要包括三部分: 
* header
* body
* footer
完整格式如下:
```
<type>(<scope>): <subject>
<blank line>

<body>
<blank line>
<footer>
```
### type
提交的commit类型, 包括以下几种:
* feat: 新功能
* fix: 修复问题
* docs: 修改文档
* style: 修改代码格式, 不影响代码逻辑
* refactor: 重构代码, 理论上不影响现有功能
* perf: 提升性能
* test: 增加修改测试用例
* chore: 修改工具相关(包括但不限于文档, 代码生成等)

### scope
修改文档的范围, 比如: 视图层, 控制层, docs, config, plugin

### subject
subject 是commit目的的一个简短描述, 一般不超过50个字符

### body
补充说明subject的, 可以分成多行, 适当增加原因, 目的等相关因素, 也可以不写.

### footer
* 当有非兼容修改时必须在这里描述清楚
* 关闭issue或是链接到相关文档, 如: Closes #111923, Closes #93201

## 使用commitizen 
工具commitizen可以帮忙我们写出规范的commit message. 
> [commitizen Github库](https://github.com/commitizen/cz-cli)


