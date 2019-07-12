# Vue & TypeScript
## 环境准备
### Node.js & TypeScript 安装
详情请参阅: [TypeScript:快速上手](/typescript/1-quickStart.html)

### @vue/cli 安装
```
> npm -g install @vue/cli
```
或者
```
> yarn global add @vue/cli
```
### 创建工程
```
E:\github>vue create vue-typescript-demo
Vue CLI v3.9.2
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, Router, Vuex, CSS Pre-processors, Linter, Unit
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Less
? Pick a linter / formatter config: TSLint
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No


Vue CLI v3.9.2
✨  Creating project in E:\github\vue-typescript-demo.
�  Initializing git repository...
⚙  Installing CLI plugins. This might take a while...

yarn install v1.16.0
info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.9: The platform "win32" is incompatible with this module.
info "fsevents@1.2.9" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Saved lockfile.
Done in 78.80s.
�  Invoking generators...
�  Installing additional dependencies...

yarn install v1.16.0
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.9: The platform "win32" is incompatible with this module.
info "fsevents@1.2.9" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Saved lockfile.
Done in 23.86s.
⚓  Running completion hooks...

�  Generating README.md...

�  Successfully created project vue-typescript-demo111.
�  Get started with the following commands:

 $ cd vue-typescript-demo
 $ yarn serve
```
工程创建成功后, 进入到目录`vue-typescript-demo`, 运行命令: `yarn serve`. 即可通过`http://localhost:8080/`查看到本地的运行页面.

### 工程解析
```
|-vue-typescript-demo
  |-public                    // 静态资源文件                
    |-favicon.ico
    |-index.html
  |-src                       // 源代码
    |-assets                  // 资源文件目录 
      |-logo.png
    |-components              // 公用组件
      |-HelloWorld.vue
    |-views                   // 视图组件
      |-About.vue
      |-Home.vue
    |-App.vue                 // 根组件
    |-main.ts                 // 入口
    |-route.ts                // 路由配置
    |-shims-tsx.d.ts          // tsx模块注入
    |-shims-vue.d.ts          // vue模块注入
    |-store.ts                // vuex配置
  |-tests                     // 测试文件目录
    |-unit                    // 单元测试文件目录
      |-example.spec.ts
  |-.browserslistrc           // 
  |-.gitignore                // git忽略文件
  |-babel.config.js           // babel配置
  |-jest.config.js            // jest配置
  |-package.json              // 
  |-postcss.config.js         // postcss配置
  |-tsconfig.json             // ts配置
  |-tslint.json               // tslint相关配置
  |-yarn.lock

```
### 工程改造
如上创建的工程, 在实际项目当中, 可能无法适用, 这里稍微做些改造

```
|-vue-typescript-demo
  |-public                    // 静态资源文件                
    |-favicon.ico
    |-index.html
  |-src                       // 源代码
    |-assets                  // 资源文件目录 
      |-logo.png
    |-components              // 公用组件
      |-HelloWorld.vue
    |-views                   // 视图组件
      |-About.vue
      |-Home.vue
    |-App.vue                 // 根组件
    |-main.ts                 // 入口
    |-route                   // 路由配置
      |-index.ts
    |-shims-tsx.d.ts          // tsx模块注入
    |-shims-vue.d.ts          // vue模块注入
    |-store                   // vuex配置
      |-index.ts
    |-service                 // 服务相关
    |-utils                   // 工具方法
  |-tests                     // 测试文件目录
    |-unit                    // 单元测试文件目录
      |-example.spec.ts
  |-.browserslistrc           // 
  |-.gitignore                // git忽略文件
  |-babel.config.js           // babel配置
  |-jest.config.js            // jest配置
  |-package.json              // 
  |-postcss.config.js         // postcss配置
  |-tsconfig.json             // ts配置
  |-tslint.json               // tslint相关配置
  |-yarn.lock

```
