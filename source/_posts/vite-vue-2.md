---
title: vue3 脚手架（二）
tags: [vue3, vite]
date: 2021-07-01 19:22:04
categories: [vue]
description: 使用 vite 搭建 vue3 项目
---

## editorconfig

每个人都有自己的编辑器习惯，包括`mac`和`windows`环境之间编辑器本身也会有很多差异。这个时候需要一份文件统一编辑器格式。所幸现在主流的编辑器全部支持`.editorconfig`文件。同样的，具体的配置可以自行查阅文档，这里只附上我自己团队的配置。

```plant
root = true

[*]
charset=utf-8
end_of_line=lf
insert_final_newline=true
indent_style=space
indent_size=2
max_line_length = 100

[*.{yml,yaml,json}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```
