title: spring1.2低版本demo问题
author: Leesin.Dong
tags:
  - spring
  - interview
categories:
  - java
  - spring
date: 2018-11-11 21:55:00
---
1.spring1.2   的xml头文件是

<!DOCTYPE beans PUBLIC "-//SPRING//DTD BEAN//EN" " http://www.springframework.org/dtd/spring-beans.dtd"> 

<beans></beans>

高点的版本是<beans   http:***********></beans>

2.每次用maven写的时候，一定要把包导完整，目前看来springmvc需要七个 spring-***的包

3.spring 1.2是不支持注解的

 
--------------------- 
作者：Leesin Dong 
来源：CSDN 
原文：https://blog.csdn.net/dataiyangu/article/details/80916417 
版权声明：本文为博主原创文章，转载请附上博文链接！