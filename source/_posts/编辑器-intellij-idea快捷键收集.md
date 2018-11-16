title: 编辑器 intellij idea快捷键收集
author: Leesin.Dong
tags:
  - idea
categories:
  - 编码辅助工具
  - idea
date: 2018-11-11 23:12:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/81742199

操作

命令

查找

command+f 

替换

command+r

全局查找

commad+shift+f

全局替换

commad+shift+r

查找任何所有的东西

shift+shift

查看继承关系

ontrol+h

查看上次浏览的位置

mac：option+command+方向键 /windows：control+alt+方向键  

查看接口的实现类 

mac： option+command+单击/b /windows：control+alt+b/单击

自动补全末尾的分号

commad+shift+回车

get  set方法

control+return（回车）

改变选中部分的大小写

mac：command+shift+u /windows:control+shift+u

往代码外面加try catch   if else等

mac：command+option+t /windows：control+alt+t

代码窗口最大化

mac：Command+Shift+F12 /windows：Ctrl+Shift+F12

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()