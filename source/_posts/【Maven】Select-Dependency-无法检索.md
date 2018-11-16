title: 【Maven】Select Dependency 无法检索
author: Leesin.Dong
tags:
  - maven
categories:
  - 编码辅助工具
  - maven
date: 2018-11-11 23:39:00
---
问题：

在 “pom.xml” 中，点击  “Dependencies” -> “Add” 添加依赖时，无法检索。

 

如下图所示：



 
![upload successful](/images/my_blog_218.png)

 

解决办法：

 

依次点击 “Windows”->“Show View”，选择 “Maven Repositories View”，“Local Repositories” 和“ Global Repositories” 分别是“本地库”和“中央库”，我们选择 “Local Repository”，然后右键选择 “Rebuild Index” 重建索引，等待进度完成，最后重启 IDE 即可！

 

 

原创文章，转载请注明出处： http://blog.csdn.net/cyeyws/article/details/26743101 

