title: java注释，日志会不会影响性能。
author: Leesin.Dong
tags:
  - interview
categories:
  - java
  - java基础
date: 2018-11-08 09:39:00
---
        java的虚拟机机制，使得.java文件被编译成.class文件的时候过滤掉了注释的部分，即.class文件中是不存在注释的，所以通过jad等软件进行反编译也是看不到注释的。所以，java的注释只会影响编译的效率，不会影响运行的效率。java的debug日志，肯定是执行了的，会影响运行的效率不用说。 

        综上：

        注释不影响效率，想写多少都可以，可以帮阅读者更清晰的明白代码的意思。

        debug日志会影响效率，在业务必须的基础上尽量少写。
--------------------- 
作者：Leesin Dong 
来源：CSDN 
原文：https://blog.csdn.net/dataiyangu/article/details/82908894 
版权声明：本文为博主原创文章，转载请附上博文链接！