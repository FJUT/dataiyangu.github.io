title: 关于docker create start run
author: Leesin.Dong
top: 9999992
tags:
  - docker
categories:
  - 基础亦是进阶
  - docker
date: 2018-11-12 00:12:00
---
![](/images/15440640487814.jpg)
>关于docker create start run的一点小问题。
<!--more-->

初次接触docker，从最基础的开始学习，

docker run = docker create +docker start

但是docker create之后在docker start  再通过

docker   ps  

![upload successful](/images/my_blog_237.png)


并没有相关的进程

docker ps -a


![upload successful](/images/my_blog_238.png)

相关的进程创建了，但是又马上关闭了

之后用docker run ubuntu:15.10 /bin/echo "hello yingyingying "


![upload successful](/images/my_blog_239.png)

依然没有相关的进程

因为之前执行的是一次运行，执行完相关的容器自然就关闭了，自然也就在docker ps中看不到。

更多的时候，需要让 Docker 容器在后台以守护态（Daemonized）形式运行，这样就可以在docker ps 中看到了。此时，可以通过添加 -d 参数来实现。

例如下面的命令会在后台运行容器。

sudo docker run -d ubuntu:14.04 /bin/sh -c "while true;do echo hello world ; sleep 1 ;done"

另外如果是docker start 之前的echo “hello yingyingying”

在命令行是不会打印相关的hello world ，只会打印容器的id，通过docker  logs id 能够查看，所以表面上感觉并没有运行。



![upload successful](/images/my_blog_240.png)
相关docker学习的文档：http://wiki.jikexueyuan.com/project/docker-technology-and-combat/


--------------------- 
作者：Leesin Dong 
来源：CSDN 
原文：https://blog.csdn.net/dataiyangu/article/details/82429691 
版权声明：本文为博主原创文章，转载请附上博文链接！

