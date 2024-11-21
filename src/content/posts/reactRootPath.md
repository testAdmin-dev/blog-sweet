---
id: 5
title: React配置@src根路径
date: 2022-01-26
lastMod: 2022-01-26
summary: 项目需要用绝对路径时可配置根路径别名
category: 技术
tags: ['前端']
comments: true
---


## 第一种：
直接修改`node-modules`包中的`webpack.config.js`文件
* 找到`node-modules/react-scripts/config/webpack.config.js`文件
* 修改其中alias中的配置，添加`'@src': path.resolve('src'),`

```js
alias: {
        '@src': path.resolve('src'),
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
      },
```

&nbsp;

## 第二种：
我们通过`create-react-app`脚手架搭建的项目其中的webpack配置文件都是被封装起来的，项目中我们需要使用`@src`配置根路径，从而方便使用绝对路径的话，就需要去把webpack抽离出来进行修改。
&nbsp;
* 执行 `npm run eject` （此操作是不可逆的！）
* 执行完成后，项目目录中会多出两个文件夹`config`和`scripts`
* 在`config`中找到`webpack.config.js`文件
* 在alias中添加`'@src': path.resolve('src')`
```js
alias: {
		// 添加此代码即可
        '@src': path.resolve('src'),
        
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
      },
```

&nbsp;
&nbsp;
&nbsp;
&nbsp;

### 配置好后我们还需要它像相对路径一样有文件别名提示的功能**
#### 一、 首先需要下载插件`Path Intellisense`
**并且需要在插件中打开本地设置并配置**
![img](https://public.miss-you.top/reactRootPath1.png)

![img](https://public.miss-you.top/reactRootPath2.png)


	
**在settings.json中添加**
	
```js
{
    "path-intellisense.mappings": {
        "@src": "${workspaceRoot}/src"
    }
}
```

&nbsp;

#### 二、在根目录下创建并配置`jsconfig.json`文件
```js
{
    "compilerOptions": {
      "target": "ES6",
      "module": "commonjs",
      "allowSyntheticDefaultImports": true,
      "baseUrl": "./",
      "paths": {
        "@src/*": [
          "src/*"
        ]
      }
    },
    "exclude": [
      "node_modules"
    ]
}
```
