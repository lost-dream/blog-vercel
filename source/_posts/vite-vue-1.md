---
title: vue3 脚手架（一）
tags:
  - vue3
  - vite
categories:
  - vue
description: 创建 vite 脚手架，添加 lint 配置
top: 10
abbrlink: 77c34717
date: 2021-06-29 13:37:16
---
> 这系列文章借由 vue3 脚手架搭建，过程中顺便写写自己的开发规范和编辑器习惯。
> 本文仓库地址为: [vue3-template](https://github.com/lost-dream/vue3-template)
> **所有的规范都以我的团队的开发习惯为示例，文章中只针对开发规范本身，所有的规范参照自己的团队开发**

## hello, world

首先通过`vite-cli`搭建基础的脚手架，使用`vue-ts`模板

> vite 需要 node.js 版本 >= 12.0.0

```shell
yarn create @vitejs/app vue3-template --template vue-ts
```

## 修改项目结构

安装完成后，需要修改为我们更常用的项目配置。**以下是我的开发习惯**

+ 根目录新建`types`文件夹，用来存放各种全局的`ts声明文件`。上一步新建的项目中，`src`文件夹下的`shims-vue.d.ts`和`vite-env.d.ts`也要转移到该文件夹下统一管理。
+ 根目录新建`mock`文件夹，用于开发环境模拟运行数据
+ 根目录新建`test`文件夹，用于开发环境单元测试
+ `src`目录下新建
  + `api`文件夹统一管理后台请求，具体到业务开发中，需要细分为和后端相同的各个功能子模块，以便日后统一开发维护
  + `styles`文件夹统一管理各种全局样式文件、全局css变量、全局 css 方法等（个人使用 sass）
  + `hooks`文件夹统一管理`composition API`的函数片段
  + `router`文件夹管理路由
  + `store`文件夹管理`vuex`
  + `utils`文件夹管理各种功能函数
  + `views`文件夹管理各个 vue 模块

结合到项目开发中，可能还需要更多复杂的模块诸如

+ `locales` -- 语言包
+ `layout` -- 布局结构
+ `enums` -- 枚举类型统一管理
+ `directives`、 `filters` -- vue 语法扩展
+ ...

根据需要再做补充

## 添加开发规范

没有规矩不成方圆，开发规范是团队维护项目减少开发成本最有效的方式之一

### eslint / prettier

#### 安装

```shell
yarn add --dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-define-config eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

依赖有点多，其中`eslint-config-prettier` / `eslint-plugin-prettier` 是`eslint`的`prettier`插件，`eslint-plugin-vue`是 `eslint`的`vue`语法插件，剩下的是`typescript`语法支持。

#### 创建配置文件

```js .eslintrc.js
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': 'off',

    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
});
```

```js prettier.config.js
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'es5',
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  arrowParens: 'always',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf',
  rangeStart: 0,
};
```

#### 修改 package.json

```diff
  "scripts": {
+   "lint:eslint": "eslint \"{src,mock}/**/*.{vue,ts,tsx,js,jsx,css,scss,postcss}\" --fix"
+   "lint": "yarn lint:eslint"
  }
```

表示格式化`src`文件夹下所有的`ts`、`js`、`vue`、`css`、`scss`、`json`文件，如果有额外补充，参照语法自己修改即可。

### stylelint

#### 安装依赖

```shell
yarn add --dev stylelint stylelint-config-prettier stylelint-config-standard stylelint-order
```

#### 创建stylelint.config.js

```js ROOT/stylelint.config.js
module.exports = {
  root: true,
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    // custom rules...
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}
```

#### 修改 package.json

```diff
  "scripts": {
+   "lint:stylelint": "stylelint \"**/*.{vue,postcss,css,scss}\" --fix",
-   "lint": "yarn lint:eslint"
+   "lint": "yarn lint:eslint && yarn lint:stylelint"
  }
```

### commitlint 以及 husky / lint-staged 配置

#### 安装依赖

```shell
yarn add --dev commitizen @commitlint/cli @commitlint/config-conventional commitlint-config-cz cz-conventional-changelog cz-customizable lint-staged
```

#### 配置 husky

参照[官方文档](https://typicode.github.io/husky/#/?id=install)，安装`husky`并启用`git hooks`

```shell
npx husky install
```

修改`package.json`

```diff
{
  "scripts": {
+    "prepare": "husky install"
+    "commit": "git-cz"
  },
+ "config": {
+   "commitizen": {
+     "path": "node_modules/cz-customizable"
+  }
+ }
}
```

添加`commit`规范相关的`git hooks`

```shell
npx husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
```

创建`.cz-config.js`，自定义想要的提交格式。

```js
'use strict'
module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨  feat:         添加新功能',
    },
    {
      value: 'fix',
      name: '🐞  fix:          修复bug',
    },
    {
      value: 'style',
      name: '💅  style:        代码格式变动, 不影响代码功能的更改(修改空格/格式化代码等操作)',
    },
    {
      value: 'docs',
      name: '📚  docs:         修改文档',
    },
    {
      value: 'test',
      name: '🏁  test:         新增或修改测试用例',
    },
    {
      value: 'refactor',
      name: '🛠   refactor:     既不是新增功能，也不是修改bug的代码变动',
    },

    {
      value: 'chore',
      name: '🗯   chore:        更改环境配置相关文件',
    },
    {
      value: 'revert',
      name: '⏪  revert:       版本回退',
    },
    {
      value: 'ui',
      name: '✏️   ui:           只更新css样式，不涉及任何业务功能的修改',
    },
  ],
  scopes: [],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
}
```

如此，执行`yarn commit`命令，会出现以下效果
![commitizen](/blog/img/commitizen.jpg)
方向键选择要提交的类型，确定后输入提交的信息即可。当然如果你更喜欢命令行直接提交也是可以的，新建文件`commitlint.config.js`

```js
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional', 'cz'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\(\（](.*)[\)\）])?[\:\：] (.*)/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      referenceActions: [
        'close',
        'closes',
        'closed',
        'fix',
        'fixes',
        'fixed',
        'resolve',
        'resolves',
        'resolved',
      ],
      issuePrefixes: ['#'],
      noteKeywords: ['BREAKING CHANGE'],
      fieldPattern: /^-(.*?)-$/,
      revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
      revertCorrespondence: ['header', 'hash'],
      warn() {},
      mergePattern: null,
      mergeCorrespondence: null,
    },
  },
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 增加新功能
        'fix', // 修复 bug
        'style', // 修改不影响功能的代码格式（注意是代码格式，不是 css 样式）
        'docs', // 新增文档
        'test', // 新增测试用例
        'refactor', // 重构（既不是新增功能，也不是修改bug的代码变动）
        'chore', // 构建过程或辅助工具的变动
        'revert', // 版本回退
        'ui', // 只更新css样式，不涉及任何业务功能的修改
      ],
    ],
  },
}
```

具体规则可以查阅相关文档。需要注意的是，`rules`中的`type-enum`选项，一旦定义了，提交的信息就必须以规定过的`type`来开头。否则都会出现 error，阻止本次提交。简单来说，`commitlint`目的就是让开发者每次提交都按照规定，上面规则规定了提交的形式为`type: xxxxx`(注意冒号之后有空格)，其中 `type` 为上述定义的 type，这也是绝大部分开发者习惯的提交方式。

参考[lint-staged官方文档](https://github.com/okonet/lint-staged#configuration)，根目录添加`lint-staged.config.js`

```js
module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['npm run lint'],
  'package.json': ['prettier --write'],
  '*.{css,scss,less,styl,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
}
```

修改`pre-commit`

```diff
-  yarn lint
+  yarn lint-staged --allow-empty "$1"
```

## end

如此，一个基本的开发架构就搭建完成了，没有规矩，不成方圆。这一篇主要制定了一系列开发规范来约束开发习惯，在我看来，团队合作开发，个人能力是不及规范来得重要的。我们规范了项目结构，规范了代码结构，规定了提交结构。接下来，**工欲善其事必先利其器，下一节专门说说 vscode 的相关配置**
