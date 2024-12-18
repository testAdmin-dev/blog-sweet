---
id: 9
title: JavaScript学习笔记
date: 2021-03-01
lastMod: 2022-08-18
summary: JavasScript学习总结
category: 技术
tags: ['前端']
comments: true
---

## JavaScript基础

JS是支持面向对象编程的跨平台脚本弱类型的语言
* 面向对象是一种思想
* 跨平台：ios、Android、windows、Linux
* 脚本：依赖其他才能解析
* 弱类型：变量在声明后还可以改变

##### js组成
* DOM：文档对象
* BOM：浏览器对象
* ECMAScript：规范

js的变量是用来储存数据的容器

##### js的输出方式
* alert（）&emsp;&emsp;/浏览器弹窗、用户提示
* document.write（）&emsp;&emsp;//可在浏览器的显示区域显示文本
* console.log（）&emsp;&emsp;/控制台日志
* confirm（）&emsp;&emsp;//提示用户下一步操作
* prompt（）&emsp;&emsp;//用于提醒用户输入

#### 数据类型的分类
* number&emsp;&emsp;//数字型
* string&emsp;&emsp;//字符串类型（加了引号都是字符串）
* undefind&emsp;&emsp;//未定义（只声明为赋值）
* Boolean&emsp;&emsp;//布尔类型
* object&emsp;&emsp;//对象（数组、对象、null）

##### 转化为数字类型方法
* Number（）
* parseInt（）&emsp;&emsp;//转为数字类型并取整
* parseFloat（）&emsp;&emsp;//转化为浮点数保留小数
* Math.round（）&emsp;&emsp;//小数后一位四舍五入进行取整
* .toFixed（3）&emsp;&emsp;//保留三位小数

###### 拓展不常见转化为数字类型
-  **布尔类型转化为数字**
    * Number（）和Math.round（）&emsp;&emsp;//会转化为1或者0
    * parseInt（）和parseFloat（） &emsp;&emsp;//会显示为NaN (not a number)
    *     
- **将undefined转化为数字**&emsp;&emsp;//所有方法都会显示NaN
+
- **将null转化为数字**
    * Number（）和math.round（）&emsp;&emsp;//会转化为0
    * parseInt（）和parseFloat（）&emsp;&emsp;//会显示NaN
    
 ##### 转化为字符串方法
   String（）
   被转换的数据.tostring（）
   
   * undefiend转换为字符串&emsp;&emsp; .tostring会报错
   * null转换为字符串&emsp;&emsp; .tostring会报错
   * 其它类型转字符串类似加上引号正常显示
   
##### 转换为布尔类型方法
Boolean（）
* 数字中除了0都是true
* 字符串中有内容都为true，无内容都为false
* undefiend和null都为false

#### if和switch
switch和if区别：判断当前的值是否相等（switch），在一个区间范围内（if）
* switch比较相等的时候用的是===
* case后面接的是值，值结束需要一个冒号
* break表示终止当前的程序运行 ， 下面的代码就不会继续往下执行

#### 隐式转换
除了加号 其它的符号都会隐式转换为数字类型进行计算

##### 在比较运算符中
* 字符串和数字是不具有可比性的 ，字符串会隐式转换为数字
* 字符串和字符串进行比较（特殊情况）
* 字符串进行比较需要根据ASCLL进行比较

##### 三元（目）运算符：简写if-else语句
语法 : 判断条件 ? 条件为true时执行 : 条件为false时执行

#### 函数 function
函数执行完毕后 函数体内的执行环境被销毁 不会将数据常驻在内存中

**函数的创建**
* 第一种方法 声明式
 ```js
 function 函数的名称（参数）{
                    //执行的代码段
            }
```
* 第二种方式 赋值式 将函数赋值给一个变量
   
```js
var 变量名称 = function（参数）{
            //执行的代码段
         }
```
* 函数的调用
    声明式 ：函数的名称（）
    赋值式 ：变量名（）
    
    &nbsp;
    **获取函数的实参**
```js
//可以获取传入实参的长度 arguments.length
console.log(arguments.length,arguments[0]       //参数 对象
```
   &nbsp;
   &nbsp;
   
   ##### 返回值
 
函数没有return的话 默认返回的是undefined
如果有return表示返回的是当前函数运行的结果
如果加了return后面的代码就不执行了
    
#### 代码预解析
* 预解析：代码在显示结果之前，经过了预解析的过程（对代码加载顺序进行调整）
* 预解析会把变量的定义和函数的声明放在代码的最前面加载
* 在预解析的过程中 有函数 有变量 以函数为准
    
#### 作用域
全局：不在函数内部定义的变量，在页面的任何位置都可以起作用
局部：定义在函数内部的变量，只能在函数内部起作用
    
##### 变量的访问规则
* 当访问输出或者运算的时候 先在当前的作用域中查找，如果当前的作用域中有的话就直接使用输出
* 如果没有 就往上一级查找，知道找到全局作用域中有这个值
* 如果全局中也没有这个变量的时候，就直接报错 a is not defined
    
 ##### 赋值规则
* 当一个变量赋值的时候 如果在当前作用域中没有定义这个变量 就会往上一级查找
* 会查找到全局 如果有就直接使用
* 如果全局中也没有的话 就在全局中定义/声明这个变量
    
#### 递归
递归函数的表现就是自己调用自己 注意返回条件避免产生死递归
   
   
```js
 function fn(n) {
        if(n == 1){
            return 1
            }
       return fn(n- 1)
    }
    fn(10)
```
   &nbsp;
   
#### 事件
用户在页面中的行为
 绑定dom事件 标签的id名字.事件
 ```js
            //第一种将函数赋值给事件
         btn.onclick = function(){
             console.log('输出')
         }
         
         //第二种
         function fn() {
            console.log('输出')
            }
            btn.onclick = fn
```
    
##### 鼠标类事件
* click            //单机事件
* dblclick        //双击事件
* contextmenu        //右击
* mouseover        //移上去
* mouseout        //移出去
* mousedown        //按下
* mouseup            //松开 抬起

##### 键盘事件
* keydown        //键盘按下去
* keyup            //键盘抬起
* keypress        //键盘敲击

##### 表单事件
* onfocus        //获取焦点
* onblur            //失去焦点
* onchange        //改变内容

#### console.log()控制台打印
* console.log()        //普通控制台打印
* console.info()        //带提示标志
* console.warn()        //警告消息
* console.error()        //错误提示
//打印dom页面结构
* console.log(document);     // 如果是一个dom元素 他默认以dom结构在页面关联展示
* console.dir(document);     // 以对象的数据类型展示
* console.dirxml(document);


#### obiect对象
对象是命名数据的集合也叫做键(key)值(value)对
##### 定义对象的方法
```js
        //通过字面量定义
    var obj = {
            name : '张三',
            sex : '男',
            fn ( ) {
            //代码块
                }
                
        //Object构造器 构造函数
     var obj = new Object ( ) ;
     object.name = '张三';
     objext.sex = '男';
     object.fn = function ( ) {
        //代码块
     }
     
     
     //拓展
     //在对象中如果属性名是变量，需要动态设置该属性，可用[ ]
     var a = 'baz'
     var o = {
            name : '张三',
            [a] : '李四'
            }
```
&nbsp;
**运用document.write打印对象**

如果对象中没有设置toString，则会隐式调用继承过来的toString从而输出[object Object]  第一个表示数据类型 第二个表示构造器
如果对象中手动设置了toString,则输出toString中return返回的值
&nbsp;

**将对象用于数学环境时**
```js
var ls = {
    naem : 'lisi',
    age : 38,
    //用来将对象转化为数值
    valueOf ( ) {
        return this.age;
        }
     }
   ls.valueOf ( )         //38
   console.log(ls - 10)       //28
```

##### 检测对象中是否包含某个属性
* console.log(o.baz); &emsp;&emsp;//没有属性的话返回undefined
* // 1、使用专门的语法 in
* console.log("foo" in o);&emsp;&emsp;//true
* console.log("baz" in o);&emsp;&emsp;//false
* // in 可以检测到非对象自身 从父级继承的属性
* console.log("toString" in o)&emsp;&emsp;//true
*
* //2、使用hasOwnProperty的方法，继承属性不算(亲生)
* console.log(o.hasOwnProperty("foo"));&emsp;//true
* console.log(o.hasOwnProperty("baz"));&emsp;//false
* console.log(o.hasOwnProperty("toString"));&emsp;//false

##### js文件中 函数的文档注释
```js
/**
* 文档注释 可以用来生成 函数说明的文档
*
* @param {number} m 第一个数
* @param {number} n 第二个数
* @returns 两个数的和
*/
function add(m, n) {
    return m + n;
}
```

#### Array数组
数组的本质也是对象
```js
        //通过字面量定义
var arr = [ ] ;     //空数组 或 var arr ['a', 'b']
//往里面添加元素
arr[0] = 'a'
arr[1] = 'b'
console.log(arr)      //其打印的是对象（数组）快照信息
console.log(arr)      //打印的是对象结构

//如果使用console.write(arr) 打印arr数组 它会隐式调用继承的toString(),返回一个以逗号拼接的字符串

//使用构造器创建数组
    var arr = new Array( );     //空数组 或 var arr = new Array('a' , 'b')
        //如果给构造器传入一个数值则表示数组元素的个数
      var arr = new Array(10)       //10个空元素empty * 10
```
&nbsp;
#### 关联数组
所谓关联数组就是以字符串作为下标
```js
 // 所谓的关联数组指以字符串作为下标的元素
        var arr = ["a", "b", "c"];
        // arr[0] = "a"
        // arr[1] = "b"
        // arr[2] = "c"
    
        arr["foo"] = "hello";
        arr["bar"] = "world";
        console.dir(arr);
         // 字符串编号的元素 被视作对象的属性
        console.log(arr["foo"], arr.bar);       //hello world

    

// js中的数组和对象完全互通的，除了在数组里面定义字符串下标外，也可以在对象里面定义数字属性
        var obj = {
            // 数字编号的属性
            0 : "a",
            1 : "b",
            2 : "c",
            foo : "foo",
            bar : "bar",
        }
        console.dir(obj);
        console.log(obj.foo, obj.bar); // foo bar
        console.log(obj[0], obj[1], obj[2]); // a b c



// 数组本质上就是对象 只不过具有额外功能层的对象，就是在对象基础上延伸了 数字编号的 属性，其中数字编号的部分被理解成数组成员，并支持[]语法来操作
        var arr = ['a', 'b', 'c'];
        arr["foo"] = "foo";
        arr["bar"] = "bar";
        // 显示数组的长度（个数）
        console.log(arr.length); // 3
```

&nbsp;

**遍历数组**
for循环遍历数组元素有两个限制条件
1、数组的编号必须是连续的
2、for循环的是数字编号下标，不能是字符串属性 不然不输出字符串为下标的元素


#### for...in 语句
使用for...in遍历对象属性，有两个限制条件
1、遍历出来的属性顺序不可控
2、不能遍历继承的属性
```js
 var person = {
            name : "zhangsan",
            sex : "male",
            age : 18,
            study () {
                return "床前明月光，疑是地上霜"
            },
            sing () {
                return "一人我饮酒醉，错把佳人成双对"
            }
        }
        // 定义变量p 用来接收person中的属性
        // p始终代表在person对象里面的某个属性
        // for的过程 会自动循环 p值一直在更新
        var i = 0;
        for (var p in person) {
            console.log(i++, p);
            // 接下来取属性的值 .运算符后面跟着的只能是硬编码的字符(标志符) 不能解析变量名
            // 只用[]里面可以解析变量
            console.log(person.p, person[p]);  	//undefined , name
            //person.p    意为取person中为p的属性名,没有则返回undefined
            //person[p]   意为取person中当前p的属性值
        }

//例如
  var arr = ['a', 'b', 'c'];
        arr["foo"] = "foo";
        arr["bar"] = "bar";
        for (var p in arr) {
            console.log(p, arr[p]);
            //左边取下标 ，右边取元素
        }
```

#### 数组的方法
学习内置函数方法的几个关键点：
1、函数名
2、函数参数，有几个参数，分别代表的意思
3、函数的返回值是什么！！
 
##### 1、查询索引的方法
```js
    console.log(arr.indexOf('b'));  //1  元素在数组中的位置    找不到返回-1
    console.log(arr.lastindexOf('b'));  //3 元素在数组中最后出现的位置
```
##### 2、检测元素
```js
console.log(arr.includes('e');   //false 判断数组中是否存在此元素
console.log(arr.includes('b');   //true
```
##### 3、截取数组元素
```js
//截取数组的一部分，它有两个参数，分别是截取的起始位置和结束位置（结束位置不包含此数<）
//它返回的是截取出来组成的新数组，原数组不变，其实slice是在赋值
console.log(arr.slice(1,3));    //['b','c']
console.log(arr)    //['a', 'b', 'c', 'b']

//还可以利用slice筛取数组元素
let arr = ['a', 'b', 'c'];
arr.foo = "foo";
arr.bar = "bar";
console.log(arr); // [0:"a", 1:"b", 2:"c", foo: "foo", bar: "bar"]
console.log(arr.slice());	// ["a", "b", "c"]
```

##### 4、删除数组元素
```js
//它返回的是删除数组的元素，原数组发生改变
// 第二个参数删除元素个数
console.log(arr.splice(1,3);    //['b','c','b']
console.log(arr);   //['a']
```
&nbsp;

**队列方法**
```js
var arr = ['a', 'b', 'c', 'd']

//在数组的头部添加元素，返回操作之后数组的长度
console.log(arr.unshift(0));    //5
    //原数组发生改变
console.log(arr);       //[0, 'a', 'b', 'c', 'd'];

//在数组头部删除元素，返回被删除的元素
console.log(arr.shift());       //0  原数组发生改变

//在数组尾部添加元素，返回操作后数组的长度
console.log(arr.push('e'))      //5
console.log(arr);        // ['a', 'b', 'c', 'd', 'e'];

//在数组尾部删除元素，返回被删除的元素
console.log(arr.pop())      //e
console.log(arr);       //[0, 'a', 'b', 'c', 'd'];

//将数组元素拼接成字符串
var arr = [1,2,3,4,5]; 
console.log(arr.join("<");      //1<2<3<4<5
//合并数组
 var arr2 = [6,7,8,9,10];
console.log(arr.concat(arr2));   // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2b2e3c1184e5044b9c4f5060f1be2d50.png#pic_center)
&nbsp;
&nbsp;
#### 字符串方法

 创建字符串 - 数组类型
 ```js
var str = "hello world"; // 字面量
// 创建字符串 - 对象类型
 var str = new String("hello world"); // 构造器 
 console.dir(str);
 ```
查看字符串长度
```js
console.log(str.length);       //11
```
通过编号取字符
```js
console.log(str[1]);       //e
console.log(str.charAt(1))     //e
 ```
 
由值找索引
```js
console.log(str.indexOf("o");      //4
console.log(str.lastindexOf("o")        //7
```

字符串截取
```js
    //不包含第二个位置，如果不传第二个参数，则表示截取到末尾
    //第二个参数表示结束位置
console.log(str.slice(6,11));       //world
    //第二个参数表示截取的长度
console.log(str.substr(6,5);        //world
```

字符串检测，是否包含某个内容
```js
        var gname = "神舟十二号航天员指定太空用奶 伊利 纯牛奶 真正的牛奶"
        if (gname.includes("伊利")) {
            console.log("显示该商品")
        }
  ```
检测字符串开头
```js   
var name = "#user",
   cont = "神舟十二号航天员指定太空用奶 伊利 纯牛奶 真正的牛奶.";
            
if (name.startsWith("#")) {
           console.log("id选择器");
} else if (name.startsWith(".")) {
       console.log("类选择器");
}
```
        
检测字符串结尾
```js
        if (cont.endsWith(".")) {
            console.log("一句完整的话")
        } else {
            console.log("没有结束的话");
        }
```
设置分隔符 分隔元素 组成数组
```js
  split("&")      //foo=bar&a=1&b=2" 为 [foo=bar,a=1,b=2]      
```
大小写转化
```js
        var code = "Xi2d"; // 系统生成的验证码
        var user = "xI2d"; // 用户输入的验证码
        // 比较的要求是不区分大小写，所以需要统一转化
        // toLowerCase(小写) , toLocaleUpperCase(大写)
        if (code.toLowerCase() == user.toLowerCase()) {
            console.log("输入正确");
        } else {
            console.log("输入不正确");
        }
```
删除头尾空格
```js
        str.trim()
```

替换字符
```js
	str.replace(exp,new)	//将exp替换为new 	exp可为正则
```

查询字符 可使用正则
```js
	str.match(exp);	// 找到返回字符
```

查询字符 可使用正则
```js
	str.search(exp); // 找到返回索引 ，找不到返回-1
```

合并字符
```js
	"hello".concat("world");	// hellowworld
```

尾部填充
```js
	str.padEnd(8,"!");	// 总长度为8位，不够在尾部添加"!"
```

头部填充
```js
	str.padStart(8,"~");  // 总长度为8位，不够在头部添加"~"
```

字符复制
```js
	"a".repeat(4);	// aaaa
```
&nbsp;

#### Date 内置日期对象
Date是js内置对象，用来管理时间日期
```js
//首先创造时间对象 Date构造函数 可以有参数
    //如果不传参，则表示当前时间对象
var d = new Date ( );

// 快照打印字符串形式的值 相当于 隐式调用d.toString()
//Thu Jun 17 2021 09:36:50 GMT+0800 (中国标准时间)
console.log(d);

//本土格式的日期时间
console.log(d.toLocaleString ( ));      // 2021/6/17上午9:39:48

//创建指定日期时间
var d = new Date ("2008-08-08 20:08:08")
var d = new Date (2008,7,8,20,8,8);     //分别传入值


// 分别查看某一部分的值，年份，月份，日期，星期，时 分，秒
        console.log(d.getFullYear()); // 2008
        console.log(d.getMonth());  // 7 范围0-11分别代表12个月份
        console.log(d.getDate());   // 8
        console.log(d.getDay());    // 1-6 周一到周六 周日是0
        console.log(d.getHours()); // 20
        console.log(d.getMinutes()); // 8
        console.log(d.getSeconds()); // 8


// 返回一个毫秒数 当前时间距离1970年元旦（gmt）相隔的时间
        // 该时间 对我们而言 就是用来帮助计算日期差值
console.log(d.getTime()); // 1623897079473 - 时间戳(unix)


// 计算北京奥运会 距今过去多少天
        // 2021-6-17 2008-8-8
var d1 = new  Date(2008, 7, 8), // 指定日期
  d2 = new Date(); // 当前时间      
 var unix1 = d1.getTime(),
      unix2 = d2.getTime();
 var days = (unix2 - unix1) / 1000 / 60 / 60 / 24;
        console.log(days); // 4696.444517662037
        // 向上取整数 1.1 -> 2
var result = Math.ceil(days); 
        console.log(result); // 4697   
```

#### Math 数学对象
Array、String、Date 实际上是构造函数 都需要new来创建对象，但是Math不需要

```js
//取整数值的方法
var num = 3.14;
    //向上取整 取最近的最大值
console.log(Math.ceil(num))     //4
   //向下取整  舍掉小数部分
console.log(Math.floor(num))     //3
    
    
//四舍五入
var num = 1.5
console.log(Math.round(num))     //2


//取一组最大值和最小值 这里是挨个传参数
console.log(Math.max(1,2,3))      //3
console.log(Math.min(1,2,3))        //1

//在实际使用中，往往是求数组中的最大值
var arr = [1,2,3]
console.log(Math.max(...arr))       //3 借助 ... 展开语句


//取随机数 随机生成一个 0 - 1 之间的数
console.log(Math.random())

//随机生成 1-10
console.log(Math.floor(Math.random() * 10) + 1)

//随机数组中的元素
 var arr = ['a', 'b', 'c', 'd'];
var i = Math.floor(Math.radom() * arr.length ))
console.log(arr[i])
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8a8ad678a16526cb9af064734f3af315.png#pic_center)
&nbsp;
##### js中的数据类型
number 、 boolean 、 string   单一类型 基本类型
object （对象、数组、null）复合类型 引用类型
不同类型的数据 在操作时（赋值、比较、传参）有不同的行为
**赋值操作**
基本数据类型都是单一值 在内存中所占的空间比较小 因此赋值时 会单独创建副本 也就是两个值 互不影响
引用类型是复合数据，往往比较大 会占用一定的内存空间 因此赋值时 它只复制地址 无论修改谁 都会影响共同对象
&nbsp;

基本数据类型赋值会把目标值拷贝一份再进行赋值
复合类型拷贝的是目标的地址也叫做引用地址 始终是对应的同一个对象
&nbsp;

**比较运算符**
基本数据类型只要里面的值相等"=="就返回true
复合类型只要其中的地址不相等 就为false


## BOM
window是BOM顶层对象，代表浏览器打开的当前窗口
并且是javascript代码执行的宿主环境，js寄生在window中执行，页面中的所有全局变量都是window的属性

标准 url: 统一资源定位符
    协议://域名(或IP)/:端口号/路径/?查询字符串#锚点

* window对象：      当前页面窗口对象
* navigator对象：   记录浏览器特性（版本、厂商、内核、产品名等）
* screen对象：      查看客户机屏幕信息
* history对象：     访问浏览器历史记录
* location对象：    操作当前页面地址栏

没有var声明的全局变量就是 window.a = 2
&nbsp;
window对象除了执行js代码，还用来(脚本化)渲染(操作)当前窗口

**window方法**
* alert('弹窗')
* confirm('用户选择弹窗')
* prompt('用户输入弹窗')&emsp;//可以接两个值 第一个提示文本 ，第二个输入框默认值
* open()

```js
/*
<input type="button" value="打开新窗口" onclick="open_win()">
<input type="button" value="关闭新窗口" onclick="close_win()">
<input type="button" value="移动新窗口" onclick="move_win()">
<input type="button" value="重置新窗口" onclick="reset_win()">
*/


//作为对象 提供了属性和方法来访问窗口  现代浏览器不允许上来就加在弹窗，一般在按钮点击后再弹窗
function open_win ( ) {
        //该方法返回新窗口对象 所以不声明用全局变量 让其他方法使用
    new_win = window.open("http//localhost" , "" , "width=400,height=400,left=300,top=300")
    
        window.alert("在父级窗口显示弹窗")
        new_win.alert("在新窗口显示弹窗")
        new_win.document.write("操作新窗口中dom元素")
}

function close_win ( ) {
        //关闭当前窗口
      window.close();   //关闭父级窗口
      new_win.close();  //关闭新窗口
      }
      
function move_win ( ) {
        //相对当前位置移动
     new_win.moveBy (200,200)   //相对当前位置移动X 轴 Y轴
     //new_win.moveTo(500,500)      绝对位置移动

    //重新获取焦点 显示窗口
    //该方法会请求系统将键盘焦点赋予窗口，而blur()方法则会放弃焦点 此外focus还会将       窗口移到堆栈的顶部。
    new_win.focus();
    }
    
function reset_win ( ) {
    //重置固定大小
  new_win.resizeTo(500,500);
  //相对原来增长
  new_win.resizeBy(200,200);
  //事件监听窗口大小改变
  new_win.onresize = function ( ) {
        new_win.alert("你正在修改窗口大小")
        }
  }
```

&nbsp;
**其他方法**
```js
//window对象的onerror方法(事件)用来监听当前页面的脚本代码错误
window.onerror = function (msg, file , line , col)) {
    alert("错误提示:" +msg + "/n" + "第" + line +"行"+ col + "列");
}

//页面视口的大小 网页可视区域的大小
window.onresize = function ( ) {
    console.clear();    //清除控制台打印
    console.log(window.innerWidth, window.innerHeight);     //网页尺寸
    }
    
//target一个命名的窗口 还有几个特定的值 _blank , _self , _parend
/
<a href="http://localhost" target="aaa">本地</a>
<a href="http://www.baidu.com" target="aaa">百度</a>
<a href="http://www.ifeng.com" target="aaa">凤凰网</a>

<iframe src="http://www.baidu.com" width=800 height=300 name="aaa" frameborder=0>
</iframe>
 
 
 //location 对象访问地址信息
 console.log(location)
 
 //href 属性可读可写
 console.log(location.href);    //读取地址
 //重新设置地址  不能返回
 location.href = "http://www.baidu.con"
 
 //地址参数 一般也称为 查询字符串 queryStr = "?foo=bar&a=1&b=2"
 
 //例 提取地址栏中的参数 转化为对象形式
// 转化成对象 便于使用 result = {foo:"bar", a:1, b:2}
        function getArgs(queryStr) {
            var result = {};
            // 一系列计算
            var str = queryStr.slice(1); // foo=bar&a=1&b=2 
            // 拆分成对
            var pairs = str.split("&");  // ["foo=bar", "a=1", "b=2"]
            // 循环 分别提取每一对中的参数和值的部分
            for (var i = 0; i < pairs.length; i++) {
                pairs[i];   // foo=bar
                var pos = pairs[i].indexOf("=");
                var name = pairs[i].slice(0, pos);
                var value = pairs[i].slice(pos+1);
                result[name] = value;
            }
            return result;
        }
 var result = getArgs(location.search);
        console.log(result);



      // = 赋值 他会将当前页面 放入历史记录中 可以回退
 function assign() {
            location.assign("http://www.baidu.com");
        }
/
<a href="javascript:history.forward();">前进</a>
<a href="javascript:history.go(1);">前进</a>
<a href="javascript:history.go(0);">刷新</a>
<a href="javascript:history.go(-1);">后退</a>
```
#### 总结

**BOM包含DOM**
* window &emsp;&emsp; 根节点
* winodw.document &emsp;&emsp; 文档 DOM的根节点
* window.location &emsp;&emsp; 本地
* window.history &emsp;&emsp; 历史
* window.screen &emsp;&emsp; 屏幕
* window.navigator &emsp;&emsp; 导航信息

**Location**
* location.href &emsp; 既可以跳转也可以获取地址
* location.assign &emsp; 仅仅作为跳转使用
* location.replace &emsp; 不产生历史
* location.hash &emsp; 地址栏#后面的锚点内容
* location.search &emsp; 地址栏中?后面的内容/
* location.hostname/location.port
* location.pathname &emsp; 可设置或返回当前URL的路径部分
* location.protocol &emsp; 可设置或返回当前URL的协议
* location.reload(true) &emsp; 不经过浏览器缓存强制从服务器重载

**history**
* history.back() &emsp; 回退
* history.forward &emsp; 前进
* history.go(0) &emsp; 刷新
* history.go(1) &emsp; 前进一个页面
* history.go(-1) &emsp; 后退一个历史记录
* history.pushState &emsp; 添加历史记录
* history.replaceState &emsp; 修改历史记录

**screen**
* screen.width , screen.height &emsp; 屏幕宽高
* screen.availWidth , screed.availHeight &emsp; 不包含任务栏的宽高

**navigator**
* navigator.userAgent &emsp; 当前浏览器信息(浏览器内核)



&nbsp;
# DOM
w3c标准化之前的dom模型，称为，遗留dom，也叫0级dom

0级dom中，主要通过标签取得元素 例如document.forms 获取所有表单
console.log(document.forms);      // 返回HTMLCollection集合 哪怕就一个 也是集合

// 通过标号取某一个
console.log(document.forms[0]); 
// 如果表单经过命名 还可以通过名字取得
console.log(document.forms.login);

#### 伪数组对象
dom查询返回HTMLCollection对象有编号和length属性，它类似数组，但不是数组，称为伪数组对象

 // 伪数组如果希望能够向真正意义上的数组使用，可以被转化
 // 手动实现伪数组 转化 成 真数组
      ```var arr = Array.from(obj);```
w3c标准化之后 提供了专门的接口方法 用来查询页面中的元素，类似scc获取元素

&nbsp;

#### 创建节点
节点有8中类型，常见的有
* 元素节点，指页面中的标签 element
* 文本节点，页面的文本内容 每个内容都有属于自己的节点
* 属性节点，标签的属性也视作一个节点
只要是节点 就可以按照节点对象来进行操作    

js除了能查询页面已有的元素和节点外，还可以手动创建节点，插入页面元素中
```js

 // 创建元素节点
        var p = document.createElement("p");
        console.log(p);
        
        // 创建内容节点
        var cont = document.createTextNode("hello world");
        console.log(cont);
        p.appendChild(cont); // 将文本放入标签内
        console.log(p);
        
        // 创建属性节点
        var attr = document.createAttribute("align");
        attr.value = "center";
        p.setAttributeNode(attr); // 给标签设置属性
        console.log(p);
   
        // <p align="center">hello world</p>
        // 将创建好的内容 放入页面
        document.body.appendChild(p); // 在body最后插入
```

&nbsp;
#### 节点对象的通用属性
节点自身描述的属性：节点名称、节点类型、节点的值
所有的节点都有这几个属性，不同类型的节点返回值不一样。

&nbsp;
**获取节点的名称**
```js
console.dir(document.body.nodeName)     //BODY 返回标签名大写形式
```
**查看节点的类型**
12种类型 每种类型都有对应的数字标识
```js
console.log(document.body.nodeType);    //1     元素节点
var txt = document.createTextNode("hello world");
console.log(txt.nodeType);      //3     文本节点
var  attr = document.createAttribute("align");
attr.value = "center";
console.log(attr.nodeType);     //2     属性节点
```
**节点的值**
```js
console.log(document.body.nodeValue);   //元素返回 null
console.log(txt.nodeValue);     // 文本节点返回的是文本的内容 -hello world
console.log(attr.nodeValue);    //属性节点返回的是属性值  center
```
#### 节点对象的标准属性
js 集合了 html标签的标准属性(可解析的属性)作为节点对象的属性，意味着 但凡html中 已有的属性 都可以通过节点对象直接操作
```js
var input = document.querySelector("p input");

//控件的类型
console.log(input.type);    //text
console.log(input.name);    //uname
console.log(input.placeholder);     //请输入昵称
//自定义的非标准属性 无法直接获取 需要使用getAttribute
console.log(input.foo)      //undefined
//可以通过专门的方法
console.log(input.getAttribute("foo");  //bar
//该方法 也可以用来获取标准属性 但没必要
console.log(input.getAttribute("value"));   //瑞桑
```

#### 盒子属性
```js
var cont = document.querySelector("#cont");

//查看元素在页面的真是位置  = 坐标 + margin
console.log(cont.offsetLeft , cont.offsetTop);  //100 100
//查看元素在页面中占据的尺寸 = 内容区 + padding
console.log(cont.clientWidth , cont.clientHeight);   //160 160
//如果要包含边框的话 尺寸 = 内容区 + padding + 边框
console.log(cont.offsetWidth , cont.offsetHeight);  // 200 200
```

#### 滚动距离
查看垂直方向和水平方向滚动距离
```js
//onscroll 可以监听滚动条移动触发
cont.onscroll = function () {
            console.log(cont.scrollTop, cont.scrollLeft);
}
```

#### 节点内容
节点对象.nodeValue
页面或标签的内容可以通过节点对象来操作，但比较麻烦
dom中还有2个非常强大的属性 用来操作节点内容
```js
var p = document.querySelector("p");

console.log(p.innerHTML);   //包含空白文本以及标签在内的所有内容

//如果想要去除标签部分 只剩下文本可用innerText
console.log(p.innerText)    //hello world
```

#### 自定义属性操作
读取用户自定义的属性 - 非html标准属性
```js
    var input = document.querySelector("input");
    console.log(input.getAttribute("foo");      //foo
```

设置或者修改自定义属性的值
```js
    input.setAttribute("foo","bar");
```

删除属性
```js
    input.removeAttribute("foo");
```

检测是否有某个属性
```js
input.hasAttribute("color") // true
```

#### 查询节点
document.querySelector( ) 查找整个页面中的元素
```js
var p = document.querySelector("p");
console.log(p.querySelector("a");   // a[谷歌]
console.log(p.querySelectorAll("a") //  {0:a[谷歌]}
//除了querySelector和getElementById 返回的是单个元素以外，其他的查询节点返回的都是伪数组的形式
```

#### 插入节点
```js
//创建hr元素节点
var hr = document.createElement("hr");
//在dom中 插入节点 都是基于父节点来完成的
var ul = document.querySelector("#ul");
//在父元素中最后的位置插入
ul.appendChild(hr);

//在父元素中 指定某个子元素前面插入
ul.insertBefore(hr,first);
ul.insertBefore(hr,second);
```

#### 删除节点
```js
//通过父元素wrap操作子元素cont
wrap.removeChild(cont)
```

#### 替换节点
在容器中 显示一个表单 替代a链接的按钮
我们可以在页面中预设一个表单 避免手动创建的过程 更加方便 
```js
 //用页面中已有的表单form  替换 wrap中的a链接
    wrap.replaceChild(form , a);
```

#### 克隆节点
注意：节点对象是引用类型 不能直接通过赋值方式克隆
在dom中 有专门的方法 cloneNode
cloneNode有一个参数  默认值是false  表示浅复制，就是不包含子元素中的元素
```js
//将origin 克隆 给duplicate     浅复制
var duplicate = origin.cloneNode();

//cloneNode参数为true  表示深复制  包含里面的内容
var duplicate = origin.cloneNode(true);
```

#### 判断是否包含子节点
```js
// 会包含 空白  文本节点 
console.log(p.hasChildNodes());     //true
```

#### 节点关联查询
查询ul的父节点
```js
console.log(ul.parentNode)  //直接父节点
```
查询ul所有子节点 包含空白文本 返回集合
```js
ul.childNodes   // NodeList(7)
```
只返回子元素节点 不包含空白文本
```js
console.log(ul.children)    //HTMLCollection(3)
```
查询第一个子元素节点和最后一个子元素节点
```js
console.log(ul.firstElementChild)   //first 
console.log(ul.lastElementChild)    //third
```

查找下一个兄弟节点
```js
    //从第一个开始的下一个的下一个的下一个包含文本空格节点
console.log(ul.firstChild.nextSibling.nextSibling.nextSibling);
   //从第一个开始的下一个 不包含文本空格节点
 console.log(ul.firstElementChild.nextElementSibling);
```
查找前一个兄弟节点
```js
console.log(ul.lastChild.previousSibling.previousSibling.previousSibling);
console.log(ul.lastElementChild.previousElementSibling);    //去除文本节点
```

#### 节点样式操作
style属于节点的标准属性 dom.style来操作

dom.style只能读取标签定义的内联样式
并且以对象集合形式返回，每个css属性都以驼峰的形式出现在对象中
```js
// 因为box.style只能读取标签内定义的样式 内部样式和外部样式无法获取
console.log(box.style.width);   //空 
```

多个样式写入可以使用cssText，以css格式写入  多个样式以 ; 分隔
```js
box.cssText = "boxder : 5px solid pink; box-shadow : 0px 0px 20px #333; border-radius : 5px " ;
```

查看css样式表定义的样式需要使用 getComputedStyle
```js
//该方法返回两部分
//1、所有css属性的集合  以编号形式展示
//2、该元素的计算属性值
var cssStyle = getComputedStyle(box);
console.log(cssStyle.width);     //100px
console.log(cssStyle.backgroundColor);  //rgb(204,204,204)
```
#### 练习
判断滚动条是否到达页面底部
  页面的实际高度 = 页面视口大小 + 页面滚动距离
  满足条件 ：滚动距离 >= 网页实际高度 - 页面视口大小
  
 ```js
// html元素在页面的实际高度 html.offsetHeight
// 页面的视口大小 : window.innerHeight / html.clientHeight
// 页面的滚动距离：html.scrollTop

//scroll 滚动条滚动时触发
window.onscroll = function () {
    // 返回文档中的根节点root对象   即为html标签
    var html = document.documentElement;
    if(html.scrollTop >= html.offsetHeight - html.clientHeight) {
            console.log("到底部了")
   }
```

### 事件


在原始事件模型中，它使用通过给事件源dom 添加事件属性的方式来绑定事件
```js
//执行事件代码比较多时 可以将他们放在一个函数中
/
 <input type="button" value="点我" onclick="fn();">
    function fn( ) {
        alert(1');
    // 声明式函数 它体内的this 默认指向window对象
        console.log(this);
    //相当于 var a;  // window.a
```
#### 通过属性添加事件
事件可以看作是dom的标准属性 name可以通过节点对象来动态添加
通过dom动态添加的事件，使得js代码和html标签做到完全分离，可读性和维护性更高，称为 **无干扰的javascript**
```js
//给事件设置事件属性 作为一个匿名函数 相当于onclick方法
input.onclick = function () {
      alert(1);
    //this 为事件源dom
        console.log(this);
}
```

#### 添加多个事件
事件函数本质就是给 dom 添加了一个方法

如果想要同时执行多个事件处理程序 多个函数
可以先引用原来事件函数 然后重新定义新的事件 
```js
//把之前button声明的事件函数地址赋值给oldHandler
var oldHandler = button.onclick;
button.click = function( ) {
    //调用赋值完的新变量
    oldHandler();
    //调用声明好的第二个执行函数
    extHandler();
```

#### 取消事件
如果1个dom元素 被从页面中移除了，name它对应的事件函数也就没有存在的意义了，因此需要我们手动来删除事件函数
**原始事件取消**
```js
    // 移除事件 给事件设为null
    a.onclick = null
```
&nbsp;
**高级事件取消**
如果事件是匿名函数定义的 则无法取消，没有名字的话，你就无法引用定义的事件函数
```js
// 如果要取消 必须给事件函数 创建引用的变量
btn.removeEventListener("click" , handler);
```

#### 事件流
捕获和冒泡都是针对目标的父元素定义的 ，先往内捕获，再到事件源本身 ，最后冒泡出去
**0级dom的事件流**
所有使用原始事件模型定义的事件都是冒泡型的事件流机制
```js
box.onclick = function () {
    console.log("冒泡")
    }
```
&nbsp;
**高级事件模型的事件流**
```js
// 给按钮的父元素  定义捕获阶段执行的事件流
document.body.addEventListener("click" , function () {
    console.log("捕获");
  }, true)
  
// 给按钮的父元素  定义冒泡阶段执行的事件流
document.body.addEventListener("click", function () {
            console.log("冒泡到body上了");
 }, false); // fase是默认值 可不写 表示冒泡阶段执行


 // 给按钮定义的事件 目标阶段执行的事件
  var btn = document.querySelector("input");
        btn.addEventListener("click", function () {
            console.log("btn自身被触发");
 })
```

#### 事件监听
在标准化之后的事件模型（高级事件模型）中通过事件监听的方式来绑定事件
```js
btn.addEventListener("click", function () {
        alert(1);
 },false);  // 第三个参数默认为false 表示在冒泡阶段会触发该函数
```
&nbsp;
**使用事件监听添加多个事件处理程序**
```js
var handler = function () {
    alert(2);
}
// 将要添加的另一个事件函数命名 再次给btn添加
 btn.addEventListener("click" , handler)
```

#### 事件对象
定义事件后 事件调用时js会隐式传递一个事件对象
```js
input.onclick = function (event) {
    // event 事件对象   存储了事件信息的对象数据
    console.log(event)
    }
```

#### 事件对象的特性
```js
// 给按钮的父元素来定义捕获阶段执行的事件流
document.body.addEventListener("click", function (event) {
    console.log("body捕获" , event.eventPhase);   //1 捕获阶段
```
&nbsp;
事件对象还提供了一些辅助信息 用来更好的处理事件
```js
    div.onclick = function (event) {
        //鼠标相对事件源的坐标
        console.log(event.offsetX , event.offsetY);
        //鼠标在页面中的坐标
        console.log(event.clientX , event.clientY);
        //鼠标在屏幕中的坐标
        console.log(event.screenX , event.screenY);
```
#### 获取事件源
```js
document.body.addEventListener("click" , function (event) {
    console.log(event.eventPhase);  //冒泡阶段值 3
    
    //event.target;     事件源dom - 元素节点
    alert("你点击了" + event.target.nodeName +"元素");
    })
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b38a03a0d616e6fe54de2ee2301881fc.png#pic_center)
&nbsp;
#### 事件委托
利用事件冒泡的原理 让最外层来代理 它内部元素的事件执行过程 - 事件代理（委托）
事件代理：让父元素来代理它内部元素的事件执行
事件委托：子元素的事件处理委托给父元素来执行
```js
//只需要给它们最外层的盒子添加点击事件
document.body.onclick = function (event) {
    // 检测事件源  获取事件源标签 转化为小写
   switch (event.target.nodeName.toLowerCase()) {
        // 在内部各个选项中放入执行代码即可
        case "div" :  
                console.log("点击div");
                break;
         case "p":
                console.log("点击p");
                break;
         case "span":
                console.log("点击span");
                break;
    }
```
#### 阻止事件冒泡
0级dom定义的事件会冒泡 导致除了事件源本身外 它的父元素有可能被触发 带来意料之外的效果
```js
p.onclick = function (event) {
    console.log("点击");
    //阻止冒泡的操作
    event.stopPropagation ( );
```

#### 阻止默认行为
有些html标签在触发时 会有自己的默认行为 例如：a链接默认跳转 、 表单submit 会默认提交 跳转到服务器
有时候我们需要阻止他们的默认行为 例如表单验证不通过就不提交
```js
document.login.onsubmit = dunction(event) {
    alert(111);
    // 验证不通过就不提交
    event.preventDefault();
    
    //或者
    return false
 }
```

#### load事件
window窗口对象的load事件 是当前窗口内容加载完毕后出发的事件 它是页面中最后执行的部分，
```js
window.onload = function () {
    console.log(1);
}
```

**load和error通常成对出现 load是加载完成 error是加载失败**
```js
//  window.onerror 是窗口加载发生错误的回调函数
//参数为（错误提示, 脚本文件, 行号, 列号）
window.onerror = function (msg , file , line , col) {
    alert(msg);
 }
// 例如 打印未声明的变量
console.log(x);     // ReferenceError : x is ont defined
```

#### 图片的load事件
使用load管理图片的加载 能够控制加载的过程，例如 图片发生错误时的处理
通过load事件动态的加载 图片 实现对图片加载的管理
```js
function loadImg(url) {
    //创建图片
  var img = document.createElement("img");
  
  //监听图片的加载状态 - 先定义回调函数
  img.onerror = function() {
    //使用发生错误时显示的图片  替代原图
    img.src = "./error.jpg";
    //将图片放入页面中
    document.querySelector("#cont").appendChild(img);
 }
 
 // 加载成功  直接放入页面
 img.onload = function () {
    document.querySelector("#cont").appendChild(img);
 }
 
 //请求图片 它是异步的 独立的线程
 // 等它加载结束后 会到主线程找回调函数
 img.src  =  url;
 
 // 一般是要将元素插入页面中才会真正发起请求，例如script标签，但是图片是特殊情况
 }
 
 loadImg("./meinv.jpeg");
```

#### DOMContLoaded
DOMContLoaded是在dom树生成后加载的事件
而load事件是整个窗口一切资源就绪之后 也是最后一步 执行的事件

网页加载的过程
1. 解析html文档
2. 加载外部的js和css链接文件
3. 执行页面的js脚本
4. 绘制dom树，创建dom结构 -- DOMContLoaded
5. 加载嵌入的资源文件 ， 加载图片 视频等
6. 页面解析全部完成 - load

load会等待页面中 所有的资源都加载完才执行
它的好处在于 能够访问页面的一切元素
不足之处 就是可能会很慢 会等异步的图片等资源请求完才执行
```js
//<script>
    window.onload = function() {
        var img = document.querySelector("img");
        // 查看图片原始尺寸     312 , 208
        console.log(img.naturalWidth , img.naturalHeight);
// </script>  
 
 // 图片在js代码后
<img src="meinv.jpeg" alt="">
```

而DOMContLoaded会在dom数生成后就执行 不会等异步的图片资源请求完
```js
    window.addEventListener("DOMContentLoaded", function() {
            var img = document.querySelector("img");
            console.log(img)    // html imgElement
      // 查看图片的原始尺寸  0 , 0
            console.log(img.naturalWidth , img.naturalHeight);  
```

#### resize 窗口重置事件
窗口大小发生改变时 触发的事件
 ```js
    window.onresize = function() {
            // 清除控制台打印的信息
        console.clear();
        // 页面视口大小
       console.log(window.innerWidth , window.innerHeight);
       
       
     // node.clientWidth 查看在页面中占据的尺寸
     // 如果node为html元素 则是页面视口大小
     var html = document.documentElement;
     console.log(html.clientWidth , html.clientHeight); 
```

#### scroll 滚动条事件
scroll事件两种场景
1. 窗口内容发生位移，也就是拖拽页面的滚动条时，会触发window.onscroll
2. 容器内容发生位移，也就是拖拽容器内的滚动条时，会触发 div.onscroll
```js
window.onscroll = function () {
    var html = document.documentElement;
    // 计算滚动条进度 = 已拖拽的距离 / 总的滚动条高度
    
    // 已拖拽距离
    var scrollTop = html.scrollTop;     
    
    // 总的页面高度 -  页面视口高度 = 总的滚动条高度
    var total = html.offsetHeight - html.clientHeight;  
    
    // 已滚动进度 0.1234
    var rate = scrollTop / total;
    var progress = (rate *100) + %;  // 12.34%
```

#### 焦点事件
获取焦点 focus
失去焦点blur
```js
psw.onfocus = function () {
    // 获取焦点执行
    }
    
    
 psw.onblur = function () {
        // 失去焦点执行
    }
```

#### 表单submit事件
onsubmit是表单提交时触发事件，一般用于验证用户输入信息，该函数需要设置一个返回值，是否提交表单，为true提交，为false则不提交，**onsubmit事件由submit按钮来触发**
**submit事件，需要定义在form上面，而不是submit按钮上面**

```js
document.login.onsubmit = function(event) {
    
    if(!a) {
        // 如果表单验证返回值a为false 则清除表单默认提交事件
        event.preventDefault();
        }
        
        
   // 很多元素的默认行为 都可以通过return false取消
   if (!a) return false
```

#### FormData 表单数据对象
FormData是js的内置对象，它用来将表单DOM对象 转化 为一个数据对象，这样可以快速读取表单信息。

```js
<form name="login">
 <p>
            账号：<input type="text" name="uname" value="" />
        </p>
        <p>
            密码：<input type="password" name="usrpwd" value="" />
        </p>
        <p>
            性别：<input type="radio" name="sex" value="男" /> 男、
                <input type="radio" name="sex" value="女" />女
        </p>
 </form>
//input...
//input...
//普通按钮 不会触发表单的提交事件 需要单独设置点击事件 
 <input type="button" name="commit" value="立即注册">
</body>

<script>
document.login.commit.onclick = function () {
    // 获取页面中name为login 的表单数据
    var fd = new FormData(document.login);
    
    // 提取获取到的数据
    var uname = fd.get("uname").trim(); // 去除头尾空白部分
    var password = fd.get("usrpwd");
    var sex = fd.get("sex");
    
    // 多个值使用getAll
    
    console.log(uname,password,sex);
</script>
```

#### 循环绑定事件
使用for绑定
```js
for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
        //...
        }
 }
```
使用forEach绑定
```js
// li变量是循环时的当前元素节点，index变量是当前元素的下标
lis.forEach(function (li , index) {
    li.onclick = function () {
        //...
        }
 )}  
```
&nbsp;

#### sort排序
 默认按照升序排列
 ```js
var arr = [1, 6, 2, 4, 8, 3];
// 默认按照升序
console.log(arr.sort());	//[1, 2, 3, 4, 6, 8]

var arr = ['a', 'd', 'c', 'b'];
 console.log(arr.sort());  // ['a', 'b', 'c', 'd']
 
// 字符串会把每个元素的第一位去比较大小，相等则比第二位，以此类推
// 排序原则 需要想将数字元素转化成字符串 然后逐个字符比较
 // 数值排在 字母前面
var arr = ['a', '188', 'd', '33'];
 console.log(arr.sort());  // [188, 33, "a", "d"]


根据数组中对象属性值进行排序
 users.sort(function (m, n) {
    // m, n分别表示两个对象
  // 提取出比较的条件
 var dm = m.age,
dn = n.age;
 if (dm <= dn) return -1;		// 返回-1则dm 和 dn不调换位置
else if (dm > dn) return 1;		//返回1则dm和dn互换位置
 });
 ```

### ES6 新增数组常用方法
####  forEach
用于遍历数组和for循环一个道理
语法:```数组.forEach(function (item,index,arr) {} )```
```js
arr.forEach(function (item,index,arr) {
		//  当前元素，当前下标，数组
	console.log(item,index,arr);
}
```

####  map
用于遍历数组，和forEach基本一致，只不过只有一个返回值，返回一个新数组
语法：```数组.map(function (item,index,arr) {} )```
```js
let newArr = arr.map(function(item,index,arr) {
	//返回每次对数组的操作
	return item + "!";
})
console.log(newArr)	//新数组中都是操作过后的新元素
```

####  filter
将数组遍历一遍，按照条件把数组中复合条件的元素过滤出来，返回到新数组中
语法：```数组.filter(function (item,index,arr) {} )```
```js
		//第三个参数 arr 不需要可省略不写
let result = arr.filter(function (item,index) {
	// 设置筛选条件，当返回true时，表示取得该项
	return item.age >= 18;	//筛选数组中当前元素的age属性值大于等于18
})
console.log(result)	//新数组中都是筛选通过的元素
```

#### 断言方法 every和some
**every**

判断数组中每个元素，是否都符合要求，如果是都符合，才返回true，只要有一个不通过则返回false
```js
let res = arr.every(function(item) {
	return item >= 'a';		//判断每个元素是否都大于a
});
console.log(res);	// true 因为arr数组中每个元素都大于等于a
```

**some**

只要数组中，有一个符合要求的元素，就返回true，一个都不符合，则返回false；
```js
let res = arr.some(function(item) {
	return item > 'f'	// 判断数组中 有没有元素大于f
})
console.log(res);	// true 因为arr数组中，有元素大于f
```

#### json
json数据，js object notation （js对象标识）
利用js对象数据集合的特征 存储数据，它和不同对象有3点区别：
1. 作为纯粹的数据对象，它不需要方法
2. 对象内部的key和value 必须加 " " , 格式需要
3. 它的结构是对象 但必须以字符串形式存在 这样才能进行持久化存储和用于http的传输
例如：
```let user = '{"naem" : "zhangsan" , "sex" : "male" , "age" : 18}' ;```

es5扩充的解析json数据的对象 - JSON
它提供了一队方法 用来编码和解析json数据
```JSON.pase()```和```JSON.stringify()```

&nbsp;
**解析j**son字符串为对象
```js
let obj = JSON.parse(user);
console.log(obj);	//转为为对象的数据
console.log(obj.name , obj.sex);	//可正常提取转化后对象中的值
```
**转化**为json格式
```js
// 对象数据在地址栏传输时，必须要转化为字符串，而对象默认的toString()转化时，会丢失对象内容
// 又要转字符串，又要保留原始数据，只能是json格式
let str = JSON.stringify(obj);

//事实上stringify可以编码任何类型的数据，说白了就是给你套上引号
```

### this 关键字
每一个函数内部都有一个关键字 ```this```可以让我们直接使用
**函数内部的this只和函数的调用方式有关系，和函数的定义方式没有关系**

对象内部方法调用时，this指向调用者
```js
let A = {
    name : "zhansan",
    f () {
    	console.log(this);		// A{}
       console.log(this.name);	// zhansan
       }
 }
A.fn()	
```

函数体内的this，总是指向window
```js
function f() {	//相当于window.f = function(){}
	console.log(this);	//window
	function g() {
		console.log(this);	//windwo
	}
	g();
}
f();
```

事件函数句柄中，this指代事件源dom元素
```js
document.body.onclick = function() {
	console.log(this);	//	body
}
```
#### call和apply和bind
这三个方法可以改变this指向
原理是：引用其他函数或对象的方法，执行一次后，再删除该方法，可以理解为只是借用，用完还回去；

**apply**
语法：```函数名.apply(this指向,[实参1 , 实参2 ， ...]```
```js
// 调用a对象中的hello方法
a.hello("你好"); 	// 你好我是zhangsan今年18
// 调用a对象中的hello方法，修改this指向为b对象，传入数组方式的参数
a.hello.aply(b,["大家好我是"]);	// 大家好，我是lisi今年20
```

**call**
语法：```函数名.call(要改变的this指向,实参1，实参2,...)```
```js
a.hello("你好"); 	// 你好我是zhangsan今年18
// 调用a对象中的hello方法，修改this指向为b对象，传入数组方式的参数
a.hello.call(b,"大家好我是");	// 大家好，我是lisi今年20
```

**bind**
bind也可以修改this，但不执行，更倾向于就是引用-借用
```js
a.hello.bind(b);	// 不会执行
a.hello.bind(b)("大家好我是");	//再加上一个括号才会执行
```

### ES6新增
#### let 和 const
* let和const都不允许重复声明变量，否则会报错
* let和const声明的变量不会预解析，不会有变量提升的问题
* let和const声明的变量会被{}限制作用范围，声明的变量只能在{}内部使用，外部无法访问
* 如果是引用类型，都统一用const来定义,其他数据值用let定义

#### 箭头函数
箭头函数只能简写函数表达式，不能简写声明式函数
语法：```(函数的形参) => {函数体代码}```
&nbsp;
**箭头函数的特性**
* 箭头函数内部没有this，箭头函数的this是上下文的this,(箭头函数的this根据上级的this指向)
* 箭头函数内部没有```arguments```这个集合
* 箭头函数的形参只有一个的时候可以不写```()```，其余情况必须写
* 函数体只有一行代码的时候可以不写```{}```，并且会自动```return```
* 箭头函数不能作为构造函数
&nbsp;
#### 解构赋值
解构赋值就是快速从对象或者数组中取出成员的一个语法方式

**解构对象**
```js
//ES5方式获取对象属性
let name = obj.name;
let age = obj.age;
let gender = obj.gender;
// 利用解构赋值，变量名和属性名同名时
let {name,age,gender} = obj;

// 如果变量名和属性名不同名时,从左到右赋值的过程
let {name : x , age : y} = obj;

// 如果是提前声明过,就需要括号括起来
let x,y;
({name : x , age : y} = obj );

```
**解构数组**
```js
// ES5方式获取数组成员
let a = arr[0];
let b = arr[1];
let c = arr[2];
// 利用解构赋值
let [a,b,c] = arr;

// 使用rest语句
let [a, ...rest] = [1,2,3,4];
console.log(a,rest);	// 1,[2,3,4]

// 利用解构赋值 交换两个变量的值
let foo = "foo";
let bar = "bar";
[foo,bar] = [bar,foo];
console.log(foo,bar);	// bar,foo
```
&nbsp;
#### 模板字符串
ES5中我们表示字符串的时候使用```' '```或者```" "```
在ES6中，我们还有一个东西表示字符串，就是``(反引号)
```js
let str = `hello world`;
console.log(typeof str); // string
```
单双引号和反引号区别

* 反引号可以换行书写
```js
// 单双引号直接换行书写会报错
let str = 'hello
	world'

// 模板字符串可直接书写，并且在控制台打印一样
let str = `hello
	world`
```
* 反引号可以在直接在字符串中拼接变量
```js
// ES5 需要使用 + 拼接
let str = 'hello' + num + 'world' + num
// 模板字符串使用${}
let str = `hello${num}world${num}`
```
&nbsp;
#### 迭代器
ES6中补充 for...of 迭代集合 查找元素
* 迭代核心来说 就是可控 可以自己定制规则
* 更好的去处理伪数组对象的迭代，当然数组和对象也可以迭代，只要它拥有迭代器
* 一个迭代器就是一个对象
```js
var iterator = {
            // 必须拥有next方法 每次迭代时会调用的方法
            next() {
                // 必须返回一个对象值
                // 有2个字段：
                // done表示是否完结，true表示已经完结 false没有完结
                // value表示本次返回的值，当done为false时才有意义
                return {
                    done: false,
                    value: 1,
                }
            }
        }
  ```
使用自定义的迭代器来迭代伪数组对象
```js
// 迭代出所有的数字编号的元素
        function make(o) {
            var idx = 0;
            return {
                next() {
                    // console.log(idx); // 0 1 2... 闭包特性
                    if (idx < o.length) {
                        return {
                            done: false,
                            value: o[idx++] // o[idx]; idx++
                        }

                    } else {
                        return {
                            done: true,
                            // value : null, 
                        }
                    }
                }
            }
        }
```
给对象设置迭代器
```js
 o[Symbol.iterator] = function () {
            // this -> o 
            var idx = 0;
            return {
                // 使用箭头函数 将next体内this变成外部的this 也就是o对象
                next: () => {
                    // console.log(idx); // 0 1 2... 闭包特性
                    if (idx < this.length) {
                        return {
                            done: false,
                            value: this[idx++] // o[idx]; idx++
                        }

                    } else {
                        return {
                            done: true,
                            // value : null, 
                        }
                    }
                }
            }
        }
        // 只要迭代器ok 迭代的过程直接通过for...of来实现
        for (let value of o) {
            console.log(value);
        }
```

**内置迭代器**
很多内置对象拥有symbol.iterator属性，也就是封装好的迭代器，主要是一些伪数组对象:Array、Map、Set、aruments、String、DOM集合
内置对象的迭代器 已经设置好迭代规则 无需手动创建
```js
var str = "hello world" ;
// 隐式转化 Object(str) -> new String("hello world");
for (let value of str) {
	console.log(value);
}
```
&nbsp;
### 正则
专门用来检测字符串是否符合规则
**如何写正则**
* ①分析业务需求，构造数据模型，例如匹配一个URL的数据结构：
	+ url = "http://hao.123.com.cn/index.php?m=User&c=a#show"; 
* ②设置逻辑断点，固化模型结构 将其中的不变的内容提取出来 
	+ reg = /(协议): //(主机).(域名)/请求参数/
*  ③填充模块内容，反复测试修正
	+ reg = /(https?): //([\w\.]+).([a-z\.]{2,6})/[\d\D]*/

字面量创建
```js
let reg = /abcdefg/
```
构造函数创建
```js
let reg = new RegExp('abcdefg')
console.log(reg)
```
字面量和构造函数区别
```js
let ch = "o";
//字面量表达式 只支持硬编码的字符 变量名不解析
const reg = /ch/gi;
console.log(reg); // /ch/gi

//通过正则对象设置
const reg = new RegExp(ch,"gi");
console.log(reg);	// /o/gi
```
元字符
* . ： 匹配非换行的任意字符
* \ ： 转译符号，把有意义的 符号 转换成没有意义的 字符，把没有意义的 字符 转换成有意义的 符号
* \s ： 匹配空白字符（空格/制表符/...）
* \S ： 匹配非空白字符
* \d ： 匹配数字
* \D ： 匹配非数字
* \w ： 匹配数字字母下划线
* \W ： 匹配非数字字母下划线

限定符
*  \* ： 前一个内容重复至少 0 次，也就是可以出现 0 ～ 正无穷 次
* \+ ： 前一个内容重复至少 1 次，也就是可以出现 1 ～ 正无穷 次
* ? ： 前一个内容重复 0 或者 1 次，也就是可以出现 0 ～ 1 次
* {n} ： 前一个内容重复 n 次，也就是必须出现 n 次
* {n, } ： 前一个内容至少出现 n 次，也就是出现 n ～ 正无穷 次
* {n,m} ： 前一个内容至少出现 n 次至多出现 m 次，也就是出现 n ～ m 次

边界符
* ^ ： 表示开头
* \$ ： 表示结尾

特殊符号
* () ： 限定一组元素
* [] ： 字符集合，表示写在 [] 里面的任意一个都行
* \[^] ： 反字符集合，表示写在 [^] 里面之外的任意一个都行
* \- ： 范围，比如 a-z 表示从字母 a 到字母 z 都可以
* | ： 或，正则里面的或 a|b 表示字母 a 或者 b 都可以

标识符
* i ： 表示忽略大小写
这个 i 是写在正则的最后面的
/\w/i
就是在正则匹配的时候不去区分大小写
* g ： 表示全局匹配
这个 g 是写在正则的最后面的
/\w/g
就是全局匹配字母数字下划线

&nbsp;
#### 正则表达式方法
	用来检测捕获字符串中的内容

**test**
用来检测字符串是否符合我们正则的标准
语法：```正则.test(字符串)```	返回boolean
```js
console.log(/\d+/.test('123')) //true
```
**exec**
把字符串中符合条件的内容捕获出来
语法：```正则.exec(字符串)```	返回符合要求的，以数组形式返回
```js
let reg = /\d{3}/;
let str = "hello123worder456你好789";
let res = reg.exec(str);
console.log(res);	//123
```
&nbsp;
**使用正则的字符串方法**
字符串中有一些方法是可以和正则一起使用的

**search**
```search```是查找字符串中是否有满足正则条件的内容
语法：```字符串.search(正则)```	找得到返回索引，找不到返回-1
```js
let reg = /\d{3}/;
let str = "hello123";
let str2 = "hello";
console.log(str.search(reg))	// 5
console.log(str2.search(reg))	//-1
```
**match**
```match```找到字符串中符合条件的返回内容
语法：```字符串.math(正则)```	找到返回内容
没有标识符 g 的时候，是和exec方法一样
有标识符 g 的时候，是返回一个数组，里面是匹配的每一项
```js
let reg = /\d{3}/;
let str = "hello123world456";
let str2 = 'hello';
console.log(str.match(reg));// ["123", index: 5, input: "hello123wor456", groups: undefined]
console.log(str2.match(reg));// null
```
```js
let reg = /\d{3}/g;
let str = "hello123world456";
let str2 = 'hello';
console.log(str.match(reg));	//["123", "456"]
console.log(str2.match(reg));	// null
```
**replace**
```replace```是将字符串满足正则条件的字符串替换掉
语法：```字符串.replace(正则,要替换的字符串)```返回替换后的字符串
```js
let reg = /\d{3}/g;
let str = 'hello123world456';
console.log(str.replace(reg,'666'));	//hello666world666
```
&nbsp;
&nbsp;
### 面向对象
&nbsp;
**面向对象编程的优势**
* 可以用来架构规模化项目、代码的可扩展性、可读性、维护性以及项目管理都更具有优势

**面向对象编程的三大特性**
* 封装、继承、多态

**工厂模式生成对象**
如果通过字面量创建多个相同或相似的对象十分麻烦，为了提高代码的重用性，可以将创建对象过程封装到一个函数中，定义函数，用来生成多个不同对象叫做工厂函数
```js
// 1. 先创建一个工厂函数
function createObj(name,age,gender) {
  // 手动创建一个对象
  var obj = new Object()

  // 手动的向对象中添加成员
  obj.name = name
  obj.age = age
  obj.gender = gender
  obj.hello = function(){
  		return `我是${this.name}`
  	}
  // 手动返回一个对象
  return obj
}

// 2. 使用这个工厂函数创建对象
const o1 = createObj("张三" , 18 , "男")
const o2 = createObj("李四" 20, "女")
```

**构造函数生成对象**
js提供的构造函数更加简化了工厂函数的执行过程，以更简单的方式去定义工厂函数。
构造函数就是用来创建属性和方法的，
构造函数和普通函数的区别(new)：
1. 新建了一个对象
2. 修改了函数的this 指向新对象
3. 返回新对象(实例对象)
```js
function Human(name,sex,age) {
//1、将开始的新建空对象，由js隐式完成，并作为this的值，this指向当前新对象

//2、动态的创建属性和方法
this.name = name;
this.sex = sex;
this.hello = function () {
	return `我是${this.name}`
}

//3、返回新对象的工作也由构造函数自动完成

}

// 注意：如果用普通函数调用该方法，其中的this指向window，因为是个普通函数
	// const rs = Human("张三" , "男",18);

// 只有函数和new一起执行调用，此时它才是构造函数，this指向当前新对象，new是改变函数身份的，把它有普通函数转变为构造函数
const person = new Human("张三","男",18);
```
&nbsp;
#### 类
js中没有真正意义上的类，它是构造函数充当类的只能。
js语言内置了很多构造函数，也称为类，在mdn中叫"内置对象"，类名通常为大驼峰命名比如：Array、String、Number、Boolen、Object...
&nbsp;
到ES6中新增了class语法糖，但本质它还是构造函数
class Foo {};	// 类 - 基类 - 超类
function Foo() {}	// 构造函数
&nbsp;

#### 原型对象
由一个类或者构造函数，实例化产生的多个对象，当他们的方法完全相同时，可虚拟一个位置用来共享，叫做原型对象
函数的```prototype```属性指向就是原型对象，是一个对象，可以直接去扩展要共享的内容

&nbsp;
所有的函数在声明时都会创建它的prototype属性，指向它的原型，这个原型是一个对象，用来被实例对象共享和继承的，虽然普通函数初始化也有prototype，但原型只对构造函数有意义

&nbsp;
**原型重写**
将方法集合在一个新的原型对象里面，就是重新设置原型对象的值作为一个对象
```js
function Foo () {}	// 实例对象

Foo.prototype = {
	// 原型对象初始化 至少有一个constructor
	constructor : Foo,
	// 然后再扩展内容
	bar () {
		console.log("bar方法");
		},
	baz () {
		console.log("baz方法");
		}
```

实例对象属性除了继承自身所属的构造函数的原型对象内容，还会继承Object原型对象上的属性。也就是```prototype```它指示的是一个原型链，至少有2个原型对象存在：自身原型 -> ... -> Object原型

实例对象会继承整个原型链上的所有内容

原型链继承的优先级：现在自身实例对象上找 -> 所属的原型对象找 -> Object原型对象找 
如果都找不到则返回undefined

除了构造函数的prototype指向原型对象外，实例对象的```__proto__```属性也可以引用它的原型链
```js
const foo = new Foo;
console.log(foo.__proto__ == Foo.prototype)	// true
// 最终来讲 就是两种获取原型链的方式而已
```

&nbsp;
#### 面向对象的操作
对象.constructor指构造函数
构造函数.constructor指实例对象
```对象.constructor```用来查找该对象的构造函数，以此来确定该对象的具体类型,
```js
console.log({}.constructor);	// new Object
console.log([].constructor);	// new Array
const human = new Human;
console.log(human.constructor);	// Human

// 可通过constructor来辨别类型
console.log({}.constructor == Object);	//true
console.log(human.constructor == Human); // true
```

```对象  instranceof  构造函数```，对象是否是某个构造函数的实例
```js
console.log([] instanceof Array);	// true
console.log(human instanceof Human); // true
```

```a.isPrototypeOf(b)```方法用于测试a对象是否存在b对象的原型链上
```js
console.log(Array.prototype.isPrototypeOf([]));  // true
console.log(Human.prototype.isPrototypeOf(huamg));	// true
// Object是原型链的顶端，他在所有对象在原型链上
```

```o.hasOwnPropety("hello")```用于判断o对象中是否有hello方法(继承不算)
```js
console.log(o.hasOwnProperty("hello"));	//false
console.log("hello" in o); 	// false  (包括继承)
```

```Array.prototype.forEach.call(o,function(item,index){})```利用此方法可借用数组原型中的forEach方法指向o对象
&nbsp;
#### 面向对象的静态设置
有时通过构造函数产生的多个对象想用一个属性或方法操作其他对象时，比如：
1. 需要一个共同的属性数据时，给每个对象添加就没有必要了
2. 设置一个变量，通过自加获取生成了多少个对象
3. 判断生成的对象中属性大小
```js
// 以上都可以通过给构造函数添加属性方法(静态设置)
class Foo {
	constoructor(age) {
		// this 指向新建的实例对象
		this.age = age;
		}
	hello(){
	}
// static 声明的叫静态方法 属于构造函数 用于操作通过构造函数产生的对象
static max (f1,f2) {
	if(f1.age > f2.age) return `${f1.name}大`;
	else return `${f2.name}大`;
}
Foo.PI = 3.14;	// 给构造函数添加属性，让其他生成的对象都可用此共同属性(静态属性)
const f1 = new Foo(18)
const f2 = new Foo(20)
```
&nbsp;
#### Object的静态方法
**create用来创建对象**它可以指定原型对象
以前通过new Object 或者 {} 创建的对象 默认都会继承 Object.prototype 这个顶层原型对象
而利用create创建出来的对象可将默认的Object.prototype原型对象设为null
```js
const o = Object.create(null);
const o = Object.create(Foo.prototype);	// 也可设置继承某个构造函数
```

**assign用来合并克隆对象**
```js
// 合并对象
const a ={
	name:"lisi",
	age:18
	}
const b = Object.assign(a,{	// 此拷贝的是原对象的地址
	sex:"男"
})	

// 克隆对象
const c = Object.assign({},a);	// 将a拷贝给空对象 赋值给c 原对象也会被改变，

因为是拷贝给空对象，此拷贝的是新的对象，不是地址，但如果对象内部有引用类型，那其中克隆的是引用类型
```

**Object.keys获取对象中 键(key)**
```js
console.log(Object.keys(a));	// 获取的是对象所有key组成的数组
```

**Object.values获取对象中的 值(value)**
```js
console.log(Object.values(a));	// 获取的是对象所有value值组成的数组
```

**Object.entries(a)转成数组**
```js
console.log(Object.entries(a));	// 返回由键值对组成的多个数组的集合
```

```propertyIsEnumerable()```用于检测属性是否可枚举 - 是否可遍历出来
```js
 const arr = ['a', 'b', 'c'];
 for (let key in arr) {
   console.log(key); // 0 1 2 不包括length 
 }
console.log(arr.propertyIsEnumerable("length")); // false

// 使用属性描述来专门定义length属性
  Object.defineProperty(arr, "length", {
       value : 3,
     enumerable : false,  // 是否可枚举 改为true即可枚举 - 可以通过forEach遍历出来
        });
```
&nbsp;
#### 构造函数的继承
可以通过`Object.create`静态方法,设置继承某个构造函数
```js
const o = Object.create(Foo.prototype);	
```
或者该实例对象的构造函数继承某个实例对象的构造函数
```js
const o.prototype = Object.create(Foo.prototype)
```
&nbsp;
#### 类继承
类中的`extends`可以实现方法的继承
```js
// 使用extends代表 Student类 继承Human类的方法
class Student extends Human{
     constructor (name, sex, age, sno, classname) {
     
          // super代表的是父类对象
          // super代表使用父类(Human)的属性
        	super(name, sex, age);

          // 给子类自己的属性赋值
          this.sno = sno;
          this.classname = classname;
         }
	// Student 自身方法
      study () {
        console.log("Student在学习")
        }
  }
  const stu = new Student("张三", "male", 18, 9527, "html");
```
&nbsp;
#### Sting构造函数方法
```js
let cont = String.raw `hello\nworld`	// 利用raw方法可将其中的换行符原样输出
```
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
#### 实现深拷贝
可以利用json的解析过程，实现复制新对象
```js
const obj2 = JSON.parse(JSON.stringify(obj1));
console.log(obj1 == boj2) // false
```
&nbsp;

