title: split("\\s+") 和 split(" +") 有什么区别?
author: Leesin.Dong
tags:
  - java
  - interview
categories:
  - java
  - java基础
  - ''
date: 2018-11-12 11:37:00
---
原文地址：https://blog.csdn.net/it_taojingzhan/article/details/51968993
"hello world, this is Al".split("\\s+")



首先要明白split方法的参数含义：
split
public String[] split(String regex)根据给定的正则表达式的匹配来拆分此字符串。 

然后就要明确正则表达式的含义了：
\\s表示   空格,回车,换行等空白符,    
 +号表示一个或多个的意思,所以...