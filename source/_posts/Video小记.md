---
title: video小记
tags: [video]
date: 2018-01-24 15:43:53
categories: [video]
description: video标签的属性和方法
---

> html5新增的audio和video有很多的相同之处，本节中的绝大部分属性和方法在audio同样适用。

## video标签的使用

如果你想使用视频，最简单的方法:

```html
 <video id="video" src="movie.mp4"></video>
```

但在大多数情况下不建议这样使用，因为视频格式可能不支持。所以你要写成这样:

```html
 <video id="video">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    <source src="movie.webm" type="video/webm">
    ...
  </video>
```

这样你可以使用多种视频格式，如果不支持会尝试下一种格式。**目前，video元素支持三种视频格式：MP4、WebM、Ogg。**

## video标签的属性

本质上，video对象也是一个普通的DOM对象，你可以像选取普通的DOM对象一样选中它:

```js
//  javascript
var video = document.getElementById('cideo');

//  jquery
var video =  $('#video').get(0);
```

video标签有以下属性:

+ autoplay: 如果出现该属性，则视频在就绪后马上播放
+ controls: 如果出现该属性，则向用户显示控件
+ width: 视频宽度
+ height: 视频高度
+ src: 视频的路径(video标签定义的路径)
+ poster: 视频封面，没有播放时显示的图片
+ preload: 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性
+ muted: 如果出现该属性，视频的音频输出为静音。
+ loop: 如果出现该属性，则当媒介文件完成播放后再次开始播放

## video对象的属性

+ audioTracks: 返回表示可用音频轨道的 AudioTrackList 对象。
+ autoplay: 设置或返回是否在就绪（加载完成）后随即播放视频。
+ buffered: 返回表示视频已缓冲部分的 TimeRanges 对象。
+ controller: 返回表示视频当前媒体控制器的 MediaController 对象。
+ controls: 设置或返回视频是否应该显示控件（比如播放/暂停等）。
+ crossOrigin: 设置或返回视频的 CORS 设置。
+ currentSrc: 返回当前视频的 URL。
+ currentTime: 设置或返回视频中的当前播放位置（以秒计）。
+ defaultMuted: 设置或返回视频默认是否静音。
+ defaultPlaybackRate: 设置或返回视频的默认播放速度。
+ duration: 返回视频的长度（以秒计）。
+ ended: 返回视频的播放是否已结束。
+ error: 返回表示视频错误状态的 MediaError 对象。
+ height: 设置或返回视频的 height 属性的值。
+ loop: 设置或返回视频是否应在结束时再次播放。
+ mediaGroup: 设置或返回视频所属媒介组合的名称。
+ muted: 设置或返回是否关闭声音。
+ networkState: 返回视频的当前网络状态。
+ paused: 设置或返回视频是否暂停。
+ playbackRate: 设置或返回视频播放的速度。
+ played: 返回表示视频已播放部分的 TimeRanges 对象。
+ poster: 设置或返回视频的 poster 属性的值。
+ preload: 设置或返回视频的 preload 属性的值。
+ readyState: 返回视频当前的就绪状态。
+ seekable: 返回表示视频可寻址部分的 TimeRanges 对象。
+ seeking: 返回用户当前是否正在视频中进行查找。
+ src: 设置或返回视频的 src 属性的值。
+ startDate: 返回表示当前时间偏移的 Date 对象。
+ textTracks: 返回表示可用文本轨道的 TextTrackList 对象。
+ videoTracks: 返回表示可用视频轨道的 VideoTrackList 对象。
+ volume: 设置或返回视频的音量。
+ width: 设置或返回视频的 width 属性的值。

## video对象的方法

+ video.play(): 开始播放
+ video.pause(): 暂停播放

## video对象的事件

+ video.onloadstart = fn(): 客户端开始请求数据时触发
+ video.onprogress = fn(): 客户端正在请求数据时触发
+ video.onsuspend = fn(): 延迟下载时触发
+ video.onabort = fn(): 客户端主动终止下载时触发（不是因为错误引起）
+ video.onerror = fn(): 请求数据时遇到错误时触发
+ video.onstalled = fn(): 网速失速时触发
+ video.onplay = fn(): 开始播放时触发
+ video.onpause = fn(): 暂停时触发
+ video.onloadedmetadata = fn(): 成功获取资源长度
+ video.onloadeddata = fn(): 当前帧的数据已加载，但没有足够的数据来播放指定视频的下一帧时触发
+ video.onwaiting = fn(): 等待数据，并非错误
+ video.onplaying = fn(): 开始回放时触发
+ video.oncanplay = fn(): 可以播放，但中途可能因为加载而暂停
+ video.oncanplaythrough = fn(): 可以播放，视屏全部加载完毕
+ video.onseeking = fn(): 寻找资源中不断触发
+ video.onseeked = fn(): 寻找资源完毕时触发
+ video.ontimeupdate = fn(): 播放时间改变时触发
+ video.onended = fn(): 播放结束时触发
+ video.onratechange = fn(): 播放速率改变时触发
+ video.ondurationchange = fn(): 资源长度改变时触发
+ video.onvolumechange = fn(): 音量改变时触发

当视频处于加载过程中时，会依次触发以下事件:
+ video.onloadstart
+ video.ondurationchange
+ video.onloadedmetadata
+ video.onloadeddata
+ video.onprogress
+ video.oncanplay
+ video.oncanplaythrough
