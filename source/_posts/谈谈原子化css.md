---
title: 谈谈原子化css
tags:
  - css
categories:
  - css
description: 说说我对原子化 css 的一些理解
top: 10
abbrlink: c29d9667
date: 2022-07-13 09:35:13
---

## 写在前面

最近在忙着把公司项目重构为 `vite + vue3 + pinia + ant-design + windicss`，对前端开发又有了很多新的体会，但确实太忙了一直没来得及写下来。忙里偷闲这篇来记录一下使用 windicss的一些理解和感受。

> 本文只做自身使用tailwind / windicss 的学习笔记，不涉及对该类框架的使用，如果你还不知道该类框架，请先去[阅读文档](https://windicss.org/)。
> tailwind / windicss 语法几乎完全相同，之所以选择了 windicss 是因为在 vite 和 tailwindcss 配合起来卡顿

## 原子化 VS 组件化

在重构过程中，团队成员提出过最多的问题就是

> 这不就是 bootstrap 吗？

那么首先，我先来说说原子化 css 和组件化 css 的区别

### 组件化 css

有过多年发经验的前端应该都接触过 `bootstrap`，他把常用的样式统一封装，作为一种解决方案。

```html
  <div class="container">
    <div class="btn-group">
      <button class="btn btn-primary">primary</button>
      <button class="btn btn-warning">warning</button>
      <button class="btn btn-success">success</button>
    </div>
  </div>
```

### 原子化

原子化 css 的规则相对就很简单，每一个 css 类只对应一个规则。

```html
  <button class="px-4 py-2 text-white"> button </button>
```

> 那同事就又问了，这不就是直接赋值了 style 属性吗，只是相当于提供了属性的简写，有什么好吹嘘的？

确实，如果 windicss 仅仅是提供了原子化 css 的语法，确实是没必要吹嘘它有多好。**事实上，除了原子化的语法，windicss 还提供了很多方法。这些放在后面来说，**本节先来讨论组件化和原子化的优缺点。

具体对比之前，还要插一句同事的意见，他认为**windicss 的引入加入了新的成本，我们需要去记住他们原子化的 class 名和各自的用法，不如直接写来得方便。**然而我想说的是，首先 windicss 的语法已经尽量语义化，记忆的负担并不会太大。其次，vscode 有对应的插件对语法有自动补全，事半功倍。最后，新的技术出现势必会导致我们需要去记住他们的用法，vue 需要你去记住`.vue`文件的各种格式，`computed/methods/mounted`等大家倒背如流的东西，当时不也都是你的学习成本吗？，就连原生的语法新出了都是要学习和记忆的，干这行就应该保持持续学习和记忆的能力，我认为这是程序员的基础。

+ 组件化
  + 优点很明显。当你在实现一个大型的网站时，组件化的 css 会展现出强大的能力。只需要短短几行 class 便能定义出一组样式分明、还能有响应式效果的页面。
  + 缺点也很明显。首先，他的定义实在太过繁杂。对于一个简单的压面，组件化 css 会产生极大的代码冗余。其次，组件化导致最直接的结果就是，所有使用 bootstrap 构建的网站绝大部分时候看起来是如此的类似，在宣扬个性化的现在，每个网站都希望自己看上去是与众不同，才可以吸引眼球。而重新定义 bootstrap 样式代价又很大，在 bootstrap 现有样式的基础上去做样式修改，不仅进一步提升了代码的冗余，而且覆盖原有样式是一件很麻烦的事情。相信有过类似经历的伙伴都深有体会。
+ 原子化
  + 优点更加明显
    + 除了提供 `text-white tex-center w-full w-1/3`等语义化 css 之外，更提供了一些简单易用的样式诸如`.shadow grid-cols-{n}`等，用于直接创建愈发复杂的样式。
    + 提供了字号、颜色等的规范，更方便的约束网页的美感。`text-lg text-red-50`
    + 高效的响应式布局。
    + 修饰符，提供各种伪类的效果 `<button class="bg-red-500 hover:bg-red-700">Hover me</button>`
    + 多种属性的共用。如果你想创建类似 bootstrap 组件那样，多个样式叠加在一起的复用型样式，可以使用`@apply`来实现。
    + 支持自定义。你可以在`windicss.config.js / tailwindcss.config.js`中定义自定义你自己的样式，具体参照文档。
    + 最后，以上这些都是可以单独配置的，那些功能需要哪些功能不需要，你可以随自己的需求来定制。
  + 当然也会有缺点，毕竟语言没有完美的
    + 样式的覆盖。毕竟样式的顺序并不是由class 的书写顺序决定的。 `class="text-red-50 text-blue-50"`未必一定是蓝色。具体要看生成的样式表中哪一个更靠后。
    + 细心地朋友会发现，windicss 安装时是安装到开发依赖中的，那他是怎么保证在打包后依然生效的呢？事实上它的作用流程为: 本地开发时，生成完整的 windicss 文件，从上述提到的功能来看，不难想象他的文件自然不可能会小；只有在生产环境构建时，才会通过[purgeCss](https://purgecss.com/)来删除那些你没有使用过的样式。这就导致了以下两个问题:
      + 在开发环境中，因为加载了全部的功能（大约有 6M左右）,导致了页面加载时间比较长。尤其在推崇急速启动的`vite`框架下，这一表现无疑是致命的。
      + 生产环境构建时，可能会误删有用的 class。
      + 以上两点放在下面来探讨。

### 总结

说了一大堆，其实也可以用更 css 的方式来解释二者的区别。

> 区别就像是 div 标签 和 h1 标签。h1 标签就好比被定义过的组件，div 就好比原子。当你需要实现是一个标题的功能，使用已经附加了样式的 h1 标签一定是更快更好的，只不过更绝大多数的情况是使用 div 标签。因为 div 标签没有任何已经被定义过的属性。

## unocss

[unocss](https://github.com/unocss/unocss)是[antfu](https://github.com/antfu)大佬开发的 css 引擎。用作者的原话来说

> Inspired by Windi CSS, Tailwind CSS, and Twind.
> UnoCSS is an atomic-CSS engine instead of a framework. Everything is designed with flexibility and performance in mind.

这个引擎甚至没有预设的原子化工具类，所有的工具类都是自己定制的。当然应为灵感来自于 Windi CSS、Tailwind CSS，他们的规则已经提供在了自定义预设`@unocss/preset-uno`中。这就意味着，使用`unocss`后，你依然可以使用`windicss`的所有工具类，并且仍然可以自定义自己的工具类。

`unocss`使用非常简单，这里不详细说明，有需求可以自己查看官方文档。这里只解释上一节提出的两个问题:

+ 因为`unocss`没有任何预设的原子化工具类，因此不用担心开发环境 css 文件太大，因为他不会有任何冗余，所写及所得。
+ 同样，因为没有预设，就不必要担心打包时删除样式的问题，自然不会导致误删。

其实作为最后的打包结果，windicss 和 unocss 没有太大区别，主要是胜在开发过程中。不管如何，反正我是替换为`unocss`了，希望看到最后的你们也能根据自己的场景，选择自己合适的 css 原子化工具类，今天加班改动，明天可以摸更多的鱼。
