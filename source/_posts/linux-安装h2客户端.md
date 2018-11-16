title: linux 安装h2客户端
author: Leesin.Dong
tags:
  - linux
  - h2
  - 数据库
categories:
  - linux
date: 2018-11-11 23:43:00
---
1，下载jar包

下载h2-1.3.176.jar 这个包（部分服务版本不一致，请自行更换版本）

 

2，启动服务

复制到linux服务器 /opt/h2/bin/ 下

在目录下启动

Java -cp h2-1.3.176.jar org.h2.tools.Server -web -webAllowOthers -tcp -tcpPort 19200 -tcpAllowOthers

        备注：此命令发布tcp端口为19200

    

3，使用web工具

连接url为jdbc:h2:tcp://192.168.10.221:19200/~/test或者jdbc:h2:/user/vasuser/data/

        连接成功，显示为


![upload successful](/images/my_blog_220.png)