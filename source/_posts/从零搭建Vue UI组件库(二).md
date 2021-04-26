---
title: 从零搭建Vue UI组件库(二)
date: 2021-04-15 11:17:57
tags: [Vue, adminUI]
categories: [adminUI]
description: 尝试搭建自己的Vue UI 组件库, 持续更新(大概)
---

上一篇结束，使用 webpack 搭建了一个本地服务，事实上还不算项目模板，这篇的目的是编写一个基础的 HelloWorld 组件

## 创建组件

在 `packages/hello`中新建`src`文件夹，存放 vue 源文件，新建 `index.js`用来暴露和挂载组件

```javascript
  // src/index.vue
  <template>
    <div>
      <h2>Hello, {{ name }} !</h2>
    </div>
  </template>

  <script>
    import { defineComponent } from 'vue'
    export default defineComponent({
      name: 'Hello',
      props: {
        name: {
          type: String,
          default: 'admin UI'
        }
      }
    })
  </script>

  // index.js
  import Hello from './src/index.vue'
  // 关于 vue 插件，不熟悉的可以去看一下 vue 官网
  Hello.install = app => {
    app.component(Hello.name, Hello)
  }

  export default Hello
```

然后在`website`文件中引用组件，查看效果

```javascript
  <template>
    <div class="app">
      <Hello :name="name"></Hello>
    </div>
  </template>

  <script>
    import { defineComponent, reactive, toRefs } from 'vue'
    import Hello from '../packages/hello'

    export default defineComponent({
      name: 'app',
      components: {
        Hello
      },
      setup(props, ctx) {
        const state = reactive({
          name: 'admin ui'
        })

        return {
          ...toRefs(state)
        }
      }
    })
  </script>
```

开发阶段，这样可以快速调试组件，确认组件功能完成后，就需要导出组件。可以预见到的是，以后会有很多个组件需要导出，因此需要一个统一的出口。参照 `element-plus`，把出口文件定义为`packages/admin-ui/index.js`

```javascript
  import Hello from '../hello'

  const components = [Hello]

  const install = app => {
    components.forEach(component => {
      app.component(component.name, component)
    })
  }

  export {
    Hello,
    install
  }

  export default {
    install
  }
```

## 打包配置

`build`文件夹中新增`webpack.config.build.js`

```javascript
  'use strict'
  const path = require('path')
  const { VueLoaderPlugin } = require('vue-loader')

  module.exports = {
    mode: 'production',
    entry: {
      'adminUI': './packages/admin-ui/index.js'
    },
    output: {
      path: path.resolve(__dirname, '../lib'), // 出口目录
      publicPath: '/lib/',
      library: 'adminUI', // 包名
      filename: 'index.js', // 文件名
      libraryTarget: 'umd',
      umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    },
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
    ]
  }

```

`package.json`新增打包命令`"build": "webpack --config build/webpack.config.build.js"`
使用`yarn build`,会在根目录生成`lib`文件夹，包含`index.js`文件，就是我们最后输出的文件

## 预览

本地调用打包后的组件库，查看效果。修改`website`中的`index.js`

```javascript
  import {createApp} from 'vue'
  import App from './index.vue'
  import AdminUI from '../lib'

  createApp(App).use(AdminUI).mount('#app')
```

删除`website/index.vue`中导入的组件

```javascript
  <template>
    <div class="app">
      <Hello :name="name"></Hello>
    </div>
  </template>

  <script>
    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
      name: 'app',
      setup(props, ctx) {
        const state = reactive({
          name: 'admin ui'
        })

        return {
          ...toRefs(state)
        }
      }
    })
  </script>
```

运行项目，会发现结果完全一致。说明组件打包是没有问题的，接下来只要把`lib`文件夹上传到 npm,就可以像`element-ui`一样使用啦！

## next

虽然很简陋，但想要的功能第一步已经实现了，接下来我先不打算上传 npm，我的计划有以下几个：

+ [ ] 增加 eslint/prettier/lint-staged,保证代码结构
+ [ ] 添加 typescript，使用 ts 开发
+ [ ] 结合 vuepress,使用 MD 作为文档和展示组件 demo
