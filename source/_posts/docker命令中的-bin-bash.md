title: docker命令中的/bin/bash
author: Leesin.Dong
tags:
  - docker
categories:
  - 基础亦是进阶
  - docker
date: 2018-11-12 00:01:00
---
docker run -i -t tomcat /bin/bash

中的/bin/bash的作用是因为docker后台必须运行一个进程，否则容器就会退出，在这里表示启动容器后启动bash。