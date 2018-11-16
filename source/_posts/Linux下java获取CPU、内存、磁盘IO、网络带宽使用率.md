title: Linux下java获取CPU、内存、磁盘IO、网络带宽使用率
author: Leesin.Dong
tags:
  - linux
  - java
categories:
  - java
  - apm
date: 2018-11-12 11:36:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">

原文地址：[https://www.cnblogs.com/gisblogs/p/3985393.html](https://www.cnblogs.com/gisblogs/p/3985393.html)

一、CPU

使用proc文件系统，"proc文件系统是一个伪文件系统，它只存在内存当中，而不占用外存空间。它以文件系统的方式为访问系统内核数据的操作提供接口。用户和应用程序可以通过proc得到系统的信息，并可以改变内核的某些参数。"

从/proc文件系统获取cpu使用情况： &nbsp; &nbsp;cat /proc/stat

在Linux的内核中，有一个全 局变量：Jiffies。 Jiffies代表时间。它的单位随硬件平台的不同而不同。系统里定义了一个常数HZ，代表每秒种最小时间间隔的数目。这样jiffies的单位就是 1/HZ。Intel平台jiffies的单位是1/100秒，这就是系统所能分辨的最小时间间隔了。每个CPU时间片，Jiffies都要加1。 CPU的利用率就是用执行用户态+系统态的Jiffies除以总的Jifffies来表示。

&nbsp;

在Linux系统中，CPU利用率的计算来源在/proc/stat文件，这个文件的头几行记录了每个CPU的用户态，系统态，空闲态等状态下的不同的Jiffies，常用的监控软件就是利用/proc/stat里面的这些数据来计算CPU的利用率的。

包含了所有CPU活动的信息，该文件中的所有值都是从系统启动开始累计到当前时刻。

![](http://blog.csdn.net/blue_jjw/article/details/8741000)

&nbsp;

[root@localhost LoadBalanceAlg]# cat /proc/stat

cpu &nbsp;71095 55513 76751 2545622893 303185 4160 47722 0

cpu0 3855 1134 4284 159122519 3882 0 717 0

cpu1 4236 770 5837 159113370 11291 6 865 0

cpu2 4934 1142 5048 158991321 130622 362 2939 0

cpu3 2320 14774 5177 159111528 1417 8 1138 0

cpu4 2694 405 3086 159071174 56284 235 2477 0

cpu5 1701 886 2560 159129034 1316 2 849 0

cpu6 2937 450 2863 159068480 59183 228 2198 0

cpu7 916 316 2426 159130057 1682 1 933 0

cpu8 2543 50 3509 159122844 4467 1 2911 0

cpu9 4761 827 6296 159118849 4490 8 1086 0

cpu10 8517 4236 9148 159102063 9791 173 2382 0

cpu11 22001 29737 14602 159065992 2583 6 1382 0

cpu12 3453 150 3075 159113794 5387 1162 9276 0

cpu13 2120 424 3403 159126526 2608 7 1199 0

cpu14 2637 65 2663 159107796 6704 1914 14503 0

cpu15 1462 142 2763 159127539 1470 39 2859 0

intr 1636622296 1591605869 4 0 4 4 0 0 0 1 0 0 0 4 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 952 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1005479 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 32763528 0 0 0 0 0 0 0 1697776 0 0 0 0 0 0 0 1556158 2 0 0 0 0 0 0 1598011 0 0 0 0 0 0 0 1287622 0 0 0 0 0 0 0 1522517 0 0 0 0 0 0 0 2467360 0 0 0 0 0 0 0 1116999 0 0 0 0 0 0 0 2 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

ctxt 431778894

btime 1363058934

processes 279394

procs_running 1

procs_blocked 0

&nbsp;

&nbsp;

输出解释：

CPU 以及CPU0、CPU1、CPU2、CPU3每行的每个参数意思（以第一行为例）为：

参数 解释

user (432661) 从系统启动开始累计到当前时刻，用户态的CPU时间（单位：jiffies） ，不包含 nice值为负进程。1jiffies=0.01秒

nice (13295) 从系统启动开始累计到当前时刻，nice值为负的进程所占用的CPU时间（单位：jiffies）&nbsp;

system (86656) 从系统启动开始累计到当前时刻，核心时间（单位：jiffies）&nbsp;

idle (422145968) 从系统启动开始累计到当前时刻，除硬盘IO等待时间以外其它等待时间（单位：jiffies）&nbsp;

iowait (171474) 从系统启动开始累计到当前时刻，硬盘IO等待时间（单位：jiffies） ，

irq (233) 从系统启动开始累计到当前时刻，硬中断时间（单位：jiffies）&nbsp;

softirq (5346) 从系统启动开始累计到当前时刻，软中断时间（单位：jiffies）&nbsp;

CPU时间=user+system+nice+idle+iowait+irq+softirq

“intr”这行给出中断的信息，第一个为自系统启动以来，发生的所有的中断的次数；然后每个数对应一个特定的中断自系统启动以来所发生的次数。

“ctxt”给出了自系统启动以来CPU发生的上下文交换的次数。

“btime”给出了从系统启动到现在为止的时间，单位为秒。

“processes (total_forks) 自系统启动以来所创建的任务的个数目。

“procs_running”：当前运行队列的任务的数目。

“procs_blocked”：当前被阻塞的任务的数目。

&nbsp;

那么CPU利用率的计算方法：可以使用取两个采样点，计算其差值的办法。

CPU利用率 = 1- (idle2-idle1)/(cpu2-cpu1)

&nbsp;

参考：[linux下如何获取cpu的利用率](http://www.cnblogs.com/yoleung/articles/1638922.html)

&nbsp;

java中调用Linux的shell命令使用Process和Runtime

jdk1.6 API doc:

<pre>public class **Runtime**extends [Object](http://blog.csdn.net/blue_jjw/article/details/8741000)</pre>

<pre>
&nbsp;</pre>

每个 Java 应用程序都有一个&nbsp;`Runtime`&nbsp;类实例，使应用程序能够与其运行的环境相连接。可以通过`getRuntime`&nbsp;方法获取当前运行时。

应用程序不能创建自己的 Runtime 类实例。&nbsp;

<pre>public abstract class **Process**extends [Object](http://blog.csdn.net/blue_jjw/article/details/8741000)</pre>

<pre>
&nbsp;</pre>

[`ProcessBuilder.start()`](http://blog.csdn.net/blue_jjw/article/details/8741000)&nbsp;和[`Runtime.exec`](http://blog.csdn.net/blue_jjw/article/details/8741000)&nbsp;方法创建一个本机进程，并返回&nbsp;`Process`&nbsp;子类的一个实例，该实例可用来控制进程并获得相关信息。

&nbsp;

代码：

<a target="_blank">![复制代码](https://common.cnblogs.com/images/copycode.gif)</a>

<pre>&lt;span style="font-size:14px;"&gt;import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.log4j.Logger;

/**
 * 采集CPU使用率
 */
public class CpuUsage extends ResourceUsage {

    private static Logger log = Logger.getLogger(CpuUsage.class);
    private static CpuUsage INSTANCE = new CpuUsage();

    private CpuUsage(){

    }

    public static CpuUsage getInstance(){
        return INSTANCE;
    }

    /**
     * Purpose:采集CPU使用率
     * @param args
     * @return float,CPU使用率,小于1
     */
    @Override
    public float get() {
        log.info("开始收集cpu使用率");
        float cpuUsage = 0;
        Process pro1,pro2;
        Runtime r = Runtime.getRuntime();
        try {
            String command = "cat /proc/stat";
            //第一次采集CPU时间
            long startTime = System.currentTimeMillis();
            pro1 = r.exec(command);
            BufferedReader in1 = new BufferedReader(new InputStreamReader(pro1.getInputStream()));
            String line = null;
            long idleCpuTime1 = 0, totalCpuTime1 = 0;    //分别为系统启动后空闲的CPU时间和总的CPU时间
            while((line=in1.readLine()) != null){    
                if(line.startsWith("cpu")){
                    line = line.trim();
                    log.info(line);
                    String[] temp = line.split("\\s+"); 
                    idleCpuTime1 = Long.parseLong(temp[4]);
                    for(String s : temp){
                        if(!s.equals("cpu")){
                            totalCpuTime1 += Long.parseLong(s);
                        }
                    }    
                    log.info("IdleCpuTime: " + idleCpuTime1 + ", " + "TotalCpuTime" + totalCpuTime1);
                    break;
                }                        
            }    
            in1.close();
            pro1.destroy();
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                StringWriter sw = new StringWriter();
                e.printStackTrace(new PrintWriter(sw));
                log.error("CpuUsage休眠时发生InterruptedException. " + e.getMessage());
                log.error(sw.toString());
            }
            //第二次采集CPU时间
            long endTime = System.currentTimeMillis();
            pro2 = r.exec(command);
            BufferedReader in2 = new BufferedReader(new InputStreamReader(pro2.getInputStream()));
            long idleCpuTime2 = 0, totalCpuTime2 = 0;    //分别为系统启动后空闲的CPU时间和总的CPU时间
            while((line=in2.readLine()) != null){    
                if(line.startsWith("cpu")){
                    line = line.trim();
                    log.info(line);
                    String[] temp = line.split("\\s+"); 
                    idleCpuTime2 = Long.parseLong(temp[4]);
                    for(String s : temp){
                        if(!s.equals("cpu")){
                            totalCpuTime2 += Long.parseLong(s);
                        }
                    }
                    log.info("IdleCpuTime: " + idleCpuTime2 + ", " + "TotalCpuTime" + totalCpuTime2);
                    break;    
                }                                
            }
            if(idleCpuTime1 != 0 &amp;&amp; totalCpuTime1 !=0 &amp;&amp; idleCpuTime2 != 0 &amp;&amp; totalCpuTime2 !=0){
                cpuUsage = 1 - (float)(idleCpuTime2 - idleCpuTime1)/(float)(totalCpuTime2 - totalCpuTime1);
                log.info("本节点CPU使用率为: " + cpuUsage);
            }                
            in2.close();
            pro2.destroy();
        } catch (IOException e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            log.error("CpuUsage发生InstantiationException. " + e.getMessage());
            log.error(sw.toString());
        }    
        return cpuUsage;
    }

    /**
     * @param args
     * @throws InterruptedException 
     */
    public static void main(String[] args) throws InterruptedException {
        while(true){
            System.out.println(CpuUsage.getInstance().get());
            Thread.sleep(5000);        
        }
    }
}&lt;/span&gt;</pre>

<a target="_blank">![复制代码](https://common.cnblogs.com/images/copycode.gif)</a>

二、内存

&nbsp;

从/proc文件系统获取内存使用情况： &nbsp; cat /proc/meminfo

&nbsp;

![](http://blog.csdn.net/blue_jjw/article/details/8741000)

MemTotal: &nbsp; &nbsp; &nbsp;8167348 kB

MemFree: &nbsp; &nbsp; &nbsp; 4109964 kB

Buffers: &nbsp; &nbsp; &nbsp; &nbsp; 35728 kB

Cached: &nbsp; &nbsp; &nbsp; &nbsp;1877960 kB

SwapCached: &nbsp; &nbsp; 159088 kB

Active: &nbsp; &nbsp; &nbsp; &nbsp;3184176 kB

Inactive: &nbsp; &nbsp; &nbsp; 672132 kB

HighTotal: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 0 kB

HighFree: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0 kB

LowTotal: &nbsp; &nbsp; &nbsp;8167348 kB

LowFree: &nbsp; &nbsp; &nbsp; 4109964 kB

SwapTotal: &nbsp; &nbsp;26738680 kB

SwapFree: &nbsp; &nbsp; 26373632 kB

Dirty: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;40 kB

Writeback: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 0 kB

AnonPages: &nbsp; &nbsp; 1872416 kB

Mapped: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;24928 kB

Slab: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 107804 kB

PageTables: &nbsp; &nbsp; &nbsp;34612 kB

NFS_Unstable: &nbsp; &nbsp; &nbsp; &nbsp;0 kB

Bounce: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0 kB

CommitLimit: &nbsp;30822352 kB

Committed_AS: &nbsp;5386080 kB

VmallocTotal: 34359738367 kB

VmallocUsed: &nbsp; &nbsp;276892 kB

VmallocChunk: 34359460287 kB

HugePages_Total: &nbsp; &nbsp; 0

HugePages_Free: &nbsp; &nbsp; &nbsp;0

HugePages_Rsvd: &nbsp; &nbsp; &nbsp;0

Hugepagesize: &nbsp; &nbsp; 2048 kB

&nbsp;

内存使用率 = 1 -&nbsp;MemFree/MemTotal

&nbsp;

代码：

&nbsp;

<a target="_blank">![复制代码](https://common.cnblogs.com/images/copycode.gif)</a>

<pre>&lt;span style="font-size:14px;"&gt;import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.log4j.Logger;

/**
 * 采集内存使用率
 */
public class MemUsage extends ResourceUsage{

    private static Logger log = Logger.getLogger(MemUsage.class);
    private static MemUsage INSTANCE = new MemUsage();

    private MemUsage(){

    }

    public static MemUsage getInstance(){
        return INSTANCE;
    }

    /**
     * Purpose:采集内存使用率
     * @param args
     * @return float,内存使用率,小于1
     */
    @Override
    public float get() {
        log.info("开始收集memory使用率");
        float memUsage = 0.0f;
        Process pro = null;
        Runtime r = Runtime.getRuntime();
        try {
            String command = "cat /proc/meminfo";
            pro = r.exec(command);
            BufferedReader in = new BufferedReader(new InputStreamReader(pro.getInputStream()));
            String line = null;
            int count = 0;
            long totalMem = 0, freeMem = 0;
             while((line=in.readLine()) != null){    
                log.info(line);    
                String[] memInfo = line.split("\\s+");
                if(memInfo[0].startsWith("MemTotal")){
                    totalMem = Long.parseLong(memInfo[1]);
                }
                if(memInfo[0].startsWith("MemFree")){
                    freeMem = Long.parseLong(memInfo[1]);
                }
                memUsage = 1- (float)freeMem/(float)totalMem;
                log.info("本节点内存使用率为: " + memUsage);    
                if(++count == 2){
                    break;
                }                
            }
            in.close();
            pro.destroy();
        } catch (IOException e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            log.error("MemUsage发生InstantiationException. " + e.getMessage());
            log.error(sw.toString());
        }    
        return memUsage;
    }

    /**
     * @param args
     * @throws InterruptedException 
     */
    public static void main(String[] args) throws InterruptedException {
        while(true){
            System.out.println(MemUsage.getInstance().get());
            Thread.sleep(5000);
        }
    }
}&lt;/span&gt;</pre>

<a target="_blank">![复制代码](https://common.cnblogs.com/images/copycode.gif)</a>

三、磁盘IO

&nbsp;

使用iostat：

&nbsp;

![](http://blog.csdn.net/blue_jjw/article/details/8741000)

[root@localhost LoadBalanceAlg]# iostat -d -x

Linux 2.6.18-238.el5 (localhost.localdomain) &nbsp; &nbsp;2013Äê03ÔÂ30ÈÕ

Device: &nbsp; &nbsp; &nbsp; &nbsp; rrqm/s &nbsp; wrqm/s &nbsp; r/s &nbsp; w/s &nbsp; rsec/s &nbsp; wsec/s avgrq-sz avgqu-sz &nbsp; await &nbsp;svctm &nbsp;%util

sda &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 0.09 &nbsp; &nbsp; 0.28 &nbsp;0.02 &nbsp;0.03 &nbsp; &nbsp; 0.92 &nbsp; &nbsp; 2.57 &nbsp; &nbsp;60.71 &nbsp; &nbsp; 0.00 &nbsp; 63.28 &nbsp; 3.33 &nbsp; 0.02

sda1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0.00 &nbsp; &nbsp; 0.00 &nbsp;0.00 &nbsp;0.00 &nbsp; &nbsp; 0.00 &nbsp; &nbsp; 0.00 &nbsp; &nbsp;24.40 &nbsp; &nbsp; 0.00 &nbsp; &nbsp;2.59 &nbsp; 2.53 &nbsp; 0.00

sda2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0.09 &nbsp; &nbsp; 0.28 &nbsp;0.02 &nbsp;0.03 &nbsp; &nbsp; 0.92 &nbsp; &nbsp; 2.57 &nbsp; &nbsp;60.76 &nbsp; &nbsp; 0.00 &nbsp; 63.36 &nbsp; 3.34 &nbsp; 0.02

sdb &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 0.03 &nbsp; &nbsp; 0.72 &nbsp;0.04 &nbsp;0.53 &nbsp; &nbsp; 2.57 &nbsp; &nbsp;10.04 &nbsp; &nbsp;22.09 &nbsp; &nbsp; 0.01 &nbsp; 17.36 &nbsp; 5.12 &nbsp; 0.29

sdb1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0.03 &nbsp; &nbsp; 0.72 &nbsp;0.04 &nbsp;0.53 &nbsp; &nbsp; 2.57 &nbsp; &nbsp;10.04 &nbsp; &nbsp;22.09 &nbsp; &nbsp; 0.01 &nbsp; 17.36 &nbsp; 5.12 &nbsp; 0.29

dm-0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0.00 &nbsp; &nbsp; 0.00 &nbsp;0.07 &nbsp;1.30 &nbsp; &nbsp; 2.63 &nbsp; &nbsp;10.40 &nbsp; &nbsp; 9.53 &nbsp; &nbsp; 0.03 &nbsp; 24.95 &nbsp; 2.15 &nbsp; 0.29

dm-1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0.00 &nbsp; &nbsp; 0.00 &nbsp;0.11 &nbsp;0.28 &nbsp; &nbsp; 0.86 &nbsp; &nbsp; 2.21 &nbsp; &nbsp; 8.00 &nbsp; &nbsp; 0.12 &nbsp;300.47 &nbsp; 0.16 &nbsp; 0.01

&nbsp;

&nbsp;

man iostat:

-d &nbsp; &nbsp; The -d option is exclusive of the -c option and displays only the device utilization report.

-x &nbsp; &nbsp; Display extended statistics. &nbsp;This option is exclusive of the -p and -n, and works with post 2.5 kernels since it needs /proc/diskstats file or a mounted sysfs to get&nbsp;the statistics. This option may also work with older kernels (e.g. 2.4) only if extended statistics are available in /proc/partitions (the kernel needs to be &nbsp;patched&nbsp;for that).

%util&nbsp;Percentage of CPU time during which I/O requests were issued to the device (bandwidth utilization for the device). Device saturation occurs when this value &nbsp;is&nbsp;close to 100%.

一秒中有百分之多少的时间用于I/O操作，或者说一秒中有多少时间I/O队列是非空的。如果%util接近100%,表明I/O请求太多,I/O系统已经满负荷，磁盘可能存在瓶颈,一般%util大于70%,I/O压力就比较大，读取速度有较多的wait。&nbsp;

参考：[linux 查看磁盘IO状态操作指南](http://www.jb51.net/LINUXjishu/65741.html)

&nbsp;

代码：

&nbsp;

<a target="_blank">![复制代码](https://common.cnblogs.com/images/copycode.gif)</a>

<pre>&lt;span style="font-size:14px;"&gt;import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.log4j.Logger;

/**
 * 采集磁盘IO使用率
 */
public class IoUsage extends ResourceUsage{

    private static Logger log = Logger.getLogger(IoUsage.class);
    private static IoUsage INSTANCE = new IoUsage();

    private IoUsage(){

    }

    public static IoUsage getInstance(){
        return INSTANCE;
    }

    /**
     * @Purpose:采集磁盘IO使用率
     * @param args
     * @return float,磁盘IO使用率,小于1
     */
    @Override
    public float get() {
        log.info("开始收集磁盘IO使用率");
        float ioUsage = 0.0f;
        Process pro = null;
        Runtime r = Runtime.getRuntime();
        try {
            String command = "iostat -d -x";
            pro = r.exec(command);
            BufferedReader in = new BufferedReader(new InputStreamReader(pro.getInputStream()));
            String line = null;
            int count =  0;
            while((line=in.readLine()) != null){        
                if(++count &gt;= 4){
//                    log.info(line);
                    String[] temp = line.split("\\s+");
                    if(temp.length &gt; 1){
                        float util =  Float.parseFloat(temp[temp.length-1]);
                        ioUsage = (ioUsage&gt;util)?ioUsage:util;
                    }
                }
            }
            if(ioUsage &gt; 0){
                log.info("本节点磁盘IO使用率为: " + ioUsage);    
                ioUsage /= 100; 
            }            
            in.close();
            pro.destroy();
        } catch (IOException e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            log.error("IoUsage发生InstantiationException. " + e.getMessage());
            log.error(sw.toString());
        }    
        return ioUsage;
    }

    /**
     * @param args
     * @throws InterruptedException 
     */
    public static void main(String[] args) throws InterruptedException {
        while(true){
            System.out.println(IoUsage.getInstance().get());
            Thread.sleep(5000);
        }
    }

}&lt;/span&gt;</pre>

<a target="_blank">![复制代码](https://common.cnblogs.com/images/copycode.gif)</a>

&nbsp;

&nbsp;

四、网络带宽

&nbsp;

从/proc文件系统获取网络使用情况： &nbsp; cat /proc/net/dev

&nbsp;

[root@localhost LoadBalanceAlg]# cat /proc/net/dev

Inter-| &nbsp; Receive &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| &nbsp;Transmit

&nbsp;face |bytes &nbsp; &nbsp;packets errs drop fifo frame compressed multicast|bytes &nbsp; &nbsp;packets errs drop fifo colls carrier compressed

&nbsp; &nbsp; lo:1402131426 15109136 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0 &nbsp; &nbsp; &nbsp; &nbsp; 0 1402131426 15109136 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0

&nbsp; eth0:4546168400 42535979 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0 &nbsp; &nbsp; &nbsp; &nbsp;44 5610190492 8943999 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0

&nbsp; eth1: &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0 &nbsp; &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp;0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0

&nbsp; eth3: &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0 &nbsp; &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp;0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0

__tmp945063435: &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0 &nbsp; &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp;0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0

&nbsp;bond0:4546168400 42535979 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0 &nbsp; &nbsp; &nbsp; &nbsp;44 5610190492 8943999 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp;0 &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0

统计一段时间内Receive和Tramsmit的bytes数的变化，即可获得网口传输速率，再除以网口的带宽就得到带宽的使用率

&nbsp;

代码：

<a target="_blank">![复制代码](https://common.cnblogs.com/images/copycode.gif)</a>

<pre>&lt;span style="font-size:14px;"&gt;import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.log4j.Logger;

/**
 * 采集网络带宽使用率
 */
public class NetUsage extends ResourceUsage {

    private static Logger log = Logger.getLogger(NetUsage.class);
    private static NetUsage INSTANCE = new NetUsage();
    private final static float TotalBandwidth = 1000;    //网口带宽,Mbps

    private NetUsage(){

    }

    public static NetUsage getInstance(){
        return INSTANCE;
    }

    /**
     * @Purpose:采集网络带宽使用率
     * @param args
     * @return float,网络带宽使用率,小于1
     */
    @Override
    public float get() {
        log.info("开始收集网络带宽使用率");
        float netUsage = 0.0f;
        Process pro1,pro2;
        Runtime r = Runtime.getRuntime();
        try {
            String command = "cat /proc/net/dev";
            //第一次采集流量数据
            long startTime = System.currentTimeMillis();
            pro1 = r.exec(command);
            BufferedReader in1 = new BufferedReader(new InputStreamReader(pro1.getInputStream()));
            String line = null;
            long inSize1 = 0, outSize1 = 0;
            while((line=in1.readLine()) != null){    
                line = line.trim();
                if(line.startsWith("eth0")){
                    log.info(line);
                    String[] temp = line.split("\\s+"); 
                    inSize1 = Long.parseLong(temp[0].substring(5));    //Receive bytes,单位为Byte
                    outSize1 = Long.parseLong(temp[8]);                //Transmit bytes,单位为Byte
                    break;
                }                
            }    
            in1.close();
            pro1.destroy();
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                StringWriter sw = new StringWriter();
                e.printStackTrace(new PrintWriter(sw));
                log.error("NetUsage休眠时发生InterruptedException. " + e.getMessage());
                log.error(sw.toString());
            }
            //第二次采集流量数据
            long endTime = System.currentTimeMillis();
            pro2 = r.exec(command);
            BufferedReader in2 = new BufferedReader(new InputStreamReader(pro2.getInputStream()));
            long inSize2 = 0 ,outSize2 = 0;
            while((line=in2.readLine()) != null){    
                line = line.trim();
                if(line.startsWith("eth0")){
                    log.info(line);
                    String[] temp = line.split("\\s+"); 
                    inSize2 = Long.parseLong(temp[0].substring(5));
                    outSize2 = Long.parseLong(temp[8]);
                    break;
                }                
            }
            if(inSize1 != 0 &amp;&amp; outSize1 !=0 &amp;&amp; inSize2 != 0 &amp;&amp; outSize2 !=0){
                float interval = (float)(endTime - startTime)/1000;
                //网口传输速度,单位为bps
                float curRate = (float)(inSize2 - inSize1 + outSize2 - outSize1)*8/(1000000*interval);
                netUsage = curRate/TotalBandwidth;
                log.info("本节点网口速度为: " + curRate + "Mbps");
                log.info("本节点网络带宽使用率为: " + netUsage);
            }                
            in2.close();
            pro2.destroy();
        } catch (IOException e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            log.error("NetUsage发生InstantiationException. " + e.getMessage());
            log.error(sw.toString());
        }    
        return netUsage;
    }

    /**
     * @param args
     * @throws InterruptedException 
     */
    public static void main(String[] args) throws InterruptedException {
        while(true){
            System.out.println(NetUsage.getInstance().get());
            Thread.sleep(5000);
        }
    }
}&lt;/span&gt;</pre>            </div>
                </div>

					<script>
						(function(){
							function setArticleH(btnReadmore,posi){
								var winH = $(window).height();
								var articleBox = $("div.article_content");
								var artH = articleBox.height();
								if(artH > winH*posi){
									articleBox.css({
										'height':winH*posi+'px',
										'overflow':'hidden'
									})
									btnReadmore.click(function(){
										articleBox.removeAttr("style");
										$(this).parent().remove();
									})
								}else{
									btnReadmore.parent().remove();
								}
							}
							var btnReadmore = $("#btn-readmore");
							if(btnReadmore.length>0){
								if(currentUserName){
									setArticleH(btnReadmore,3);
								}else{
									setArticleH(btnReadmore,1.2);
								}
							}
						})()
					</script>
					</article>