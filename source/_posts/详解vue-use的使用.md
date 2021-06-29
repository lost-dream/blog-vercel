---
title: 详解vue.use的使用
tags: [vue, axios]
date: 2019-02-15 16:35:37
categories: [vue]
description: 详解vue.use的使用方法并附上例子
---
vue,use用来安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。因此vue.use()常需要扩展的用法有两个：添加全局的方法（插件是函数）、添加全局的组件（插件是对象）。

## 添加全局方法

> 这里举例将axios添加到全局。

```js @/assets/js/request.js
  import axios from "axios";
  import qs from "qs";
  // 创建axios对象
  let service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000,
    headers: {
      autauthorization: '123456',
      name: 'singleDogNo.1'
      // ...
    }
  });

  // 需要的话加入拦截器

  // 创建get请求
  function get(url, params, headers) {
    let options = {};
    if (params) {
      options.params = params;
    }
    if (headers) {
      options.headers = headers;
    }
    return service.get(url, options);
  }

  // 创建post请求
  function post(url, data, headers) {
    let options = {};
    if (headers) {
      options.headers = headers;
    }
    return service.post(url, qs.stringify(data), options);
  }

  // 将请求挂载到全局
  export default {
    install(Vue) {
      Object.defineProperty(Vue.prototype, "$get", { value: get });
      Object.defineProperty(Vue.prototype, "$post", { value: post });
    }
  };

  // ------------------------- 这里是切换文件的分割线 -------------------------

  // @/main.js
  import request from "@/assets/js/request";

  Vue.use(request);
```

接下来在这个项目中的任何地方你都可以直接使用this.$get和this.$post来发送请求。

## 添加全局的组件

> 这里举例添加一个loding组件

```vue
  <!-- @/components/Loading.vue -->
  <template>
    <div class="loading" v-if="show" @click="close">hello, {{ msg }}</div>
  </template>

  <script>
  export default {
    name: "index",
    props: {
      msg: {
        default: 'loading'
      },
      show: {
        default: true
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  };
  </script>

  <style lang="scss" scoped></style>

  <!-- -------------- 这里是切换文件的分割线 -------------- -->

  <!-- @/plugins/loading.js -->
  import Loading from "@/components/Loading";

  const loading = {
    install(Vue, options) {
      Vue.component("Loading", Loading, options);
    }
  };
  export default loading;

  <!-- -------------- 这里是切换文件的分割线 -------------- -->

  <!-- @/main.js -->
  Vue.use(Loading, {
    // ...
  });
```

然后就可以在项目的任何地方使用`<Loading></Loading>`来引用loading组件，并且同样可以使用@close :show等组件方法，以及自定义的options。
