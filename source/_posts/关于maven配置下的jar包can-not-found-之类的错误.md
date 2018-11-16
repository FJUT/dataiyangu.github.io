title: 关于maven配置下的jar包can not found 之类的错误
author: Leesin.Dong
tags:
  - maven
categories:
  - 编码辅助工具
  - maven
date: 2018-11-11 23:38:00
---
通过这几天做demo，之前一直没怎么用过maven，这几天一直，包各种错误。收获还是蛮大的，。

终于找到了maven下配置其他框架jar包中的class找不到等的一系列各种错误的终极方法：

 

找到本地的仓库。删除里面的所有文件，重新下载，原因的话，可能是其中的jar包不完整或者冲突之类的，具体的本地仓库的位置的话可以在marker中报错的地方找到！
