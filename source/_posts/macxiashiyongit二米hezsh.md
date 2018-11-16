title: MAC下使用iTerm2和zsh
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - mac
  - linux
  - item
  - 终端
categories:
  - 捣蛋鬼
  - mac
date: 2018-11-09 22:59:00
---
      应该说Terminal终端是程序员经常会用到的工具，大家时不时的都要使用终端来敲上几行命令行，尤其是在Mac上，很多工具的使用都是通过Terminal来进行的。但是其实Mac自带的终端不是特别方便，今天我们将会使用iTerm2来替代Terminal终端。整体的搭配组合为:iTerm2+Oh my zsh +zsh

      iTerm2是Terminal的替代品，是一款比较小众的软件，比Terminal优秀太多了。下载官网为[http://www.iterm2.cn/](http://www.iterm2.cn/)，下载后直接安装即可。iTerm2可以设置主题，支持画面分隔、各种快捷键。Mac默认使用的shell是bash，我们可以换成zsh，搭配iTerm2使用，用起来十分顺手。下图就是我目前使用的iTerm2:

![](https://img-blog.csdn.net/20160110163859824?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center).

 （1）现在假设大家都安装了iTerm2，我们先把bash切换成zsh，使用命令行如下：

chsh -s /bin/zsh

执行命令后，会让你输入电脑的密码，输入即可。完成后，需要完全退出iTerm2,再次进入时，就已经从bash切换到zsh了。当然，如果你哪一天又想用bash了，也可以使用下列命令：

chsh -s /bin/bash

切换成功后，退出，再次进入的时候就切换bash成功了，相互切换是不是很方便呢？

如果你想看看自己的机子上装了哪些shell，可以使用如下命令：

cat /etc/shells

我的显示如下：

/bin/bash  
/bin/csh  
/bin/ksh  
/bin/sh  
/bin/tcsh  
/bin/zsh

（2）安装 oh my zsh

Zsh和bash一样，是一种Unix shell，但大多数Linux发行版都默认使用bash shell。但Zsh有强大的自动补全参数和自定义配置功能等等，Github地址：[https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)，可以让我们非常快速的上手zsh。不得不说，这个oh my zsh真的是牛逼哄哄，去看看上面的star就知道了。个人推荐使用curl自动安装，执行命令行如下：

curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh

（3）至此，iTerm2安装完毕、zsh已经切换成功、oh my zsh也已经安装OK。大家命令行的效果就应该如我上图所示了。是不是我们这篇博客就应该结束了呢？这样的话我们这篇博客的意义就不大了。下面我们来详细的讲讲如何高逼格的使用iTerm2,让我们的工作效率高起来。

【1.选中即复制】

在iTerm2中，直接用鼠标选中某个单词或者一行命令，那么就已经被复制了。不需要在去按command+C命令了。

【2.屏幕分隔】

这个是我最喜欢的iTerm2的功能，分隔成多个屏幕，只要你电脑的屏幕足够大，想分多少个屏幕都可以。可以同时进行命令行操作，而不会像只有在一个屏幕时，因为一个命令或者网络下载阻塞了，而不能执行其他命令了。如果你同时想去执行很多命令，那么，do it.

command+d:垂直分割；

command+shift+d:水平分割

![](https://img-blog.csdn.net/20160110170738241?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)。

【3.快速唤出】

这个同样是我很喜欢的功能，炫酷到无法阻挡。设置好系统热键之后，只要按快捷键，iTerm2就会从顶部以半透明的形式快速唤出，相当炫酷高效。个人因为经常使用iTerm2，所以设置了热键为：option+空格键。大家也可以根据自己的喜好设置快捷键。

![](https://img-blog.csdn.net/20160110171614291?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)。

使用快捷键快速唤出的效果。。。貌似是直接浮动在窗口上的，我截不了屏。。。大家尝试去感受下。

【4.显示复制历史】

使用快捷键shift+command+h,快速显示出我复制过的历史记录，你可以快速选择使用。

![](https://img-blog.csdn.net/20160110173508688?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)。

【5.全屏切换】

command+enter,可以快速实现全屏与正常窗口大小的切换，非常方便。

        好了，写到这里我差不多要收手了，装逼到此结束。对于我来说，上面的东西差不多刚好够我用了。当然，zsh被称为“终极shell”，你可以花好长时间去学习它，我作为iOS开发，暂时没这个打算了。。。还有"Oh my zsh"这个东东，可以配置主题，插件等等，我这里只是抛砖引玉罢了，大家可以根据自己的需求继续去学习。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()