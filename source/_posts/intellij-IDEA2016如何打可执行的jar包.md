title: intellij IDEA2016如何打可执行的jar包
author: Leesin.Dong
tags:
  - idea
  - ''
categories:
  - 编码辅助工具
  - idea
date: 2018-11-11 22:38:00
---
尊重版权，原文地址：[https://blog.csdn.net/liufeilong_sean/article/details/75254875](https://blog.csdn.net/liufeilong_sean/article/details/75254875)

**操作步骤：**

1、在File -> project Structure (快捷键ctrl+shift+alt+s)　选择Artifacts，点击＋，选择jar，选择From modules with Dependencies.


![upload successful](/images/my_blog_174.png)


![upload successful](/images/my_blog_175.png)

选择执行的主类 main class：

选择“extract to the target jar”，即把引用第三方的jar文件，同时打包到jar里。

另外，网上有人说 配置“Directory for META-INF/MAINFEST.MF”，此项配置的缺省值是：D:\\ideaIU-2016.3.5\\test\\src，需要改成：D:\\ideaIU-2016.3.5\\test\\src\\main\\java\\resources（**反正不能放在原来默认的目录下面**），如果不这样修改，打成的jar包里没有包含META-INF/MAINFEST.MF文件，这个应该是个IDEA的BUG。但是本人用idea当前这个版本测试，打出的jar包是可以运行 没有问题的。(不清楚什么原因，也行是idea版本问题吧)

点击ok进入下一步

具体配置详细：

**Module**： 模块，选择需要打包的模块。如果程序没有分模块，那么只有一个可以选择的。  
**MainClass**：选择程序的入口类。  
**extract to the target JAR**：抽取到目标JAR。选择该项则会将所依赖的jar包全都打到一个jar文件中。  
**copy to the output directory and link via manifest**：将依赖的jar复制到输出目录并且使用manifest链接它们。  
**Direct for META-INF/MANIFEST.MF**： 如果上面选择了 "copy to ... "这一项，这里需要选择生成的manifest文件在哪个目录下。  
**Include tests**： 是否包含tests。 一般这里不选即可。  
 

2、此页直接点击apply-->ok即可**（name是jar包名字，output directory是jar包生成的地址，type是类型）**


![upload successful](/images/my_blog_176.png)

3、点击Build ---> Build Artifacts..  --->  Build 即可执行打包命令


![upload successful](/images/my_blog_177.png)

4、最后在此目录下找到打好的jar包。


![upload successful](/images/my_blog_178.png)

5、运行java -jar test.jar 命令即可。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()