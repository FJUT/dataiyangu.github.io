title: idea debug模式查看对象的值不显示
author: Leesin.Dong
tags:
  - idea
  - debug
categories:
  - 编码辅助工具
  - idea
date: 2018-11-11 22:44:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/83039842

debug下大部分情况是这样的：


![upload successful](/images/my_blog_185.png)

但是下面这个对象只显示了这样：


![upload successful](/images/my_blog_186.png)

但有的时候不显示，因为是auto模式的，找到自己认为是的对象右击----------->


![upload successful](/images/my_blog_187.png)
就可以完全显示了。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()