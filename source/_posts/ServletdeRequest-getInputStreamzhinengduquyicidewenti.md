title: Servlet的Request.getInputStream()只能读取一次问题
author: Leesin.Dong
tags:
  - servlet
  - interview
categories:
  - java
  - servlet
date: 2018-11-08 09:32:00
---
声明：本文为转载，请大家注重版权，原博客：https://blog.csdn.net/u014692324/article/details/40001653

 

这个星期公司的项目接口进行改造，公司的接口有的采用了WebService的方式，有的使用的是Http协议+Servlet的形式，对于WebService的形式还真没有接触过，闲着没事的时候学习一下，毕竟新接口都采用这种方式，也是一种趋势。在改造Http协议+Servlet的接口过程中对Http协议和Servlet又有了一个新的认识，特别是Http协议，以前脑子里乱乱的，知道有这个东西，知道它是做什么的，很模糊，做web开发的还是需要深刻理解Http协议的。在接口改造的过程中需要Servlet读取客户端提交过来的XML，所以用到了Request.getInputStream API，碰到的问题是以前的旧接口中写了两次Request.getInputStream()，最后一次读取的内容为空，虽然为空，但是没有影响接口的使用，所以一直放在这里没有人管，今天发现了研究了一下原因，也能把没用的代码删除掉。

为什么第二次在Servlet中获取InputStream的值为空，读取不到XML内容，这个问题要复习一下java中IO的知识了，在java中读取一个文件或者字符串的内容的代码大家都会写，下边是使用ByteArrayInputStream和ByteArrayOutputStream进行演示：

打印结果是：AAAAACCCCcCBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB

把一个String字符串的内容使用ByteArrayOutputStream读取出来，然后打印显示。这个代码没有什么问题，估计大家都能写出来，但是看一下下边添加一行代码之后的内容：

打印结果是：CCCCcCBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB

我在第8行添加了一行代码，这行代码可以把String生成的byte数组中读取5个字节的内容，这行代码会影响到后边第15行byteInputStream的读取结果，显然”AAAAA“在输出中没有了，这是为什么呢？我感觉需要查看java中ByteArrayInputStream的Read方法的实现源码，查看的结果其实可以总结一个句话，就是在InputStream读取的时候，会有一个pos指针，他指示每次读取之后下一次要读取的起始位置，在API文档中是这样解释的：（看过InputStream源码的都明白，read方法其实调用的都是带有三个参数的方法）


就是在每次读取的时候会更新pos的值，当你下次再来读取的时候是从pos的位置开始的，而不是从头开始，所以第二次获取String中的值的时候是不全的，”AAAAA“丢掉了，这也就导致了两次调用request.getInputStream，第二次的时候肯定获取不了值，因为第一次读取完成之后pos指针在末尾，下次再读取肯定读取不到，同request.getInputStream两次调用返回的对象是同一个对象。读取的是同一个Stream。

但是仔细查看API文档你会发现有这样一个方法：


就是可以把pos的指针的位置重置为起始位置，但是调用它是有条件的，不是所有的IO读取流都能调用这个方法.看一下有这个方法


这个方法可以判断是不是支持reset()方法的调用，我也没有试servlet的InputStream是否可以调用，直接查看了一下Servlet的源码。

request.getInputStream返回的其实ServletInputStream，查看一下源码你会发现：ServletInputStream继承了InputStream同时没有重写reset()方法，查看一下InputStream源码：

InputStream的reset()方法源码是这样的：


调用reset方法直接抛出异常，所以ServletInputStream是不能调用reset方法，这就导致了只能调用一次getInputStream()，第二次调用的时候没有办法获取到InputStream流中的原因。现在我们更改一下上边读取String字符串的例子：


打印结果是：AAAAACCCCcCBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB

在第8行添加一行代码，byteInputStream调用reset()方法，打印的结果回复了正常，我们看一下ByteInputStream中reset()的源码：

这一次没有抛出异常，而是把mark的值赋值给pos了，mark的值为0，所以在调用reset()方法之后可以从头开始读取。

进过查看JDK的源码分析为什么Servlet中读取InputSteam只能读取一次的问题，果断把没用的代码删除了，只有明白原理明白为什么，在写代码的时候才能很肯定的明白自己写的代码一定是正确的或者是错误的，不用再去运行一下试试。

以后闲着没事多看JDK的源码，看源码的确是一个很好的学习的过程，到此结束。


--------------------- 
作者：小T猴 
来源：CSDN 
原文：https://blog.csdn.net/u014692324/article/details/40001653?utm_source=copy 
版权声明：本文为博主原创文章，转载请附上博文链接！