title: Vue Cli 3 使用感受
tags: [vue]
date: 2018-12-15 14:44:23
categories: [vue]
description: Vue Cli 3 使用心得
---
早就听说 vue-cli 有了 3.x 版本，但一直没机会实践。一直到双十一有一个小活动，尝试了一下。感觉到了极度的舒适。新的脚手架做了非常大的修改，具体为：
+ 删除了 config 和 build 文件夹，改为使用配置文件 vue.config.js，并同时支持**分模式**、**分环境**、**分项目**进行配置，简单的说就是之前脚手架中需要配置在 config 和 build 中的配置，都靠着一个文件来配置，省去了我们在 build 和 config 文件中找配置的地方。下面总结一下主要的变化。**我这里只是做一个总结，并没有（也没必要）添加详细的讲解（反正也不可能比官网讲的清楚）**

## 使用图形化界面
vue-cli3 新增了基于 MUI 的可视化工具，开发者可以更加直观方便（傻瓜式）的创建、管理 vue 项目，输入`vue ui`就可以打开可视化窗口。

## 分模式 && 分环境
vue-cli3 增加了 .env 文件用来直观方便的区分环境，每个环境文件包含对应环境的模式和对应环境下特有的环境变量。这些环境变量会在相对环境打包中被载入。具体的方法参考[官网教程](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)。

## 分项目
vue-cli3 支持直接创建多页面应用（multi-page-app），只需要在vue.config.js中配置pages参数。
具体的配置方法参见[官网教程](https://cli.vuejs.org/zh/config/#pages)。

## 插件
vue-cli3 使用了一套基于插件的架构。如果你查阅一个新创建项目的 package.json，就会发现依赖都是以 @vue/cli-plugin- 开头的。插件可以修改 webpack 的内部配置，也可以向 vue-cli-service 注入命令。在项目创建的过程中，绝大部分列出的特性都是通过插件来实现的。基于插件的架构使得 Vue CLI 灵活且可扩展。如果你对开发一个插件感兴趣，请翻阅插件[开发指南](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)。
