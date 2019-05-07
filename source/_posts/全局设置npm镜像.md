title: 全局设置npm镜像
tags: [NodeJs]
date: 2017-11-15 08:43:46
categories: [NodeJs]
description: 全局设置npm镜像
---
通过命令`npm config set registry https://registry.npm.taobao.org`设置        
或者通过命令`npm config ls -s`查看详细的全局配置         
留意一个选项`globalconfig`，地址指向一个文件npmrc；一个`userconfig`，地址指向一个文件.npmrc（如果没有新建一个），添加以下内容即可
```
registry=https://registry.npm.taobao.org/
```