title: swiper-animate的使用
tags: [carousel,animate]
date: 2018-02-03 17:39:52
categories: [swiper]
description: 使用swiper-animate创建自己的动画
---
使用swiper创建动画时，有时需要制作一些css的动画丰富你的网页。swiper提供了快速制作css动画效果的小插件，适用于所有版本swiper。
> **该插件不适用于loop模式**
## 引用 [swiper.animate.min.js](https://pan.baidu.com/s/1i5U4jcD) 和 [animate.css](https://cdn.bootcss.com/animate.css/3.5.2/animate.min.css)
```
//  使用script引入
<head>
    ...
    <link rel="stylesheet" href="swiper.min.css">
    <link rel="stylesheet" href="animate.min.css">
    <script src="swiper.min.js"></script>
    <script src="swiper.animate.min.js"></script>
    ...
</head>

//  使用模块引入
import swiper from "vue-awesome-swiper"
import "swiper/dist/css/swiper.css"
import "animate.css"
import import {swiperAnimateCache, swiperAnimate, clearSwiperAnimate} from 'swiper-animate-cn'
```
## 在swiper配置项中加入以下内容
```
// swiper4.x
swiperOptions = {
  ...
  on:{
    init: function(){
      swiperAnimateCache(this); //隐藏动画元素 
      swiperAnimate(this); //初始化完成开始动画
    }, 
    slideChangeTransitionEnd: function(){ 
      swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
    } 
  }
  ...
}

// swiper3.x、swiper2.x
swiperOptions = {
  ...
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
  ...
}
```
## 添加动画
在需要运动的元素上面增加类名 **ani** ，和其他的类似插件相同，Swiper Animate需要指定几个参数：
+ swiper-animate-effect：切换效果，例如 fadeInUp 
+ swiper-animate-duration：可选，动画持续时间（单位秒），例如 0.5s
+ swiper-animate-delay：可选，动画延迟时间（单位秒），例如 0.3s
```
<p class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">这个元素会在延时0.3s之后执行fadeInUp动画，整个动画持续0.5s</p>
```
## 添加自定义动画
事实上，这款插件不仅支持animate.css动画，也支持自定义的动画。只需要你自己定义动画，然后将`swiper-animate-effect`设置成你的动画名就可以了。
> 小技巧: 你可以给自己的动画定义特殊的类名，来规定动画的其他参数。
```
<!-- my_ani.css -->
.my_ani{
    animation-timing-function: linear;
}
@keyframes my_ani {
  from {
    opacity: 0
  }
  to{
    opacity: 1
  }
}


import "my_ani.css"
<p class="ani my_ani" swiper-animate-effect="my_ani" swiper-animate-duration="1s" swiper-animate-delay="0">这个元素会在一秒之内改变透明度，并且因为增加了my_ani类名。该动画将以匀速执行</p>
```

