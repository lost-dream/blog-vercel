---
title: 从零搭建Vue UI组件库(六)
date: 2021-04-26 10:42:23
tags: [Vue, adminUI]
categories: [adminUI]
description: 尝试搭建自己的Vue UI 组件库(完)
---

```diff build/webpack.config.base.js
{
-  test: /\.scss$/,
+  test: /\.(css|sass|scss)$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: { sourceMap: true }
    },
    {
      loader: 'sass-loader'
    }
  ]
},
```
