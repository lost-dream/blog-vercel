---
title: css伪元素
tags:
  - css3
categories:
  - css3
description: css3关于伪元素那些你可能不知道的事
abbrlink: 614e4fa6
date: 2019-05-10 15:41:04
---
## 因为一个背景图引发的思考

在最近的项目开发中我遇到了一个并不算麻烦的需求。需求大致是这样的
> 想要一个有特殊边框的卡片，里面展示几行文本。

当时的场景有些复杂，但还原之后基本就是这样的：

```vue
<template>
  <div class="eg1"></div>
</template>

<style scoped>
.eg1 {
  width: 200px;
  height: 200px;
  background: deepskyblue;
  border: 20px dashed #333;
}
</style>
```

然后使用伪元素创建一个白色的背景，放到卡片正中心就完成了。

```vue
<template>
  <div class="eg1"></div>
</template>

<style lang="scss" scoped>
.eg1 {
  box-sizing: border-box;
  position: relative;
  width: 200px;
  height: 200px;
  background: deepskyblue;
  border: 20px dashed #333;
  &:after {
    content: '13123';
    background: #fff;
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
```

<iframe width="100%" height="300" src="//jsrun.net/FKyKp/embedded/all/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

本以为已经结束了，只要把返回的消息放在伪元素的`content`就可以了。但是消息是后端返回的呀，要怎么才能做到把文本填充进去呢？因此才去找了伪元素相关的资料。继而发现了伪元素非常多的用法。在这里总结一下。

## 除了content=''之外的其他高级用法

### 插入符号

使用css的quotes可以在字符串两端添加自定义的字符

```vue
<template>
  <h1>一段文字</h1>
  <h2>另一段文字</h2>
  <h3>第三段文字</h3>
</template>

<style scoped lang="scss">
  h1 {
    quotes: "("")";
    &:before {
      content: open-quote;
    }
    &:after {
      content: close-quote;
    }
  }
  h2 {
    quotes: "\♂""\♀";
    &:before {
      content: open-quote;
    }
    &:after {
      content: close-quote;
    }
  }
  h3 {
    quotes:"\"" "\"";
    &:before {
      content: open-quote;
    }
    &:after {
      content: close-quote;
    }
  }
</style>
```

<iframe width="100%" height="300" src="//jsrun.net/jKyKp/embedded/all/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 插入属性

content属性可以直接获取元素的属性，包括自有属性和自定义属性。本文中出现的问题也是通过这个方法解决的。

```vue
<template>
  <div text="哈哈哈哈哈"></div>
</template>

<style scoped lang="scss">
  div {
    box-sizing: border-box;
    position: relative;
    width: 200px;
    height: 200px;
    background: #ace;
    border: 20px dashed #adc;
    &:after {
      word-break: break-all;
      background: #fff;
      padding: 10px;
      content: attr(text);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
</style>
```

<iframe width="100%" height="300" src="//jsrun.net/BKyKp/embedded/all/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 插入图片

没什么好解释的，和css引用图片类似

```html
  <div>这是h3</div>
  <style>
    div::after{
      content:url(http://img3.imgtn.bdimg.com/it/u=169436546,622776601&fm=26&gp=0.jpg)
    }
  </style>
```

### 插入编号

利用css的counter属性产生自增的编号，并且可以自定义和生成更复杂的编号。

#### 插入基本的编号

```html
<h1>这是一个标题</h1>
<h1>这是一个标题</h1>
<h1>这是一个标题</h1>
<h1>这是一个标题</h1>
<style lang="scss">
  h1 {
    counter-increment: list;
    &:before {
      content:counter(list);
    }
  }
</style>
```

<iframe width="100%" height="300" src="//jsrun.net/uKyKp/embedded/all/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### 自定义编号

```html
<h1>这是一个标题</h1>
<h1>这是一个标题</h1>
<h1>这是一个标题</h1>
<h1>这是一个标题</h1>
<style lang="scss">
  h1 {
    counter-increment: list;
    &:before {
      color:deeppink;
      content:'第'counter(list)'章';
    }
  }
</style>
```

<iframe width="100%" height="300" src="//jsrun.net/SKyKp/embedded/all/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 修改编号种类

> 编号的种类 === ul的list-style-type属性值。

```html
<h1>这是一个标题</h1>
<h1>这是一个标题</h1>
<h1>这是一个标题</h1>
<h1>这是一个标题</h1>
<style lang="scss">
  h1 {
    counter-increment: list;
    &:before {
      color:deeppink;
      content:counter(list, upper-alpha);
    }
  }
</style>
```

<iframe width="100%" height="300" src="//jsrun.net/KpyKp/embedded/all/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### 更复杂的多层嵌套编号

> 大编号嵌套中编号嵌套小编号……

```html
<h1>大标题</h1>
<h2>中标题</h2>
<h3>小标题</h3>
<h3>小标题</h3>
<h2>中标题</h2>
<h3>小标题</h3>
<h3>小标题</h3>
<h1>大标题</h1>
<h2>中标题</h2>
<h3>小标题</h3>
<h3>小标题</h3>
<h2>中标题</h2>
<h3>小标题</h3>
<h3>小标题</h3>
<style lang="scss">
  h1{
    counter-increment:h1;
    counter-reset:h2;
    &:before{
      content:counter(h1)'.';
    }
  }
  h2{
    counter-increment:h2;
    counter-reset:h3;
    margin-left:40px;
    &:before{
      content:counter(h1) '-' counter(h2);
    }
  }

  h3{
    counter-increment:h3;
    margin-left:80px;
    &:before{
      content:counter(h1) '-' counter(h2) '-' counter(h3);
    }
  }
</style>
```

<iframe width="100%" height="300" src="//jsrun.net/kpyKp/embedded/all/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 结语

最后附上张鑫旭的一篇文章： [小tip:CSS计数器+伪类实现数值动态计算与呈现](https://www.zhangxinxu.com/wordpress/2014/12/css-counters-pseudo-class-checked-numbers/)
