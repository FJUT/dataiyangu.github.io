title: Linux下使用java获取cpu、内存使用率
author: Leesin.Dong
tags:
  - linux
  - java基础
  - apm
categories:
  - java
  - apm
  - ''
date: 2018-11-12 11:30:00
---
原文地址：[http://www.voidcn.com/article/p-yehrvmep-uo.html](http://www.voidcn.com/article/p-yehrvmep-uo.html)

思路如下：Linux系统中可以用top命令查看进程使用CPU和内存情况，通过Runtime类的exec()方法执行命令"top”，获取"top"的输出，从而得到CPU和内存的使用情况。

使用top命令获取系统信息： 

top -b -n -1 | sed -n '3p'(使用sed命令将top输出内容中的第三行打印出来)

%Cpu(s):  6.5 us,  2.2 sy,  0.7 ni, 87.0 id,  3.5 wa,  0.0 hi,  0.1 si,  0.0 st

top -b -n 1 | sed -n '3p' | awk '{print $8}'（将第三行第八列打印出来）

87.0

获取单个进程CPU,内存的占用率 

cmd脚本命令：top -b -n 1 -p $pid |  sed -n '$p'   
上面的$pid，就是进程的PID 

**Java Runtime类**

每个 Java 应用程序都有一个 `Runtime` 类实例，使应用程序能够与其运行的环境相连接。可以通过 `getRuntime` 方法获取当前运行时。 

应用程序不能创建自己的 Runtime 类实例。

示例程序（针对suse平台，如果是其他Linux，可能需要稍微修改程序）

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class MySystem {

	public static float getCpuUsage() {
		float cpuUsage = 0;
		float idleUsage = 0;
		Runtime rt = Runtime.getRuntime();
		String\[\] cmd = { "/bin/sh", "-c",
				"top -b -n 1 | sed -n '3p' | awk '{print $5}'" };<span style="color:#ff0000;"><strong>//如果使用的命令带有空格、重定向等，必须使用命令串（字符串数组）</strong></span>
		BufferedReader in = null;
		String str = "";
		try{
		Process p = rt.exec(cmd);
		in = new BufferedReader(new InputStreamReader(p.getInputStream()));
		str = in.readLine();
		}catch(Exception e){
			
		}
		str = str.substring(0,3);
		idleUsage = Float.parseFloat(str);
		cpuUsage = 100 - idleUsage;
		cpuUsage = FormatFloat.formatFloat(cpuUsage);
		System.out.println("CpuUsage:");
		System.out.println("	"+cpuUsage);
		return cpuUsage;
	}
	
	public static void getCPUMEMByPID(){
		Runtime rt = Runtime.getRuntime();
		String\[\] cmd = { "/bin/sh", "-c",
				"top -b -n 1 | sed -n '3p' | awk '{print $5}'" };
		BufferedReader in = null;
		String str = "";
		try{
		Process p = rt.exec(cmd);
		in = new BufferedReader(new InputStreamReader(p.getInputStream()));
		str = in.readLine();
		}catch(Exception e){
			
		}
	}
	
	public static float getMemUsage() {
		long memUsed = 0;
		long memTotal = 0;
		float memUsage = 0;
		Runtime rt = Runtime.getRuntime();
		String\[\] cmd = { "/bin/sh", "-c",
				"top -b -n 1 | sed -n '4p' | awk '{print $2 \\"\\t\\" $4}'" };
		BufferedReader in = null;
		String str = "";
		try{
			Process p = rt.exec(cmd);
			in = new BufferedReader(new InputStreamReader(p.getInputStream()));
			str = in.readLine();
		}catch(Exception e){
			
		}
		
		String\[\] mems = str.split("\\t");
		mems\[0\] = mems\[0\].substring(0,mems\[0\].length()-2);
		memTotal = Long.parseLong(mems\[0\]);
		mems\[1\] = mems\[1\].substring(0,mems\[1\].length()-2);
		memUsed = Long.parseLong(mems\[1\]);
		memUsage = (float) memUsed / memTotal * 100;
		memUsage = FormatFloat.formatFloat(memUsage);
		System.out.println("MemUsage:");
		System.out.println("	"+memUsage);
		return memUsage;
	}

}

  
获取cpu、内存的使用率还有其他方法

proc文件系统（http://www.cnblogs.com/yoleung/articles/1638922.html，http://blog.csdn.net/blue_jjw/article/details/8741000）

参考文章：http://zengjz88.iteye.com/blog/1595535 http://cumtyjp.blog.163.com/blog/static/7611480820093157512732/ http://blog.csdn.net/hemingwang0902/article/details/4054709

相关文章

*   1. [linux下获取内存使用率及cpu使用率](http://www.voidcn.com/article/p-hxwdmwmy-rs.html)
*   2. [linux下用java程序获取cpu和内存的使用率](http://www.voidcn.com/article/p-rnfykcbs-bhd.html)
*   3. [用java获得cpu，内存使用率](http://www.voidcn.com/article/p-vxhkiosg-bhx.html)
*   4. [java获取cpu使用率/内存使用率/硬盘的使用率](http://www.voidcn.com/article/p-udyfegxw-bcb.html)
*   5. [编程获取linux的CPU使用率内存占用率](http://www.voidcn.com/article/p-wyivtisq-bhq.html)
*   6. [linux下实现CPU使用率和内存使用率获取方法](http://www.voidcn.com/article/p-sytupuzg-sw.html)
*   7. [获取系统的CPU使用率、内存使用率](http://www.voidcn.com/article/p-sajstxzb-gg.html)
*   8. [LINUX下获取CPU和内存使用率](http://www.voidcn.com/article/p-druzskpg-wz.html)
*   9. [linux下获取cpu和内存使用率](http://www.voidcn.com/article/p-cbdpayoc-mx.html)
*   10. [VC++获取CPU使用率](http://www.voidcn.com/article/p-pfpoqxut-ds.html)
*   [更多相关文章...](http://www.voidcn.com/relative/p-yehrvmep-uo.html)

相关标签/搜索

*   [获取内存使用率](http://www.voidcn.com/tag/%E8%8E%B7%E5%8F%96%E5%86%85%E5%AD%98%E4%BD%BF%E7%94%A8%E7%8E%87) [获取cpu使用率](http://www.voidcn.com/tag/%E8%8E%B7%E5%8F%96cpu%E4%BD%BF%E7%94%A8%E7%8E%87) [cpu内存使用率](http://www.voidcn.com/tag/cpu%E5%86%85%E5%AD%98%E4%BD%BF%E7%94%A8%E7%8E%87) [内存CPU使用率](http://www.voidcn.com/tag/%E5%86%85%E5%AD%98CPU%E4%BD%BF%E7%94%A8%E7%8E%87) [CPU使用率](http://www.voidcn.com/tag/CPU%E4%BD%BF%E7%94%A8%E7%8E%87) [内存使用率](http://www.voidcn.com/tag/%E5%86%85%E5%AD%98%E4%BD%BF%E7%94%A8%E7%8E%87) [Perl CPU使用率](http://www.voidcn.com/tag/Perl+CPU%E4%BD%BF%E7%94%A8%E7%8E%87) [CPU使用率高](http://www.voidcn.com/tag/CPU%E4%BD%BF%E7%94%A8%E7%8E%87%E9%AB%98) [cpu使用率100](http://www.voidcn.com/tag/cpu%E4%BD%BF%E7%94%A8%E7%8E%87100)[Android cpu 使用率](http://www.voidcn.com/tag/Android+cpu+%E4%BD%BF%E7%94%A8%E7%8E%87) [Linux CPU使用率](http://www.voidcn.com/cata/1117316) [使用率](http://www.voidcn.com/cata/2888991) [使用](http://www.voidcn.com/cata/3066961) [使用](http://www.voidcn.com/cata/1881491) [使用](http://www.voidcn.com/cata/5876787) [使用](http://www.voidcn.com/cata/886257) [使用](http://www.voidcn.com/cata/1393135) [使用](http://www.voidcn.com/cata/6154170) [使用](http://www.voidcn.com/cata/907460) [linux使用](http://www.voidcn.com/cata/1351361) [Java](http://www.voidcn.com/column/java) [Linux](http://www.voidcn.com/column/linux) [cpu使用率 cpu time](http://www.voidcn.com/search/boitpm)[Qt 获取内存使用量](http://www.voidcn.com/search/vkovhw) [vs2008 cpu使用率很高](http://www.voidcn.com/search/phbiqk) [flume cpu file channel 使用率](http://www.voidcn.com/search/donmwj) [opentsdb查询cpu使用率](http://www.voidcn.com/search/cbrmev) [QEventLoop cpu使用率上升](http://www.voidcn.com/search/rscusr)[opencv imdecode CPU使用率](http://www.voidcn.com/search/ridwul) [anr cpu使用率过高](http://www.voidcn.com/search/tenjsj) [ANR sdcard cpu使用率](http://www.voidcn.com/search/ctkvmr) [android计算cpu使用率](http://www.voidcn.com/search/kmjwoj)

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()