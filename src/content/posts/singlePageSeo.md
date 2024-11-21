---
id: 6
title: React、Vue、Angular 实现SSR 预渲染 SEO优化
date: 2022-12-16
lastMod: 2024-11-01
summary: 使用框架时如何处理SEO问题
category: 技术
tags: ['前端']
comments: true
---

当我们使用React、Vue、Angular这些客户端渲染框架时，他们都有一个共性，都是在客户端进行解析js来渲染我们的DOM，但这样会有几个问题！
* “首屏渲染白屏问题”，初次请求到html、css和js时，他还需要在客户端浏览器进行解析的过程才能拿到真正的DOM，这样就会导致先请求到基础的`html`(也就是我们public文件夹中的index.html文件)，其中的id为`root(React)、app(Vue)`标签中没有内容导致的白屏现象。
* “SEO问题”，就像百度的检索爬虫时，他是不能像谷歌一样就检索时就会执行js解析我们的关键字，百度的检索只会拿到我们的html，这样就会导致我们页面中的很多文字不会被百度检索到，从而SEO效果非常差



SEO有很多处理方式，常用的就比如服务端渲染 `SSR`

服务端渲染（Server-Side Render），是指将单页应用（SPA）在**服务器端**渲染为 HTML 片段，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程。  

SSR 优势在于：

- **更友好的 SEO**：爬虫可以直接抓取渲染之后的页面，CSR 首次返回的 HTML 文档中，是空节点（root），不包含内容。而 SSR 返回渲染之后的 HTML 片段，内容完整，所以能更好地被爬虫分析与索引。
- **更快的首屏加载速度**：无需等待 JavaScript 完成下载且执行才显示内容，更快速地看到完整渲染的页面。有更好的用户体验。
- 需要服务端支持：完成 SSR 需要服务端（例如：Node.js）支持。



#### SSR网上到处都是教程，我这次使用`prerender-spa-plugin`实现预渲染的方式

此方案只针对小项目，如果你的网站有数百数千条路由，那我还是建议你使用`SSR`

此处我们可以使用`prerender-spa-plugin`插件在打包时就可按路由打包为一个个html文件
```js
npm install prerender-spa-plugin -D
```
此处有一个坑，因为本人`webpack`是`5*`版本，使用此插件是会报错，如果和我一样的版本可使用`@dreysolano/prerender-spa-plugin`作为替换
```js
npm install @dreysolano/prerender-spa-plugin -D
```

## 主要在`webpack.config.js`中做修改
在 plugins 中添加以下代码
```js
// 先导入
const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin');

//在 plugins 中添加以下代码
 new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, '../build'),
        // 此处添加路由，它会根据路由打包出一个个文件夹
        routes: [
          '/',
          'home'
        ]
  }),
```

打包后都是以路由命名的一个个文件夹，文件中有html和css，正常部署在服务器上即可。
