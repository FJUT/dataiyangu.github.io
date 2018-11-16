title: 'eclipse中maven项目部署到tomcat [转]'
author: Leesin.Dong
tags:
  - eclipse
  - maven
categories:
  - 编码辅助工具
  - eclipse
date: 2018-11-11 23:22:00
---
其实maven项目部署到tomcat的方式很多，我从一开始的打war包到tomcat/webapps目录，到使用tomcat-maven插件，到直接使用servers部署，一路来走过很多弯路。

下面就一一介绍这几种部署方式：

1.打war包到tomcat/webapps目录

这种方式其实跟非maven项目没什么区别，就是打包的方式不同

![upload successful](/images/my_blog_210.png)

之后在target目录下会生成war包，复制到tomcat/webapps目录即完成部署。

 

2.使用tomcat-maven插件，在pom.xml的</dependencies>之后添加以下代码，并做相应修改

复制代码

复制代码

 1   <build>
 2     <finalName>guoguo-maven-web</finalName>
 3     <plugins>
 4       <plugin>
 5           <!-- 3个可用插件 -->
 6         <groupId>org.apache.tomcat.maven</groupId>
 7         <artifactId>tomcat6-maven-plugin</artifactId>                    <!-- 命令为tomcat6:redeploy -->
 8         <!-- <groupId>org.apache.tomcat.maven</groupId> -->
 9         <!-- <artifactId>tomcat7-maven-plugin</artifactId> -->    <!-- 命令为tomcat7:redeploy -->
10         <!-- <groupId>org.codehaus.mojo</groupId> -->
11         <!-- <artifactId>tomcat-maven-plugin</artifactId> -->        <!-- 命令为tomcat:redeploy -->
12         <!-- <version>2.2</version> -->
13       <configuration>
14           <!-- <url>http://localhost:8080/manager</url> -->            <!-- tomcat6部署管理路径 -->
15           <url>http://localhost:8080/manager/text</url>                <!-- tomcat7部署管理路径 -->
16           <username>admin</username>                                <!-- tomcat的管理员账号 -->
17           <password>admin</password>
18           <port>8080</port>
19           <path>/guoguo-maven-web</path>                            <!-- 部署路径 -->
20           <charset>UTF-8</charset>
21           <encoding>UTF-8</encoding>
22           <!-- 运行redeploy命令前，要能正常访问http://localhost:8080/manager-->
23       </configuration>
24       </plugin>
25   </plugins>
26   </build>
复制代码

复制代码

这样就配置好了tomcat maven插件


![upload successful](/images/my_blog_211.png)

运行redeploy命令前，要启动tomcat，并能正常访问http://localhost:8080/manager

通过项目右键 run as --> maven build... --> main --> goals 中填入 tomcat6:redeploy命令即可部署成功，这样部署有时会使tomcat出错，出错需要重启tomcat

 

3.直接使用servers部署

首先确保编译配置正常

![upload successful](/images/my_blog_212.png)


test下的目录编译到target/test-classes，其他编译到target/classes目录即可，其他一般默认不需要改变什么

然后进行部署的配置：



![upload successful](/images/my_blog_213.png)
配置好之后，通过右键servers中tomcat，add and remove...添加项目，重启tomcat即可

 

第一种我已经不用了，第二种适合直接部署到测试服务器，第三种适合本地的调试

 

附录：

tomcat管理员配置，在servers项目的tomcat-users.xml中添加如下配置，如果你是直接使用bin/startup.bat启动tomcat，则修改conf/tomcat-users.xml

----------tomcat6管理员配置----------
<role rolename="manager"/>
<user username="admin" password="admin" roles="manager"/>
----------tomcat6管理员配置----------

----------tomcat7管理员配置----------
<role rolename="manager-script" />
<role rolename="manager-gui"/>
<user username="admin" password="admin" roles="manager-gui,manager-script"/>
----------tomcat7管理员配置----------

