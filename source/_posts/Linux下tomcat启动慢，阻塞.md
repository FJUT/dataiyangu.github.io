title: Linux下tomcat启动慢，阻塞
author: Leesin.Dong
tags:
  - linux
  - tomcat
categories:
  - linux
  - linux命令
date: 2018-11-11 23:40:00
---
声明：本文为转载，请尊重版权，原文地址：

https://www.cnblogs.com/songjinju/p/7505564.html

这两天在linux部署完tomcat以后，发现每次启动都非常的慢，没有部署任何项目，虽然我启动了3个tomcat，但是也不至于10几分钟才启动。

于是查了下，发现是和 【JVM上的随机数与熵池策略】有关系。

解决办法：

　　1、在tomcat的bin/catalina.sh中加入这么一行：JAVA_OPTS="-Djava.security.egd=file:/dev/./urandom" 即可。　　（亲测可用！）

　　2、jvm环境：打开$JAVA_PATH/jre/lib/security/java.security这个文件，找到下面的内容：

　　　　securerandom.source=file:/dev/urandom
　　　　替换成

　　　　securerandom.source=file:/dev/./urandom
以上2个方法，其中一个应该都是可以，第二个我没试过应该也是可以的。
我试了第一个，是没问题的，启动速度提升了估计有100倍。
 
PS:关于这个问题的更多解释，可以参考 http://ifeve.com/jvm-random-and-entropy-source/ 这篇文章
