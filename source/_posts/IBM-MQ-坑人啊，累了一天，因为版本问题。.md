title: IBM MQ 坑人啊，累了一天，因为版本问题。
author: Leesin.Dong
tags:
  - mq
categories:
  - 基础亦是进阶
  - mq
date: 2018-11-12 00:18:00
---
刚接触这个东西，在linux安装服务端和客户端

runmqsc: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by /opt/mqm/lib64/libmqmcs_r.so)

总是不成功，报很诡异的错误，我们版本是9.0

解决了差不多一天没出来，

还好我会turn over

原来在ibm的9.0版本中对linux的版本有很大的限制，尤其是redhat，虽然我的是centos

最后我下了个8.0，完美解决这个鬼东西，恶心那。

给自己的忠告：以后下安装包什么的尽量不要下载版本最高的，也别下载版本最低的，最好选中间的。高的很多系统还不支持，也不稳定，低的很多年前的东西，更不稳定，只有中间的功能也不是很落后，也没有太多的麻烦事。


--------------------- 
作者：Leesin Dong 
来源：CSDN 
原文：https://blog.csdn.net/dataiyangu/article/details/82808282 
版权声明：本文为博主原创文章，转载请附上博文链接！
