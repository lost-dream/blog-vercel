title: vue-cli3.x项目图片压缩
tags: [webpack, vue, compress]
date: 2019-05-07 17:04:27
categories: [webpack, vue, compress]
description: vue-cli3.x修改webpack配置，添加压缩图片功能
---
## 介绍
[image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)是基于webpack的图像加载器模块，使用了[imagemin](https://github.com/kevva/imagemin)压缩PNG，JPEG，GIF，SVG和WEBP图像。
## 安装image-webpack-loader
```npm
npm i -D image-webpack-loader
```
## vue-cli3.x配置方法
这个loader在图片解析的过程中生效，并且最好放在最开始执行，这样的话可以做到先压缩图片，然后再用url-loader处理小图片，可以有效地也就是说需要跟在图片的loader之后进行。也就是说在原本的webpack.config.js中应该是这样的：
```js
{
	test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
	use: [
		{
			loader: 'url-loader',
			options: {
				// ...
			}
		},
		{
			loader: 'image-webpack-loader',
			options:{
				bypassOnDebug: true
			}
		}
	]
}
```
因此对应的，通过运行 `vue inspect` 我们找到处理图片的部分，知道他的loader规则叫images，我们只需要修改这部分规则就行了。
```js
// vue.config.js

module.exports = {
	chainWebpack: config => {
		// 通过vue inspect找到对应的规则
		const imagesRule = config.module.rule('images')
		// 删除原本的规则
		imagesRule.uses.clear()
		// 为images添加想要的规则,首先把原有的规则恢复
		imagesRule
			.use('url-loader')
			.loader('url-loader')
			.options({
				limit: 4096,
  				fallback: {
    				loader: 'file-loader',
    				options: {
      					name: 'img/[name].[hash:8].[ext]'
    				}
  				}
			})


		// 再给images添加压缩图片的loader
		imagesRule
  			.use('image-webpack-loader')
  			.loader('image-webpack-loader')
  			.options({ bypassOnDebug: true })
	}
}
```
这样就可以了。但需要注意几个问题：
+ 插件本身有更丰富的options，但因为~~我懒得写~~大部分情况下不需要修改，所以就没有写，更具体的配置可以去[官网](https://github.com/tcoopman/image-webpack-loader#readme)看看
+ 图片压缩是非常耗时的，因此建议只在生产环境下使用。