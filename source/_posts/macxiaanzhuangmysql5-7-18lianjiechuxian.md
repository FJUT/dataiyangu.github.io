title: >-
  mac下安装mysql5.7.18，连接出现Access denied for user 'root'@'localhost' (using
  password: YES)
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - mac
  - mysql
  - 数据库
categories:
  - 捣蛋鬼
  - mac
date: 2018-11-09 23:10:00
---
mac下，mysql5.7.18连接出错，错误信息为：Access denied for user ['root'@'localhost'](mailto:' rel=) (using password: YES)

（）里面的为shell中输入的命令，一定要输全包括；&等符号

第一步：苹果->系统偏好设置->最下面点mysql，关闭mysql服务

第二步：进入终端输入（cd /usr/local/mysql/bin/）回车

输入（sudo su）回车以获取管理员权限

输入（./mysqld_safe --skip-grant-tables &）回车以禁止mysql验证功能，mysql会自动重启，偏好设置中的mysql状态会变成running

第三步：输入命令（./mysql）回车

输入命令（flush privileges;）分号别忘记输了

输入命令（set password for 'root'@'localhost' = password('root');） password('root')中的root为新密码，自己随便设置，分号别忘记输入

至此，密码修改成功，可以正常登入了。


![upload successful](/images/my_blog_139.png)

参考文章：

[http://www.jb51.net/article/107028.htm](http://www.jb51.net/article/107028.htm)

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()