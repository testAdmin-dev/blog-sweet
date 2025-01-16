---
id: 11
title: Python反编译适用于所以版本
date: 2025-01-16
lastMod: 2025-01-16
summary: 将Python打包后的exe程序反编译出源码，并将pyc文件反编译为py文件
category: 技术
tags: ['后端']
comments: true
---

将Python打包后的exe程序反编译出源码，并将pyc文件反编译为py文件。

> 注意：反编译别人程序并外传会涉及到侵权问题，懂的都懂。

###  一、下载`pyinstxtractor`文件
此文件用于将exe反编译为pyc文件
```
https://github.com/extremecoders-re/pyinstxtractor.git
```

### 二、运行`pyinstxtractor`
将`pyinstxtractor.py`文件放置`exe`同目录下
```linux
python pyinstxtractor.py myApp.exe
```

### 三、将pyc反编译为py
```
v3.9 以上版本使用此网站
https://pylingual.io/

v3.9 以下版本使用uncompyle6
pip install uncompyle6
uncompyle6 test.pyc > test.py
```

### 四、重新打包为exe也可直接运行主入口py文件
```
pip install pyinstaller

pyinstaller -D myApp.py
```
