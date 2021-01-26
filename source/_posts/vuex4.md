---
title: vuex4 + typescript 配置
tags: [vue, vue3]
date: 2021-01-26 11:11:50
categories: [vue, vue3]
description: vue3 + vuex4 + typescript 配置
---
说起来惭愧,vue3快正式发布了,我才开始研究语法,好在除了书写习惯需要改变之外,vue 本身的变动并不是很大,但是配合 typescript 之后就不一样了,这篇说一下我的vue3 配置 -- vuex 篇

> 参照 [vuex 官方文档](https://next.vuex.vuejs.org/guide/typescript-support.html)

## 创建文件结构

基本结构并没有太大变化,仍然是`store`文件夹,但有两点需要注意:

+ 原本的 js 文件,现在全变成 ts 文件
+ 因为是 ts 文件,对应的 module 下都创建`interface.ts`,标识该模块的类型

结构大致如下:

```javascript
── store
   ├── index.ts // 顶层state
   ├── interface.ts // 顶层 state 类型
   └── modules
       └── test
           ├── index.ts // test模块 state
           └── interface.ts // test模块 state 类型
       └── user
           ├── index.ts //uer 模块
           └── interface.ts // user模块 state 类型
```

## 配置顶层 state

+ 定义顶层 state 的数据类型, 假设有全局 state,需要定义

```typescript
// store/interface.ts
export default interface RootState {
  test: string
}
```

+ 在`store/index.ts`中,调用 state 定义,晗需要生成一个唯一的 key,保证 store 实例注册时唯一

```typescript
// store/index.ts
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import RootState from './interface'

export default createStore<RootState>({
  state: {
    test: ''
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
export const key: InjectionKey<Store<RootState>> = Symbol('vue-store')
```

+ 生成的 key 在`main.ts`注册时作为第二个参数引入

```typescript
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import router from './router'
import store, { key } from './store'

app
  .use(store, key)
  .use(router)
  .mount('#app')
```

+ 将 key 添加在`store/index.ts`中统一导出,使用的时候就可以直接调用

```typescript
// 修改 index.ts 为以下
import { createStore, Store, useStore as baseUseStore } from 'vuex'

export default createStore<RootState>({
  state: {
    test: ''
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
export const key: InjectionKey<Store<RootState>> = Symbol('vue-store')

export function useStore() {
  return baseUseStore(key)
}
```

这样, vue组件中可以通过`Composition API`调用

```javascript
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    return {}
  }
})
```

到这里,定义在顶层的各种数据和方法,都可以不需要定义类型直接使用了,**但是定义在子模块(modules)的部分还不行,需要继续配置**

## 定义子模块(modules)

+ 还是定义 state,以 user 模块举例,类型定义在`store/modules/user/interface/ts`,有两个字段:name, age

```typescript
  // store/modules/user/interface.ts
  export default interface UserState {
    name: string
    age: number
  }
```

+ 引入对应模块的数据类型,按照官网教程提示,子模块使用泛型定义类型,第一个泛型参数是当前子模块类型,第二个参数是顶层模块类型,定义之后会在所有使用 state 的地方自动断言,不需要重复定义

```typescript
// store/modules/user/index.ts
import { Module } from 'vuex'
import RootState from '@/store/interface'
import UserState from './interface'

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    name: 'xxx',
    age: 10
  },
  mutations: {
    AGE_ADD: state => {
      state.age++
    }
  }
}

export default userModule
```

+ 然后在`store/interface.ts`中增加一个全量的 state 类型,之后的 state 类型使用全量的类型即可,后续如果继续新增模块,也要更新到全量类型中来

```typescript
// store/interface.ts

import userState from './modules/user/interface'

export default interface RootState {
  test: string
}

// 最后集合成所有模块的 state 类型
export interface AllState extends RootState {
  user: userState
}

```

+ 最后把全局的 state 注入到全局的 vuex 中,原理等同于定义子模块的类型,使用泛型定义全局 state

```javascript
// store/index.ts

import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import RootState from './interface'
import user from './modules/user'
import { AllState } from './interface'

export default createStore<RootState>({
  state: {
    test: ''
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user
  }
})
export const key: InjectionKey<Store<RootState>> = Symbol('vue-store')

// 泛型定义所有子模块的 state
export function useStore<T = AllState>() {
  return baseUseStore<T>(key)
}
```

然后,在vue 模块中就可以像以前一样轻松地的使用了

```vue
<template>
  <div class="hello">
    <button @click="addAge">+</button>
    {{ age }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const store = useStore()
    const age = computed(() => store.state.user.age)
    const addAge = () => {
      store.commit('user/AGE_ADD')
    }
    return {
      age,
      addAge
    }
  }
})
</script>
```

## 总结

+ state类型定义单独放在一个文件中方便管理
+ 各个子模块的类型定义单独放在子模块的文件夹中处理, 最后再集成在根节点上
+ 使用 vuex 命名空间, 规范模块
