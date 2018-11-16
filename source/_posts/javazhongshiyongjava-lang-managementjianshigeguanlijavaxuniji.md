title: java使用java.lang.management监视和管理 Java 虚拟机
author: Leesin.Dong
tags:
  - java基础
  - ''
categories:
  - java
  - jmx
date: 2018-11-11 10:17:00
---
原文地址：[https://blog.csdn.net/zhongweijian/article/details/7619383](https://blog.csdn.net/zhongweijian/article/details/7619383)
-----------------------------------------------------------------------------------------------------------------------------

软件包 java.lang.management
------------------------

提供管理接口，用于监视和管理 Java 虚拟机以及 Java 虚拟机在其上运行的操作系统。

**接口摘要**

**[ClassLoadingMXBean](http://www.gznc.edu.cn/yxsz/jjglxy/book/Java_api/java/lang/management/ClassLoadingMXBean.html)**

用于 Java 虚拟机的类加载系统的管理接口。

**[CompilationMXBean](http://www.gznc.edu.cn/yxsz/jjglxy/book/Java_api/java/lang/management/CompilationMXBean.html)**

用于 Java 虚拟机的编译系统的管理接口。

**[GarbageCollectorMXBean](http://www.gznc.edu.cn/yxsz/jjglxy/book/Java_api/java/lang/management/GarbageCollectorMXBean.html)**

用于 Java 虚拟机的垃圾回收的管理接口。

**[MemoryManagerMXBean](http://www.gznc.edu.cn/yxsz/jjglxy/book/Java_api/java/lang/management/MemoryManagerMXBean.html)**

内存管理器的管理接口。

**[MemoryMXBean](http://www.gznc.edu.cn/yxsz/jjglxy/book/Java_api/java/lang/management/MemoryMXBean.html)**

Java 虚拟机的内存系统的管理接口。

**[MemoryPoolMXBean](http://www.gznc.edu.cn/yxsz/jjglxy/book/Java_api/java/lang/management/MemoryPoolMXBean.html)**

内存池的管理接口。

**[OperatingSystemMXBean](http://www.gznc.edu.cn/yxsz/jjglxy/book/Java_api/java/lang/management/OperatingSystemMXBean.html)**

用于操作系统的管理接口，Java 虚拟机在此操作系统上运行。

**[RuntimeMXBean](http://www.gznc.edu.cn/yxsz/jjglxy/book/Java_api/java/lang/management/RuntimeMXBean.html)**

Java 虚拟机的运行时系统的管理接口。

**[ThreadMXBean](http://www.gznc.edu.cn/yxsz/jjglxy/book/Java_api/java/lang/management/ThreadMXBean.html)**

Java 虚拟机线程系统的管理接口。

1.  `import java.lang.management.ClassLoadingMXBean;`
    
2.  `import java.lang.management.CompilationMXBean;`
    
3.  `import java.lang.management.GarbageCollectorMXBean;`
    
4.  `import java.lang.management.ManagementFactory;`
    
5.  `import java.lang.management.MemoryMXBean;`
    
6.  `import java.lang.management.MemoryManagerMXBean;`
    
7.  `import java.lang.management.MemoryPoolMXBean;`
    
8.  `import java.lang.management.MemoryUsage;`
    
9.  `import java.lang.management.OperatingSystemMXBean;`
    
10.  `import java.lang.management.RuntimeMXBean;`
    
11.  `import java.lang.management.ThreadMXBean;`
    
12.  `import java.util.List;`
    

14.  `import javax.management.MBeanServerConnection;`
    

16.  `public class MBeanDemo {`
    

18.  `public static void main(String[] args) {`
    

20.  `showJvmInfo();`
    
21.  `showMemoryInfo();`
    
22.  `showSystem();`
    
23.  `showClassLoading();`
    
24.  `showCompilation();`
    
25.  `showThread();`
    
26.  `showGarbageCollector();`
    
27.  `showMemoryManager();`
    
28.  `showMemoryPool();`
    
29.  `}`
    

31.  `/**`
    
32.  `* Java 虚拟机的运行时系统`
    
33.  `*/`
    
34.  `public static void showJvmInfo() {`
    
35.  `RuntimeMXBean mxbean = ManagementFactory.getRuntimeMXBean();`
    
36.  `String vendor = mxbean.getVmVendor();`
    
37.  `System.out.println("jvm name:" + mxbean.getVmName());`
    
38.  `System.out.println("jvm version:" + mxbean.getVmVersion());`
    
39.  `System.out.println("jvm bootClassPath:" + mxbean.getBootClassPath());`
    
40.  `System.out.println("jvm start time:" + mxbean.getStartTime());`
    
41.  `}`
    

43.  `/**`
    
44.  `* Java 虚拟机的内存系统`
    
45.  `*/`
    
46.  `public static void showMemoryInfo() {`
    
47.  `MemoryMXBean mem = ManagementFactory.getMemoryMXBean();`
    
48.  `MemoryUsage heap = mem.getHeapMemoryUsage();`
    
49.  `System.out.println("Heap committed:" + heap.getCommitted() + " init:" + heap.getInit() + " max:"`
    
50.  `+ heap.getMax() + " used:" + heap.getUsed());`
    
51.  `}`
    

53.  `/**`
    
54.  `* Java 虚拟机在其上运行的操作系统`
    
55.  `*/`
    
56.  `public static void showSystem() {`
    
57.  `OperatingSystemMXBean op = ManagementFactory.getOperatingSystemMXBean();`
    
58.  `System.out.println("Architecture: " + op.getArch());`
    
59.  `System.out.println("Processors: " + op.getAvailableProcessors());`
    
60.  `System.out.println("System name: " + op.getName());`
    
61.  `System.out.println("System version: " + op.getVersion());`
    
62.  `System.out.println("Last minute load: " + op.getSystemLoadAverage());`
    
63.  `}`
    

65.  `/**`
    
66.  `* Java 虚拟机的类加载系统`
    
67.  `*/`
    
68.  `public static void showClassLoading(){`
    
69.  `ClassLoadingMXBean cl = ManagementFactory.getClassLoadingMXBean();`
    
70.  `System.out.println("TotalLoadedClassCount: " + cl.getTotalLoadedClassCount());`
    
71.  `System.out.println("LoadedClassCount" + cl.getLoadedClassCount());`
    
72.  `System.out.println("UnloadedClassCount:" + cl.getUnloadedClassCount());`
    
73.  `}`
    

75.  `/**`
    
76.  `* Java 虚拟机的编译系统`
    
77.  `*/`
    
78.  `public static void showCompilation(){`
    
79.  `CompilationMXBean com = ManagementFactory.getCompilationMXBean();`
    
80.  `System.out.println("TotalCompilationTime:" + com.getTotalCompilationTime());`
    
81.  `System.out.println("name:" + com.getName());`
    
82.  `}`
    

84.  `/**`
    
85.  `* Java 虚拟机的线程系统`
    
86.  `*/`
    
87.  `public static void showThread(){`
    
88.  `ThreadMXBean thread = ManagementFactory.getThreadMXBean();`
    
89.  `System.out.println("ThreadCount" + thread.getThreadCount());`
    
90.  `System.out.println("AllThreadIds:" + thread.getAllThreadIds());`
    
91.  `System.out.println("CurrentThreadUserTime" + thread.getCurrentThreadUserTime());`
    
92.  `//......还有其他很多信息`
    
93.  `}`
    

95.  `/**`
    
96.  `* Java 虚拟机中的垃圾回收器。`
    
97.  `*/`
    
98.  `public static void showGarbageCollector(){`
    
99.  `List<GarbageCollectorMXBean> gc = ManagementFactory.getGarbageCollectorMXBeans();`
    
100.  `for(GarbageCollectorMXBean GarbageCollectorMXBean : gc){`
    
101.  `System.out.println("name:" + GarbageCollectorMXBean.getName());`
    
102.  `System.out.println("CollectionCount:" + GarbageCollectorMXBean.getCollectionCount());`
    
103.  `System.out.println("CollectionTime" + GarbageCollectorMXBean.getCollectionTime());`
    
104.  `}`
    
105.  `}`
    

107.  `/**`
    
108.  `* Java 虚拟机中的内存管理器`
    
109.  `*/`
    
110.  `public static void showMemoryManager(){`
    
111.  `List<MemoryManagerMXBean> mm = ManagementFactory.getMemoryManagerMXBeans();`
    
112.  `for(MemoryManagerMXBean eachmm: mm){`
    
113.  `System.out.println("name:" + eachmm.getName());`
    
114.  `System.out.println("MemoryPoolNames:" + eachmm.getMemoryPoolNames().toString());`
    
115.  `}`
    
116.  `}`
    

118.  `/**`
    
119.  `* Java 虚拟机中的内存池`
    
120.  `*/`
    
121.  `public static void showMemoryPool(){`
    
122.  `List<MemoryPoolMXBean> mps = ManagementFactory.getMemoryPoolMXBeans();`
    
123.  `for(MemoryPoolMXBean mp : mps){`
    
124.  `System.out.println("name:" + mp.getName());`
    
125.  `System.out.println("CollectionUsage:" + mp.getCollectionUsage());`
    
126.  `System.out.println("type:" + mp.getType());`
    
127.  `}`
    
128.  `}`
    

130.  `/**`
    
131.  `* 访问 MXBean 的方法的三种方法`
    
132.  `*/`
    
133.  `public static void visitMBean(){`
    

135.  `//第一种直接调用同一 Java 虚拟机内的 MXBean 中的方法。`
    
136.  `RuntimeMXBean mxbean = ManagementFactory.getRuntimeMXBean();`
    
137.  `String vendor1 = mxbean.getVmVendor();`
    
138.  `System.out.println("vendor1:" + vendor1);`
    

140.  `//第二种通过一个连接到正在运行的虚拟机的平台 MBeanServer 的 MBeanServerConnection。`
    
141.  `MBeanServerConnection mbs = null;`
    
142.  `// Connect to a running JVM (or itself) and get MBeanServerConnection`
    
143.  `// that has the JVM MXBeans registered in it`
    

145.  `/*`
    
146.  `try {`
    
147.  `// Assuming the RuntimeMXBean has been registered in mbs`
    
148.  `ObjectName oname = new ObjectName(ManagementFactory.RUNTIME_MXBEAN_NAME);`
    
149.  `String vendor2 = (String) mbs.getAttribute(oname, "VmVendor");`
    
150.  `System.out.println("vendor2:" + vendor2);`
    
151.  `} catch (Exception e) {`
    
152.  `e.printStackTrace();`
    
153.  `}`
    
154.  `*/`
    

156.  `//第三种使用 MXBean 代理`
    
157.  `// MBeanServerConnection mbs3 = null;`
    
158.  `// RuntimeMXBean proxy;`
    
159.  `// try {`
    
160.  `// proxy = ManagementFactory.newPlatformMXBeanProxy(mbs3,ManagementFactory.RUNTIME_MXBEAN_NAME,`
    
161.  `// RuntimeMXBean.class);`
    
162.  `// String vendor = proxy.getVmVendor();`
    
163.  `// } catch (IOException e) {`
    
164.  `// e.printStackTrace();`
    
165.  `// }`
    

167.  `}`
    

169.  `}`
    

  
输出：

1.  `jvm name:Java HotSpot(TM) Client VM`
    
2.  `jvm version:1.6.0-b105`
    
3.  `jvm bootClassPath:C:\Program Files\Java\jdk1.6.0\jre\lib\resources.jar;C:\Program Files\Java\jdk1.6.0\jre\lib\rt.jar;C:\Program Files\Java\jdk1.6.0\jre\lib\sunrsasign.jar;C:\Program Files\Java\jdk1.6.0\jre\lib\jsse.jar;C:\Program Files\Java\jdk1.6.0\jre\lib\jce.jar;C:\Program Files\Java\jdk1.6.0\jre\lib\charsets.jar;C:\Program Files\Java\jdk1.6.0\jre\classes`
    
4.  `jvm start time:1307440032774`
    
5.  `Heap committed:5177344 init:0 max:66650112 used:632640`
    
6.  `Architecture: x86`
    
7.  `Processors: 2`
    
8.  `System name: Windows XP`
    
9.  `System version: 5.1`
    
10.  `Last minute load: -1.0`
    
11.  `TotalLoadedClassCount: 381`
    
12.  `LoadedClassCount381`
    
13.  `UnloadedClassCount:0`
    
14.  `TotalCompilationTime:3`
    
15.  `name:HotSpot Client Compiler`
    
16.  `ThreadCount5`
    
17.  `AllThreadIds:[J@47b480`
    
18.  `CurrentThreadUserTime15625000`
    
19.  `name:Copy`
    
20.  `CollectionCount:0`
    
21.  `CollectionTime0`
    
22.  `name:MarkSweepCompact`
    
23.  `CollectionCount:0`
    
24.  `CollectionTime0`
    
25.  `name:CodeCacheManager`
    
26.  `MemoryPoolNames:[Ljava.lang.String;@1389e4`
    
27.  `name:Copy`
    
28.  `MemoryPoolNames:[Ljava.lang.String;@c20e24`
    
29.  `name:MarkSweepCompact`
    
30.  `MemoryPoolNames:[Ljava.lang.String;@2e7263`
    
31.  `name:Code Cache`
    
32.  `CollectionUsage:null`
    
33.  `type:Non-heap memory`
    
34.  `name:Eden Space`
    
35.  `CollectionUsage:init = 917504(896K) used = 0(0K) committed = 0(0K) max = 4194304(4096K)`
    
36.  `type:Heap memory`
    
37.  `name:Survivor Space`
    
38.  `CollectionUsage:init = 65536(64K) used = 0(0K) committed = 0(0K) max = 458752(448K)`
    
39.  `type:Heap memory`
    
40.  `name:Tenured Gen`
    
41.  `CollectionUsage:init = 4194304(4096K) used = 0(0K) committed = 0(0K) max = 61997056(60544K)`
    
42.  `type:Heap memory`
    
43.  `name:Perm Gen`
    
44.  `CollectionUsage:init = 12582912(12288K) used = 0(0K) committed = 0(0K) max = 67108864(65536K)`
    
45.  `type:Non-heap memory`
    
46.  `name:Perm Gen [shared-ro]`
    
47.  `CollectionUsage:init = 8388608(8192K) used = 0(0K) committed = 0(0K) max = 8388608(8192K)`
    
48.  `type:Non-heap memory`
    
49.  `name:Perm Gen [shared-rw]`
    
50.  `CollectionUsage:init = 12582912(12288K) used = 0(0K) committed = 0(0K) max = 12582912(12288K)`
    
51.  `type:Non-heap memory`
    

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()