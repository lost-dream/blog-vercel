---
title: 关于vue-awesome-swiper以及vue-cli升级随笔
tags: [vue,carousel]
date: 2017-12-10 09:58:04
categories: [swiper]
description: 解决一些关于升级带来的困扰
---
## 关于 vue-cli

vue-cli 在最近更新到了2.9.x版本，新的 vue-lci 模板使用了更高版本的webpack进行打包，因而弃用了 express并改变了构建结构，对我本人目前遇到的问题：

### 如何在基础上设置自己的接口

在之前版本可以在 dev-server.js 中通过express方便的设计路由并插入，而现有版本移除了express并且删除了dev-server.js文件，应该怎么做？新版本中使用了webpack-dev-server，查找文档后发现有一个接口方法为 devServer.before ,可以在这个方法中定义api接口。

```js
// webpack.dev.conf.js

devServer: {
  // ......
  before(app){
    app.get('/api',function (req, res) {
      res.json({
        author: 'lost-dream',
        age: 24,
        sex: 'man'
      })
    });
  }
}
```

### 使用css预处理器sass

新版本中想使用sass(其他预处理器我没有尝试)编译，需要手动配置。

+ 安装依赖 `cnpm install -D node-sass sass-loader`
+ 添加loader

```js
rules: [
  ...
  {
    test: /\.(scss|sass)$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  }
]
```

## 关于vue-awesome-swiper

由于 swiper 更新到 swiper4，因此该插件在最近也得到了升级。首先他优化了文档（之前版本文档不全，为我带来了不少困扰），其次更新了使用的结构和方式，不过无论如何变化，vue-awesome-swiper始终坚持使用swpierAPI，因此有其他问题，还是要到swiper官网寻找答案。