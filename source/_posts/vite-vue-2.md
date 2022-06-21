---
title: vue3 脚手架（二）
tags:
  - vue3
  - vite
categories:
  - vue
description: vscode 配置 vue 开发环境
name: vscode
top: 10
abbrlink: 47d5abcf
date: 2021-07-01 19:22:04
---

> 本文仓库地址为: [vue3-template](https://github.com/lost-dream/vue3-template)

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

## vscode 配置

vscode的强大归功于它的插件系统，通过各种插件可以扩展编辑器各种功能。`vscode`基于`js`语法开发，它的各种配置都可以通过写入配置文件生效。除了系统配置文件外，还支持项目定制配置。其中系统文件配置的文件，是所有使用{{ name }}项目打开都会生效，称为`user`，项目定制的配置文件，写在项目根目录`.vscode`文件夹下，只有当前项目使用{{ name }} 打开时才会生效，称为`workspace`。`.vscode`文件夹下通过写入配置文件来扩展各种功能，不同的文件有不同的作用，常用的文件为:

+ extensions.json: 推荐扩展列表
+ settings.json: 项目专属设置配置信息
+ launch.json: 调试配置
+ task.json: 任务配置
+ xxx.code-snippets: 用户代码片段

### 插件

使用过{{ name }} 的人，应该不需要我再重新强调一遍插件的强大了。这里主要说几个事情:

+ 我电脑上装了几十个插件，换了电脑开发以后还要重装一遍好麻烦...
+ 我电脑上装了几十个插件，其中很多插件可以提升开发的效率，我希望我的项目在别人打开时，可以安装那些我认为优秀的插件来提升他人的效率
+ 我电脑上已经配置了我自己的开发规范，奈何团队项目的规范与我本人不同，该如何保证只在那一个项目中生效别的规则呢？

关于第一个问题，{{ name }} 有一个好用的插件[Setting Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)，支持将自己的插件上传到`github`，新的设备只要同步下来就可以了很方便。你也可以选择执行`code --list-extensions | xargs -L 1 echo code --install-extension`打印出本地所有的插件，然后在新机器上执行安装全部插件。

关于第二个问题，通过`code --list-extensions`打印出所有本地插件之后，可以在`.vscode`文件夹中新建`extensions.json`，写入你想要推荐安装的插件名字即可，写法如下:

```json
{
  "recommendations": [
    "octref.vetur",
    // ...
  ]
}
```

而解决第三个问题当然就是需要在项目的`settings.json`中覆盖系统的设置。这个文件和系统的设置文件书写格式相同，需要注意的是:

+ 虽然是`json`文件，但支持注释，建议写好注释否则插件数量增加导致配置项也增加，看上去会很乱不容易维护
+ 插件列表中有丰富的插件设置，可以参考文档进行自定义
+ 项目的配置会覆盖系统的配置

### task/launch

`task.json`和`launch.json`更多用于`nodeJs`后端模块调试，我着重前端方向就不献丑了，具体可以搜索相关配置教程。

### 用户代码片段

比如我最喜欢用的就是 vue 的语法，在`系统 -- 首选项 -- 代码片段`中，我常常选择创建一些代码片段很方便的创建代码的模板。比如只要输入`vue + tab` 就可以生成一份 `vue` 的文件模板，那么这么强大的功能，需要我告诉团队中每个人都在自己电脑上创建一次吗？当然是不需要的。只需要创建`vue.code-snippets`文件，{{ name }}就会记录这个代码片段，可以直接使用了。具体的片段语法可以[看这里](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets)。
