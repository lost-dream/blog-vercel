---
title: vue3 脚手架（三）
tags:
  - vue3
  - vite
categories:
  - vue
description: vite 环境配置和 vue 全家桶添加
top: 10
abbrlink: acb089d
date: 2021-07-05 08:59:14
---

> 本文仓库地址为: [vue3-template](https://github.com/lost-dream/vue3-template)

开发环境和开发工具初步配置完成，开始加入 `vite脚手架配置` 和 `vue全家桶`

> vue3.x 全家桶语法都有些变化，加上我在尝试 `composition API`语法，也在学习 ts，所以写起来和 vue2.x 会有很大的不同

## vite 脚手架

关于 `vite` 的脚手架具体配置可以到[官方文档](https://cn.vitejs.dev/config/)查看，我这里只是简单配置了一下，更具体的配置可以写具体业务的时候再添加。

```diff vite.config.js
- import { defineConfig } from 'vite'
+ import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
+ import { resolve } from 'path'

- export default defineConfig({
+ export default ({ command }: ConfigEnv): UserConfigExport => {
+   console.log('command :>> ', command)
+   return {
-   plugins: [vue()]
+   plugins: [vue()],
+   resolve: {
+     alias: [
+       {
+         find: /^@\//,
+         replacement: resolve(__dirname, 'src') + '/',
+       },
+       {
+         find: /^\/#\//,
+         replacement: resolve(__dirname, 'types') + '/',
+       },
+     ],
+   },
+ }
-})
+}

```

## vue-router

参考官网，安装 `vue-router`

```shell
yarn add vue-router@4
```

修改路由文件配置

```ts /src/router/index.ts
import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/views/Home/index.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About/index.vue'),
    },
  ] as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// config-router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
```

在 `main.ts` 中加入 `vue-router`

```ts /src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router'

const app = createApp(App)

async function bootstrap() {
  await setupRouter(app)
  await router.isReady()
  app.mount('#app')
}

bootstrap()
```

修改 `app.vue`，加入 `router-view`，创建两个视图`Home`和`About`，测试 `router`是否成功。

**注意: 每一个视图组件都应该遵守以下规范:**

+ 视图组件为文件夹，这样方便管理只属于该模块下的子组件、静态资源、ts 模块等
+ 命名必须遵循首字母大写
+ 入口文件必须为 `index.vue`

## vuex

参考官网，安装 `vuex`

```shell
yarn add vuex@next vuex-persistedstate --save
```

创建 `store`，并分割成模块，**模块结构应该遵循以下规范:**

+ `store` 根目录下创建 `index.ts` 作为出口文件，创建 `types.ts` 作为根目录的 `ts` 类型文件。
+ `store` 根目录下创建 `modules` 文件夹， `modules` 文件夹下创建各自模块的文件，同样的，每个模块下创建 `index.ts` 作为该模块的出口文件，创建 `types.ts` 作为该模块的 `ts` 类型文件。

以 `user` 模块举例，此时 `store` 模块结构为

```plain
├── store
    ├── modules
    │   └── user          用户模块目录
    │       ├── index.ts  用户模块出口文件
    │       └── types.ts  用户模块 ts 类型
    ├── index.ts          vuex 整体出口文件
    └── types.ts          vuex 全局 ts 类型
```

```ts
// store/modules/user/types.ts
export default interface UserState {
  token?: string
  name?: string
}

// store/modules/user/index.ts
import { Module } from 'vuex'
import RootState from '@/store/types'
import UserState from './types'

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    token: 'AUTH_TOKEN_123456',
    name: '赵晨敏',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
  },
}
export default userModule

// store/user/index.ts
import { InjectionKey, App } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { AllState } from './types'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'

export const store = createStore<AllState>({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    user,
  },
})

export const key: InjectionKey<Store<AllState>> = Symbol('vue-store')

export function useStore<T = AllState>(): Store<T> {
  return baseUseStore<T>(key)
}

export function setupStore(app: App<Element>) {
  app.use(store, key)
}

// store/types.ts
import UserState from './modules/user/types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface RootState {}

export interface AllState extends RootState {
  user: UserState
}
```

在 `main.ts` 中加入 `vuex`

```diff
+  import { setupStore } from './store'

async function bootstrap() {
+  await setupStore(app)
  await setupRouter(app)
  await router.isReady()
  app.mount('#app')
}
```

在 `Home/index.vue` 中测试是否正确添加

```html
<template>
  <div class="home">
    {{ name }} -- {{ token }}
    <button @click="changeName('李四')">按钮</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()

    const state = reactive({
      msg: 'hello, home',
    })

    const name = computed(() => store.state.user.name)
    const token = computed(() => store.state.user.token)

    function changeName(name) {
      store.commit('user/SET_NAME', name)
    }

    return {
      ...toRefs(state),
      name,
      token,
      changeName,
    }
  },
})
</script>
```

基本功能已经添加完成了，但作为开发模板还缺少 UI 功能，下一篇补充 UI 框架和 css 框架。
