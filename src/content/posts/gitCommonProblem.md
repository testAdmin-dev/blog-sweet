---
id: 4
title: Git常见问题处理
date: 2021-10-27
lastMod: 2021-10-27
summary: Git常见问题处理
category: 技术
tags: ['前端', '后端']
comments: true
---

### 工作流程
1. 打开终端
2. git branch       //先确定自己在哪个分支上写的代码
3. git checkout -b user     //创建新的分支user用来存放新写的代码
4. git branch     //确认自己是否在新分支上
5. git status    //查看当前分支状态（有哪些被修改了，或者新增的）
6. git add .     //添加到暂存区
7. git status   //重新检查当前分支状态
8.  git  commit  -m  "完成用户列表功能的开发"    //（-m是提交信息）将暂存区域的文件提交到git本地仓库 
9. git status    //确定当前状态是否是干净的 working tree clean
10. git push -u origin user     //推送到云端仓库中 origin仓库别名中  保存在user分支中
11. git checkout master   //切换到主分支
12. git merge user     //将user合并到主分支上
13. git push    ///将本地的mester主分支代码推送到云端
14. 开发下一页面
15. git branch     //确定自己在主分支上
16. git checkout -b rights    //创建新分支为rights
17. git push -u origin rights   //将新分支推送到云端保存 

&nbsp;
&nbsp;

### git冲突时强制使用远程代码覆盖本地
```
git fetch --all
git reset --hard origin/master
```


### git pull 错分支代码导致冲突，或者想回退本次pull
1、查看git版本记录
```
git reflog
```

2、回退到pull之前的版本
```
// 找到pull动作的版本号

git reset --hard c1e68bb
```

&nbsp;
&nbsp;

### git commit 回退，并将被回退的commit提交到新分支
1. git reset --soft   (Hash)  		// 选择需要回退的版本 只回退commit信息
2. git checkout -b (新分支名)  		// 创建新分支用来保存那个提交的修改操作。
3. git commit -m "回退后的新提交信息" 		// 目的重新提交到新分支
4. git push --set-upstream origin (新分支名称) 	

&nbsp;
&nbsp;

### git不修改配置文件本地忽略更改提交
忽略：
`git update-index --assume-unchanged package.json`
取消忽略：
`git update-index --no-assume-unchanged package.json`

&nbsp;
&nbsp;

### git停止跟踪文件
如果你已经在 .gitignore 文件中添加了 /operatorApi/.env，但是 .env 文件仍然没有被忽略，可能是因为 .env 文件已经被 Git 跟踪过了，通过以下命令将已经跟踪的 .env 文件从 Git 中删除
`git rm --cached .env`
`git rm --cached operatorApi/.env`

&nbsp;
&nbsp;

### git 暂存代码 
开发一半发现当前处在错误分支
1、将当前未提交代码暂存起来
```
git stash -u
```
2、切换需要的分支
```
git checkout dev
```
3、取出暂存代码
```
git stash apply
```

&nbsp;
&nbsp;

### 报错：远程仓库已存在
1、先删除远程 Git 仓库$ git remote rm origin
2、再添加远程 Git 仓库$ git remote add origin git@github.com:FBing/java-code-generator


&nbsp;
&nbsp;


### git版本回退分为三种方式，一种是commit加内容都回退，一种是回退commit记录，还有一种是将需要回退的版本作为新版本发布

&nbsp;

此操作可将远程仓库版本回退，没有记录！！
```
git reset --hard  版本号 （此版本号是你要回退到哪个版本，此版本号数据依旧存在，比此版本新的版本被清除）：彻底回退到某个版本，本地的代码也会变为上一个版本的内容

git commit -m xxxx 提交

git push 推送到远程 可能要使用-f 强推
```
&nbsp;
&nbsp;
此操作只回退commit记录，但内容依旧存在不会回退
```
git reset --soft (Hash) // 选择需要回退的版本 只回退commit信息

git commit -m “回退后的新提交信息” // 目的重新提交到新分支

git push --set-upstream origin (新分支名称)
```
&nbsp;
&nbsp;

此操作是将需要回退的版本生成新的版本，原来的版本依旧存在
好处例如 有1、2、3 三个版本，用这种方法，当我们需要回退版本2的时候不会影响版本3的记录
```
git revert -n 版本号 （此版本号是你要回退到哪个版本，此版本号数据依旧存在，比此版本新的版本被清除）

git commit -m xxxx 提交

git push 推送到远程 可能要使用-f 强推
```