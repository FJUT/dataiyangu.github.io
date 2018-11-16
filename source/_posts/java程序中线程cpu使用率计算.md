title: java程序中线程cpu使用率计算
author: Leesin.Dong
tags:
  - apm
categories:
  - java
  - apm
date: 2018-11-12 11:41:00
---
原文地址：[https://www.imooc.com/article/27374](https://www.imooc.com/article/27374)

最近确实遇到题目上的刚需，也是花了一段时间来思考这个问题。

**cpu使用率如何计算**

    计算使用率在上学那会就经常算，不过往往计算的是整个程序执行的时间段，现在突然要实时计算还真有点无奈，时间段如何选择是个问题。最后根据现有的程序做参考，那就是Linux的top命令源码。

    top命令还是c程序，加之开源，我直接采取相同的时间段和计算方法。

    先说说top是如何计算的，首先是从/proc/stat下读取cpu的使用时间，其次就是/proc/pid/stat获取进程的cpu时间，/proc/pid/task里获取这个进程里每个线程的id，然后继续从stat里查找cpu的使用时间。

    线程cpu的利用率=线程运行的时间差（包括用户态+核心态+。。。。）/cpu运行时间之差（用户态+核心态+io+.....）

    每隔3秒查询计算一次。

**java实现过程**

    既然要获取cpu信息，我查询了很多方法，最终确定，java本身是做不到的（windows可没有/proc这样的文件给你查看），要借助c/c++来处理，原本我调用函数都查好了，就差写jni了，结果有人给我推荐了sigar。是就是基于本地库实现的，不过他已经把本地库这些都准备好了，基本每个平台都有，这样提供了很大的方便。接下来就是对这个库的使用过程了。

    根据给出的参考例子和相关api文档。我们导入Jar包后需要继承SigarCommandBase这个类，我们一切的操作基本依靠父类的成员变量sigar

        Cpu[] cpus = this.sigar.getCpuList();//获取cpu信息    long time = 0L;    for (int i = 0; i < cpus.length; i++) {      time += cpus[i].getTotal();    }    return time;

    先获取到cpu的信息，然后直接通过getTotal来得到当前cpu的运行时间，你可以用cpus获取到cpu在核心态运行时间等等，我最后尝试加起来和getTotal小有出入，差别不大，所以采用getTotal就可以了，这样就能获取cpu运行时间，第二次采集时也就知道时间差了。

    接下来就是获取java线程信息这些了，依然还是算差值。

       ThreadMXBean mx = ManagementFactory.getThreadMXBean();    long[] threadIds = mx.getAllThreadIds();    ThreadInfo[] threadInfos = mx.getThreadInfo(threadIds);

    通过上面的代码就可以获取到现在进程里每个线程的信息。

      long time = mx.getThreadCpuTime(threadId);

    再通过getThreadCpuTime方法根据tid来获取到该线程在cpu上运行总时间，java文档上是这么写的：返回指定 ID 的线程的总 CPU 时间（以毫微秒为单位）。这里的单位是毫微秒的单位，要注意转换。

    我保存线程信息是用一个map，主键是线程id，这里大家就需要稍微注意一下，我更建议是线程id+线程名字的手段来做主键，tid是标识唯一一个线程，我们假设a线程的id是34，如果a线程死掉之后，b线程启动，jvm会不会把34号标识给b线程呢，这里我不敢肯定，我感觉是会的。在linux的文件描述符也是唯一标识一个文件的，但是你一个文件关闭后，再开一个，肯定会占用到相同的描述符。所以我感觉线程的id也是如此，id是标识了唯一的线程，但是线程死掉，重新分配的话，这样也代码不必要的困扰。

    剩下的就是算差值来计算使用率了，记得把动态库的位置加上，-Djava.library.path="位置"，windows下可以加到path路径下，linux可以指定LD\_LIBARARY\_PATH。

  
 

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()