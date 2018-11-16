title: Java类MemoryUsage查看虚拟机的使用情况
author: Leesin.Dong
tags:
  - java基础
categories:
  - java
  - jmx
  - ''
  - ''
date: 2018-11-11 10:20:00
---
原文地址:https://www.cnblogs.com/xubiao/p/5465473.html

Java类MemoryUsage，通过MemoryUsage可以查看Java 虚拟机的内存池的内存使用情况。

MemoryUsage类有四个值（均以字节为单位）：

Init：java虚拟机在启动的时候向操作系统请求的初始内存容量，java虚拟机在运行的过程中可能向操作系统请求更多的内存或将内存释放给操作系统，所以init的值是不确定的。

Used：当前已经使用的内存量。

Committed：表示保证java虚拟机能使用的内存量，已提交的内存量可以随时间而变化（增加或减少）。Java 虚拟机可能会将内存释放给系统，committed 可以小于 init。committed 将始终大于或等于 used。

Max：表示可以用于内存管理的最大内存量（以字节为单位）。可以不定义其值。如果定义了该值，最大内存量可能随时间而更改。已使用的内存量和已提 交的内存量将始终小于或等于 max（如果定义了 max）。如果内存分配试图增加满足以下条件的已使用内存将会失败：used > committed，即使 used <= max 仍然为 true（例如，当系统的虚拟内存不足时）。

直接看demo吧！

在实际开发中，一般可以用这个监控线程占用内存使用情况。

package javademo;

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryUsage;

public class MemoryUseTest {
    public String getMemoryUseInfo(){
         MemoryUsage mu = ManagementFactory.getMemoryMXBean().getHeapMemoryUsage();
         long getCommitted = mu.getCommitted();
         long getInit = mu.getInit();
         long getUsed = mu.getUsed();
         long max = mu.getMax();
        return ">>getCommitted(MB)=>" + getCommitted / 1000 / 1000 + "\n"
         +">>getInit(MB)=" + getInit / 1000 / 1000 + "\n"
         +">>getUsed(MB)=" + getUsed / 1000 / 1000 + "\n"
         +">>max(MB)=" + max / 1000 / 1000 + "\n";
      }
   public static void main(String[] args){
           System.out.println(new MemoryUseTest().getMemoryUseInfo());
    }
}

 
