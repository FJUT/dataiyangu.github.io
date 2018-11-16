title: 适配ibmmq 之类的mq可能会遇到的错误。
author: Leesin.Dong
tags:
  - 工作_cloudwise
  - mq
  - ''
categories:
  - 工作_cloudwise
  - 工作中涉及的业务与技术
date: 2018-11-02 11:40:00
---
![](images/blog_header5.jpg)
>在适配ibmmq的时候，烦的一个很大的错误就是将send和get放在了一个main函数中，里面的gret方法的this对象中试图进行端到端，这是在一个线程中进行，很明显只是表面实现了端到端，实质上并没有实现，应该经这两个方法放到两个线程中。

<!--more-->
在适配ibmmq的时候，烦的一个很大的错误就是将send和get放在了一个main函数中，里面的gret方法的this对象中试图进行端到端，这是在一个线程中进行，很明显只是表面实现了端到端，实质上并没有实现，应该经这两个方法放到两个线程中。