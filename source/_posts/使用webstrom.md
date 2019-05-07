title: 使用webstrom
date: 2017-08-28 16:51:51
tags: [webstorm]
categories: [editor]
description: 详细的webstorm使用文档
---
我本人从事前端开发也有很长一段时间了。从一开始的[editplus](https://www.editplus.com/)，到后来用到[nodepad++](https://notepad-plus-plus.org/),之后还使用过一些其他的编辑器以及IDE，但我个人最钟爱的还是[webstrom](http://www.jetbrains.com/webstorm/)。相比[phpstrom](http://www.jetbrains.com/phpstorm/)他更倾向于前端方向的开发模式，相比[hbuilder](http://www.dcloud.io/)有简明的操作方式和更直观的操作面板。在我个人看来webstrom的缺点很少，如果能够用的顺手，相信会让你的效率提升数倍。            
## 下载        
webstrom下载选择官网[http://www.jetbrains.com/webstorm/](http://www.jetbrains.com/webstorm/)下载。虽然有各种破解版本以及汉化版本满天飞，但相比正版的webstrom少了很多功能和使用的乐趣。可是如果从官网渠道下载webstrom我只能使用30天怎么办？其实只要你在安装时选择**license server**，然后输入`http://idea.imsxm.com/`，就可以正常使用了。
## 从设置开始说起
你可以点击**File - Settings...** 或者通过快捷键 **ctrl + alt + shift**进入设置（本文所有快捷键仅限于window系统，如果是mac可以在右下角**LF**选项中选择window或者自行查找mac系统快捷键）。  
### Appearance & Behavior
这一栏的设置不建议修改，但还是应该注意**System Settings**这一栏，这一栏中可以设置一些IDE的行为。例如开启webstorm时是否自动显示上一次的项目、打开新项目时覆盖当前项目还是重新打开一页之类的。事实上这些设置在处开始使用时IDE本身也会有弹框提示，但也可以之后修改。另外，在**Appearance**中可以设置IDE背景（Background Image...），不知道你是否注意到了呢？
### Keymap
这一栏通常用来设置和修改快捷键。你可以修改或者新加某项功能的快捷键，目录为顶部目录，找到双击即可修改和新增，简单方便。
### Editor
这一栏负责编辑器的编辑模块，重要的有以下几个设置
#### General
这一栏主要设置**ctrl + 鼠标滚轮**调节字号大小、**自动换行**。
![1.png](/blog/img/1.png)  
#### Color Scheme
这一栏可以更换浏览器主题。你可以使用自带的几种主题，也可以下载其他主题。下载地址：[http://color-themes.com/?view=index](http://color-themes.com/?view=index)，方式很简单，点击图片可以进行主题预览，选中自己喜欢的主题，下载出来。下载很快，几乎是点击下载的瞬间完成，然后我们就可以安装到自己webstrom中。安装方法：点击左上角的**File--Setting**，选中**Import Settings**，进入选择界面，选择你下载好的主题文件（后缀为.jar），编辑器会经过俩次提示，全部选择同意，然后重启，你就会发现主题安装成功了。在这里有一个小插曲，如果你之前已经打开了webstrom，那么在选择文件的时候有可能会无法找到那个文件，这是因为webstrom本身的缓存在作怪，只要你保证进入到了正确的文件夹，点击刷新，那个文件一定会出现在你的视线中。
![img2](/blog/img/2.jpg)![img3](/blog/img/3.jpg)     
####  Code Style
可以设置每种类型文件的格式化参数
#### File and Code Templates
这一栏可以设置自定义的模板，这样在新建文件时可以省去重复操作。
### Plugins
这里可以设置IDE插件。比如我在写博客时自然希望他可以支持markdown的操作（虽然博客在[atom](https://atom.io/)中编辑更爽的说）。在这里添加markdown的插件。            
![img4](/blog/img/4.png)
当然你也可以根据需要安装其他功能的插件。
### Version Control
这里设置版本控制。但webstorm自动处理好了这些设置，一般我们不会在这里进行操作。除非你想添加github仓库。但这一操作比较麻烦，我不会赘述。你可以[点击这里](https://www.cnblogs.com/vanstrict/p/5677716.html)进行配置。              
关于git的操作我们通常直接进行操作
* 如果你想克隆一个仓库，你可以点击导航**VCS - git - clone**直接克隆并打开一个项目。
* 对于已被管理的项目，右键鼠标同样有**git**选项，可以进行所有的git操作。值得注意的是
    + 使用快捷键ctrl + k可以进行commit操作，ctrl + shift + k 可以进行push操作
    + 右下角有git: master 之类选项，可以在这里更方便的切换和创建分支

### Language && Frameworks
#### JavaScript
在这里可以设置js的版本，在子选项中通常使用的是**Libraries**，可以设置IDE支持的语法和提示。
你可以选择下载需要的语法支持（jquery之类）。
#### Node.js and NPM 
webstrom会主动去寻找nodeJs程序而不用你手动添加，之后你就可以在IDE中享受编辑器的自动补全以及错误提示等方便的功能，并且下方会显示你安装过的packages，并可以搜索版本是否为最新版本并提示升级。另外，在新创建项目时，我们可以指定文件为**Node.js express App**,非常方便。
![img5](/blog/img/5.png)![img6](/blog/img/6.png)
### Tools
#### File watchers
这里可以设置自动编译。比如很多前端比较前沿的技术（babel、sass之类），在不需要非常复杂配置的情况下webstorm提供自动编译，省去配置文件这一环节。这一功能的前提是你向webstorm添加了编译功能：点击加号，在program中填入安装文件的.cmd文件，在argument中定义你想要的编译方式就可以了。
## 底部操作栏
如果你的底部没有操作栏，点击左下角的小电脑。
### TODO
你可以在webstorm中使用TODO注释，这样做的好处是你可以通过底部的TODO功能随时找到他。
### Terminal
不解释，所有开发者都懂得
### run
运行js文件的利器。尤其在nodejs开发时更为明显。
## 侧边栏
### npm
如果你是运行nodejs项目，会出现这一栏，可以让你方便的运行script。修改script时别忘了点击刷新按钮进行更新
## 其他方便的操作
其他方便的功能
+ 按住shift，鼠标移入图片链接中可以显示出图像及其具体信息。
+ 右键点击最右侧区域，选择**customize highlight level**可以选择IDE的高亮规则。由低到高分别为不检查、只检查语法、全检查
+ 配合浏览器插件可以使用debug，在webstorm中直接打断点不知道有多爽。
+ 基于NodeJS开发大型项目时，由于node_modules文件夹过于庞大导致的项目加载缓慢甚至卡死，可以在File--setting--Editor--File Types中的ignore files and folders增加一项node_modules（注意后面加分号）;可以让webstorm忽略这个文件夹。