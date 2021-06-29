---
title: 从零搭建Vue UI组件库(六)
date: 2021-04-26 10:42:23
tags: [Vue, adminUI]
categories: [adminUI]
description: 尝试搭建自己的Vue UI 组件库(完)
---

上一步中,已经实现了本地开发 + 应用打包的全部流程, 开发 UI 框架的这套框架本身就已经完成了。现在只需要打包上传到 npm, 框架本身也完成了。剩下的就只是不断完善组件了。

## 生成打包

修改`package.json`，添加入口文件

```diff package.json
{
+  "main": "lib/index.js"
}
```

## 本地测试

执行`npm pack`，生成一个本地的`zcm-admin-ui-0.0.0.tgz`包，这个包可以本地安装，用来预览结果

执行`yarn add ./zcm-admin-ui-0.0.0.tgz`，本地安装这个包，安装结束后会发现依赖选项里安装了这个包，但是路径是在`./`下。这个时候`main.ts`中就已经可以使用 `import AdminUI from 'zcm-admin-ui'`了。**记得测试完成后，删除这一测试选项，开发环境还是用 @packages 里的包，保证开发时候方便**

### 修改`main.ts`

```js
import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import i18n from './locales/index'
// admin-ui
import AdminUI from 'zcm-admin-ui'
import 'zcm-admin-ui/lib/theme/index.css'

// components
import DemoBlock from './components/DemoBlock/index.vue'
import DtIcon from '@packages/icon'
// reset-css
import 'highlight.js/styles/color-brewer.css'
import './styles/common.scss'

createApp(App)
  .use(AdminUI)
  .use(i18n)
  .component('demo-block', DemoBlock)
  .component('dt-icon', DtIcon)
  .use(router)
  .mount('#app')
```

如果修改之后，和之前一样正常使用，说明没有问题，可以打包上传。

> 上传之前先删除上一步的 tgz 包，它已经没用了

## 发布 npm

首先要有账号，到 npm 官网注册即可

执行`npm login`，按照要求依次填写账号、密码、邮箱。出现`logged in as xxx on http://registry.npmjs.org`，说明登录成功了

然后在项目根目录执行`npm publish`，就可以了

## 常见问题

+ 项目是用`lerna`初始化的，`package.json`里`private`选项必须是`true`才行，但是上传 npm 又要求必须是`false`，暂时不知道为什么，怎么处理
+ 发布报错`npm ERR! no_perms Private mode enable, only admin can publish this module`，是因为使用了淘宝镜像，需要重置到原本的 npm 地址

  ```shell
  npm config set registry=http://registry.npmjs.org
  ```

+ 每次发布需要修改版本号（package.json的 version），否则会提交失败。详见[npm 版本号规则](https://www.jianshu.com/p/7d83bda6d751)

## 完

组件方面，我也有打算一直维护，并且不参考任何框架，有时间就按自己的想法去尝试一下。

最后再附上[本项目仓库地址](https://github.com/lost-dream/zcm-admin-ui)，希望有幸看到这篇文章你也能有所收获
