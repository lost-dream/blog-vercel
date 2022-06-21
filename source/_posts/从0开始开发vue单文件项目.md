---
title: 从0开始开发vue单文件项目
tags:
  - vue
  - webpack
categories:
  - webpack
description: 从0开始自己搭建vue脚手架
abbrlink: 9da38666
date: 2019-04-02 19:44:31
---
都说软件开发不需要重复造轮子。但不得不说自己造轮子是掌握和巩固知识点最好的办法。这篇文章带大家从0开始自己写一个最简单的vue脚手架。

## 创建项目

创建一个空文件夹，执行`npm init`，生成一个npm项目。填写一些你认为有用的信息。并在根目录下创建一个index.js文件，作为npm项目的入口。

## 安装依赖

### 安装webpack

首先安装webpack。如果用的是webpack4.x版本，同时还需要安装webpack-cli才行。

```nodemon
npm i -D webpack webpack-cli
```

### 管理webpack

在根目录创建一个webpack.config.js，在这里管理webpack。创建一个src文件夹来管理源码。在src文件夹中创建index.js作为入口文件（其实就是脚手架中的main文件）。参照vue脚手架，我们规定最后打包目录为dist。此时文件的目录结构为

```shell
│  index.js
│  package.json
│  webpack.config.js
│
│
└─src
        index.js
```

而webpack.config.js的内容为

```javascript
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  }
}
```

为此我们需要安装基本的loader

+ 编译css的loader和sass本身

```nodemon
npm i -D style-loader css-loader sass-loader node-sass
```

+ 编译js的loader

> 如果是babel8.x,必需要同时安装@babel/core @babel/preset-env

```nodemon
npm i -D babel-loader @babel/core @babel/preset-env
```

+ 编译vue的loader

```nodemon
npm i -D vue-loader vue-template-compiler
npm i -S vue
```

把这些加到webpack.config.js里，文件变成了这样

```javascript
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
```

### 然后向webpack添加开发环境运行的配置

```nodemon
npm i -D clean-webpack-plugin html-webpack-plugin webpack-dev-server
```

使用webpack-dev-server来启动开发环境，使用webpack进行打包。在这个操作当中，`html-webpack-plugin`需要一个模板来定义文件的结构，因为我们需要的不是一个空白模板，而希望模板中至少要有一个`<div id="app"></div>`。根据插件，我们还需要在跟目录创建一个public文件夹。里面放的是渲染`html-webpack-plugin`插件的模板。那么现在，整个项目结构变成了这样

```shell
│  index.js
│  package.json
│  webpack.config.js
│
├─public
│      index.html
│
└─src
        index.js
```

然后向`package.json`添加执行命令

```json
{
  // ...
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server --open"
  }
  // ...
}
```

并且向`webpack.config.json`继续补充

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  devServer: {
    contentBase:  './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'hello, vue_title'
    })
  ]
}
```

### 创建真正的vue脚手架

如果你能执行到上面的步骤结束没有出错，那么实际上你的webpack已经没有问题了。虽然看上去是如此的简单。接下来我们只需要把精力放到如何编译vue单文件组件。在src文件夹中创建一个index.vue文件如下

```vue
<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello, vue!!!'
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  color: red
}
</style>
```

并编辑同目录中的index.js

```js
import Vue from 'vue'
import App from './index.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
```

最后，我们的项目长成了这样

```shell
│  index.js
│  package.json
│  webpack.config.js
│
├─public
│      index.html
└─src
        index.js
        index.vue
```

是不是发现和vue-cli3.x脚手架的结构完全一样？事实上vue-cli3.x就是这个结构来的。只不过它把webpack.config.js安装到了vue-cli-service里，暴露出来vue.config.js来管理。

## 最后，这个模板的地址[在这里](https://github.com/lost-dream/webpack-demo)
