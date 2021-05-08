---
title: Mac本地服务器使用
date: 2021-05-07 16:53:46
tags: [mac]
categories: [mac]
description: 使用Mac自带的Apache服务
---

+ Apache命令

  ```shell
  # 开启 Apache
  sudo apachectl start

  # 重启 Apache
  sudo apachectl restart

  # 关闭 Apache
  sudo apachectl stop
  ```

+ 开启 Apache, 服务已经运行在`http://127.0.0.1/`
+ 开启 Finder, `Command + Shift + G`, 前往文件夹 `/Library/WebServer/Documents`, 这里存放本地服务文件，初始打开的是本路径下的`index.html.en`

> 使用过后，记得关闭服务器，避免不必要的内存消耗
