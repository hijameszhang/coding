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
## validate-commit-msg ghooks
validate-commit-msg [Github](https://github.com/conventional-changelog-archived-repos/validate-commit-msg)于检查项目的 Commit message 是否符合格式。
ghooks [Github](https://github.com/ghooks-org/ghooks) Simple git hooks

### 安装
```
npm install --save-dev validate-commit-msg`
npm install ghooks --save-dev
```
### 配置
在项目的根目录下, 新建一个名为`.vcmrc`的文件, 并输入以下内容:
``` json
{
  "types": ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"],
  "scope": {
    "required": false,
    "allowed": ["*"],
    "validate": false,
    "multiple": false
  },
  "warnOnFail": false,
  "maxSubjectLength": 100,
  "subjectPattern": ".+",
  "subjectPatternErrorMsg": "subject does not match subject pattern!",
  "helpMessage": "",
  "autoFix": false
}
```

然后, 在`package.json`中添加如下配置
``` json
{
  …
  "config": {
    "ghooks": {
      "pre-commit": "gulp lint",
      "commit-msg": "validate-commit-msg",
      "pre-push": "make test",
      "post-merge": "npm install",
      "post-rewrite": "npm install",
      …
    }
  }
  …
}
```
可以根据项目的需要来添加, 例如:
``` json
  "config": {
    "ghooks": {
      "commit-msg": "validate-commit-msg"
    }
  }
```
### 验证
每次git commit的时候，这个脚本就会自动检查 Commit message 是否合格。如果不合格，就会报错。
```
$ git add -A 
$ git commit -m "edit markdown" INVALID COMMIT MSG: does not match "<type>(<scope>): <subject>" ! was: edit markdown
```
## 使用commitizen 
工具commitizen可以帮忙我们写出规范的commit message.   [Github](https://github.com/commitizen/cz-cli)

### 全局安装
```
> npm install -g commitizen
```
#### 初始化及使用
···
> commitizen init cz-conventional-changelog --save-dev --save-exact
```

以上命令将执行以下3个动作:
* 安装cz-conventional-changelog依赖包
* 保存依赖包信息到package.json的dependencies七devDependencies中
* 添加config.commitizen字段到package.json中, 可能的配置如下:
``` json
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
```

::: tip
如果以前使用过cz-conventional-changelog, 在末尾添加`--force`参数, 强制更新package.json中的配置.
更多信息可以通过命令`commitizen help`获得
:::

接下来我们就可以愉快的使用`git cz`命令来代替`git commit`命令了.

```
E:\github\coding_docs>git cz
cz-cli@3.1.1, cz-conventional-changelog@2.1.0

Line 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.

? Select the type of change that you're committing: feat:     A new feature
? What is the scope of this change (e.g. component or file name)? (press enter to skip)
 gitCommit.md, package.json
? Write a short, imperative tense description of the change:
 add a new md file=> how to use git well
? Provide a longer description of the change: (press enter to skip)

? Are there any breaking changes? Yes
? Describe the breaking changes:
 how to use git well
? Does this change affect any open issues? No
```
### 本地安装
> 本地安装可以确保项目的所有开发者都能执行相同的commitizen版本.

```
npm install commitizen --save-dev
npm commitizen init cz-conventional-changelog --save-dev --save-exact
```
或者
```
yarn add commitizen --dev
yarn commitizen init cz-conventional-changelog --dev --save-exact
```

### 添加配置&使用
手动添加如下配置至package.json文件中:
``` json
  "script": {
    "commit": "git-cz"
  }
```
当需要commit文件时, 执行`npm run commit`即可.

## 使用gitmoji
gitmoji 和 commitizen的作用都是帮助我们写出规范的commit message，不过gitmoji有更好玩的 moji表情。（ 用moji来表示type ） [Github](https://github.com/carloscuesta/gitmoji-cli)

### 安装
```
npm install -g gitmoji-cli
```

### 使用
```
gitmoji -c
```
挑选个符合场景的moji提交本次更改:
![images](/coding/images/640.gif)

## 使用Git hooks
与其他版本控制系统一样，当某些重要事件发生时，Git 可以调用自定义脚本，Git 有很多钩子可以用来调用脚本自定义 Git。在 .git -> hooks 目录下可以看到示例。 例如：pre-commit就是在代码提交之前做些事情。如果你打开了 hooks 目录里面的 *.sample 文件，你可以看见里面写的shell脚本。但是我想用 Js 写 hooks 咋办？husky、pre-commit就能满足你。

现在我们想实现一个提交代码时使用 Eslint 进行代码检查的功能

### pre-commit  [GitHub](https://github.com/observing/pre-commit)

#### 安装
```
npm install --save-dev pre-commit
```
#### 配置
在package.json 中配置pre-commit
``` json
"script": {
  "lint": "eslint [options] [file|dir|glob|*]"
},
"pre-commit": [
  "lint"
]
```
#### 提交代码:
```
> git commit -m "test:Keep calm and commit"
```

### husky  [Github](https://github.com/typicode/husky)
#### 安装
```
> npm install husky@next --save-dev
```
#### 配置
和 pre-commit 一样，还是在package.json中配置。但是处理pre-commit钩子它还可以做的更多。
``` json
{
  "scripts": {
    "lint": "eslint [options] [file|dir|glob]*"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm lint",
      "pre-push": "..."
    }
  }
}
```
## 生成change log
如果你的所有 Commit 都符合 Angular 格式，那么发布新版本时， Change log 就可以用脚本自动生成（例1，例2，例3）。

生成的文档包括以下三个部分。
* New features
* Bug fixes
* Breaking changes.

每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。
conventional-changelog 就是生成 Change log 的工具，运行下面的命令即可。
```
$ npm install -g conventional-changelog
$ cd my-project
$ conventional-changelog -p angular -i CHANGELOG.md -w
```
上面命令不会覆盖以前的 Change log，只会在CHANGELOG.md的头部加上自从上次发布以来的变动。

如果你想生成所有发布的 Change log，要改为运行下面的命令。
```
$ conventional-changelog -p angular -i CHANGELOG.md -w -r 0
```
为了方便使用，可以将其写入package.json的scripts字段。
``` json
{
  "scripts": {
   "changelog": "conventional-changelog -p angular -i CHANGELOG.md -w -r 0"
}}
```
以后，直接运行下面的命令即可。
```
$ npm run changelog
```