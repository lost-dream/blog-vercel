---
title: 从零搭建Vue UI组件库(一)
date: 2021-04-15 09:55:41
tags: [Vue adminUI]
categories: [adminUI]
description: 尝试搭建自己的Vue UI 组件库, 持续更新(大概)
---

Vue3 发布以来,一直在学习, 最近萌生出想要尝试自己搭建组件库的想法,正赶上开发任务不重,就在此尝试一下,一来提升一下能力,二来看能不能搭建成功。

[附上仓库地址](https://github.com/lost-dream/zcm-admin-ui)

> 我的开发是从零搭建，但主要思路和结构参考了[element-plus](https://github.com/element-plus/element-plus),感谢饿了么团队提供的思路

## 初始化项目

因为是从零开始搭建，就不用 vue-cli 了，创建空文件夹开始

```shell
  mkdir admin-ui
  cd admin-ui && npm init -y
```

参照`element-plus`，项目使用[lerna](https://github.com/lerna/lerna)初始化，它优化了使用 git 和 npm 管理多包存储库的工作流，有兴趣可以研究一下

> 我也是刚刚接触这个框架，有写错的地方欢迎纠错

+ 创建`lerna`项目

  ```shell
    npm install lerna -g
    cd admin-ui
    lerna init # 使用默认的固定模式

    # Add packages
    cd packages
    mkdir hello button admin-ui input

    #分别进入目录初始化成包
    cd hello
    npm init -y
    cd ../button
    npm init -y
    cd ../admin-ui
    npm init -y
    cd ../input
    npm init -y
  ```

+ 修改项目配置

  ```shell
    # package.json 文件加入
    "private": true,
    "workspaces": [
      "packages/*"
    ]

    # lerna.json 文件加入
    "useWorkspaces": true,
    "npmClient": "yarn" # 默认使用 yarn 作为包管理工具
  ```

这样一个lerna脚手架就创建完成了，更多的命令脚本可以自己去看文档（主要是我现在也不会）。

## 安装依赖

上面已经定义好了默认使用 yarn 作为包管理工具，所以首先要保证全局有 yarn，然后执行`yarn add package -W`就可以了，这里有几点需要注意：

+ `yarn`没有必要作为项目依赖写入，因为我更希望你把它装在全局
+ 因为上面定义过`workspace`的原因，直接使用`yarn add package`会报错，需要在后面加上`-W`
+ 项目本身定义为 UI 框架，因此`vue`相关的依赖也不需要加入到`dependencies`中，事实上绝大部分依赖都应该是开发依赖。

本着上面的原则，一个基本的 vue 项目应该包含以下依赖：
`vue、webpack、webpack-cli、webpack-dev-server、@babel/core、babel-loader、css-loader、html-webpack-plugin、vue-loader、vue-template-compile`

> 因为 webpack5 更新之后没有仔细研究过，加上 element-ui 也使用 webpack4，因此本项目使用的是 webpack4、webpack-cli3

## 创建项目模板

安装好依赖，需要添加 vue 模板，参照 element-plus,在更目录新建`website`文件夹，加入`index.html、index.js、index.vue`

+ index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dt-ui</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
  </html>
  ```

+ index.js

  ```javascript
  // index.js
  import {createApp} from 'vue'
  import App from './index.vue'

  createApp(App).mount('#app')
  ```

+ index.vue

  ```javascript
  <template>
    <div class="app">
      hello,admin ui
    </div>
  </template>

  <script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'app'
  })
  </script>
  ```

## 启动本地服务

根目录新建`build`文件夹，新增`webpack.config.base.js`

```javascript
  'use strict'
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const { VueLoaderPlugin } = require('vue-loader')
  const path = require('path')

  module.exports = {
    entry: path.resolve(__dirname, '../website/index.js'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './website/index.html',
        filename: './index.html'
      }),
      new VueLoaderPlugin()
    ]
  }
```

`package.json`添加命令 `"dev": "webpack-dev-server --config build/webpack.config.base.js"`,运行`yarn dev`就可以在 8080 端口运行服务了

> 如果这时没有运行成功，多半是报错，缺少其他的开发依赖。上面列举的是我知道的必须的 vue 项目依赖，并不完整。可以根据报错，缺什么，安装什么，最后一定没有问题。

最后，补上当前的项目目录

```shell
├── build
│   └── webpack.config.base.js
├── lerna.json
├── package.json
├── packages
│   ├── admin-ui
│   │   └── package.json
│   ├── button
│   │   └── package.json
│   ├── hello
│   │   └── package.json
│   └── input
│       └── package.json
├── website
│   ├── index.html
│   ├── index.js
│   └── index.vue
├── yarn-error.log
└── yarn.lock
```
