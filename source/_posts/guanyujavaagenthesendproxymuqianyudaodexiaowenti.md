title: 关于javaagent和sendproxy目前遇到的小问题
author: Leesin.Dong
tags:
  - 工作_cloudwise
categories:
  - 工作_cloudwise
  - 工作中涉及的业务与技术
date: 2018-11-07 16:42:00
---
1   sendproxy 和javaagent的key是对应的，不能用qa的sendproxy和线上的javaagent来匹配。

2  sendproxy进程在远程的虚拟机中只能存在一个。