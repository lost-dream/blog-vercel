title: 关于sticky-footer兼容性最好的一种解决方案
tags: [css]
date: 2017-10-31 09:16:58
categories: [css]
description: sticky-footer解决方案
---
## 什么是 sticky-footer？
sticky-footer是一种最古老的同时也最常见的网页效果，具体表现为：当内容足够时，页脚被内容向下推送，如果内容不足以撑开高度，页脚应当粘贴在窗口底部。这种效果非常常见且看似简单，但实际上实现起来比想象中要复杂得多。目前为止至少有5种方式可以实现sticky-footer布局，但各有优势和劣势，这里介绍兼容性最强的一种写法。
```
/* html */
<body>
  <div class="wrapper">
    <div class="content">这是内容部分</div>
  </div>
  <div class="footer">这是页脚部分</div>
</body>

/* css */
html,body{
  height:100%;
  margin:0;
  padding:0
}
.wrapper{
  min-height: 100%;
  background: #ace;
}
.wrapper .content{
  padding-bottom: 100px;
}
.footer{
  position: relative;
  height:100px;
  background: #333;
  margin-top: -100px;
}
```
以防万一，需要清除浮动
```
.clearfix {
  display:inline-block;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
```
