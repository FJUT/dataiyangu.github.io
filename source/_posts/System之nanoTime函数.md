title: System之nanoTime函数
author: Leesin.Dong
tags:
  - Java基础
categories:
  - java
  - ''
  - Java基础
date: 2018-11-12 11:41:00
---
原文地址：https://blog.csdn.net/yumolan4325/article/details/79201766

1 System有一个静态的函数nanoTime函数，该函数是返回纳秒的。1毫秒=1纳秒*1000*1000
如：long time1=System.nanoTime();


2 System的nanoTime函数式返回纳秒，但是该函数只能用于计算时间差，不能用于计算距离现在的时间。因为是纳秒太小了。
如：long time1=System.nanoTime();
for(int i=0;i<200;i++){
System.out.print(".");
}
long time2=System.nanoTime();
System.out.println(time2-time1);


3 记住，System有一个返回纳秒的函数：nanoTime函数，该函数只用于计算时间差。


注意：系统中如果需要计算时间差的，那种很小很小的，可以通过System的nanoTime函数来计算时间差。该函数也只能用于计算时间差。