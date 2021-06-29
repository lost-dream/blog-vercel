---
title: css3选择器简介
date: 2017-08-24 19:06:28
tags: [css]
categories: [css]
description: css3新加入的选择器简单介绍
---
作为前端开发人员，css样式永远是我们讨论的重点，毕竟在高速发展的现在，颜值的重要性不言而喻。作为网页样式的首选，一张网页的美观程度可以说完全由css来决定，其中选择器是css中的一大重点。在css3之前，对于选中正确的标签是让人头疼的工作，尤其是层次越来越深。对此，css3的新增加了很多选择器，减轻了开发者的不少负担。
css3新增加的选择器大致可以分为几类

+ 属性选择器
+ 伪类选择器
+ 伪元素选择器

## 属性选择器

顾名思义，属性选择器是通过标签的属性来捕获目标标签。属性可以是标签自己本身的属性（src、title等），也可以是自己定义的标签。具体使用方式: E[attr]:匹配含有属
性attr的元素。

+ div[id]: 可以匹配到<div id="one"></div>以及<div id="two"></div>
+ E[attr=value]: 匹配含有属性attr,并且attr属性的值为value的元素。
+ div[id=one]: 可以匹配到<div id="one"></div>
+ E[attr~=value]: 标签元素可以有多个自定义的属性，这就像可以同时拥有很多类名一样。这个选择器可以选中一条属性中具有多个空格分隔开的其中一个值为value的元素。
+ div[me~=man]: 可以匹配到<div me=" 14 man chinese"></div> 或者 <div me=" man chinese tianjin"></div>
+ E[attr|=value]: 这个选择器可以选中一条属性中有“-”分隔符并且分隔符开头是value的元素。
+ div[me|=a]: 可以匹配到<div me=" a-man"></div>以及<div me="a-chinese tianjin"></div>
+ E[attr^=value]: 这个选择器可以选中具有attr并且值以value开头的元素。
+ div[me^=a]: 可以匹配到<div me=" aman"></div>以及<div me="achinese tianjin"></div>
+ E[attr$=value]: 这个选择器可以选中具有attr并且值以value结尾的元素。
+ div[me$=a]: 可以匹配到<div me=" amana"></div>以及<div me="achinesa tianjina"></div>
+ E[attr*=value]: 这个选择器可以选中具有attr并且值包含value的元素，无论value在什么位置。
+ div[me*=a]: 可以匹配到<div me=" amana"></div>以及<div me="chineas tian"></div>

## 伪类选择器

通过操作伪类来选中目标元素也是css常用的一种手段。
作为经验丰富的前端开发者，你对这些伪元素已经烂熟于心：

+ E:first-child	匹配元素E的第一个子元素
+ E:link	匹配所有未被点击的链接
+ E:visited	匹配所有已被点击的链接
+ E:active	匹配鼠标已经其上按下、还没有释放的E元素
+ E:hover	匹配鼠标悬停其上的E元素
+ E:focus	匹配获得当前焦点的E元素
+ E:lang(c)	匹配lang属性等于c的E元素
+ E:enabled	匹配表单中可用的元素
+ E:disabled	匹配表单中禁用的元素
+ E:checked	匹配表单中被选中的radio或checkbox元素
+ E::selection	匹配用户当前选中的元素
+ E:root	匹配文档的根元素，对于HTML文档，就是HTML元素

在css3中提供了全新的伪类选择器，可以更方便的选取目标元素。

+ E:nth-child(n)匹配其父元素的第n个子元素，**第一个编号为1**
+ E:nth-last-child(n)匹配其父元素的倒数第n个子元素，**最后一个编号为1**
+ E:nth-of-type(n)与:nth-child()作用类似，但是仅匹配使用同种标签的元素
+ E:nth-last-of-type(n)	与:nth-last-child() 作用类似，但是仅匹配使用同种标签的元素
+ E:last-child	匹配父元素的最后一个子元素，等同于:nth-last-child(1)
+ E:first-of-type	匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1)
+ E:last-of-type	匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1)
+ E:only-child	匹配父元素下仅有的一个子元素，等同于:first-child:last-child或 :nth-child(1):nth-last-child(1)
+ E:only-of-type	匹配父元素下使用同种标签的唯一一个子元素，等同于:first-of-type:last-of-type或 :nth-of-type(1):nth-last-of-type(1)
+ E:empty	匹配一个不包含任何子元素的元素，文本节点也被看作子元素
+ E:not(selector)	匹配不符合当前选择器的任何元素

## 伪元素选择器

css允许我们向文档内部添加一个额外的元素而不扰乱文档本身，具体表现为在元素内部插入一个元素，并且可以通过选择器控制这个元素的行为。

+ E:first-line	匹配E元素内容的第一行
+ E:first-letter	匹配E元素内容的第一个字母
+ E:before	在E元素之前插入生成的内容
+ E:after	在E元素之后插入生成的内容
