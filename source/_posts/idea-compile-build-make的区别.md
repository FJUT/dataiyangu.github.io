title: idea compile.build.make的区别
author: Leesin.Dong
tags:
  - idea
categories:
  - 编码辅助工具
  - idea
date: 2018-11-11 23:11:00
---
• Compile：对选定的目标（Java 类文件），进行强制性编译，不管目标是否是被修改过。
• Rebuild：对选定的目标（Project），进行强制性编译，不管目标是否是被修改过，由于 Rebuild 的目标只有 Project，所以 Rebuild 每次花的时间会比较长。
• Make：使用最多的编译操作。对选定的目标（Project 或 Module）进行编译，但只编译有修改过的文件，没有修改过的文件不会编译，这样平时开发大型项目才不会浪费时间在编译过程中。
