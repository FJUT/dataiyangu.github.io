title: >-
  tomcat启动一直卡在信息: Deploying web application directory
  /root/sunshine/apache-tomcat-7.0.86/webapps/ROOT
author: Leesin.Dong
tags:
  - tomcat
  - linux
categories:
  - java
  - tomcat
date: 2018-11-11 10:38:00
---
原因：
linux或者部分unix系统提供随机数设备是/dev/random 和/dev/urandom ，

两个有区别，urandom安全性没有random高，但random需要时间间隔生成随机数。jdk默认调用random。

然后就很简单啦，找到对应的配置文件去修改就好了

找到jdk1.x.x_xx/jre/lib/security/Java.security文件，在文件中找到securerandom.source这个设置项，将其改为：

securerandom.source=file:/dev/./urandom