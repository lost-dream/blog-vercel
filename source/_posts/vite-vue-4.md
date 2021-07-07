---
title: vue3 脚手架（四）
tags: [vue3, vite]
date: 2021-07-06 10:36:18
categories: [vue]
description: 使用 vite 搭建 vue3 项目
name: vscode
top: 10
---

> 本文仓库地址为: [vue3-template](https://github.com/lost-dream/vue3-template)
> 书写过程中未必包含每一个细节，包括一些开发环境的依赖添加，包括一些 `utils` 函数的实现，包括一些很大的比如 `axios`模块，我都可能漏写或者没有精力详细写进去，有兴趣的可以自己去看源码

## element-ui

安装 `element-plus`

```shell
yarn add element-plus@latest
```

新建 `src/plugins`文件夹，管理第三方插件。该目录下新建 `index.ts` 作为出口文件暴露所有插件。新建 `element-ui` 文件夹，编辑 `element-plus` 相关配置。如果再添加其他插件，参考 `element-plus`逻辑。最终结构如下:

```plain
├── plugins
│   ├── index.ts        所有插件汇总统一暴露的出口文件
│   └── element-ui      element-plus 配置文件夹
│       ├── index.ts    js 配置
│       └── index.scss  自定义主题文件
```

```ts
/** src/plugins/element-ui/index.scss */
$--color-primary: pink;

/* 改变 icon 字体路径变量，必需 */
$--font-path: 'node_modules/element-plus/lib/theme-chalk/fonts';
@import 'node_modules/element-plus/packages/theme-chalk/src/index.scss';

/** src/plugins/element-ui/index.ts */
import Element from 'element-plus'
import './index.scss'
import { App } from 'vue'

export function setupElementUI(app: App<Element>) {
  app.config.globalProperties.$ELEMENT = { size: 'medium', zIndex: 3000 }
  app.use(Element)
}

/** src/plugins/index.ts */
import { App } from 'vue'
import { setupElementUI } from './element-ui'

export function setupGlobPlugins(app: App<Element>) {
  setupElementUI(app)
}
```

在 `main.ts` 中注册插件

```diff
+  { setupGlobPlugins } from './plugins'
async function bootstrap() {
+  await setupGlobPlugins(app)
  await setupStore(app)
  await setupRouter(app)

  // 所有组件注册完成
  await router.isReady()
  app.mount('#app')
}
```

## tailwindcss

参考[官方文档](https://tailwindcss.com/docs/guides/vue-3-vite), 安装配置
