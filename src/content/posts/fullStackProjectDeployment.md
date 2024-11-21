---
id: 8
title: 全栈项目部署
date: 2024-11-15
lastMod: 2024-11-15
summary: 简易部署全栈项目
category: 技术
tags: ['前端', '后端', '运维']
comments: true
---

# 前端

我使用的是`Ubuntu 22.04 server 64bit`镜像，如果使用的是其它镜像命令会有不同，但逻辑步骤是相同的

## 安装配置`git`
```linux
# 下载
sudo apt install git

# 配置个人信息
git config --global user.email "oopsweb@163.com"
git config --global user.name "Frank"

# 生成秘钥 (一直回车)
ssh-keygen

# 复制秘钥在你的git仓库中SSH KEY处上传
cat ~/.ssh/id_rsa.pub
```

## 安装`Node`
参考我博客中有一篇安装Node文章
建议使用`nvm`方式安装

## 安装配置`Nginx`
下载
```linux
# 更新软件包列表（如果安装失败的话）
sudo apt-get update

# 下载
sudo apt install nginx
```
从域名管理商处下载`ssl`证书到服务器（域名到阿里云、华为云等注册）
```linux
# 在nginx目录下创建ssl文件夹
cd /etc/nginx
mkdir ssl

# 上传ssl证书，证书分为两个文件一个是key一个是pem，在本地可使用scp方式上传
scp ./miss-you.top.key root@123.123.123.1:/etc/nginx/ssl
scp ./miss-you.top.key pem@123.123.123.1:/etc/nginx/ssl
```

配置80和443端口并配置域名证书
```linux
server {
        listen 80;
        server_name localhost;
  		# 访问http时重定向到域名
        server_name miss-you.top;
        return 301 https://www.miss-you.top;
}

server {
        listen 443 ssl;
        server_name www.miss-you.top;
        # 替换为你的 SSL 证书路径
        ssl_certificate /etc/nginx/ssl/miss-you.top.pem;
        # 替换为你的 SSL 私钥路径
        ssl_certificate_key /etc/nginx/ssl/miss-you.top.key;

        ssl_session_timeout  5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;

        ssl_prefer_server_ciphers  on;
        access_log /var/log/nginx/www.miss-you.top.access.log;
        error_log /var/log/nginx/www.miss-you.top.error.log;

		# 前端项目 指向项目打包后地址
        location / {
                root /home/blog-sweet/dist;
                index index.html index.htm;
                try_files $uri $uri/ /index.html;

                }

		# 后端项目
        location /api {
                rewrite ^/api/(.*)$ /$1 break;
                proxy_pass http://localhost:5000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

        }
}

```

启动`nginx`
```linux
# 启动
nginx

# 停止
nginx -s stop

# 重启
nginx -s reload
```

## 配置防火墙
因为我使用的`Ubuntu`镜像中没有防火墙，所以需要安装 `ufw`
其余镜像自行搜索防火墙配置方法

```linux
# 更新软件包列表 (安装404时执行)
sudo apt update

# 安装 ufw 
sudo apt install ufw

# 在配置具体的规则之前，先设置 UFW 的默认策略。一般来说，建议拒绝所有传入连接并允许所有传出连接
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许 SSH 连接
sudo ufw allow 22/tcp

# 允许 80 和 443
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 启用 UFW
sudo ufw enable

# 如果要关闭端口 (例如关闭80端口)
sudo ufw delete allow 80/tcp

# 重启 UFW
sudo ufw reload
```

&nbsp;
&nbsp;
# 后端
我使用的是`Python3`
### 本地
 1、记录依赖包
在`python`项目根目录终端运行此命令记录依赖包版本
```linux
pip freeze > .\requirements.txt
```
2、将记录后的包文件和项目一并上传到仓库

### 服务器
1、拉取项目

2、安装虚拟环境
```linux
 apt install python3.10-venv
```
3、创建虚拟环境
```linux
# 创建
python3 -m venv ~/my_venv

# 进入虚拟环境
source ~/my_venv/bin/activate

#退出虚拟环境
deactivate
```
4、进入虚拟环境后，cd到项目根目录运行以下命令安装requirements中的依赖包
```linux
pip install -r requirements.txt
```
&nbsp;

### uWSGI
以下还需要一个启动器来作为Web 服务器与应用程序之间桥梁，因为我使用的是`Flask`开发所以使用`uWSGI`工具，以下是具体操作步骤
1、安装
```linux
pip install uwsgi
```
2、配置`uwsgi.ini`文件，没有此文件可以创建一个文件，以下是常用基本配置，自行修改目录、项目名即可
```linux
[uwsgi]
# 虚拟环境的Python解释器路径
pythonhome = ~/my_venv

# 项目的主文件（例如Flask应用的app.py）所在的目录
chdir = /home/blog-sweet-api/

# 项目的主文件（例如Flask应用的app.py）中的WSGI应用对象名称，通常是app
module = app:app

# 启动的进程数
processes = 4

# 每个进程的线程数
threads = 2

# 监听的IP地址和端口
http-socket = 0.0.0.0:5000

# 设置最大请求
buffer-size = 8192

# 日志文件路径
logto = /var/log/uwsgi/blog-sweet-api.log
```
3、启动配置项目
```linux
# 使用uwsgi.ini配置文件启动
uwsgi --ini uwsgi.ini

# 停止
uwsgi --stop uwsgi.ini
 
# 重启uWSGI服务器
uwsgi --reload uwsgi.ini
 
# 查看所有uWSGI进程
ps aux | grep uwsgi
 
# 停止所有uWSGI进程
sudo pkill -f uwsgi -9
```

4、后台启动项目
```linux
uwsgi --ini uwsgi.ini &
```

5、排查问题
```linux
# 查看5000端口进程
netstat -tunlp | grep 5000

# 监听日志文件
tail -f /path/to/logfile
```


&nbsp;
&nbsp;

## 安装`MySQL`

`MySQL`常用命令
```linux
# 查看运行状态
sudo systemctl status mysql

# 连接到MySQL
mysql -u root -p

# 停止服务
sudo systemctl stop mysql

# 启动服务
sudo systemctl start mysql

# 退出MySQL控制台
exit
```

## 配置`MySQL`
`MySQL`是最常见的开源关系数据库管理系统（RDBMS）之一，它机遇结构化查询语言（SQL），这是一种用于管理数据库中保存的数据的编程语言。

以下方法都是配置root权限，最优方法是创建一个用户，配置新用户的权限

1、先转为root权限
```linux
sudo su
```

2、更新软件包列表
```linux
sudo apt update
```
3、下载MySQL
```linux
sudo apt install mysql-server
```
4、查看状态，安装好后MySQL可能会自动启动
```linux
# 查询版本，验证是否安装完成
mysql --version

# 查看状态
sudo systemctl mysql-server
```
5、启动服务，如果没有启动的话
```linux
sudo /etc/init.d/mysql start
```
6、MySQL 安装完成后，运行这个脚本会引导你完成一系列的安全设置，例如设置 MySQL root 用户的密码（如果还没有设置的话）、删除匿名用户、禁止远程 root 登录等。
```linux
# 运行脚本程序
sudo mysql_secure_installation

# 将会出现询问是否验证密码插件，按Y接受
Y

# 输入密码，此密码牢记
123123

# 是否删除所有匿名用户，按Y接受
Y
```
7、没有任何配置的时候默认会使用身份验证（auth_socket）插件进行身份验证，此插件会让你无需输入密码直接访问数据库，有安全问题，我们需要将`auth_socket`更改为`caching_sha2_password `
```linux
# 打开MySQL控制台
sudo mysql

# 检查数据库对不同用户的身份验证方法 （仅作为查看验证方法，不是配置命令）
SELECT user,authentication_string,plugin,host FROM mysql.user;
```
8、使用`ALTER USER`命令切换到`密码验证`（8个字符以上，数字+字母+特殊符号）
```linux
ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'your_password';
```
9、刷新权限
```linux
FLUSH PRIVILEGES;
```
10、登陆MySQL控制台
```linux
# -u 表示用户  -p 表示密码
mysql -u root -p
```
11、启动远程访问，使用ufw防火墙开放MySQL端口
```linux
# 启动防火墙
sudo ufw enable

# 开放MySQL端口
sudo ufw allow mysql
```
12、编辑配置文件运行其他IP地址访问
将其中`bind-address`改为`0.0.0.0`表示运行所有IP
`musqlx-bind-address`可注释
```linux
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```
修改完后按下`Ctrl + X` ，如果有文件修改按下`Y`保存，没有修改则按下`N`不保存，然后按下`Enter`退出

&nbsp;
####  `MySQL常见问题`
1、报错：1130 - Host 'XXXX' is not allowed to connect to this MySQL server
```linux
# 进入mysql控制台
mysql -u root -p

# 查询user表
SELECT user,authentication_string,host FROM mysql.user;

# 可以看到root用户只允许在localhost登录，需要修改使得其它主机也可以登录
update mysql.user set host='%' where user='root' and host='localhost' limit 1;

# 刷新权限
FLUSH PRIVILEGES;
```
