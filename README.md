# RecommendedPlatform

[数据推荐平台]

## 文档

- https://

## 使用

```bash
npm install # 安装依赖
npm start # 启动应用
```

应用访问: http://127.0.0.1:7001

### 配置说明

```js
`config/config.local.js` 
const EasyWebpack = require('easywebpack-react');
exports.webpack = {
  webpackConfigList: EasyWebpack.getWebpackConfig()
};
```

构建会同时启动两个webpack构建服务, 客户端js构建(build/client), 服务端构建(build/server), 默认端口9000,  webpackConfigList 端口依次递增. 


#### 项目构建

```bash
// 直接运行(编译文件全部在内存里面,本地开发使用)
npm start

// 编译文件到磁盘打包使用(发布正式环境)
npm run build 或者 easywebpack build prod

```

## 项目结构和基本规范

    ├── app
    │   ├── controller
    │   │   ├── test
    │   │   │   └── test.js
    │   ├── extend
    │   ├── lib
    │   ├── middleware
    │   ├── mocks
    │   ├── proxy
    │   ├── router.js
    │   ├── view
    │   │   ├── about                         // 服务器编译的jsbundle文件
    │   │   │   └── about.js
    │   │   ├── home
    │   │   │     └── home.js                 // 服务器编译的jsbundle文件
    │   │   └── layout.js                     // 编译的layout文件
    │   └── web                               // 前端工程目录
    │       ├── asset                         // 存放公共js,css资源
    │       ├── framework                     // 前端公共库和第三方库
    │       │   └── entry                          
    │       │       ├── loader.js              // 根据jsx文件自动生成entry入口文件loader
    │       ├── page                              // 前端页面和webpack构建目录, 也就是webpack打包配置entryDir
    │       │   ├── home                          // 每个页面遵循目录名, js文件名, scss文件名, jsx文件名相同
    │       │   │   ├── home.scss
    │       │   │   ├── home.jsx
    │       │   └── hello                          // 每个页面遵循目录名, js文件名, scss文件名, jsx文件名相同
    │       │       ├── test.css                   // 服务器render渲染时, 传入 render('test/test.js', data)
    │       │       └── test.jsx
    │       ├── store                             
    │       │   ├── app
    │       │   │   ├── actions.js
    │       │   │   ├── getters.js
    │       │   │   ├── index.js
    │       │   │   ├── mutation-type.js
    │       │   │   └── mutations.js
    │       │   └── store.js
    │       └── component                         // 公共业务组件, 比如loading, toast等, 遵循目录名, js文件名, scss文件名, jsx文件名相同
    │           ├── loading
    │           │   ├── loading.scss
    │           │   └── loading.jsx
    │           ├── test
    │           │   ├── test.jsx
    │           │   └── test.scss
    │           └── toast
    │               ├── toast.scss
    │               └── toast.jsx
    ├── config
    │   ├── config.default.js
    │   ├── config.local.js
    │   ├── config.prod.js
    │   ├── config.test.js
    │   └── plugin.js
    ├── doc
    ├── index.js
    ├── webpack.config.js                      // easywebpack-cli 构建配置
    ├── public                                 // webpack编译目录结构, render文件查找目录
    │   ├── static
    │   │   ├── css
    │   │   │   ├── home
    │   │   │   │   ├── home.07012d33.css
    │   │   │   └── test
    │   │   │       ├── test.4bbb32ce.css
    │   │   ├── img
    │   │   │   ├── change_top.4735c57.png
    │   │   │   └── intro.0e66266.png
    │   ├── test
    │   │   └── test.js
    │   └── vendor.js                         // 生成的公共打包库


## 功能实现

### 一.多页面服务器渲染同构实现

#### 1.编写jsx页面

在app/web/page 目录下面创建home目录, home.jsx, home.css文件.

- home.jsx 编写界面逻辑

```js
import React, { Component } from 'react';
import Header from 'component/layout/standard/header/header.jsx';
import List from 'component/home/list.jsx';
import './home.css';
export default class Home extends Component {
  componentDidMount() {
    console.log('----componentDidMount-----');
  }

  render() {
    return <div>
      <Header></Header>
      <div className="main">
        <div className="page-container page-component">
          <List list={this.props.list}></List>
        </div>
      </div>
    </div>;
  }
}
```


#### 2.多页面后端实现

- 创建controller文件home.js

```javascript
exports.index = function* (ctx) {
  yield ctx.render('home/home.js', Model.getPage(1, 10));
};
```

- 添加路由配置

```javascript
app.get('/home', app.controller.home.home.index);
```

### 3.前端渲染

- 创建controller的home.js 添加如下代码

```javascript
exports.client = function* (ctx) {
  yield ctx.renderClient('home/home.js', Model.getPage(1, 10));
};
```

- 添加路由配置

```javascript
app.get('/client', app.controller.home.home.client);
```

## License

[MIT](LICENSE)