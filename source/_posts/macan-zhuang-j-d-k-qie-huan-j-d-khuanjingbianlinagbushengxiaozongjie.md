title: mac安装jdk，切换jdk，环境变量不生效总结
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - mac
categories:
  - 捣蛋鬼
  - mac
date: 2018-11-09 22:54:00
---
环境变量配置文件执行的顺序：

/etc/profile /etc/paths ~/.bash_profile ~/.bash_login ~/.profile ~/.bashrc

/etc/profile和/etc/paths是系统级别的，系统启动就会加载，剩下的是用户级别的。

java6下载，苹果官方：https://support.apple.com/kb/DL1572?viewlocale=zh_CN&locale=en_US

自动切换：

编辑其中的一个环境变量配置文件：

 export JAVA_6_HOME=/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
export JAVA_7_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_71.jdk/Contents/Home
export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_172.jdk/Contents/Home
alias jdk6="export JAVA_HOME=$JAVA_6_HOME" #编辑一个命令jdk6，输入则转至jdk1.6
alias jdk7="export JAVA_HOME=$JAVA_7_HOME" #编辑一个命令jdk8，输入则转至jdk1.8
alias jdk8="export JAVA_HOME=$JAVA_8_HOME" #编辑一个命令jdk8，输入则转至jdk1.8
export JAVA_HOME=`/usr/libexec/java_home`  #最后安装的版本，这样当自动更新时，始终指向最新版本
环境变量不生效：

1 source /etc/profile     ~/.xxx

2重启

3安装了zsh 

如果提示：zsh: command not found: homestead，安装了zshrc的话，是不会执行source /etc/profile的

              解决安装zsh：1将相关的配置加入到～/.zshrc   

                                      2.在～/.zshrc中加入 source /etc/profile 


--------------------- 
作者：Leesin Dong 
来源：CSDN 
原文：https://blog.csdn.net/dataiyangu/article/details/82888354 
版权声明：本文为博主原创文章，转载请附上博文链接！