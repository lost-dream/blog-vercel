---
title: html 清除缓存
tags:
  - html5
  - cache
categories:
  - html5
description: 通过前端的方法清除浏览器缓存
abbrlink: 908eabcd
date: 2017-11-25 08:25:15
---

## 通过设置 meta 标签清除页面缓存

通过向 header 中添加以下代码可以清除页面缓存

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

### Cache-Control 头域

Cache-Control 指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置 Cache-Control 并不会修改另一个消息处理过程中的缓存处理过程。请求时的缓存指令包括 **no-cache**、**no-store**、**max-age**、**max-stale**、**min-fresh**、**only-if-cached**，响应消息中的指令包括 **public**、**private**、**no-cache**、**no-store**、**no-transform**、**must-revalidate**、**proxy-revalidate**、**max-age**。各个消息中的指令含义如下

- Public 指示响应可被任何缓存区缓存
- Private 指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效
- no-cache 指示请求或响应消息不能缓存
- no-store 用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
- must-revalidation/proxy-revalidation 如果缓存的内容失效，请求必须发送到服务器/代理以进行重新验证
- max-age 指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应
- min-fresh 指示客户机可以接收响应时间小于当前时间加上指定时间的响应
- max-stale 指示客户机可以接收超出超时期间的响应消息。如果指定 max-stale 消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

更多具体信息可以移步[百度百科](https://baike.baidu.com/item/Cache-control/1885913?fr=aladdin)查看

### pragma 与 no-cache 用于定义页面缓存,不缓存页面

### Expires 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新调阅。可以把该值设置为一个早已过去的时间，那么访问此网时若重复在地址栏按回车，那么每次都会重复访问。注意：必须使用 GMT 的时间格式

### 如果这些还不够，就必须从代码中做文章。可以给每个文件加一个后缀，告诉浏览器这是一个新文件。这一效果通常选择在打包自动生成

## 通过异步请求更新数据

### 使用 ajax 请求文件时加上请求头 **If-Modified-Since** 和 **Cache-Control**

```javascript
$.ajax({
  url:'/',
  dataType:'json',
  beforeSend :function(xmlHttp){
    xmlHttp.setRequestHeader("If-Modified-Since","0");
    xmlHttp.setRequestHeader("Cache-Control","no-cache");
  },
  async:false,
  success:function(response){
    ...
  }
});
```

### 你也可以试试直接使用 **cache:false**

```js
$.ajax({
  url:'/',
  dataType:'json',
  data:{},
  cache:false,
  ifModified :true,
  async:false,
  success:function(response){
    ...
  }
});
```
