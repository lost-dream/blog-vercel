---
title: vscode配置
tags:
  - vscode
categories:
  - vscode
description: 分享vscode配置方法和我的vscode配置
old: WebStorm
new: vscode
abbrlink: 789169fd
date: 2019-12-12 09:22:18
---
开门见山地说，我最近换Mac电脑了。那么我之前一直在用的是[{{old}}](https://www.jetbrains.com/webstorm/)，但这个IDE是要花钱的，在windows可以有很多种方法免费去用它，但苹果电脑就不好使了，所以现在用[new](https://code.visualstudio.com/)作为主要开发工具。

目前看来，{{new}}在使用上比{{old}}要方便，也更轻巧，各种插件的扩展也极大地增强了工具的能力。但我个人还是更喜欢{{old}}的git工具。总感觉{{new}}在git的提交和管理不如{{old}}功能那么全面和强大，但除去这一点，{{new}}相比于{{old}}基本没有其他弱势的地方。

## 插件篇

说到{{new}},不得不提的就是插件,如果没有了插件,{{new}}也只不过是长得好看的notepad++。前端开发常用的插件在网上都可以找到，我这里列出一些我安装过好用但不常见的插件，另外文章最后我再列出我安装过的所有插件供参考。

### 不太常用的插件

| 插件名 | 下载量 | 插件介绍 |
| :---: | :---: | :---: |
| Better Comments | 53 万 | 可以自定义自己的注释 |
| DotENV | 68 万 | 支持`.env`格式文件 |
| Custom CSS and JS Loader | 17 万 | 可以自定义{{new}}的样式 |
| EditorConfig for VS Code | 162 万 |  高亮并使用.editorconfig文件设置编辑器编码风格 |
| Hungry Delete | 1 万 | 快速删除多余的空格和空白行 |
| Open In Default Browser | 27 万 | 使用默认编辑器打开指定网页 |
| Output Colorizer | 19万 | 更漂亮的terminal |
| Power Mode | 14 万 | 能让你打字的时候很有打击感 |
| SynthWave'84 | 11 万 | 一款带有发光效果的字体主题 |
| Vibrancy | 7 千 | 编辑器毛玻璃效果 |
| vscode-element-helper | 4 万 | 在{{new}}中就可以查看`element-ui`文档 |
| epub reader | 8 千 | 在{{new}}里看小说的摸鱼神器 |

所有插件都可以修改，修改的方式有两种，你可以打开设置在设置中对可以修改的参数做简单的修改，但更个性化的设置需要修改系统的`setting.json`,你可以使用`cmd + shift + p`输入`open setting`打开`setting.json`，所有的插件参数都可以在这里进行详细的修改

### 我的{{new}}配置

```json
[
  {
    "name": "Atom One Dark Theme",
    "version": "2.1.0"
  },
  {
    "name": "Auto Close Tag",
    "version": "0.5.6"
  },
  {
    "name": "Auto Import",
    "version": "1.5.3"
  },
  {
    "name": "Auto Rename Tag",
    "version": "0.1.1"
  },
  {
    "name": "background",
    "version": "1.1.23"
  },
  {
    "name": "Beautify css/sass/scss/less",
    "version": "2.3.3"
  },
  {
    "name": "Better Comments",
    "version": "2.0.5"
  },
  {
    "name": "Bookmarks",
    "version": "10.6.0"
  },
  {
    "name": "Bracket Pair Colorizer",
    "version": "1.0.61"
  },
  {
    "name": "Chinese(simplified) Language Pack for Visual Studio Code",
    "version": "1.40.2"
  },
  {
    "name": "Code Spell Checker",
    "version": "1.7.20"
  },
  {
    "name": "Color Highlight",
    "version": "2.3.0"
  },
  {
    "name": "Color Picker",
    "version": "0.4.5"
  },
  {
    "name": "Custom Css and JS Loader",
    "version": "3.9.0"
  },
  {
    "name": "Debugger for Chrome",
    "version": "4.12.2"
  },
  {
    "name": "Document This",
    "version": "0.7.1"
  },
  {
    "name": "DntENV",
    "version": "1.0.1"
  },
  {
    "name": "EditorConfig for VS Code",
    "version": "0.14.2"
  },
  {
    "name": "epub reader",
    "version": "1.1.6"
  },
  {
    "name": "ESLint",
    "version": "1.9.1"
  },
  {
    "name": "Git History",
    "version": "0.4.9"
  },
  {
    "name": "GitLens — Git supercharged",
    "version": "10.2.0"
  },
  {
    "name": "Highlight Matching Tag",
    "version": "0.9.6"
  },
  {
    "name": "HTML CSS Support",
    "version": "0.2.3"
  },
  {
    "name": "Hungry Delete",
    "version": "1.6.0"
  },
  {
    "name": "Import Cost",
    "version": "2.12.0"
  },
  {
    "name": "indent-rainbow",
    "version": "7.4.0"
  },
  {
    "name": "language-stylus",
    "version": "1.11.0"
  },
  {
    "name": "Markdown Preview Enhanced",
    "version": "0.5.0"
  },
  {
    "name": "markdownlint",
    "version": "0.32.0"
  },
  {
    "name": "Material Icon Theme",
    "version": "3.9.2"
  },
  {
    "name": "Material Theme",
    "version": "30.0.0"
  },
  {
    "name": "npm",
    "version": "0.3.9"
  },
  {
    "name": "npm Intellisense",
    "version": "1.3.0"
  },
  {
    "name": "One Dark Pro",
    "version": "3.2.1"
  },
  {
    "name": "Open In Default Browser",
    "version": "2.1.0"
  },
  {
    "name": "Output Colorizer",
    "version": "0.1.2"
  }
  {
    "name": "Path Intellisense",
    "version": "1.4.2"
  },
  {
    "name": "Power Mode",
    "version": "2.2.0"
  },
  {
    "name": "Prettier - Code formatter",
    "version": "3.11.0"
  },
  {
    "name": "Project Manager",
    "version": "10.9.1"
  },
  {
    "name": "Sass Lint",
    "version": "1.0.6"
  },
  {
    "name": "Scss Intellisense",
    "version": "0.8.1"
  },
  {
    "name": "Setting Sync",
    "version": "3.4.3"
  },
  {
    "name": "SVG Viewer",
    "version": "2.0.0"
  },
  {
    "name": "SynthWave'84",
    "version": "0.0.7"
  },
  {
    "name": "TODO Highlight",
    "version": "1.0.4"
  }
  {
    "name": "Trailing Spaces",
    "version": "0.3.1"
  },
  {
    "name": "vetur",
    "version": "0.22.6"
  },
  {
    "name": "Vibrancy",
    "version": "1.0.7"
  },
  {
    "name": "vscode-element-helper",
    "version": "0.5.6"
  },
  {
    "name": "vscode-icons",
    "version": "9.6.0"
  },
  {
    "name": "Vue 2 Snippets",
    "version": "0.1.11"
  }
]
```

### 我的`setting.json`

```json
{
    "workbench.startupEditor": "newUntitledFile",
    "workbench.iconTheme": "material-icon-theme",
    "window.title":  "${dirty}${activeEditorMedium}${separator}${rootName}",
    "window.zoomLevel": 0.62,
    "terminal.integrated.rendererType": "dom",
    "emmet.syntaxProfiles": {
        "javascript": "jsx",
        "vue": "html",
        "vue-html": "html"
    },
    "editor.tabSize": 2,
    "editor.fontSize": 20,
    "editor.lineHeight": 36,
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
        "strings": true
    },
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.formatOnPaste": false,
    "editor.fontFamily": "FiraCode-Retina",
    "editor.fontLigatures": true,
    "prettier.singleQuote": true,
    "prettier.semi": false,
    "vscode_custom_css.imports": [
        "file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/theme/synthwave84.css",
        "file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/theme/terminal.css",
        "file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/theme/toolbar.css",
        "file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/theme/custom.css",
        "file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/theme/enable-electron-vibrancy.js",
    ],
    "vscode_custom_css.policy": true,
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "git.confirmSync": false,
    "files.exclude": {
        "**/node_modules": true
    },
    "files.autoSave": "afterDelay",
    "background.useDefault": true,
    "background.useFront": true,
    "background.customImages": [
        "file:///Users/singledogno.1/Pictures/pap.er/20191127.jpg"
    ],
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "powermode.enabled": true,
    "better-comments.highlightPlainText": true,
    "better-comments.multilineComments": true,
    "better-comments.tags": [
        {
            "tag": "! ",
            "color": "#FF2D00",
            "strikethrough": false,
            "backgroundColor": "transparent"
        },
        {
            "tag": "FIXME ",
            "color": "#3498DB",
            "strikethrough": false,
            "backgroundColor": "transparent"
        },
        {
            "tag": "fixme ",
            "color": "#3498DB",
            "strikethrough": false,
            "backgroundColor": "transparent"
        },
        {
            "tag": "TODO ",
            "color": "#FF8C00",
            "strikethrough": false,
            "backgroundColor": "transparent"
        },
        {
            "tag": "todo ",
            "color": "#FF8C00",
            "strikethrough": false,
            "backgroundColor": "transparent"
        },
        {
            "tag": " ",
            "color": "#98C379",
            "strikethrough": false,
            "backgroundColor": "transparent"
        }
    ],
    "sync.gist": "944068a1850790116dd60d21167b4af10b30b0c9",
    "files.autoSaveDelay": 5000,
    "cSpell.allowedSchemas": [
        "file",
        "untitled",
        "**/*.vue"
    ],
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features"
    },
    "docthis.includeDateTag": true,
    "docthis.includeDescriptionTag": true,
    "docthis.includeAuthorTag": true,
    "vscode_vibrancy.opacity": 0,
    "vscode_vibrancy.type": "selection",
    "vscode_vibrancy.theme": "Default Dark",
    "cSpell.enabledLanguageIds": [
        "asciidoc",
        "c",
        "cpp",
        "csharp",
        "css",
        "git-commit",
        "go",
        "handlebars",
        "haskell",
        "html",
        "jade",
        "java",
        "javascript",
        "javascriptreact",
        "json",
        "jsonc",
        "latex",
        "less",
        "markdown",
        "php",
        "plaintext",
        "pug",
        "python",
        "restructuredtext",
        "rust",
        "scala",
        "scss",
        "text",
        "typescript",
        "typescriptreact",
        "vue",
        "vue-html",
        "yaml",
        "yml"
    ]
}
```

**如果你也是 Mac 电脑，并且你复制了我的`setting.json`，当中有一个只需要注意：`editor.fontFamily: "FiraCode-Retina"`**，要保证你也安装了这个字体，他才会生效。这个字体可以给你更优雅的代码展示，尤其是在条件语句中。

![FiraCode](/img/FiraCode.jpg)

Mac 可以使用`homebrew`安装这个字体

```shell
  brew tap homebrew/cask-fonts
  brew cask install font-fira-code
```

### 自定义你的{{new}}

因为`custom-css-and-js`的原因，允许自己修改编辑器的样式，事实上你可以把编辑器修改成任何样式，比如我的是毛玻璃的外观

![alpha-bg](/img/alpha-bg.jpg)

那我怎么知道样式是什么，并且怎么调整呢？其实很简单，使用`cmd + shift + p`输入 `toggle developer`, 选中切换开发者人员工具，会跳出来一个类似于 chrome 的调试面板。接下来的操作就像操作修改普通的 css 样式一样了，把这些修改过的 css 文件放到一个固定的地方，传入到`custom-css-and-js`的设置中，重启编辑器就可以生效了。

### 自定义文件模板

比如说我想自定义 vue 的模板，应该怎么做呢？

打开**首选项 -- 用户代码片段 -- 输入 `vue.json`,**打开文件，在里面编辑你想要编辑的模板就可以了。
