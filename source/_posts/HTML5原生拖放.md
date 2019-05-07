title: HTML5原生拖放
tags: [draggable, html5]
date: 2017-11-07 14:59:28
categories: [html5]
description: HTML5拖放API及示例
---
## 拖放（Drag 和 drop）是HTML5标准的组成部分
### 拖放
拖放是一种常见的特性，即抓取对象以后拖放到其他位置。在 HTML5 中，拖放是标准的一部分，任何元素都可以被拖放。
### 浏览器支持
Internet Explorer 9 + 、Firefox、Opera 12 + 、Chrome 以及 Safari 5 +  支持拖放。
## 拖放API
### draggable属性
如果希望一个网页元素可以被拖动，只需要将他的draggable属性设置为true，这个元素就可以拖动了。
```
<div draggable="true">拖动我试试</div>
```
### 事件
拖动的过程会触发许多事件，主要有下面这些：
* `dragstart`：网页元素开始拖动时触发。
* `drag`：被拖动的元素在拖动过程中持续触发。
* `dragenter`：被拖动的元素进入目标元素时触发，应在目标元素监听该事件。
* `dragleave`：被拖动的元素离开目标元素时触发，应在目标元素监听该事件。
* `dragover`：被拖动元素停留在目标元素之中时持续触发，应在目标元素监听该事件。
* `drop`：被拖动元素或从文件系统选中的文件，拖放落下时触发。
* `dragend`：网页元素拖动结束时触发。

以上函数均可以指定回调函数：
```
draggableElement.addEventListener('dragstart', function(e) {
    alert('拖放开始！')
    console.log(e);
});
```
>拖动过程中，鼠标移动事件将不会被触发。

### dataTransfer对象
拖动过程中，回调函数接受的事件参数，有一个`dataTransfer`属性。它指向一个对象，包含了与拖动相关的各种信息。
dataTransfer对象的属性：
* dropEffect：拖放的操作类型，决定了浏览器如何显示鼠标形状，可能的值为copy、move、link和none。
* effectAllowed：指定所允许的操作，可能的值为copy、move、link、copyLink、copyMove、linkMove、all、none和uninitialized（默认值，等同于all，即允许一切操作）。
* files：包含一个FileList对象，表示拖放所涉及的文件，主要用于处理从文件系统拖入浏览器的文件。
* types：储存在DataTransfer对象的数据的类型。

dataTransfer对象的方法：
* setData(format, data)：在dataTransfer对象上储存数据。第一个参数format用来指定储存的数据类型，比如text、url、text/html等。
* getData(format)：从dataTransfer对象取出数据。
* clearData(format)：清除dataTransfer对象所储存的数据。如果指定了format参数，则只清除该格式的数据，否则清除所有数据。
* setDragImage(imgElement, x, y)：指定拖动过程中显示的图像。默认情况下，许多浏览器显示一个被拖动元素的半透明版本。参数imgElement必须是一个图像元素，而不是指向图像的路径，参数x和y表示图像相对于鼠标的位置。

```
draggableElement.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text', 'Hello World!');
});
```
上面代码在拖动开始时，在dataTransfer对象上储存一条文本信息，内容为“Hello World！”。当拖放结束时，可以用getData方法取出这条信息。                
>dataTransfer对象允许在其上存储数据，这使得在被拖动元素与目标元素之间传送信息成为可能。

## 实例 
### 简单拖放
```
/* html */
<ul id="drag-elements">
  <li id="A" draggable="true"><img src="1.jpg" alt="" /></li>
  <li id="B" draggable="true"><img src="2.jpg" alt="" /></li>
  <li id="C" draggable="true"><img src="3.jpg" alt="" /></li>
  <li id="D" draggable="true"><img src="4.jpg" alt="" /></li>
  <li id="E" draggable="true"><img src="5.jpg" alt="" /></li>
  <li id="F" draggable="true"><img src="6.jpg" alt="" /></li>
  <li id="G" draggable="true"><img src="7.jpg" alt="" /></li>
  <li id="H" draggable="true"><img src="8.jpg" alt="" /></li>
</ul>

/* css */
ul {
  margin:0 auto;
  width:800px;
}
ul:after{
  content:"";
  display:block;
  clear:both;
}
li {
  width:200px;
  height:125px;
  float:left;
  background-color:#CCC;
  text-align:center;
  line-height:120px;
  font-size:50px;
  color:#F60;
}
.dragStart img {
  width:200px;
  height:125px;
}
/* js */
var dragElements = document.querySelectorAll('#drag-elements li');
var elementDragged = null;
for (var i = 0; i < dragElements.length; i++) {
  dragElements[i].addEventListener('dragstart', function (e) {
    e.dataTransfer.setData('text', this.id);
    elementDragged = this;
  });
  dragElements[i].addEventListener('dragover', function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    elementDragged.setAttribute('class', 'dragStart');
    return false;
  });
  dragElements[i].addEventListener('dragenter', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.id != elementDragged.id) {
      var tempInnerHtml = this.innerHTML;
      this.innerHTML = elementDragged.innerHTML;
      elementDragged.innerHTML = tempInnerHtml;
      elementDragged.removeAttribute('class');
      elementDragged = this;
    }
  });
  dragElements[i].addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.id != elementDragged.id) {
      this.removeAttribute('class');
    }
  });
  dragElements[i].addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();  
    var targetId = e.dataTransfer.getData('text');
    elementDragged.removeAttribute('class');
    return false;
  });
  dragElements[i].addEventListener('dragend', function (e) {
    elementDragged = null;
  });
};
```
### 拖放网元素
```
/* html */
<ul id="drag-elements">
    <li draggable="true">A</li>
    <li draggable="true">B</li>
    <li draggable="true">C</li>
</ul>
<ul id="drop-target"></ul>

/* css */
ul{
    min-height:100px;
    background-color:#EEE;
    margin:20px;
    padding: 0;
}
ul li{
    background-color:#CCC;
    padding:10px;
    margin-bottom:10px;
    list-style: none;
}

/* js */
// 获取dom元素
var target = document.querySelector('#drop-target');
var dragElements = document.querySelectorAll('#drag-elements li');

// 定义变量跟踪被拖动的元素
var elementDragged = null;

// 对可以拖放的元素绑定 dragstart 和 dragend 事件
for (var i = 0; i < dragElements.length; i++) {
  dragElements[i].addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text', this.innerHTML);
    elementDragged = this;
  });
  dragElements[i].addEventListener('dragend', function(e) {
    elementDragged = null;
  });
}

// 向目标元素绑定 dragover 事件,来处理元素拖动进入目标元素之后的事情
target.addEventListener('dragover', function(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
});

// 最后定义目标元素的 drop事件,将被拖动元素从原来的位置删除
target.addEventListener('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.innerHTML = 'Dropped ' + e.dataTransfer.getData('text');
  document.querySelector('#drag-elements').removeChild(elementDragged);
  return false;
});
```
### 拖放文件
```
/* html */
<div id="target" title="拖动文件到这里">
  <div id="content"></div>
</div>

/* css */
#target{
  margin:10px;
  min-height:100px;
  max-height:600px;
  background-color:#EEE;
  border-radius:5px;
  overflow:auto;
}
#content{
  padding:10px;
  font-size:18px;
  line-height:25px;
}

/* js */
// 首先获取拖动的目标元素和内容展示区域
var target = document.querySelector('#target');
var contentDiv = document.querySelector('#content');

// 然后定义目标元素的dragover事件,定义了当文件进入目标元素后要做的事情
target.addEventListener('dragover', function(e) {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'copy';
  return false;
});

// 最后定义目标元素的drop事件,展示文件内容
target.addEventListener('drop', function(e) {
  e.preventDefault(); 
  e.stopPropagation();
  var fileList = e.dataTransfer.files;
  if (fileList.length > 0) {
    var file = fileList[0];
    var reader = new FileReader();
    reader.onloadend = function(e) {
      if (e.target.readyState == FileReader.DONE) {
        var content = reader.result;
        contentDiv.innerHTML = "File: " + file.name + "\n\n" + content;
      }
    }
    reader.readAsBinaryString(file);
  }
});
```
### 最后附一份最近完成的基于Vue的完整的拖放实例
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- jquery -->
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <!-- vue -->
    <script src="https://cdn.bootcss.com/vue/2.5.3/vue.js"></script>
    <!-- element-ui -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
</head>

<body>
<div id="app">
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
    </el-table>
</div>

<script>
    function dragStart(e) {
        var el = e.target;
        el = this;
        start = this.id;
    }

    function dragOver(ev) {
        var el = ev.target;
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
        $(el).addClass('dragStart');
        return false;
    }

    function dragEnter(ev) {
        var el = ev.target;
        ev.preventDefault();
        ev.stopPropagation();
        if (this.id !== el.id) {
            $(el).addClass('dragstart');
            el = this;
        }
    }

    function dragLeave(ev) {
        var el = ev.target;
        ev.preventDefault();
        ev.stopPropagation();
        if (this.id !== el.id) {
            $(this).removeClass('dragstart');
        }
        $('td').css("borderBottomColor", "")
        $(this).find('td').css("borderBottomColor", "#f66e04")
    }

    function drop(e) {
        var el = e.target;
        e.preventDefault();
        e.stopPropagation();
        if (this.id !== el.id) {
            $(this).removeClass('dragstart');
        }
        end = this.id;
    }

    function dragEnd(e) {
        var el = e.target;
        $('td').css("borderBottomColor", "")
        var lists = app.$data.tableData;
        el = null;
        var flag;
        flag = lists[start];
        lists[start] = lists[end];
        lists[end] = flag;
        app.$data.tableData = lists.concat([]);
        console.log("从索引" + start + "移动到索引" + end)
    }

    var app = new Vue({
        el: "#app",
        data: function () {
            return {
                tableData: []
            }
        },
        mounted: function () {
            this.tableData = [{
                date: '2016-05-02',
                name: '王小虎1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎2',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎3',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎4',
                address: '上海市普陀区金沙江路 1516 弄'
            }];
        },
        watch: {
            tableData: function () {
                this.$nextTick(() => {
                    this.StartDrag()
                })
            }
        },
        methods: {
            StartDrag: function () {
                var start, end;
                var dragElements = document.getElementsByClassName('el-table__row');
                for (var i = 0; i < dragElements.length; i++) {
                    dragElements[i].setAttribute('draggable', 'true');
                    dragElements[i].setAttribute('id', i)
                }
                for (var i = 0; i < dragElements.length; i++) {
                    /*
                    *因为涉及到翻页和全局搜索之类的功能
                    *会大量的树新数据导致dom变化
                    *因此在绑定时间之前重新渲染页面
                    *移除之前的事件重新绑定
                    */
                    // removeEventListener
                    dragElements[i].removeEventListener('dragstart', dragStart);
                    dragElements[i].removeEventListener('dragover', dragOver);
                    dragElements[i].removeEventListener('dragenter', dragEnter);
                    dragElements[i].removeEventListener('dragleave', dragLeave);
                    dragElements[i].removeEventListener('drop', drop);
                    dragElements[i].removeEventListener('dragend', dragEnd);
                    // addEventListener
                    dragElements[i].addEventListener('dragstart', dragStart);
                    dragElements[i].addEventListener('dragover', dragOver);
                    dragElements[i].addEventListener('dragenter', dragEnter);
                    dragElements[i].addEventListener('dragleave', dragLeave);
                    dragElements[i].addEventListener('drop', drop);
                    dragElements[i].addEventListener('dragend', dragEnd);
                }
            }
        }
    })
</script>
</body>

</html>

```