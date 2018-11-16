title: idaejiangxiangmudachengwarbao
author: Leesin.Dong
tags:
  - idea
categories:
  - 编码辅助工具
  - idea
  - ''
  - ''
date: 2018-11-11 22:36:00
---
原文链接：[https://blog.csdn.net/walk\_man\_3/article/details/79404911](https://blog.csdn.net/walk_man_3/article/details/79404911)

首先点击这里进入项目的配置页面


![upload successful](/images/my_blog_168.png)
在Artifacts栏里点击绿色加号，选择Web Applicant:Archive


![upload successful](/images/my_blog_169.png)
设置好名称和输出路径。Build on make选项可选可不选。如果选择了，那么每次在运行项目时都会生成war包。如果不勾选则可以在后续的步骤中手动生成war包。

如果下面显示.MF file not found in Accept.war，那么要继续进行配置。很多教程上都到了这一步就结束了，说“哎呀你们运行项目就可以去设置好的路径下找war包啦”。


![upload successful](/images/my_blog_170.png)

点击绿色加号选择Directory Content，选择你当前项目的WebRoot目录，之后保存就可以啦。


![upload successful](/images/my_blog_171.png)

![upload successful](/images/my_blog_172.png)

如果前面勾选了Build on make选项，可以在运行项目时生成war包。如果没有勾选，可以通过Build-->Build Artifacts来生成war包。


![upload successful](/images/my_blog_173.png)
 

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()