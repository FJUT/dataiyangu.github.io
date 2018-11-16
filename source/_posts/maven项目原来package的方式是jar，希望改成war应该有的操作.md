title: maven项目原来package的方式是jar，希望改成war应该有的操作
author: Leesin.Dong
tags:
  - maven
categories:
  - 编码辅助工具
  - maven
date: 2018-11-11 23:04:00
---
<packaging>war</packaging>
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <version>2.2</version>
    <configuration>
        <!-- 指定web.xml的路径  -->
        <webXml>web\WEB-INF\web.xml</webXml>
        <!-- 指定jsp、js、css的路劲 -->
        <warSourceDirectory>WebRoot</warSourceDirectory>
    </configuration>
</plugin>
 

<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
</dependency>
