title: maven创建简单springboot的一个小问题
author: Leesin.Dong
tags:
  - 工作_c'lou'dwi'se
  - maven
  - springboot
categories:
  - java
  - springboot
date: 2018-11-11 22:10:00
---
springboot是支持jetty的，但是jetty2.0之后的版本需要jdk1.8以上，jetty9.0以上，不配置jetty服务器的话默认是tomcat服务器，jetty服务器配置的时候要排除tomcat依赖。