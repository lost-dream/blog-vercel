---
title: 监听vuex中state变化
tags:
  - Vue
  - Vuex
categories:
  - Vue
  - Vuex
description: 业务中遇到的监听 vuex 变化的功能
abbrlink: 5fee686e
date: 2021-03-09 14:46:08
---
书说简短,直接开整.需求是这样的: 点击变更联系人按钮,跳转到选人列表,点击人员,回到前一页,触发更换联系人功能.

+ 点击更改按钮
![点击按钮](/blog/img/vuex-state-1.png)
+ 选择具体成员
![选择人员](/blog/img/vuex-state-2.png)
+ 触发更改操作
![ 执行操作](/blog/img/vuex-state-3.png)

因为涉及到路由跳转,所以我的实现方法是,第二步中选择的人员信息保存在了 vuex 里,因此整个过程遇到的难点如下:

+ vuex 中 state 的值怎么监听到变化?

vuex 中的数据监听有两种方式,一种可以放在 `watch`中直接监听

```javascript
<script>
  export default {
    // ...
    watch: {
      '$store.state.user'(val) {
        console.log(val)
      }
    }
  }
</script>
```

但在本业务中,比较新旧联系人是否是同一个,以及文案的拼接,都逻辑依赖接口返回的数据信息,单号`PC20210308002`和原有联系人`admin1`是需要等接口返回值的,这样的话就不能写在 `watch`里,所以使用了第二种方法:[使用 vuex 自带的 watch 功能](https://vuex.vuejs.org/zh/api/#watch)

```JavaScript
TEST_API().then(res => {
  // 返回需要的信息 res...

  this.$store.watch(
    state => {
      return state.user
    },
    value => {
      // 变化的值 value
      // do something..
    },
    {
      // 类似 vue 的 watch 参数,如果有需要的话
      deep: true,
      immediate: true
    }
  )
})
```

这样可以保证触发的逻辑是在数据渲染后,但是任然存在问题: **watch方法会随着路由的 history 多次触发,现象类似于 EventBus 的触发**. 其实文档有提到, 该`watch`方法会返回一个 function,调用此方法即可停止监听,所以只要再稍加修改:

```JavaScript
mounted() {
  TEST_API().then(res=> {
     this.eventHub = this.$store(/* ... */)
  })
},
beforeDestroy() {
  this.eventHub()
}
```

其实还是 eventBus 的思想啦...
