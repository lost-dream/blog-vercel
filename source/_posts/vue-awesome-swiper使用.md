title: vue-awesome-swiper使用
tags: [vue,carousel]
date: 2017-10-17 10:27:19
categories: [swiper]
description: 关于vue + swiper的使用
---
[vue-awesome-swiper](https://www.npmjs.com/package/vue-awesome-swiper)是一款基于vue2.0开发的轮播插件，支持所有swiper3的API及配置，非常强大。于是兴高采烈的粘贴官方代码之后发现根本没用。每一个swiper-slide竖直排列，导致布局全乱。个人觉得这是官网的一个小失误。其实解决很简单，是因为官网没有加载css文件导致布局乱掉，css文件是在另一个swiper包里，需要单独引用（template.vue）：
```
import "swiper/dist/css/swiper.css"     or      require("swiper/dist/css/swiper")
```
引用之后马上就好了。附源码
>步骤一 : 安装插件
```
npm i vue-awesome-swiper -S
```
>步骤二 : 全局引用（main.js）
```
import Vue from 'vue'
import swiper from 'vue-awesome-swiper'
Vue.use(swiper)
```
>步骤三 : 组件使用（template.vue）
```
<template>
  <div>  
    <swiper :options="swiperOption"  ref="mySwiper">  
      <swiper-slide v-for="0 in 7">  
        <img src="xxx.jpg" />
      </swiper-slide>  
    </swiper>  
    </div>  
</template>  

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'   //只是加入了一行代码引入css文件
  export default {
    components: { swiper, swiperSlide },
    data () {
      return {
        notNextTick: true,
        swiperOption: {
                //支持所有swiper3配置或者参考官方教程
                ...
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted () {
      this.swiper.slideTo(1, 1000,false)
    }
  }
</script>
<style scoped>
	...
</style>
```
绝大部分是官方示例源码，具体使用参考[官方教程](https://www.npmjs.com/package/vue-awesome-swiper)，API和配置参考[swiper3官网](http://www.swiper.com.cn/api/index.html)。