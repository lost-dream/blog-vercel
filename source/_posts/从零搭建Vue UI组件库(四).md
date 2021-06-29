---
title: 从零搭建Vue UI组件库(四)
date: 2021-04-16 11:32:26
tags: [Vue, adminUI]
categories: [adminUI]
description: 尝试搭建自己的Vue UI 组件库, 持续更新(大概)
---

## 写在前面

顺便调整了 build 文件夹结构，公共的webpack 配置单独提了出来；为了方便区分，把开发服务运行在了 3100 端口（8080 默认 vue 服务占用， 3000默认 vite 服务占用，5000 默认博客服务占用）

> 这篇主要添加项目的代码检查和提交校验，不得不说，这一环节的配置真是又多又杂，所以就不详尽的分布赘述了，本人也是直接使用了 [我自己 vite 脚手架](https://github.com/lost-dream/vite-template)中的配置。

## 加入 eslint/prettier/stylelint 支持

### 安装依赖

```npm
npm install babel-eslint eslint prettier eslint-config-prettier eslint-import-resolver-alias  eslint-plugin-prettier  eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser -D -W
```

```npm
npm install -D stylelint stylelint-config-prettier stylelint-config-standard stylelint-order stylelint-scss -W
```

### 创建`.eslintrc.js`

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
      modules: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['vue', 'prettier', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@packages', '@website', './packages', './website']],
        extensions: ['.ts', '.js', '.vue', '.json']
      }
    }
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 2,
    '@typescript-eslint/no-empty-function': 2,
    'vue/custom-event-name-casing': 2,
    'no-use-before-define': 2,
    '@typescript-eslint/no-use-before-define': 2,
    '@typescript-eslint/ban-ts-comment': 2,
    '@typescript-eslint/ban-types': 2,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'vue/attributes-order': 2,
    'vue/one-component-per-file': 2,
    'vue/html-closing-bracket-newline': 2,
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 10,
        multiline: {
          max: 10,
          allowFirstLine: true
        }
      }
    ],
    // 组件 name 首字母必须大写
    'vue/component-definition-name-casing': 2,
    'vue/multiline-html-element-content-newline': 2,
    'vue/attribute-hyphenation': 2,
    'vue/require-default-prop': 2,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'prettier/prettier': 'warn'
  }
}
```

### 创建`.prettierrc`

```json
{
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "semi": false
}
```

### 创建`.eslintignore`

```md
# Editor
.vscode
.idea

# Project
*.md
/lib
/build

# typescript
*.d.ts

# file
*.scss
*.html

# Others
node_modules
```

### 添加`stylelint.config.js`

```js
module.exports = {
  root: true,
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    'no-empty-source': null,
    'named-grid-areas-no-invalid': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-block-trailing-semicolon': [
      'always',
      {
        ignore: ['single-declaration']
      }
    ],
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // Specify the alphabetical order of the attributes in the declaration block
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'content',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak'
    ],
    'at-rule-no-unknown': null,
    // [scss-rules](https://www.npmjs.com/package/stylelint-scss)
    'scss/at-rule-no-unknown': true
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
}
```

### 添加 lint 脚本

```diff
{
  "scripts": {
    "list": "lerna list",
    "dev": "webpack-dev-server --progress --config build/webpack.config.dev.js",
    "build": "webpack --config build/webpack.config.prod.js",
-    "reinstall": "rimraf node_modules && yarn"
+    "reinstall": "rimraf node_modules && yarn",
+    "lint:packages": "eslint --ext .ts,.js,.vue,.css,.json,.scss packages --fix",
+    "lint:website": "eslint --ext .ts,.js,.vue,.css,.json,.scss website --fix",
+    "lint": "yarn lint:packages && yarn lint:website"
  },
}
```

重启服务和编辑器，运行`yarn lint`，就会发现有报错了，按照 lint 规则规范代码即可

> **以上是我自己的规则，可以根据自己和团队的习惯更改相应 rules**

### 添加`git hook`

```npm
yarn add -D lint-staged yorkie -W
```

修改`package.json`

```diff
{
+  "gitHooks": {
+   "pre-commit": "lint-staged",
+   "pre-push": "yarn lint"
+  },
+  "lint-staged": {
+   "*.{js,jsx,vue,ts,tsx}": [
+      "yarn lint",
+      "prettier --write",
+      "git add"
+    ]
+  }
}
```

改完收工！
