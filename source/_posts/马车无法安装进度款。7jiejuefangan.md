title: mac 无法安装jdk1.7解决方案
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - mac
  - jdk
categories:
  - 捣蛋鬼
  - mac
date: 2018-11-09 23:03:00
---
简介
==

mac重新装系统，目前版本是os版本`10.11.6`，安装jdk1.7时会弹出报错，说版本不兼容我去，恶心死我了。

### 错误

![](https://leanote.com/api/file/getImage?fileId=5689cefcab64415a2600091a)

解决方案
----

1.  双击安装包，使安装包挂在到机器上，即在Finder里可以看到一个名字为JDK 7 Update 60的Device。
    
    在terminal下输入以下命令，命令中的路径可能不同
    

    $ pkgutil --expand /Volumes/JDK\ 7\ Update\ 60/JDK\ 7\ Update\ 60.pkg /tmp/jdk.unpkg  
    $ cd /tmp/jdk.unpkg  
    $ vim Distribution  

*   1
*   2
*   3

1.  将打开的文件内容替换,找到`pm_install_check`方法，修改为以下就行。

    function pm_install_check() {
      return true;
    }
    

*   1
*   2
*   3
*   4

1.  重新打包

    $ pkgutil --flatten /tmp/jdk.unpkg /tmp/jdk.pkg 

*   1

1.  开始重新安装包(新的包)

    $ open /tmp/jdk.pkg  

*   1

> 注意：原始挂在到机器上的安装包，一定得先关了才可以。

安装提供mac jdk 提供在百度云

链接:[https://pan.baidu.com/s/1bYwCfO](https://pan.baidu.com/s/1bYwCfO) 密码:m27o

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()