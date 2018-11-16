title: System.getProperty得到jvm系统属性
author: Leesin.Dong
tags:
  - Java基础
categories:
  - java
  - java基础
date: 2018-11-11 10:39:00
---
System.getProperty的作用是能够得到jvm的系统属性

jvm的系统属性配置有三种方式：

1:通过eclipse



![upload successful](/images/my_blog_146.png)
2:执行java命令
java -Dxxx=hello -jar xxx.jar

3:通过linux脚本

在xxx.sh中加入

-Dxxx=xxx
