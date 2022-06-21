---
title: ES6开发技巧
tags:
  - es6
categories:
  - es6
description: ES6语法总结
abbrlink: 98f35faa
date: 2021-08-17 15:20:11
---

> 最近老有面试的问 ES6 的语法，然后吧知识实在太多，而且我人表达能力不强，对上这个问题，一大堆答案涌上来结果到嘴边就变得七零八落的，所以在这里总结一下。一方面写一遍自己已经知道的，加深巩固，一方面查漏补缺，补充自身能力
> **我个人喜欢把所有新的特性都统称为 ES6，因为发布的实在太快的，我也不想了解每个特性具体是哪个版本加上去的，是新功能用就完事了**

## 新增的基础类型

### BigInt

在`js`中，所有数字都保存为 64 位的浮点数，这就导致了两个问题:

+ 数值的精度只能精确到 53 个二进制位，大于该范围的整数是无法精确表示的;
+ 大于或等于 2 的 1024 次方的数值，已经完全无法表示，返回`Infinity`;

```js
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
Math.pow(2, 1024) // Infinity
```

因此 `ES6` 引入了 `BigInt` 来解决这个问题，他只能用来表示整数，且没有位数限制。为了与 `Number` 类型区分，`BigInt` 类型必须加后缀 `n`

```js
const a = 123n;
const b = 456n;
a * b // BigInt 仍然可以保持精度，56088n
typeof a // bigint
```

### Symbol

`Symbol` 类型用于生成独一无二的值，保证绝不会与其他命名产生冲突。`Symbol` 值通过 `Symbol` 函数生成，接受一个字符串为参数，参数为`Symbol`值的描述。
> **注意: Symbol 函数的参数只表示值得描述，不表示值本身，即使参数相同，值也是不同的**

```js
const a1 = Symbol('a')
const a2 = Symbol('a')
a1 === a2 // false
typeof a1 // symbol
```

`Symbol` 值不可以与其他类型的值进行运算，但可以显式的转换为字符串和布尔值。虽然可以转换为字符串，但还是推荐使用`description`属性获取描述信息。

```js
const a = Symbol('foo')

String(a) // Symbol(foo)
a.description // 'foo'
```

## let & const

`let` 用于定义变量， `const` 定义常量, 解决了 `var` 定义变量导致的变量提升，造成暂时性死区。 同时也新增了块级作用域的概念，每一层代码块都有单独的作用域，互不影响。

```js
// 经典案例
for(var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  })
}
// 5 5 5 5 5


for(let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  })
}
// 0 1 2 3 4
```

## 运算符扩展

### 指数运算符

```js
2 ** 3 // 8 Math.pow(2, 3)
```

需要注意的是，链式计算时，计算规则不是从左到右儿是从右到左

```js
2 ** 2 ** 3 // 256
```

指数运算符与等号结合，组成新的赋值运算符

```js
let a = 2;
a **= 3 // a = a * a * a
```

### 链式运算符

在业务逻辑中常出现需要链式判断的情况，书写起来特别麻烦，因此 `ES6` 引入了简写

```js
// ES5
ajax().then(res => {
  const role = res && res.data && res.data.user && res.data.user.roles || 'visiter'
})

// ES6
ajax().then(res => {
  const role = res?.data?.user?.roles || 'visiter'
})
```

### Null 判断运算符

读取对象属性的时候，如果某个属性的值是 `null` 或 `undefined`，通常需要为它们指定默认值。

```js
// ES5
ajax().then(res => {
  const role = res && res.data && res.data.user && res.data.user.avatar || 'avatar'
})

// ES6
ajax().then(res => {
  const role = res?.data?.user?.avatar ?? 'avatar'
})
```

逻辑赋值运算符

`ES6` 引入了三个新的逻辑赋值运算符，将逻辑运算符与赋值运算符进行结合。

```js
x ||= y // x || (x = y)
x &&= y // x && (x = y)
x ??= y // x ?? (x = y)
```

## Number & String 的扩展

### 数字分隔符

数字分隔符可以让你在定义长数字时，更加地一目了然

```js
const num = 1_000_000_000
```

### 模板字符串

```js
const name = 'singleDogNo.1'
const age = 18
const sex = 'man'
const str = `我叫${name}, 今年${age}岁，性别${sex == 'man' ? '男': '女'}`
```

### String.includes & String.startsWidth & String.endsWidth

+ `includes()`：返回布尔值，表示是否找到了参数字符串。
+ `startsWith()`：返回布尔值，表示参数字符串是否在原字符串的头部。
+ `endsWith()`：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
const str = 'hello, world'
str.includes('llo') // true
str.startsWidth('hell') // true
str.endsWidth('ld') // true
```

### String.trimStart & String.trimEnd

`ES6`对字符串实例新增了 `trimStart()` 和 `trimEnd()` 这两个方法。`trimStart()`消除字符串头部的空格，`trimEnd()` 消除尾部的空格。返回新字符串

```js
const s = '  abc  '

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

### String.matchAll() & String.replaceAll()

`matchAll()` 方法返回一个正则表达式在当前字符串的所有匹配；`replaceAll` 可以替换字符串中匹配到的所有字符

## 函数

### 默认参数

```js
// ES5
function fn (name, age) {
  var name = name || 'singleDogNo.1'
  var age = age || 18
  console.log(name, age)
}
// ES6
function fn (name = 'singleDogNo.1', age = 18) {
  console.log(name, age)
}
```

### 剩余参数

```js
function add (start, ...number) {
  console.log(start, number)
}
add(1,2,3,4,5) // 1 [2, 3, 4, 5]
```

### 箭头函数

```js
const fn = name => {}

// 只有一句 return，简写
const fn = name => 2 * name
// 如果是对象，括号包起来
const fn = name => ({ name })
```

普通函数和箭头函数的区别：

+ 箭头函数没有自己的 `this` 指针
+ 箭头函数没有 `arguments` 对象
+ 箭头函数没有原型对象
+ 箭头函数不可作为构造函数，不能使用 `new`

## Array & Object

### 扩展运算符

```js
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [7, 8, 9]
const res = [...arr1, ...arr2, ...arr3] // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const user = {name: 'singleDogNo.1', age: 18, sex: 'man'}
const {name, ...other} = user // name: singleDogNo.1 other: {age: 18, sex: 'man'}
```

### Array.forEach

三个参数表示：遍历当前项，下标，遍历的数组本身,

```js
const arr = [1, 2, 3, 4, 5]

arr.forEach((item, index, arr) => {
  console.log(item, index, arr)
})
// 1 0 [ 1, 2, 3, 4, 5 ]
// 2 1 [ 1, 2, 3, 4, 5 ]
// 3 2 [ 1, 2, 3, 4, 5 ]
// 4 3 [ 1, 2, 3, 4, 5 ]
// 5 4 [ 1, 2, 3, 4, 5 ]
```

### Array.map

三个参数表示：遍历当前项，下标，遍历的数组本身，常用于返回一个处理过后的新数组

```js
const arr = [1, 2, 3, 4, 5]

const arr2 = arr.map((item) => item * 2)
// [ 2, 4, 6, 8, 10 ]
```

### Array.filter

三个参数表示：遍历当前项，下标，遍历的数组本身，常用于遍历并过滤期望值

```js
const arr = [1, 2, 3, 4, 5]

const arr2 = arr.filter((num) => num > 3)
// [ 4, 5 ]
```

### Array.some

三个参数表示：遍历当前项，下标，遍历的数组本身，就是只有一个是真，就返回真

```js
const arr = [false, true, false, false, false]

const arr2 = arr.some((item) => item)
// true
```

### Array.every

三个参数表示：遍历当前项，下标，遍历的数组本身，必须所有都是真，才返回真

```js
const arr = [true, true, true, false, true]

const arr2 = arr.every((item) => item)
// false
```

### Array.reduce

这里不做解释，参考[详解 reduce](https://lost-dream.github.io/blog/2020/01/15/reduce/)

### Array.find & Array.findIndex

查找符合条件的元素（下标），返回查找的元素（下标）。

```js
const arr = [
  { name: 'singleDogNo.1', age: 18 },
  { name: 'singleDogNo.2', age: 19 },
  { name: 'singleDogNo.3', age: 20 }
]

const item = arr.find(({ name }) => name === 'singleDogNo.1')
const index = arr.findIndex(({ name }) => name === 'singleDogNo.1')
console.log(item) // { name: 'singleDogNo.1', age: 18 }
console.log(index) // 0
```

### Array.includes

传入元素，如果数组中能找到此元素，则返回true，否则返回false

```js
const arr = ['张三', '李四' , '王五']

const res = arr.includes('李四')
console.log(res) // true
```

### Array.flat

将多维数组降级为一维数组

```js
const arr = [1, 2, 3, [4, 5, 6]]

console.log(arr.flat()) // [ 1, 2, 3, 4, 5, 6 ]
```

### Object 属性简写

```js
const name = 'singleDogNo.1'
const age = 18

const obj = {
  name,
  age
}
```

### Object.keys & Object.values

获取对象 `key & value` 的集合

```js
const obj = {
  name: 'singleDogNo.1'
  age: 18,
  sex: 'man'
}

const keys = Object.keys(obj) // [ 'name', 'age', 'sex' ]
const values = Object.values(obj) // [ 'singleDogNo.1', 18, 'man' ]
```

### Object.entries && Object.fromEntries

获取对象键值对的集合 / 将键值对集合转化为对象

```js
const obj = {
  name: 'singleDogNo.1'
  age: 18,
  sex: 'man'
}
const entries = Object.entries(obj) // [ [ 'name', 'singleDogNo.1' ], [ 'age', 18 ], [ 'sex', 'man' ] ]

const arr = [
  ['name', 'singleDogNo.1'],
  ['age', 18],
  ['sex', 'man']
]
const obj = Object.fromEntries(arr) // { name: 'singleDogNo.1', age: 18, sex: 'man' }
```

## Set & Map

### Set

类似数组结构，但成员的值都是唯一的，不会出现重复的值。`Set`实例的方法

+ `Set.prototype.size`: 返回 `Set` 实例的长度
+ `Set.prototype.add(value)`: 添加元素，返回添加后的 `Set` 实例
+ `Set.prototype.delete(value)`: 删除元素，返回删除后的 `Set` 实例
+ `Set.prototype.has(value)`: 查询元素，返回一个布尔值，表示该值是否为 `Set` 实例的成员
+ `Set.prototype.clear()`: 清除 `Set` 实例的所有成员

```js
let set = new Set([1, 2, 3])

set.size // 3
set.add(3) // [1, 2, 3]
set.delete(3) // [1, 2]
set.has(2) // true
set.clear()
```

### WeakSet

`WeakSet` 与 `Set` 类似，区别在于

+ `WeakSet` 的成员只能是对象，不能是其他类型的值
+ `WeakSet` 的成员都属于弱引用，这意味着如果其他对象都不在引用该对象，垃圾回收机制会自动回收占用的内存

### Map

类似数组结构，但是键不限于字符串，各种类型的值甚至是对象都可以作为键出现。是一种更完善的键值对数据结构。 `Map`实例的方法

+ `Map.prototype.size`: 返回 `Map` 实例的长度
+ `Map.prototype.set(key, value)`: 设置键值对，返回 `Map` 实例
+ `Map.prototype.get(key)`: 通过键，获取对应的值，如果不存在返回 `undefined`
+ `Map.prototype.has(key)`: 查询键，返回一个布尔值，表示该键是否存在 `Map` 实例中
+ `Map.prototype.delete( key)`: 删除键，返回一个布尔值，成功为 `true`，失败为 `false`
+ `Map.prototype.clear()`: 清除 `Map` 实例的所有成员

```js
const map = new Map([
  [name, 'singleDogNo.1'],
  [age, 18]
])

map.set('sex', 'man')
map.size // 3
map.get('name') // singleDogNo.1
map.has('age') // true
map.delete('name') // true
map.clear()
```

### WeakMap

`WeakMap` 与 `Map` 类似，区别在于

+ `WeakMap` 的成员只能是对象，不能是其他类型的值
+ `WeakMap` 的成员都属于弱引用，这意味着如果其他对象都不在引用该对象，垃圾回收机制会自动回收占用的内存

## Promise

这里不做解释，详见 [promise 详解](https://lost-dream.github.io/blog/2020/04/09/promise/)

## Async & Await

待补充

## class

待补充
