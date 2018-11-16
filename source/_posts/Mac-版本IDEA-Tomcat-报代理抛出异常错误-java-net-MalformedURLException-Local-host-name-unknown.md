title: >-
  Mac 版本IDEA Tomcat 报代理抛出异常错误: java.net.MalformedURLException: Local host name
  unknown
author: Leesin.Dong
tags:
  - mac
  - idea
categories:
  - 编码辅助工具
  - idea
date: 2018-11-11 23:09:00
---
IDEA添加tomcat后，启动项目报代理抛出异常错误: java.net.MalformedURLException: Local host name unknown

解决方法：

找到MAC终端，打开/etc/hosts,文件

命令：sudo vim /etc/hosts

输入本机密码后

在127.0.0.1 localhost 后面添加异常主机xxx

即：

127.0.0.1 localhost  xxx

xxx为异常主机的名称