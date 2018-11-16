title: 'idea web项目java.lang.ClassNotFoundException:'
author: Leesin.Dong
tags:
  - idea
categories:
  - 编码辅助工具
  - idea
date: 2018-11-11 22:48:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/82898116


![upload successful](/images/my_blog_188.png)

今天仍然遇到了相同的错误，按照这个方法无论如何都没有成功，注意细节：项目下面还有的包没有put过去，put完整


![upload successful](/images/my_blog_189.png)

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()