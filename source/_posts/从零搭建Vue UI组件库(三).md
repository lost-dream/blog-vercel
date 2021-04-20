---
title: 从零搭建Vue UI组件库(三)
date: 2021-04-15 11:17:57
tags: [Vue adminUI]
categories: [adminUI]
description: 尝试搭建自己的Vue UI 组件库, 持续更新(大概)
---

## 加入 typescript/sass

### 添加 typescript、ts-loader、sass、sass-loader

```
yarn add -D typescript ts-loader sass sass-loader -W
```

> ts-loader@8.1.0 报错，这里选择了 v8.0.3; sass-loader@11.0.1报错，选择了 v10.1.1,如果你的 loader 运行没有报错可以忽略。

### 添加 tsconfig.json

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "declaration": true,
    "noImplicitAny": false,
    "removeComments": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "jsx": "preserve",
    "noLib": false,
    "target": "es6",
    "baseUrl": ".",
    "sourceMap": true,
    "lib": ["ESNext", "DOM"],
    "allowSyntheticDefaultImports": true,
    "paths": {
      "@packages/*": ["packages/*"],
      "@website/*": ["website/*"]
    }
  },
  "exclude": ["node_modules", "lib"]
}
```

### 添加 ts 声明文件

根目录新建`types`文件夹，ts 的所有声明放在这里。目前只新增`shims-vue.d.ts`

```typescript
  declare module '*.vue' {
    import { defineComponent } from 'vue'
    const Component: ReturnType<typeof defineComponent>
    export default Component
  }
```

### 修改对应 js 文件为 ts 文件, css改为 scss

把 `packages`对应包的 js文件和`website`下的`index.js`全部改为 ts 结尾；所有 vue 组件的 `script` 增加`lang=“ts”`，`style`增加`lang=”scss“`

### 修改 webpack 配置

增加 ts-loader 和 sass-loader配置；修改入口文件为 ts 结尾；添加`resolve.extensions`，支持 ts 文件引用

```diff
// build/webpack.config.base.js
'use strict'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
-  entry: path.resolve(__dirname, '../website/index.js'),
+  entry: path.resolve(__dirname, '../website/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },
+  resolve: {
+    alias: {
+      '@package': path.resolve(__dirname, '../packages'),
+      '@website': path.resolve(__dirname, '../website')
+    },
+    extensions: ['.ts', '.js', '.json']
+  },
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
      },
+      {
+        test: /\.scss$/,
+        use: [
+          { loader: 'style-loader' },
+          {
+            loader: 'css-loader',
+            options: { sourceMap: true }
+          },
+          {
+            loader: 'sass-loader'
+          }
+        ]
+      },
+      {
+        test: /\.tsx?$/,
+        use: [
+          {
+            loader: 'babel-loader'
+          },
+          {
+            loader: 'ts-loader',
+            options: {
+              transpileOnly: true
+            }
+          }
+        ],
+        exclude: /node_modules/
+      }
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

// build/webpack.config.build.js
'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  entry: {
-    adminUI: './packages/admin-ui/index.js'
+    adminUI: './packages/admin-ui/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../lib'), // 出口目录
    publicPath: '/lib/',
    library: 'adminUI', // 包名
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
+  resolve: {
+    alias: {
+      '@package': path.resolve(__dirname, '../packages'),
+      '@website': path.resolve(__dirname, '../website')
+    },
+    extensions: ['.ts', '.js', '.json']
+  },
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
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
+      {
+        test: /\.scss$/,
+        use: [
+          { loader: 'style-loader' },
+          {
+            loader: 'css-loader',
+            options: { sourceMap: true }
+          },
+          {
+            loader: 'sass-loader'
+          }
+        ]
+      },
+      {
+        test: /\.tsx?$/,
+        use: [
+          {
+            loader: 'babel-loader'
+          },
+          {
+            loader: 'ts-loader',
+            options: {
+              transpileOnly: true
+            }
+          }
+        ],
+        exclude: /node_modules/
+      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
```
