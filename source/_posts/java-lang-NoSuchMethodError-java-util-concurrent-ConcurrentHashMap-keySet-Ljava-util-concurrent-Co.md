title: >-
  java.lang.NoSuchMethodError:
  java.util.concurrent.ConcurrentHashMap.keySet()Ljava/util/concurrent/Co
author: Leesin.Dong
tags:
  - java基础
  - jdk
categories:
  - java
  - java基础
date: 2018-11-11 10:11:00
---
完整异常信息:

java.lang.NoSuchMethodError: java.util.concurrent.ConcurrentHashMap.keySet()Ljava/util/concurrent/ConcurrentHashMap$KeySetView

ConcurrentHashMap中没有KeySetView keySet();方法

而KeySetView keySet()是jdk1.8的方法，若本身项目开发的时候是基于jdk1.8进行开发的，那么在部署环境也应该注意环境的jdk是否是1.8版本的。

如果你部署环境jdk1.7的，并且你也是希望使用jdk1.7的，那么你应该将你本地开发环境的jdk也配置成1.7,这样ConcurrentHashMap中的方法才会是Set keySet()。


--------------------- 
作者：Leesin Dong 
来源：CSDN 
原文：https://blog.csdn.net/dataiyangu/article/details/81060468 
版权声明：本文为博主原创文章，转载请附上博文链接！