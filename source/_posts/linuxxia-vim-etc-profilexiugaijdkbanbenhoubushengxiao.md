title: linux下 vim /etc/profile修改jdk版本后不生效
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - linux
  - jdk
  - 终端
categories:
  - linux
  - linux命令
date: 2018-11-09 13:38:00
---
当然不是因为没有 source /etc/profile

而是因为我用item2同时操作一个主机（两个窗口），在其中一个窗口修改了版本之后，并且已经生效，另外一个窗口还是旧的jdk版本，解决：在另一个窗口再进行source /etc/profile。具体的原因可能是因为类似于配置了某些东西之后要重启窗口之类的原因把，不去深究，没有意义～
--------------------- 
