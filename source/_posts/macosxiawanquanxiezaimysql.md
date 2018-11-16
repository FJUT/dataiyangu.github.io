title: Mac OS X下完全卸载MySQL
author: Leesin.Dong
tags:
  - mac
  - 捣蛋鬼
  - mysql
  - ''
categories:
  - 捣蛋鬼
  - mac
date: 2018-11-09 23:08:00
---
Mac OS X下删除MySQL是一件非常麻烦的事情，很多时候都不能完全删除，最终导致MySQL在Mac下的使用非常麻烦。下面我将介绍MySQL如何完全卸载的方法。

MySQL的卸载一般使用终端的方式操作（安装包中有安装文件，但是没有卸载文件，只能通过终端命令的方式卸载）。

命令：

\[plain\] [view plain](https://blog.csdn.net/u012721519/article/details/55002626#) [copy](https://blog.csdn.net/u012721519/article/details/55002626#)

1.  sudo rm /usr/local/mysql  
2.  sudo rm -rf /usr/local/mysql*  
3.  sudo rm -rf /Library/StartupItems/MySQLCOM  
4.  sudo rm -rf /Library/PreferencePanes/My*  
5.  vim /etc/hostconfig    

执行完上面命令后使用的是Vim指令，复制上述命令，保存，退出即可。

继续完成下列指令：

\[plain\] [view plain](https://blog.csdn.net/u012721519/article/details/55002626#) [copy](https://blog.csdn.net/u012721519/article/details/55002626#)

1.  rm -rf ~/Library/PreferencePanes/My*  
2.  sudo rm -rf /Library/Receipts/mysql*  
3.  sudo rm -rf /Library/Receipts/MySQL*  
4.  sudo rm -rf /var/db/receipts/com.mysql.*  


![upload successful](/images/my_blog_138.png)

最后打开系统偏好设置，最下方MySQL图标消失。

Good luck!

Write by Jimmy.li

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()