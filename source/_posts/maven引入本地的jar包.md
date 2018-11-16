title: maven引入本地的jar包
author: Leesin.Dong
tags:
  - maven
categories:
  - 编码辅助工具
  - maven
date: 2018-11-11 23:32:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/81119361

dependency 本地jar包
-----------------

> <dependency>  
>         <groupId>com.hope.cloud</groupId>  <!--自定义-->  
>         <artifactId>cloud</artifactId>    <!--自定义-->  
>         <version>1.0</version> <!--自定义-->  
>         <scope>system</scope> <!--system，类似provided，需要显式提供依赖的jar以后，Maven就不会在Repository中查找它-->  
>         <systemPath>${basedir}/lib/cloud.jar</systemPath> <!--项目根目录下的lib文件夹下-->  
>  </dependency>

<systemPath></systemPath>中的路径是绝对路径，这里用${basedir}代替项目的根目录

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()