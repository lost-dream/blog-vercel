---
title: github下fork后同步个人仓库和源仓库
tags: [git,GitHub]
date: 2017-10-19 11:16:52
categories: [git]
description: github下fork后同步个人仓库和源仓库
---
### 首先要先确定一下是否建立了主repo的远程源

```shell
git remote -v
```

### 如果里面只能看到你自己的两个源(fetch 和 push)，那就需要添加主repo的源

```shell
git remote add upstream URL
git remote -v
```

然后你就能看到upstream了

### 如果想与主repo合并

```shell
git fetch upstream
git merge upstream/master
```
