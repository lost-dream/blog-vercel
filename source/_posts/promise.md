---
title: promise 详解
tags:
  - es6
  - promise
categories:
  - JavaScript
top: true
description: 面试中常被问起promise，在这里总结一下
abbrlink: fa98e2f7
date: 2020-04-09 14:22:19
---
最近想重新换工作，几乎所有面试都会问到 promise，有简单理解的，也有问到一些比较复杂的实现，有些我是知道的但也有些是不清楚的，所以查阅资料，把关于 promise 的知识补充提升一下。

> 本文旨在说明 promise，并未实现具体的 ajax 请求。

## promise 的出现解决了什么样的问题

### 回调地狱

假设一种业务场景，你需要取到所有开源库的列表（假设列表本身按照开源库热度排序），你需要读取当中热度第一的库名称，然后通过调用查询接口查出该库官方文档地址

```js
  ajax('aaa', success(res) {
    const lib = res
    // ...other code
    ajax(`bbb`, success(res) {
      // ... other code
    })
  })
```

事实上，真实的业务可能比例子复杂很多，而后一步的操作又必须基于上一步操作的结果，我们不得不将代码组织成这样的回调。然而这样的代码存在很大的问题：

- 代码无法执行 return
- 回调层数过多会导致逻辑很难读懂，并且后期维护难度很大

### 条件返回

在视频网站或者直播网站很常见到一种场景，视频会分多条线路（主线路、备用线路1、备用线路2...），业务上，打开网站的时候，会同时去请求这三个视频的接口，只要其中一个接口返回了数据，中断其他接口的请求。这样的业务需求在之前的方法中都没有很好地实现方法。

## promise 详解

### 基本语法 && 成功处理

```js
  new Promise((resolve, reject)=> {
    resolve('success')
    reject('error')
  })
  .then(
    res=> { console.log('success', res) }
    err=> { console.log('error', err) }
  )
  .catch(err=> { console.log(err) })
```

- promise 有三个状态
  - pending 等待结果返回（未完成）
  - fulfilled 实现（操作完成）
  - rejected 被拒绝（操作失败）
  - 状态一旦改变，不会再次改变
- 因此 promise 状态状态改变只有两种可能
  - pending => fulfilled
  - pending => rejected

其中 pending => fulfilled 表示操作由未完成变为成功，这时会触发`resolve`，**将操作的结果作为参数传递出去**，pending => rejected 表示操作由未完成变为成功，这时会触发`reject`，**将操作结果的错误信息作为参数传递出去。**
**必须注意的是，promise 会将状态传递出去，用于下一步骤操作的参数**

```js
  new Promise(resolve=> {
    ajax('aaa', success(data) {
      // data = {name: 'singleDogNo.1'}
      resolve(data)
    })
  }).then(res=> {
    return new Promise(resolve=> {
      ajax('bbb', success(data) {
        // data = {age: 27}
        resolve(...[res, data])
      })
    })
  }).then(res=> {
    console.log(res)
    /*
      {
        name: 'singleDogNo.1',
        age: 27
      }
    */
  })
```

### 错误处理

promise 会自动捕捉异常，交给 rejected 函数处理

```js
  new Promise(resolve=> {
    setTimeout(()=> {
      throw new Error('error!')
    })
  })
  .then(res=> {
    console.log(res)
  })
  .catch(err=> {
    console.log(err) // error!
  })
```

这里需要注意的是链式执行异步操作时，你可以选择为每一步操作做错误处理，类似`a().then(b()).catch().then(c()).catch()`，也可以将错误处理放在最后执行，类似`a().then(b()).then(c()).catch()`。但一般推荐第二种方式，更加方便阅读。

还有一点需要注意的是 catch 本身也会返回 promise 实例，并且状态是 resolve，而且一旦执行到 catch 中，链式操作将会中断，不再继续执行。

```js
  new Promise(resolve=> {
    setTimeout(()=> {
      resolve()
    }, 1000)
  })
  .then(()=> {
    console.log('promise1')
    throw new Error('error')
  })
  .then(()=> {
    console.log('promise2')
  })
  .then(()=> {
    console.log('promise3')
  })
  .catch(err=> {
    console.log(err)
  })
  // promise1
  // Error: error
  // 不会继续执行 promise2 和 promise3
```

### promise.all()

这个方法会在所有异步操作执行完成并且状态全部为成功的时候执行回调方法

```js
  function randomA() {
    return new Promise((resolve,reject)=> {
      setTimeout(()=> {
        const num = Math.floor(Math.random() * 10)
        console.log('num: ', num);
        if (num <= 5) {
          resolve(num)
        } else {
          reject('randomA:数字大于5是不行的')
        }
      }, 1000)
    })
  }

  function randomB() {
    return new Promise((resolve,reject)=> {
      setTimeout(()=> {
        const num = Math.floor(Math.random() * 10)
        console.log('num: ', num);
        if (num <= 5) {
          resolve(num)
        } else {
          reject('randomB:数字大于5是不行的')
        }
      }, 1000)
    })
  }

  function randomC() {
    return new Promise((resolve,reject)=> {
      setTimeout(()=> {
        const num = Math.floor(Math.random() * 10)
        console.log('num: ', num);
        if (num <= 5) {
          resolve(num)
        } else {
          reject('randomC:数字大于5是不行的')
        }
      }, 1000)
    })
  }

  Promise.all([randomA(), randomB(), randomC()]).then(res=> {
    console.log(res)
    // success: [1,2,3]
    // error: Uncaught (in promise) randomB:数字大于5是不行的
  })
```

可以复制上面代码运行，只有当三个方法值全部小于 5，才会返回正确的值。可以看到正确返回时，返回值是数组的形式。数组中每一项对应 all 方法中的每一个异步操作的结果。

### promise.race()

回想一下上面描述的视频平台切换可选线路的问题。在 promise 中可以使用`promise.race()`方法解决。这个方法完全区别于`promise.all()`，上面的方法在所有异步操作完成之后才执行，这个方法则是**谁先完成就先处理谁的回调方法。**先执行完的方法无论成功或失败，其余的操作还会继续执行，但是不会进入 race 的回调方法。

```js
  // promise.all 的例子，将 timeout 区分开来
  function randomA() {
    return new Promise((resolve,reject)=> {
      setTimeout(()=> {
        const num = Math.floor(Math.random() * 10)
        console.log('num: ', num);
        if (num <= 5) {
          resolve(num)
        } else {
          reject('randomA:数字大于5是不行的')
        }
      }, 1000)
    })
  }

  function randomB() {
    return new Promise((resolve,reject)=> {
      setTimeout(()=> {
        const num = Math.floor(Math.random() * 10)
        console.log('num: ', num);
        if (num <= 5) {
          resolve(num)
        } else {
          reject('randomB:数字大于5是不行的')
        }
      }, 2000)
    })
  }

  function randomC() {
    return new Promise((resolve,reject)=> {
      setTimeout(()=> {
        const num = Math.floor(Math.random() * 10)
        console.log('num: ', num);
        if (num <= 5) {
          resolve(num)
        } else {
          reject('randomC:数字大于5是不行的')
        }
      }, 3000)
    })
  }

  Promise.race([randomA(), randomB(), randomC()]).then(
    res=> {
      console.log('res: ', res)
    },
    err=> {
      console.log('err: ', err)
    }
  )
```

#### 利用promise.race实现需求 - 如果接口 10s 内返回数据就处理数据，否则执行其他操作

```js
  function getData() {
    return new Promise(resolve=> {
      ajax('url', success(res) {
        resolve()
      })
    })
  }

  function timeout() {
    return new Promise((resolve, reject)=> {
      setTimeout(()=> {
        reject('请求超时')
      }, 10000)
    })
  }

  Promise.race([getData(), timeout()])
  .then(res=> {
    console.log(res)
  })
  .catch(err=> {
    console.log(err)
  })
```
