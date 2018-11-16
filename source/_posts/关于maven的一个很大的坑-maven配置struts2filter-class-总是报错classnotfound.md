title: 关于maven的一个很大的坑-------maven配置struts2filter-class 总是报错classnotfound
author: Leesin.Dong
tags:
  - maven
categories:
  - 编码辅助工具
  - maven
date: 2018-11-11 23:38:00
---
最近在写公司安排的任务，写几个不同框架的简单演示

就是这么简单的演示，关键是需要用到的Maven，坑死宝宝了。

话说，maven部署的项目，在maven dependencuces目录中的jar包最后是不会部署到tomcat的lib目录下的，所以在运行的时候

的web.xml配置文件中会出现如题的错误。

解决办法呢我也是上网找了好多，有的说改变属性的部署asseassemby，试了不行，这也是一种解决办法，但是对于我这次的错误解决不了

有的说通过pom添加插件的插件，将maven dependencuces复制到lib中，宝宝试了两个小时，终于复制到了，哇好兴奋，没想到啊，没想到，复制到的是什么玩意？是所有的JAR包封装到了一个更大的JAR包中，这并不是我想要的。

 

还可以直接将相应的jar包放到WEB-INF/lib目录下面。

 

 

至于最后的解决办法呢：也不是什么好的办法，就是在maven dependencuces的路径下去mac的个人文件中找到相应的jar然后复制到lib中（因为，maven在配置struts时候，只需要陪你一个核心就能下载相关的罐包了，主要是我懒，要不然一个一个手动下载下来早就结束了，喜欢钻研的我就是喜欢走捷径吗，呵呵哒）。
