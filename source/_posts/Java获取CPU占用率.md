title: Java获取CPU占用率
author: Leesin.Dong
tags:
  - apm
categories:
  - java
  - apm
date: 2018-11-12 11:42:00
---
原文链接：[https://www.jianshu.com/p/015cc4805e29](https://www.jianshu.com/p/015cc4805e29)

最近做一个Java性能统计的问题，需要统计当前进程占用CPU的情况，最开始使用Java MxBean来获取  
OperatingSystemMXBean osMxBean = ManagementFactory.getOperatingSystemMXBean();  
double cpu = osMxBean.getSystemLoadAverage();  
但是这个方法得到的操作系统统计的整个系统负载，不能较好的反应本进程的CPU占用情况，然后就是用一个新的方法，通过统计线程CPU占用时间来做统计，具体代码如下：

    package com.service.article; import java.lang.management.ManagementFactory;import java.lang.management.OperatingSystemMXBean;import java.lang.management.ThreadMXBean; public class CPUMonitorCalc {     private static CPUMonitorCalc instance = new CPUMonitorCalc();     private OperatingSystemMXBean osMxBean;    private ThreadMXBean threadBean;    private long preTime = System.nanoTime();    private long preUsedTime = 0;     private CPUMonitorCalc() {        osMxBean = ManagementFactory.getOperatingSystemMXBean();        threadBean = ManagementFactory.getThreadMXBean();    }     public static CPUMonitorCalc getInstance() {        return instance;    }     public double getProcessCpu() {        long totalTime = 0;        for (long id : threadBean.getAllThreadIds()) {            totalTime += threadBean.getThreadCpuTime(id);        }        long curtime = System.nanoTime();        long usedTime = totalTime - preUsedTime;        long totalPassedTime = curtime - preTime;        preTime = curtime;        preUsedTime = totalTime;        return (((double) usedTime) / totalPassedTime / osMxBean.getAvailableProcessors()) * 100;    }}

测试方法：

    package com.service.article; public class ArticleApplication {    public static void main(String[] args) throws Exception {        for (int i = 0; i < 2; i++) {            new Thread(() -> {                while (true) {                    long bac = 1000000;                    bac = bac >> 1;                }            }).start();;        }        while (true) {            Thread.sleep(5000);            System.out.println(CPUMonitorCalc.getInstance().getProcessCpu());        }            }}

测试结果跟操作系统统计出来的结果几乎一样

  
  
 

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()