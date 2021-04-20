---
title: 从零搭建Vue UI组件库(五)
date: 2021-04-15 10:46:32
tags: [Vue adminUI]
categories: [adminUI]
description: 尝试搭建自己的Vue UI 组件库, 持续更新(大概)
---

## 写在前面

接上一篇，这篇说的是使用`markdown`作为开发文档，原本想的是直接使用`vuepress`加入进来，万万没想到它不支持`vue3`，而新的`vuepress@next`功能还未完善，试过之后不太理想，所以还是照着`element-plus`来吧

> 在参考和查找的过程中，无意间发现了一个类似的仓库：[ninecat-ui](https://github.com/ninecat-ui/ninecat-ui),所以这篇文档在 element 基础上，也参照了部分 ninecat-ui 的思路（当然主要还是 element）

## 安装依赖


### markdown 相关依赖

安装解析 markdown 语法的依赖

`yarn add -D highlight.js markdown-it markdown-it-anchor markdown-it-chain markdown-it-container transliteration -W`

### vue 相关依赖

本地开发文档自然需要设置路由，后面可能会需要补全国际化，还要提前安装好 i18n。`yarn add -D vue-router@next vue-i18n@next -W`

## 修改 webpack 配置

### 修改 css rules

之前写的疏忽，loader 里没有包含 `css`文件，导致了一些问题，首先修复

```diff
// build/webpack.config.base.js

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

### 添加解析 markdown 的 loader

> 说来惭愧，这个 loader 我现在还是很茫然，因为是从 element-plus 粘贴来的。并不清楚为什么要这么配置，需要后面再仔细学习一下

#### 创建 markdown-loader

build 文件夹中创建 md-loader 文件夹，新建`config.js`、`container.js`、 `fence.js`、 `index.js`、`util.js`作为 md-loader 配置

```js
/* config.js */
const Config = require('markdown-it-chain')
const anchorPlugin = require('markdown-it-anchor')
const slugify = require('transliteration').slugify
const hljs = require('highlight.js')
const containers = require('./containers')
const overWriteFenceRule = require('./fence')

const config = new Config()

const highlight = (str, lang) => {
  if (!lang || !hljs.getLanguage(lang)) {
    return '<pre><code class="hljs">' + str + '</code></pre>'
  }
  const html = hljs.highlight(lang, str, true, undefined).value
  return `<pre><code class="hljs language-${lang}">${html}</code></pre>`
}

config.options
  .html(true)
  .highlight(highlight)
  .end()

  .plugin('anchor')
  .use(anchorPlugin, [
    {
      level: 2,
      slugify: slugify,
      permalink: true,
      permalinkBefore: false,
      // TODO anchorPlugin 锚点点击出错怎么处理
      // permalinkSymbol: '#'
      permalinkSymbol: ''
    }
  ])
  .end()

  .plugin('containers')
  .use(containers)
  .end()

const md = config.toMd()
overWriteFenceRule(md)

module.exports = md

// --------------------------------------------------------------

/* containers.js */
const mdContainer = require('markdown-it-container')

module.exports = md => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--admin-demo: ${content}:admin-demo-->
        `
      }
      return '</demo-block>'
    }
  })

  md.use(mdContainer, 'tip')
  md.use(mdContainer, 'warning')
}

// --------------------------------------------------------------

/* fence.js */
// 覆盖默认的 fence 渲染策略
module.exports = md => {
  const defaultRender = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1]
    const isInDemoContainer =
      prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/)
    if (token.info === 'html' && isInDemoContainer) {
      return `<template #highlight><pre v-pre><code class="html">${md.utils.escapeHtml(
        token.content
      )}</code></pre></template>`
    }
    return defaultRender(tokens, idx, options, env, self)
  }
}

// --------------------------------------------------------------

/* index.js */
const { stripScript, stripTemplate, genInlineComponentText } = require('./util')
const md = require('./config')

module.exports = function (source) {
  const content = md.render(source)

  const startTag = '<!--admin-demo:'
  const startTagLen = startTag.length
  const endTag = ':admin-demo-->'
  const endTagLen = endTag.length

  let componenetsString = ''
  let id = 0 // demo 的 id
  let output = [] // 输出的内容
  let start = 0 // 字符串开始位置

  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart))

    const commentContent = content.slice(commentStart + startTagLen, commentEnd)
    const html = stripTemplate(commentContent)
    const script = stripScript(commentContent)
    let demoComponentContent = genInlineComponentText(html, script)
    const demoComponentName = `admin-demo${id}`
    output.push(`<template #source><${demoComponentName} /></template>`)
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`

    // 重新计算下一次的位置
    id++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑

  let pageScript = ''
  if (componenetsString) {
    pageScript = `<script lang="ts">
      import * as Vue from 'vue';
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`
  } else if (content.indexOf('<script>') === 0) {
    // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length
    pageScript = content.slice(0, start)
  }

  output.push(content.slice(start))
  const result = `
  <template>
    <section class="content admin-doc">
      ${output.join('')}
    </section>
  </template>
  ${pageScript}
  `
  return result
}

// --------------------------------------------------------------

/* util.js */
const { compileTemplate, TemplateCompiler } = require('@vue/compiler-sfc')

function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
  content = content.trim()
  if (!content) {
    return content
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

function pad(source) {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join('\n')
}

const templateReplaceRegex = /<template>([\s\S]+)<\/template>/g
function genInlineComponentText(template, script) {
  // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
  let source = template
  if (templateReplaceRegex.test(source)) {
    source = source.replace(templateReplaceRegex, '$1')
  }
  const finalOptions = {
    source: `<div>${source}</div>`,
    filename: 'inline-component', // TODO：这里有待调整
    compiler: TemplateCompiler,
    compilerOptions: {
      mode: 'function'
    }
  }
  const compiled = compileTemplate(finalOptions)
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      console.warn(tip)
    })
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        compiled.errors.map(e => `  - ${e}`).join('\n') +
        '\n'
    )
  }
  let demoComponentContent = `
    ${compiled.code.replace('return function render', 'function render')}
  `
  // todo: 这里采用了硬编码有待改进
  script = script.trim()
  if (script) {
    script = script
      .replace(/export\s+default/, 'const democomponentExport =')
      .replace(/import ({.*}) from 'vue'/g, (s, s1) => `const ${s1} = Vue`)
  } else {
    script = 'const democomponentExport = {}'
  }
  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      ...democomponentExport
    }
  })()`
  return demoComponentContent
}

module.exports = {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
}
```

#### 添加 md-loader 配置

`webpack.config.base.js`添加 markdown 规则

```diff
+{
+  test: /\.md$/,
+  use: [
+    {
+      loader: 'vue-loader',
+      options: {
+        compilerOptions: {
+          preserveWhitespace: false
+        }
+      }
+    },
+    {
+      loader: path.resolve(__dirname, './md-loader/index.js')
+    }
+  ]
+}
```

## 搭建运行环境的 vue 页面

修改`website`下的配置，变成一个完整的 demo 页

### 创建单页面组件

新建`components`文件夹，添加组件

```shell
cd website
mkdir Container DemoBlock Header Nav
```

其中Container 是文档主要内容区域， Header 是文档头部，Nav 是文档侧边导航， DemoBlock是 vue 源码编译为 demo 的组件，现在除了 DemoBlock 外，其他组件暂时没有具体实现，以后在慢慢补充。代码也过于冗长，不贴出来了，可以下载来看。

### 修改文件

```diff
<template>
-  <div class="app">
-    <Hello :name="name" />
-  </div>
+  <Header />
+  <section class="content-wrapper">
+    <Nav class="menu-bar" />
+    <Container class="content">
+      <router-view />
+    </Container>
+  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
+import Header from './components/Header/index.vue'
+import Nav from './components/Nav/index.vue'
+import Container from './components/Container/index.vue'

export default defineComponent({
  name: 'App',
+  components: {
+    Header,
+    Nav,
+    Container
+  },
  setup() {
    const state = reactive({ name: 'admin ui' })
    return {
      ...toRefs(state)
    }
  }
})
</script>

+<style lang="scss" scoped>
+.content-wrapper {
+  display: flex;
+  overflow: hidden;
+  flex: 1;

+  .menu-bar {
+    width: 200px;
+    color: #fff;
+    background: red;
+  }

+  .content {
+    flex: 1;
+  }
+}
</style>

```

### 创建路由

website 下新建 `nav.config.ts`

```js
import { getLang } from './utils/lang'

const localLang = getLang()
const componentsString = localLang === 'en-US' ? 'Components' : '组件'
const baseComponentsString = localLang === 'en-US' ? 'Base Components' : '基础组件'

export const navs = [
  {
    name: componentsString,
    groups: [
      {
        groupName: baseComponentsString,
        list: [
          {
            path: '/button',
            name: 'Button',
            component: () => {
              if (localLang === 'en-US') {
                return import('./markdown/en-US/button.md')
              } else {
                return import('./markdown/zh-CN/button.md')
              }
            }
          }
        ]
      }
    ]
  }
]
```

创建 `utils/lang.ts`

```ts
export let curLang = window.sessionStorage.getItem('lang')

export const langTransformMap = {
  zh: 'zh-CN',
  en: 'en-US'
}

export function setLang(langType) {
  window.sessionStorage.setItem('lang', langType)
}

export function transformLang(originalLang) {
  let langTransform = langTransformMap[originalLang]
  if (langTransform === undefined) langTransform = originalLang
  curLang = langTransform
  return langTransform
}

export function getLang(lang?: string): string {
  if (curLang == null || curLang === '') {
    const langTransform = transformLang(window.sessionStorage.getItem('lang') || navigator.language)
    setLang(langTransform)
    return langTransform
  } else {
    return lang ? window.sessionStorage.getItem('lang') || navigator.language : curLang
  }
}
```

新建`router/index.ts`

```js
import { createRouter, createWebHashHistory } from 'vue-router'
import { nextTick } from 'vue'
import hljs from 'highlight.js'
import { navs } from '../nav.config'

export const indexRoute = [
]

const componentRoutes = []

navs.forEach(navItem => {
  navItem.groups.forEach(groupItem => {
    groupItem.list.forEach(item => {
      if (item.path !== '/') {
        componentRoutes.push({
          path: item.path,
          name: item.path.slice(1),
          meta: {
            name: item.path.slice(1)
          },
          component: item.component
        })
      }
    })
  })
})

const routes = [...indexRoute, ...componentRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.afterEach(() => {
  nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

export default router
```

创建 css 文件，修改页面样式

```css
/* website/styles/common.scss */
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
  -webkit-tap-highlight-color: transparent;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

a {
  color: #409eff;
  text-decoration: none;
}

code {
  padding: 0 4px;
  background-color: #f9fafc;
  border: 1px solid #eaeefb;
  border-radius: 4px;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

.hljs {
  padding: 18px 24px;
  margin-bottom: 25px;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  font-size: 12px;
  -webkit-font-smoothing: auto;
  line-height: 1.8;
  background-color: #fafafa;
  border: solid 1px #eaeefb;
  border-radius: 4px;
}



.demo {
  margin: 20px 0;
}
```

修改`main.ts`

```diff
import { createApp } from 'vue'
import App from './app.vue'
import AdminUI from '../packages/admin-ui'
+import 'highlight.js/styles/color-brewer.css' // 代码块高亮主题，多种主题可选择


+import router from './router'
+import DemoBlock from './components/DemoBlock/index.vue'
+import './styles/common.scss'

-createApp(App).use(AdminUI).mount('#app')
+createApp(App).use(AdminUI).component('demo-block', DemoBlock).use(router).mount('#app')
```

### 添加枚举类型

新建 enums 文件夹，用来存放项目的枚举类型，目前只有语言类型需要保存

```ts
export enum Language {
  /** Chinese */
  CN = 'zh-CN',
  /** English */
  EN = 'en-US'
}
```

## 修改packages && 编写文档

例子中，我定义了`button`组件，然后新建`markdown`文件夹，创建相应的语言文件夹，分别创建`button.md`，然后编写文档，就完成了。这里有几点要注意：
+ `:::demo demo-desc`是固定的语法，一定要这样写，下面的源码才会被编译成示例
+ 示例中的`dt-button`，对应的是 button 组件中，vue 的 name
