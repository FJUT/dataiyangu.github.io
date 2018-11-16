title: maven clean package 报错 (请使用 -source 7 或更高版本以启用 try-with-resources)
author: Leesin.Dong
tags:
  - maven
categories:
  - 编码辅助工具
  - maven
date: 2018-11-11 23:33:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/81115743

**详细错误：**

\[ERROR\] /Users/leesin/eclipse-workspace/leesin-derby/src/main/java/com/cloudwise/leesin_derby/Start.java:\[38,12\] -source 1.5 中不支持 try-with-resources

\[ERROR\]   (请使用 -source 7 或更高版本以启用 try-with-resources)

**什么原因不清楚，解决方法如下：**

> <properties>
> 
>     <maven.compiler.source>1.7</maven.compiler.source>
> 
>     <maven.compiler.target>1.7</maven.compiler.target>
> 
> </properties>

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()