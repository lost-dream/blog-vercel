---
title: vue3 脚手架（五）
tags: [vue3, vite]
date: 2021-07-07 11:00:41
categories: [vue]
description: 持续优化开发环境
top: 10
---

> 本文仓库地址为: [vue3-template](https://github.com/lost-dream/vue3-template)

## css/scss 优化

经验丰富的老开发都知道 css 定义模块和变量的重要性，这里我不打算细说，而且在之前的项目搭建中也专门给 css 预留了模块的位置。那么在使用 `css/scss` 变量、方法的时候还是会存在一些问题:

+ 所有的变量和方法需要引入才可以使用，也就是说我的每一页都需要先引入 `var.scss` 和 `mixins.scss` 才可以使用，太麻烦了...
+ 目前常见的 UI 框架当中大部分组件都有直接的定义组件颜色的属性，或者就算没有直接的属性可以修改，开发中我们也更习惯直接在行内修改组件的样式，那么，如何把我在 `scss` 中定义的变量，使用在 `vue` 的 `js`中呢？

先说前者，在 `webpack` 的时候，可以使用 `sass-resources-loader` 处理，`vite`中则是有直接的[配置项](https://cn.vitejs.dev/config/#css-preprocessoroptions)可以实现。

```js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables/index.scss";`
      }
    }
  }
}
```

而且 `sass` 支持导出变量，使用 `:export` 可以导出 `sass`变量

```scss
$--color-primary: rgba(21, 134, 179, 0.9);

:export {
  themeColor: $--color-primary;
}
```

直接导入就可以拿到颜色的，但是直接获取的结果是纯文本，需要处理一下保存成 `json` 才可以使用。按照惯例，把它放在 `hooks`中

```js /src/hooks/glob.ts
import styles from '@/styles/variables/var.scss'
// 可以查看一下直接引入的结果
console.log(styles)
export const useGlobCss = (): any => {
  const cssStr = styles
    .replace(':export', '')
    .replaceAll(';', ',')
    .replace(/(?:\s*['"]*)?((rgb.+\))|(#?[a-zA-Z0-9]+))(?:['"]*\s*)?/g, "'$1'")
  const css = eval(`(${cssStr})`)
  return css
}
```

在使用的地方引用即可

```diff /src/views/Home/index.vue
<template>
+  <el-button :style="{ color: styles.themeColor }">按钮</el-button>
</template>

<script lang="ts">
+  import { import { useGlobCss } from '@/hooks/globCss' }
   setup() {
+    const styles = useGlobCss()
     return {
+      styles
     }
   }
</script>
```

## 添加开发环境 mock 数据

添加 `mockjs` 和 `vite-plugin-mock`

```shell
yarn add mockjs
yarn add vite-plugin-mock -D
```

修改 `vite-config.ts`

```diff
+  import { viteMockServe } from 'vite-plugin-mock'

  plugins: [
    vue(),
+   viteMockServe({
+     mockPath: 'mock',
+     localEnabled: command === 'serve',
+     prodEnabled: false,
    }),
]
```

修改 `mock`文件夹中的模拟请求文件，返回数据的类型为 `vite-plugin-mock` 定义的 `MockMethod`
