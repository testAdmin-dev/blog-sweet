---
id: 3
title: 前端Linux环境使用Nginx部署项目并开启gzip压缩
date: 2022-06-21
lastMod: 2024-06-21
summary: 在Linux环境中配置Niginx代理前端项目
category: 技术
tags: ['前端']
comments: true
---

首先我们需要一台服务器和连接Linux的工具。  
我使用的是`Xshell`来部署前端项目

&nbsp;
&nbsp;

## 一、查看服务器中是否有安装nginx
出现nginx地址则代表服务器已有nginx，否则需要安装nginx
此图片是已安装nginx
![img](http://sn8siqtr5.hn-bkt.clouddn.com/nginxConfig1.png)
&nbsp;
&nbsp;

## 二、安装nginx (Centos 使用其他源亦有其它命令 比如 apt install nginx)
此处我是用yum来安装nginx，所以先要配置Centos的源地址

输入此命令
```js
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```
&nbsp;

配置完成后既可以安装nginx
```js
yum install -y nginx
```

![img](http://sn8siqtr5.hn-bkt.clouddn.com/nginxConfig2.png)
出现此结果代表nginx安装成功~
也可使用`nginx -v`来查看版本号，若无法使用nginx全局命令可百度配置

&nbsp;
&nbsp;

## 三、将打包好的项目发送到服务器
**1、新建文件夹来存放项目**
```js
cd /		// 切到根地址
cd /home	// 需要在home文件下新建www文件来存放项目
mkdir www	// 新建www文件
```

**2、发送到服务器**
需要使用git工具`ftp`来在项目根目录下输入此命令
123.123.123更换为服务器地址
```js
scp -r build/ root@123.123.123:/home/www
```

&nbsp;
&nbsp;

## 四、配置`nginx.conf`文件
```js
cd /			// 切换到根目录
cd etc/nginx	//切换到nginx目录
ll				// 查看该文件夹下所有文件
vi nginx.conf	// 编辑nginx配置文件
```

**nginx.conf**
```nginx
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid     /var/run/nginx.pid;

events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  'remote_addr - remote_user [time_local] "request" '
                      'status body_bytes_sent "$http_referer" '
                      '"http_user_agent" "http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

	# 限制文件最大传输（不设置的话，上传文件只能上传1M以内）
	client_max_body_size 1024m;
	client_body_buffer_size 10m;

    #gzip  on;

    # 是否需要导入conf.d中的配置文件
    # include /etc/nginx/conf.d/*.conf;

    server {
        # 因为浏览器http的默认端口问80，所以此处使用80端口
        listen  80;	
        # 服务器地址 或者使用 localhost
        server_name   123.123.123;	
        charset koi8-r;

        location / {
            // 项目目录
            root /home/www/build;	
            index index.html index.htm;
            # history模式下防止页面刷新出现404问题
            try_files $uri $uri/ /index.html; 
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            # proxy_pass  http://127.0.0.1:9001;
            # proxy_redirect     off;
            # proxy_set_header   Host             $host;
            # proxy_set_header   X-Real-IP        $remote_addr;
            # proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            # proxy_set_header   X-Forwarded-Proto $scheme;
            # proxy_set_header Upgrade $http_upgrade;
            # proxy_set_header Connection upgrade;
            # proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
            # proxy_max_temp_file_size 0;
            # proxy_connect_timeout      90;
            # proxy_send_timeout         90;
            # proxy_read_timeout         90;
            # proxy_buffer_size          4k;
            # proxy_buffers              4 32k;
            # proxy_busy_buffers_size    64k;
            # proxy_temp_file_write_size 64k;
            #规则：禁用不必要的http方法：DELETE、PUT、TRACE、OPTIONS等
            # limit_except GET POST HEAD{  deny all;}
        }

        # 接口代理
        # 因为项目部署的服务器和接口服务器不是同一地址，会产生跨域，所以需配置接口代理
        location /api {	
            rewrite ^/api/(.*)$ /$1 break;	// 去除接口/api前缀
            proxy_set_header X-Real-IP $remote_addr; // 传递用户IP
            proxy_pass      http://321.321.321:8000;	// 接口服务器地址
        }

        # 部署的服务器地址
        proxy_set_header Host 123.123.123;	

        error_page 404 /404.html;
        location = /40x.html {
                root html;
        }
    }

    # 配置https
    server {
		listen 443 ssl;
		server_name www.miss-you.top;
        # 替换为你的 SSL 证书路径
        ssl_certificate /etc/nginx/ssl/miss-you.top.pem;
        # 替换为你的 SSL 私钥路径 
        ssl_certificate_key /etc/nginx/ssl/miss-you.top.key;  

        # 保持五分钟会话连接 五分钟内再次发起会话信息时不需要重新握手
        ssl_session_timeout  5m;
        # 加密
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        # 指定ssl版本
        ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
        # 握手过程优先使用加密
        ssl_prefer_server_ciphers  on;

		location / {
			root /home/dist;
			index index.html index.htm;
            try_files $uri $uri/ /index.html;
		}

		location /api {
            rewrite ^/api/(.*)$ /$1 break;
            proxy_pass http://localhost:5000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
	    }
	}
}
```
&nbsp;
配置完毕可输入以下命令看是否能拿到打包后的html
```js
curl http://127.0.0.1:80
```

&nbsp;
&nbsp;

## 五、以上配置完毕后还无法访问，因为防火墙问题
以上我们配置的是80端口，我们需要在服务器中开放80端口的访问
```js
systemctl start firewalld		// 开启防火墙

/*
* –zone #作用域
* –add-port=80/tcp #添加端口，格式为：端口/通讯协议
* –permanent #永久生效，没有此参数重启后失效
*/
firewall-cmd --zone=public --add-port=80/tcp --permanent	// 开启指定端口

firewall-cmd --reload		// 重启防火墙
```
&nbsp;
&nbsp;
## 六、重启nginx，项目全部部署已完成
```js
nginx	// 开启nginx
nginx -s stop	// 关闭nginx
nginx -s reload 	//重启nginx
```
&nbsp;
&nbsp;

## 七、开启gzip，优化加载速度
当项目大起来的时候打包出来的build文件也会越来越大，使用gzip压缩后可以减少请求时间

* 下载`compression-webpack-plugin`
	因为是打包时才需要使用，所以我们下载到开发环境即可
```js
yarn add compression-webpack-plugin -D
```
* 首先配置`webpack.config.js`
```js
// 头部导入下载好的compression-webpack-plugin
// gzip 代码压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');


// 在plugins: [...]中添加
 // gzip代码压缩
 new CompressionWebpackPlugin({
   filename: "[path][base].gz[query]",
   algorithm: "gzip",
   test: new RegExp('\\.(' + ['js','css'].join('|') + ')$'),
   threshold: 10240,
   minRatio: 0.8
 }),
```

* 运行打包`npm run build`，很显然打包出来的文件大小相差还是很大的
![img](http://sn8siqtr5.hn-bkt.clouddn.com/nginxConfig3.png)
* 配置`nginx.conf`，在`server`中添加配置
```nginx
gzip on;
gzip_http_version 1.1;
gzip_static on;
gzip_min_length 1;
gzip_comp_level 4;
gzip_vary on;
gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
```

* 重启nginx，`nginx -s reload`



## 服务器主要配置
* 实时监听nginx日志
```
tail -f /var/log/nginx/access.log
```
* 拷贝并移动文件夹
```
cp -r /home/build /home/www
```
