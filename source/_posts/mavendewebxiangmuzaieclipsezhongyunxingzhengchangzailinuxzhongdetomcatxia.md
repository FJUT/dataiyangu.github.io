title: maven的web项目在eclipse中运行正常在linux中的tomcat下的webapps下报错404
author: Leesin.Dong
tags:
  - 工作_cloudwise
  - maven
  - linux
  - tomcat
categories:
  - 工作_cloudwise
  - 工作中匮乏的细节
date: 2018-11-07 14:20:00
---
具体描述：写了一个spring4+hibernate5的maven项目，pom的内容是直接从网上down'的

在eclipse中运行正常，打成war包放到tomcat下报错404.

解决：

![upload successful](/images/my_blog_80.png)

因为pom是复制的，这段不应该放进来，可能跟maven-war-plugin

的版本有关，具体原因不清楚，在这里记录下。
