---
id: 7
title: 前端简易配置自动化部署
date: 2022-12-16
lastMod: 2022-12-16
summary: 如果你不想去配置Docker又不想使用CI/CD那你可以试试这个方法，本地直连服务器
category: 技术
tags: ['前端']
comments: true
---

如果你只是想简单实现一个自动化部署项目，将本地打包后文件发到服务器，可以采用此方案

主要用到的插件`ora`和`scp2`

```js
npm install ora scp2 -D
```

## 一、在根目录新建`deploy.js`文件
利用`ora `在本地启服务得知部署状态
```js
const scpClient = require('scp2');
const ora = require('ora');

const server = {
    host: '', // 服务器地址
    port: 22, // 服务器端口号
    username: '', // 服务器用户名
    password: '' , .// 服务器密码
    path: '/home/www/build' // 项目存放路径
};

const loading = ora('正在部署至 ' + server.host);

loading.start();

scpClient.scp('build/', server, (error) => {
    loading.stop();

    if (error) {
        console.log('部署失败');
        throw error;
    } else {
        console.log('部署成功');
    }
})
```

## 二、修改`package.json`
* 在`package.json`的`scripts`中添加`deploy`指令，运行`npm run deploy`即可调用`deploy`文件进行部署
* 或者可添加`postbuild`命令，此命令可在执行`npm run build`后自动调用`postbuild`
```js
"scripts": {
    "postbuild": "npm run deploy",
    "deploy": "node ./deploy.js"
  },
```