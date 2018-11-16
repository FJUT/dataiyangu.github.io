title: 进入docker交互模式后如何查看docker容器的id
author: Leesin.Dong
tags:
  - docker
categories:
  - 基础亦是进阶
  - docker
date: 2018-11-12 00:08:00
---
因为普通的模式可以通过docker ps查看容器的id，如果通过

docker run -i -t ubuntu：15.10 /bin/bash

进入交互模式后，可以通过

cat /etc/hosts

查看容器id


![upload successful](/images/my_blog_236.png)