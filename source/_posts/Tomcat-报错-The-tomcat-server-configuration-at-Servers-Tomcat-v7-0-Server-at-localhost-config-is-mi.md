title: >-
  Tomcat 报错 (The tomcat server configuration at /Servers/Tomcat v7.0 Server at
  localhost-config is mi)
author: Leesin.Dong
tags:
  - tomcat
  - eclipse
categories:
  - 编码辅助工具
  - eclipse
date: 2018-11-11 23:21:00
---
错误如图所示：


![upload successful](/images/my_blog_208.png)

目前对于这个错误的原因尚不清楚，目前只知道如何解决这个错误，等到以后知道了原因之后再更改此文。

原因猜测：

之前你的eclipse关联的tomcat由于某种原因出现了信息丢失，需要重新关联

解决方案：

删掉原先关联的tomcat，重新关联一个新的，如图所示：


![upload successful](/images/my_blog_209.png)

然后重新运行你需要运行的项目，OK