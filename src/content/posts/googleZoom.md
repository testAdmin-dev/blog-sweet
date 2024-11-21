---
id: 2
title: zoom缩放导致下拉框定位偏移问题
date: 2024-09-05
lastMod: 2024-09-05
summary: 因Google于2024年8月20日更新v128版本，更新了先前的非标准 CSS 的现有实现 zoom 属性以与新标准保持一致，使得很多用户出现定位混乱偏移问题
category: 技术
tags: ['前端']
comments: true
---

**因为浏览器升级修改了zoom导致**

> https://developer.chrome.google.cn/release-notes/128?hl=zh_tw

**标准化 CSS zoom 属性**

更新了先前的非标准 CSS 的现有实现`zoom`属性以与新标准保持一致。 这会更改各种 JavaScript API 以符合该规范， 更改缩放以应用于 iframe 内容文档 并将其更改为应用于所有继承的长度属性 （以前，它只更改了继承的 font-size）。

## 解决方案

**可根据zoom值计算相差偏移量**
```js
  const isChromeHighVersion = () => {
    const ua = navigator.userAgent.toLowerCase();
    const chromeIndex = ua.indexOf('chrome');
    if (chromeIndex > -1) {
      const version = ua.substring(chromeIndex + 7);
      const majorVersion = parseInt(version.split('.')[0], 10);
      return majorVersion > 127;
    }
    return false;
  };
  
  function zoomPlugin() {
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  
    if(!isChromeHighVersion()){
      return;
    }
  
    Element.prototype.getBoundingClientRect = function () {
      const rect = originalGetBoundingClientRect.call(this);
      const zoom = Number(document.body.style.zoom || 1);
  
      const newRect = new DOMRect(
      	// 偏移距离可自行修改
        rect.x / zoom + 100,
        rect.y / zoom + 100,
        rect.width / zoom,
        rect.height / zoom,
      );
      return newRect;
    };
  }
  
```

根文件调用zoomPlugin方法即可
