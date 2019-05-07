title: 关于webpack的那些事
tags: [webpack]
date: 2018-03-22 10:37:40
categories: [webpack]
description: 一篇webpack笔记
---
## Entry - 配置模块入口
```
//  配置多入口文件
const glob = require('glob');
const pagePath = path.resolve(__dirname,'./src')
function entries() {
  let entryFiles = glob.sync(pagePath + '/*/*.js');
  let map = {};
  entryFiles.forEach((filePath)=>{
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
  map[filename] = filePath
});
  return map
}
```
## Output - 配置模块如何输出成为结果
```
//  配置多个文件打包
const glob = require('glob');
const pagePath = path.resolve(__dirname,'./src')
const HtmlWebpackPlugin = require('html-webpack-plugin');
function htmlPlugin(options) {  //  options: 自定义缺省的htmlWebpackPlugin参数
  let entryHtml = glob.sync(pagePath + '/*/*.html');
  let arr = [];
  entryHtml.forEach((filePath) =>{
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.')); //  获取文件名
    let conf = {    //  htmlWebpackPlugin配置选项
      template: filePath,
      filename: filename + '.html',   //  文件名
      chunks: ['manifest', 'vendor', filename],    // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      title:options.title,    // 文章标题
      inject: true,
      hash:true,
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    };
    arr.push(new HtmlWebpackPlugin(conf))
  });
  return arr
}
```
## Module - 配置模块的处理规则
```
module:{
  rules:[
    {
       test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
       use: 'url-loader?limit=2000&name=images/[hash:8].[name].[ext]',  //  使用url-loader处理图像文件，小于2000转为base64，否则打包到images文件夹下名为[hash:8].[name].[ext]
       include:path.resolve(__dirname,'src'),  //  打包时包含src文件夹
         exclude:path.resolve(__dirname,'node_modules'),  // 打包时排除node_modules文件夹
    },
    {
      test: /\.scss$/,
      use: [{   //  loader的另一种配置方式(loader解析顺序从后往前)
          loader: "style-loader",
          options: {}
        },
        {
          loader: "css-loader?minimize",
        },
        {
          loader: "postcss-loader",
          options: {
            postcss(){
              require('autorefixer')({
                browsers:['ie>8','>1% in CN']
              })
            }
          }
        },
        {
          loader: "sass-loader"
        }],
        exclude:path.resolve(__dirname,'node_modules'),
        include:path.resolve(__dirname,'src')
    },
  ]
}
```
##  Resolve - 自定义模块的解析方式
```
 resolve: {
    //  导入文件没有后缀时，webpack尝试自动补全，顺序由前到后
    extensions: ['.js', '.vue', '.json'],
    //  允许自定义模块。以下例子中导入@/foo.js实际上是导入src/foo.js；并且支持使用$结尾缩小搜索范围(命中vue结尾的模块，及只会将 import vue 转换为 import vue/dist/vue.esm.js)
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  }
```
## Plugin - 简单粗暴地解释：如果你遇到一个webpack无法处理的操作，那他一定可以通过插件来解决
> 该配置简单到无法解释，接受一个数组，添加插件即可。所有插件及用法[看这里](https://doc.webpack-china.org/plugins/)
```
plugin:[
  new webpack.ProvidePlugin({ //  这个插件用来配置全局jquery
    $: "jquery",
    jQuery: "jquery",
    jquery: "jquery",
    "window.jQuery": "jquery"
  }),
  new CleanWebpackPlugin(['dist']), //  这个插件用来清空dist文件夹
  ...
]
```
## DevSever - 构建本地开发环境
> 具体配置[移步这里](https://doc.webpack-china.org/configuration/dev-server/)
## 一些问题
### 项目中使用sass
webpack.base.conf.js中的module新加一项：
```
{
  test: /\.scss$/,
  use: ["style-loader","css-loader?minimize","sass-loader"],
  exclude:path.resolve(__dirname,'node_modules')
}
```
### 项目中使用jquery插件
webpack.base.conf.js中的module新加plugin：
```
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    jquery: "jquery",
    "window.jQuery": "jquery"
    }),
  ]
```