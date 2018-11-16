title: docker集成javaagent
author: Leesin.Dong
tags:
  - 工作_cloudwise
  - docker
  - ''
categories:
  - 工作_cloudwise
  - 工作中匮乏的细节
date: 2018-11-05 21:59:00
---
此文章是针对本人工作中的问题，误点的同学请自便。

工作流程以及注意事项：
1:将agentservice sendproxy javaagent放在同一个新建的目录下面
2.拿到一个tomcat的catalina的文件，并修改javaagent的配置。
注意：因为将来这个catalina会被cp到docker容器中，所以这里javaagent的目录要写成docker容器中的目录，为了简单起见，直接在这里还写成本主机的目录，在下面的步骤中的Dockerfile写copy操作的时候写成与本机一致的目录，系统会自动创建相应的目录。
agentservice中的startup.sh_javaagent_demo（除了#!/bin/bash）copy到catalina的上方。
注意：1.docker中的tomcat启动的时候，因为后续的操作，本配置中的is null并不是错误的 2.下面几行打印的日志是在java -jar /var/cloudwise/JavaAgent_2.1.1/javaagent-bootstrap.jar startindocker的时候出来的。
3.agentservice中有Dockerfile的模版，没复制到上一层，（原因好像是docker的add和copy操作 copy的对象最好是本目录下面的，否则 copy 不过去），运行docker build 生成镜像。
4.启动SendProxy——>配置License Key——>启动AgentService 
注意：配置license key的时候可能会出现写不进去的情况，将agentservice/conf中的license_key删掉，否则会一直写不进去。
出现license_key有了值，但是在启动了agentservice后，agent-host-key中仍然是控制，注意配置的License Key的两边的单引号的问题。
5.docker run

实现原理：
通过jersy 的webservice服务，在agentservice中开放26789端口，在docker中的tomcat中的catalina配置文件中首行，访问agentservice的服务，进而得到，agentservice中的相应的参数，得到参数的方法是：首先通过init_licensekey.sh脚本将License_key放在配置文件中，然后Agentsercice在启动的脚本中获取到配置文件中的各个参数，然后写到jvm中，在远端通过system.getproperty得到相应的参数，最后通过catalina的首行配置中java -jar /var/cloudwise/JavaAgent_2.1.1/javaagent-bootstrap.jar startindocker将参数写到docker容器中的javaagent中，进行监控。

docker技能:
将本机的web服务加载到docker中：通过交互模式进入docker的tomcat服务，进而得到tocat在docker中的目录，copy本机war包的方式有三种，最可取的是通过建立Docker文件，打成镜像，运行这个新的镜像：
Dockerfile的内容：
from docker.io/tomcat:latest #你的 tomcat的镜像
MAINTAINER XXX@qq.com #作者
COPY NginxDemo.war /usr/local/tomcat/webapps #放置到tomcat的webapps目录下
注意：copy最好将主机的文件放在dockerfile的同级目录下面，放在其他地方可能找不到。
注意：copy 的第二个参数是docker的目标路径，如果/结尾就是当作目录，如果不是一这个结尾默认当作文件处理

 

