---
title: 关于vue（全家桶）的一些使用心得
tags:
  - vue
  - vuex
  - axios
  - webpack
  - es6+
categories:
  - vue
description: vue重够jquery项目之后的一些心得
abbrlink: da970c1a
date: 2018-07-15 15:28:46
---
## 写在前面

最早之前开发的项目随着业务逻辑的迭代，到达现在实在让人无法接受，于是不得不进行了重构，紧锣密鼓的几个月之后终于完成。在这里说一下自己的一些感受。

## 关于vue-cli

vue-cli对vue进行了非常多的处理，尽量让开发者可以专心处理业务的逻辑而不用关心底层的部分。尽管如此，还是需要另外配置很多东西。

### 预处理器（eg:sass）

+ 新版本的脚手架工具配置好了预处理器的部分，但没有集成预处理语言，也就是说，你不再需要配置预处理器，但还是应该install它。
+ 在一些情况下， sass的编译会出现异常。如果你能确信自己写的没有错，那问题确实出现在sass上，一般情况下sass的语法无法处理多层级的样式叠加。例如：我的项目引用了swiper，并全局使用swiper。.css。之后，又将swiper封装为组件，并给组件一些额外的样式，最后在组件调用时第三次添加特殊的样式，如此叠加css导致sass处理出现了问题。这个时候需要`deep`模式。

  ```css
  /deep/ .my-swiper{
    color: red;
  }
  ```

### webpack

+ host 0.0.0.0
开发移动应用，需要随时在手机上观察效果。在`package.json`添加

```json
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --host 0.0.0.0",
   },
```

+ 关于背景图打包后出错的问题
  开发大型项目当然需要对src目录做一些修改，但添加层级也会导致webpack打包出错。我的项目通过分割组件构成，组建内部专属的图片直接放在组件文件内部。具体结构是这样的

  ```shell
  ├─src
  │  ├─assets
  │  │  ├─images
  │  │  ├─js
  │  │  ├─css
  │  │  ├─font
  │  ├─ pages
  │  │  ├─Index
  │  │  │ ├─Index.vue
  │  │  │ ├─1.jpg
  │  │  ├─Mine
  │  │  ├─...
  ```

  这个时候图片打包需要重新配置

  ```js build/utils.js
  function generateLoaders (loader, loaderOptions) {
    // ...
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../' // add
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
    ```

### 关于axios

axios的配置我想说的只有拦截器。可以在请求或响应被 then 或 catch 处理前拦截它们

```js
import axios from 'axios'
import {Base64} from 'js-base64'

import Router from '@/router/index'

const $axios = axios.create({
  baseURL: hostURL + 'TouchStoneServiceNew'
})

$axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.headers['Authorization'] = authorization
  return config
}, function (error) {
  return Promise.reject(error)
})

$axios.interceptors.response.use(
  response => {
    if (response.data.resultCode === '505' || response.data.resultCode === '506') {
      setTimeout(() => {
        Router.push({
          name: 'loginRegister',
        })
      }, 2000)
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401: // 返回 401 跳转到登录页面
            Router.push({
              path: 'loginRegister',
              query: {redirect: Router.currentRoute.fullPath}
            })
      }
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  })
```

在请求发送之前向header添加content-type和authorization
请求返回之后拦截状态做处理

### vuex

vuex用来管理vue状态确实很方便，但**只能在组件中需要共享的数据才使用vuex，简单地说就是路由不会跳转**。因为vuex虽然保存数据，但因为vue本身就是单页项目，如果用户刷新网页就全部丢失了。一些重要的信息海慧寺因该保存在cookie和localstorage里。至于语法可以到官网查看，非常详细。
