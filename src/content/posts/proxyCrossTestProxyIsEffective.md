---
id: 10
title: React和Vue配置Proxy跨域请求并且查看测试Proxy是否生效
date: 2022-11-30
lastMod: 2022-11-30
summary: 跨域是前端最常见的问题了，解决跨域我通常会使用http-proxy-middleware、http-proxy-middleware插件可以帮助我们代理转发请求
category: 技术
tags: ['前端']
comments: true
---

**以下React和Vue均可使用**

跨域是前端最常见的问题了，解决跨域我通常会使用`http-proxy-middleware`
`http-proxy-middleware`插件可以帮助我们代理转发请求

&nbsp;
# 配置跨域请求
* `npm install --save-dev http-proxy-middleware`	安装插件，此处我使用的是`create-react-app`脚手架搭建的项目，自带此插件，所以可不需安装
* 在src目录下新建`setupProxy.js`文件，`src/setupProxy.js`
```js
// 如果无法使用可能是版本更新问题
// const proxy = require('http-proxy-middleware');

// 现在通常使用新版本createProxyMiddleware，否则会出现项目正常启动，但浏览器却拒绝我们的访问项目
// 是因为setupProxy帮我们把项目代理了(本人亲测！！)
const { createProxyMiddleware  } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware(
            // match含有account前缀的请求，转发给target
            '/account', {
                // target: 'http://109.244.69.122.com:8000/',
                target: 'http://localhost:9000',
                /* 
                * 默认为false： 发送请求头中host会取当前本地localhost地址
                *  设置为true：  发送请求头中host会设置成当前target·
                */
                changeOrigin: true,
                // 是否去除前缀，根据业务场景去除
                // pathRewrite: {'^/account': ''}
            }
        )
    )
}
```


&nbsp;
&nbsp;
# 利用nodeJs启动服务模拟请求
可以自启一个本地服务器端口，测试代理是否生效
创建`server.js`
```js
const http = require("http");

const app = http.createServer((req, res) => {
	// 查看收到的请求地址
    console.log(req.url);
    // 收到的url信息
    console.log(req.rawHeaders);
  if (req.url === "/account/test") {
    res.end("hello world!!");

  }

});

app.listen(9000, "localhost", () => {
  console.log("localhost:9000开启服务");

});
```

在node环境启动本服务
`node server.js`

收到请求并返回数据代表代理成功
