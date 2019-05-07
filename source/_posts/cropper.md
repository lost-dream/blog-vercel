title: cropper
tags: [cropper]
date: 2017-11-06 11:01:19
categories: [JavaScript]
description: 一个简单的jquery图片裁剪插件
---
## 初始化
用一个块元素包裹image或canvas元素
```
/* html */
<div id="wrapper"> 
  <img src="image.jpg">
</div>
/* css */
#wrapper img {
  max-width:100%;
}
/* js */
$('#wrapper > img').cropper(options)
```
备注：
+ cropper 的尺寸是由图片的父元素（包裹）继承来的，所以要确保用一个可见的块元素包裹图片。

+ 输出的裁剪数据基于原始图像的尺寸，所以你可以直接使用它们来裁剪图像。

+ 如果你尝试去对一个跨域的图片使用 cropper，请确保你的浏览器支持 HTML5 CORS 设置属性，并且你的图片服务器支持 `Access-Control-Allow-Origin` 选项。
## options

| 键值| 参数说明|示例/默认值|
|:---:|:---:|:---:|  
| aspectRatio | number<br>裁剪框的长宽比 | NAN |
| preview | selector<br>添加额外的元素来作为预览 | $('#perview') |
| strict | boolean<br>严格模式下不能移出画布 | true |
| responsive | boolean<br>严格模式下不能移出画布 | true |
| data | boolean<br>上一个剪裁数据，前提是你做了存储，将会自动传给`setData`方法 | true |
| checkImageOrigin | boolean<br>如果检测的图片是跨域的，该元素将会被添加上一个 `crossOrigin` 属性，图片 url 地址会被加上一个时间戳。通过给图片加上 `crossOrigin` 属性，将会阻止给图片的 url 加上时间戳，并停止重新加载图片 | true |
| modal | boolean<br>在图片上方以及剪裁框下方显示黑色模式(半透明的黑色遮罩) | true |
| guides | boolean<br>在剪裁框上方显示虚线 | true |
| center | boolean<br>在剪裁框上方显示中心标识 | true |
| highlight | boolean<br>在剪裁框上面显示白色的模态框 | true |
| background | boolean<br>显示容器的网格背景 | true |
| autoCrop | boolean<br>允许初始化的时候自动剪裁图片 | true |
| autoCropArea | Number<br>自动剪裁的区域大小（百分比），介于 0 到 1 之间的数字 | 0.8 |
| dragCrop | Boolean<br>允许移除当前的剪裁框，然后通过在图片上拖动鼠标创建一个新的剪裁框 | true |
| movable | Boolean<br>允许移动图片 | true |
| rotatable | Boolean<br>允许旋转图片 | true |
| scalable | Boolean<br>允许缩放图片 | true |
| zoomable | Boolean<br>允许缩放图片 | true |
| mouseWheelZoom | Boolean<br>允许在鼠标滚动的时候缩放图片 | true |
| wheelZoomRatio | Number<br>当通过滚动鼠标缩放图片的时候，定义缩放尺寸 | 0.1 |
| touchDragZoom | Boolean<br>允许通过触摸拖动来缩放图片 | true |
| cropBoxMovable | Boolean<br>允许移动剪裁框 | true |
| cropBoxResizable | Boolean<br>允许调整剪裁框大小 | true |
| doubleClickToggle | Boolean<br>允许通过双击 cropper 来切换剪裁（图片）和移动（图片）模式 | true |
| minContainerWidth | Number<br>容器最小宽度 | 200 |
| minContainerHeight | Number<br>容器最小高度 | 100 |
| minCanvasWidth | Number<br>画布最小宽度（图片包裹器） | 0 |
| minCanvasHeight | Number<br>画布最小高度（图片包裹器） | 0 |
| minCropBoxWidth | Number<br>剪裁框最小宽度 | 0 |
| minCropBoxHeight | Number<br>剪裁框最小高度 | 0 |
| build | Function<br>`build.cropper` 事件的快捷方式 | null |
| built | Function<br>`built.cropper` 事件的快捷方式 | null |
| cropstart | Function<br>`cropstart.cropper` 事件的快捷方式 | null |
| cropmove | Function<br>`cropsmove.cropper` 事件的快捷方式 | null |
| cropstend | Function<br>`cropend.cropper` 事件的快捷方式 | null |
| crop | Function<br>`crop.cropper` 事件的快捷方式 | null |
| zoom | Function<br>`zoom.cropper` 事件的快捷方式 | null |
| cropstart | Function<br>`cropstart.cropper` 事件的快捷方式 | null |

## methods
由于加载图片的是一个异步进程，你应该在 buit 之后调用大多数的方法，除 `setAspectRatio`, `replace` 和 `destroy` 之外。
```
$().cropper({
  built: function () {
    $().cropper('method', argument1, , argument2, ..., argumentN);
  }
});
```
### crop()
手动显示剪裁框。
```
$().cropper({
  autoCrop: false,
  built: function () {
    // Do something here
    // ...

    // And then
    $(this).cropper('crop');
  }
});
```
### reset()
将图片和剪裁框重置到他们的初始化状态。
### clear()
清除剪裁框
### replace(url)
+ url:
  - 类型:`String`
  - 一个新的图片 `url`
     
替换图片的链接地址，然后重建cropper
### enable()
启用（解冻）cropper
### disable()
禁用（冻结）cropper
### destroy()
销毁 cropper 并且从图片上移除实例。
### move(offsetX[, offsetY])
  + offsetX:
    - 类型: Number
    - 默认值: 0
    - 在水平方向上移动的尺寸（像素）
  + offsetY (optional):
    - 类型: Number
    - 在垂直方向上移动的尺寸（像素）
    - 如果不存在，默认值是 offsetX
    
移动画布（图片包裹器）
```
$().cropper('move', 1);
$().cropper('move', 1, 0);
$().cropper('move', 0, -1);
```
### zoom(ratio)
  + ratio:
    - 类型: Number
    - 放大: 需要一个正数（ratio > 0）
    - 缩小: 需要一个负数（ratio < 0）
    
缩放画布（图片包裹器）
```
$().cropper('zoom', 0.1);
$().cropper('zoom', -0.1);
```
### rotate(degree)
  + degree:
    - 类型: Number
    - 向右旋转： 需要一个正数（degree > 0）
    - 向左旋转： 需要一个负数（degree < 0）
    
旋转画布（图片包裹器）：需要 CSS3 2D Transforms 来支持 (IE 9+)
```
$().cropper('rotate', 90);
$().cropper('rotate', -90);
```
### scale(scaleX[, scaleY])
  + scaleX
    - 类型: Number
    - 默认值: 1
    - 图片横坐标上的缩放因子
    - 当等于1的时候，就相当于什么都没做。
  + scaleY (optional):
    - 类型: Number
    - 图片纵坐标上的缩放因子 -如果不存在，默认是 scaleX
    
缩放图片：需要 CSS3 2D Transforms 来支持 (IE 9+)
```
 $().cropper('scale', -1); //  水平方向和垂直方向都翻转
    $().cropper('scale', -1, 1); // 水平方向翻转
    $().cropper('scale', 1, -1); // 垂直方向翻转
```
### getData([rounded])
  + rounded (optional):
    - 类型: Boolean
    - 默认值: false
    - 来获得圆角值
  + (返回值):
    - 类型: Object
    - 属性:
      * x: 剪裁区的左偏移量
      * y:剪裁区的上偏移量
      * width: 剪裁区宽度
      * height: 剪裁区高度
      * rotate: 图片的旋转角度
      * scaleX: 图片横坐标上的缩放因子
      * scaleY: 图片纵坐标上的缩放因子
      
输出剪裁区的位置和尺寸数据（基于原始图片）
### setData(data)
  * data:
    + 类型: Object
    + 属性: 查看 getData 方法

改变剪裁区的位置和尺寸值（基于原始图片）       
**注意**: 只在严格模式下有用
### getContainerData()
  + (返回值):
    - 类型: Object
    - 属性:
      * width:容器当前宽度
      * height: 容器当前高度

输出容器的尺寸数据
### getImageData()
  + (返回值):
    - 类型: Object
    - 属性:
      * left: 图片的左偏移量
      * top: 图片的上偏移量
      * width: 图片宽度
      * height: 图片高度
      * naturalWidth:图片自然宽度
      * naturalHeight: 图片自然高度
      * aspectRatio: 图片长宽比
      * rotate: 图片的旋转角度
      * scaleX:图片横坐标上的缩放因子
      * scaleY: 图片纵坐标上的缩放因子
      
输出图片的位置尺寸和其它相关数据。    
### getCanvasData()
  + (返回值):
    - 类型: Object
    - 属性:
      * left: 画布左偏移量
      * top: 画布上偏移量
      * width:画布宽度
      * height: 画布高度
    
输入画布（图片包裹器）的位置和尺寸数据。
### setCanvasData(data)
  + data:
    - 类型: Object
    - 属性:
      * left: 画布新的左偏移量
      * top: 画布新的上偏移量
      * width: 画布新的宽度
      * height: 画布新的高度
    
修改画布（图片包裹器）的位置和尺寸数据。
### getCropBoxData()
  * (返回值):
    + 类型: Object
    + 属性:
      - left: 剪裁框左偏移量
      - top:剪裁框上偏移量
      - width: 剪裁框宽度
      - height:剪裁框高度
    
输出剪裁框的位置和尺寸数据。
### setCropBoxData(data)
  + data:
    - 类型: Object
    - 属性:
      - left: 剪裁框新的左偏移量
      - top: 剪裁框新的上偏移量
      - width: 剪裁框新的宽度
      - height: 剪裁框新的高度
    
修改剪裁框的位置和尺寸数据。
### getCroppedCanvas([options])
  + options (可选):
    - 类型: Object
    - 属性:
      * width输出画布的目标宽度
      * height: 输出画布的目标高度
      * fillColor: 填入输出画布的任何alpha 颜色值
  + (返回值):
    - 类型: HTMLCanvasElement
    - 剪裁后的图片的画布
  + 浏览器支持：
    - 基本图片: 需要 Canvas 来支持 (IE 9+)
    - 旋转的图片: 需要 CSS3 2D Transforms 来支持 (IE 9+)
    - 跨域图片: 需要 HTML5 CORS settings attributes 来支持 (IE 11+)
    
获取剪裁后的图片的画布     
随后，你可以直接将画布显示为一张图片，或者使用 canvas.toDataURL 来获取一个数据的 URL，或者使用 canvas.toBlob 获取一个 blob 然后使用 FormData 将其上传到服务器上（如果浏览器支持这些APIs）。
```
$().cropper('getCroppedCanvas'); 
  $().cropper('getCroppedCanvas', {
    width: 160,
    height: 90
  });  
  // Upload cropped image to server
  $().cropper('getCroppedCanvas').toBlob(function (blob) {
    var formData = new FormData();    
    formData.append('croppedImage', blob);
      $.ajax('/path/to/upload', {
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
          console.log('Upload success');
        },
        error: function () {
          console.log('Upload error');
        }
      });
    });
```
### setAspectRatio(aspectRatio)
  + aspectRatio:
    - 类型: Number
    - 需要一个正整数。
    
改变剪裁框的长宽比。
### setDragMode([mode])
  + mode (可选):
    - 类型: String
    - 默认值: 'none'
    - 可选值: 'none', 'crop', 'move'
    
修改拖动模式。
**提示**: 你可以通过双击剪裁框在 "crop" 和 "move" 模式之间切换 。
## 事件
### build.cropper
该事件在剪裁框实例开始加载一张图片的时候触发。
### built.cropper
该事件在一个剪裁框实例完全创建好的的时候触发。
### cropstart.cropper
  + event.originalEvent:
    - 类型: Event
    - 选项: mousedown, touchstart 和 pointerdown
  + event.action:
    - 类型: String
    - 选项:
      * 'crop':创建一个新的剪裁框
      * 'move': 移动画布
      * 'zoom':放大/缩小画布
      * 'e': 调整剪裁框东面的大小
      * 'w': 调整剪裁框西面的大小
      * 's': 调整剪裁框南面的大小
      * 'n': 调整剪裁框北面的大小
      * 'se': 调整剪裁框东南面的大小
      * 'sw': 调整剪裁框西南面的大小
      * 'ne': 调整剪裁框东北面的大小
      *'nw': 调整剪裁框西北面的大小
      *'all': 移动剪裁框（所有方向）
    
该事件在画布或者剪裁框开始改变的时候触发。
```
$().on('cropstart.cropper', function (e) {
  console.log(e.type); // cropstart
  console.log(e.namespace); // cropper
  console.log(e.action); // ...
  console.log(e.originalEvent.pageX);
   
  // Prevent to start cropping, moving, etc if necessary
  if (e.action === 'crop') {
    e.preventDefault();
  }
});
```
### cropmove.cropper
  + event.originalEvent:
    - 类型: Event
    - 选项: mousemove, touchmove 和 pointermove.
  + event.action: 和 "cropstart.cropper" 是一样的。
  
该事件在画布或者剪裁框正在改变中的时候触发。
### cropend.cropper
 + event.originalEvent: 
   - 类型: Event
   - 选项: mouseup, touchend, touchcancel, pointerup 和 pointercancel.
 + event.action: 和 "cropstart.cropper" 是一样的
 
该事件在画布或者剪裁框停止改变的时候触发。
### crop.cropper
  + event.x
  + event.y
  + event.width
  + event.height
  + event.rotate
  + event.scaleX
  + event.scaleY

关于这些属性，请查看 `getData` 方法.    
该事件在画布或者剪裁框改变完成的时候触发。
### zoom.cropper
  + event.originalEvent:
    - 类型: Event
    - 选项: wheel, touchmove.
  + event.ratio:
    - 类型: Number
    - 当前缩放比例 (ratio > 0表示放大, ratio < 0 表示缩小)

该事件在一个剪裁框实例开始放大或缩小的时候触发。
```
$().on('zoom.cropper', function (e) {
  var maxRatio = 10;
  var imageData = $(this).cropper('getImageData');
  var currentRatio = imageData.width / imageData.naturalWidth;

  // Zoom in
  if (e.ratio > 0 && currentRatio > maxRatio) {

    // Prevent zoom in
    e.preventDefault();

    // Fit the max zoom ratio
    $(this).cropper('setCanvasData', {
      width: imageData.naturalWidth * maxRatio
    });
  }

  // Zoom out
  // ...
});
```
### 防止冲突
如果你已经使用了其它的插件，而且是相同的命名空间，只需要调用 `$.fn.cropper.noConflict` 方法来还原它。
```
<script src="other-plugin.js"></script>
<script src="cropper.js"></script>
<script>
  $.fn.cropper.noConflict();
  // Code that uses other plugin's "$().cropper" can follow here.
</script>
```





















